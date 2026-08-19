const $ = id => document.getElementById(id);

let mode = "line";

const configs = {
  dreamweaver: {
    text: "30 lb 7-strand stainless wire",
    settings: [1, 1.5, 2, 2.5, 3, 3.5]
  },
  slide: {
    text: "Standard weight + large #3 performance ring + original 50 lb PowerPro",
    settings: [1, 2, 3, 4, 5, 6]
  }
};

function updateSystem() {
  const system = $("system").value;
  const config = configs[system];

  $("configText").textContent = config.text;

  $("setting").innerHTML = config.settings
    .map(value => `<option value="${value}">${value}</option>`)
    .join("");

  $("setting").value = "2";
}

function setMode(newMode) {
  mode = newMode;

  $("byLine").classList.toggle("active", mode === "line");
  $("byDepth").classList.toggle("active", mode === "depth");

  $("valueLabel").childNodes[0].nodeValue =
    mode === "line" ? "Line out " : "Target depth ";

  $("value").value = mode === "line" ? 150 : 60;
}

function getRows() {
  const system = $("system").value;
  const source = window.DIVER_DATA[system];

  const presentation = $("presentation").value;
  const speed = Number($("speed").value);
  const setting = Number($("setting").value);

  return source
    .filter(row =>
      row.presentation === presentation &&
      Number(row.surface_speed_mph) === speed &&
      Number(row.setting) === setting
    )
    .sort((a, b) => a.line_out_ft - b.line_out_ft);
}

function practicalRange(confidence, experimental, extrapolated) {
  if (
    experimental ||
    extrapolated ||
    String(confidence).toLowerCase() === "low"
  ) {
    return 15;
  }

  return 10;
}

function evidenceLabel(row, interpolated, verified) {
  if (verified) {
    return "FIELD — Scott verified boat data";
  }

  let basis = String(row.source_basis || "MODELLED");

  if (interpolated) {
    return (
      "CALCULATED — interpolation between nearest table rows; " +
      basis
    );
  }

  if (basis.includes("EXPERIMENTAL")) {
    return "EXPERIMENTAL — " + basis;
  }

  if (basis.includes("FACTORY") || basis.includes("OFFICIAL")) {
    return "MODELLED / FACTORY-ANCHORED — " + basis;
  }

  if (basis.includes("CALCULATED")) {
    return "CALCULATED — " + basis;
  }

  return "MODELLED — " + basis;
}

function findVerified(system, presentation, speed, setting, lineOut) {
  return (window.DIVER_DATA.verified || []).find(row => {
    const systemMatch =
      system === "dreamweaver"
        ? String(row.diver_system).startsWith("Dreamweaver")
        : String(row.diver_system).startsWith("U-Charters");

    return (
      systemMatch &&
      row.presentation === presentation &&
      Number(row.surface_speed_mph) === speed &&
      Number(row.setting) === setting &&
      Number(row.line_out_ft) === lineOut
    );
  });
}

function interpolate(a, b, x, xKey, yKey) {
  return (
    Number(a[yKey]) +
    ((x - Number(a[xKey])) *
      (Number(b[yKey]) - Number(a[yKey]))) /
      (Number(b[xKey]) - Number(a[xKey]))
  );
}

function calculate() {
  const rows = getRows();
  const value = Number($("value").value);
  const result = $("result");

  if (!Number.isFinite(value)) {
    result.classList.remove("hidden");
    result.innerHTML =
      '<div class="error">Enter a number first.</div>';
    return;
  }

  if (!rows.length) {
    result.classList.remove("hidden");
    result.innerHTML =
      '<div class="error">No matching source data was found for this setup.</div>';
    return;
  }

  const system = $("system").value;
  const presentation = $("presentation").value;
  const speed = Number($("speed").value);
  const setting = Number($("setting").value);

  const experimental =
    system === "dreamweaver" && setting === 3.5;

  let depth;
  let lineOut;
  let row;
  let interpolated = false;
  let extrapolated = false;

  if (mode === "line") {
    lineOut = value;

    const verified = findVerified(
      system,
      presentation,
      speed,
      setting,
      lineOut
    );

    if (verified) {
      renderResult(
        Number(verified.confirmed_depth_ft),
        lineOut,
        {
          confidence: "High",
          source_basis: "FIELD"
        },
        false,
        true,
        false,
        experimental
      );
      return;
    }

    const exact = rows.find(
      item => Number(item.line_out_ft) === lineOut
    );

    if (exact) {
      row = exact;
      depth = Number(exact.estimated_depth_ft);
    } else {
      const lower = [...rows]
        .reverse()
        .find(item => Number(item.line_out_ft) < lineOut);

      const upper = rows.find(
        item => Number(item.line_out_ft) > lineOut
      );

      if (lower && upper) {
        row = lower;
        depth = interpolate(
          lower,
          upper,
          lineOut,
          "line_out_ft",
          "estimated_depth_ft"
        );
        interpolated = true;
      } else {
        extrapolated = true;

        const pair =
          lineOut < Number(rows[0].line_out_ft)
            ? rows.slice(0, 2)
            : rows.slice(-2);

        row = pair[0];

        depth = interpolate(
          pair[0],
          pair[1],
          lineOut,
          "line_out_ft",
          "estimated_depth_ft"
        );
      }
    }
  } else {
    const targetDepth = value;

    const exact = rows.find(
      item =>
        Math.abs(
          Number(item.estimated_depth_ft) - targetDepth
        ) < 0.000001
    );

    if (exact) {
      row = exact;
      depth = targetDepth;
      lineOut = Number(exact.line_out_ft);
    } else {
      let lower = null;
      let upper = null;

      for (let i = 0; i < rows.length - 1; i++) {
        const a = Number(rows[i].estimated_depth_ft);
        const b = Number(rows[i + 1].estimated_depth_ft);

        if (
          (targetDepth >= a && targetDepth <= b) ||
          (targetDepth <= a && targetDepth >= b)
        ) {
          lower = rows[i];
          upper = rows[i + 1];
          break;
        }
      }

      if (lower && upper) {
        row = lower;

        lineOut = interpolate(
          lower,
          upper,
          targetDepth,
          "estimated_depth_ft",
          "line_out_ft"
        );

        depth = targetDepth;
        interpolated = true;
      } else {
        extrapolated = true;

        const pair =
          targetDepth < Number(rows[0].estimated_depth_ft)
            ? rows.slice(0, 2)
            : rows.slice(-2);

        row = pair[0];

        lineOut = interpolate(
          pair[0],
          pair[1],
          targetDepth,
          "estimated_depth_ft",
          "line_out_ft"
        );

        depth = targetDepth;
      }
    }
  }

  renderResult(
    depth,
    lineOut,
    row,
    interpolated,
    false,
    extrapolated,
    experimental
  );
}

function renderResult(
  depth,
  lineOut,
  row,
  interpolated,
  verified,
  extrapolated,
  experimental
) {
  const tolerance = verified
    ? 5
    : practicalRange(
        row.confidence,
        experimental,
        extrapolated
      );

  const roundedDepth = Math.round(depth);
  const roundedLine = Math.round(lineOut);

  const rangeLow = Math.max(0, roundedDepth - tolerance);
  const rangeHigh = roundedDepth + tolerance;

  let caveat =
    "Downspeed/current can make the actual result materially different.";

  if ($("presentation").value.includes("Flasher")) {
    caveat =
      "8-inch flasher/fly drag plus current/downspeed can make the rig run materially shallower.";
  }

  if (extrapolated) {
    caveat =
      "LOW CONFIDENCE: this is extrapolated outside the source-supported 25–250 ft table range. " +
      caveat;
  }

  if (experimental) {
    caveat =
      "EXPERIMENTAL setting 3.5: the normal Dreamweaver directional scale ends at 3; 3.5 is not a normal, reliable setting. " +
      caveat;
  }

  const mainResult =
    mode === "line"
      ? `
        <h2>Estimated depth</h2>
        <div class="big">${roundedDepth} ft</div>
        <div class="range">
          Practical range: ${rangeLow}–${rangeHigh} ft
        </div>
      `
      : `
        <h2>Recommended line out</h2>
        <div class="big">${roundedLine} ft</div>
        <div class="range">
          Target depth: ${roundedDepth} ft · practical depth tolerance about ±${tolerance} ft
        </div>
      `;

  const label = evidenceLabel(
    row,
    interpolated,
    verified
  );

  const setting = Number($("setting").value);
  const config = configs[$("system").value].text;

  let status = "MODELLED / CALCULATED";

  if (verified) {
    status = "FIELD";
  } else if (experimental) {
    status = "EXPERIMENTAL";
  } else if (extrapolated) {
    status = "MODELLED · LOW CONFIDENCE";
  }

  $("result").innerHTML =
    mainResult +
    `
      <div>
        <span class="badge">${status}</span>
        <span class="badge">${row.confidence || "Moderate-Low"}</span>
      </div>

      <div class="detail">
        <b>Diver / line / ring or weight:</b>
        ${$("system").selectedOptions[0].textContent} — ${config}
        <br>

        <b>Presentation:</b>
        ${$("presentation").value}
        <br>

        <b>Surface speed:</b>
        ${$("speed").value} mph GPS
        <br>

        <b>Setting:</b>
        ${setting}
        <br>

        <b>${mode === "line" ? "Line out" : "Target depth"}:</b>
        ${
          mode === "line"
            ? roundedLine + " ft"
            : roundedDepth + " ft"
        }
        <br><br>

        <b>Evidence basis:</b>
        ${label}
      </div>

      <div class="warning">
        <b>Practical note:</b>
        ${caveat}
      </div>
    `;

  $("result").classList.remove("hidden");

  $("result").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

$("system").addEventListener("change", updateSystem);

$("byLine").addEventListener(
  "click",
  () => setMode("line")
);

$("byDepth").addEventListener(
  "click",
  () => setMode("depth")
);

$("calculate").addEventListener(
  "click",
  calculate
);

updateSystem();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch(() => {});
  });
}
