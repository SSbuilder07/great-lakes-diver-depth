const LINE_OUTS = [25,50,75,100,125,150,175,200,225,250];

const SPEED_MULT = {
  1.5: 1.05,
  2: 1.00,
  2.5: 0.95,
  3: 0.90,
  3.5: 0.85
};

const FLASHER_MULT = {
  1.5: 0.92,
  2: 0.88,
  2.5: 0.84,
  3: 0.80,
  3.5: 0.76
};

const DW_ANCHORS = {
  1: {50:36,100:67,150:82,200:109,250:112},
  2: {50:37,100:61,150:79,200:101,250:110},
  3: {50:32,100:53,150:73,200:94,250:91}
};

const SLIDE_COEFF = {
  1: {a:0.8379347817334419,b:0.8129404045132091,gridMax:150},
  2: {a:0.8027876529710537,b:0.8048073236240281,gridMax:125},
  3: {a:0.6284559811319587,b:0.842379992745371,gridMax:125},
  4: {a:0.5053207973657889,b:0.8687144821979225,gridMax:125},
  5: {a:0.44963349895011245,b:0.8586439235037222,gridMax:150},
  6: {a:0.5167415873540937,b:0.7901514479488952,gridMax:150}
};

function round1(x) {
  return Math.round((x + Number.EPSILON) * 10) / 10;
}

function dwFactoryDepth(setting, lineOut) {
  function source(settingNumber) {
    const a = DW_ANCHORS[settingNumber];

    if (lineOut === 25) {
      return a[50] / 2;
    }

    if (a[lineOut] !== undefined) {
      return a[lineOut];
    }

    const lower =
      Math.floor(lineOut / 50) * 50;

    const upper = lower + 50;

    return (
      a[lower] +
      ((lineOut - lower) / (upper - lower)) *
      (a[upper] - a[lower])
    );
  }

  if (setting === 1 || setting === 2 || setting === 3) {
    return source(setting);
  }

  if (setting === 1.5) {
    return (source(1) + source(2)) / 2;
  }

  if (setting === 2.5) {
    return (source(2) + source(3)) / 2;
  }

  if (setting === 3.5) {
    return 2 * source(3) - source(2);
  }
}

function dwBasis(setting, lineOut, speed, presentation) {
  let lead;

  if (setting === 3.5) {
    lead = "EXPERIMENTAL";
  } else if (setting === 1.5 || setting === 2.5) {
    lead = "CALCULATED";
  } else if ([25,75,125,175,225].includes(lineOut)) {
    lead = "INTERPOLATED";
  } else {
    lead = "MODELLED";
  }

  const parts = [lead];

  if (speed !== 2) {
    parts.push("SPEED-ADJUSTED");
  }

  if (presentation === '8" Flasher/Fly') {
    parts.push("PRESENTATION-ADJUSTED");
  }

  parts.push("WIRE-ESTIMATE");

  return parts.join("; ");
}

function dwConfidence(setting, speed, presentation) {
  if (setting === 3.5) {
    return "Low";
  }

  if (
    presentation === "Spoon" &&
    (speed === 2 || speed === 2.5)
  ) {
    return "Moderate";
  }

  return "Moderate-Low";
}

function makeDreamweaverRows() {
  const rows = [];

  const presentations = [
    "Spoon",
    '8" Flasher/Fly'
  ];

  const speeds = [1.5,2,2.5,3,3.5];
  const settings = [1,1.5,2,2.5,3,3.5];

  presentations.forEach(presentation => {
    speeds.forEach(speed => {
      settings.forEach(setting => {
        LINE_OUTS.forEach(lineOut => {

          let depth =
            dwFactoryDepth(setting, lineOut) *
            1.025 *
            SPEED_MULT[speed];

          if (presentation === '8" Flasher/Fly') {
            depth *= FLASHER_MULT[speed];
          }

          rows.push({
            presentation,
            surface_speed_mph: speed,
            setting,
            line_out_ft: lineOut,
            estimated_depth_ft: round1(depth),
            confidence:
              dwConfidence(
                setting,
                speed,
                presentation
              ),
            source_basis:
              dwBasis(
                setting,
                lineOut,
                speed,
                presentation
              )
          });

        });
      });
    });
  });

  return rows;
}

function slideDepth(setting, lineOut, speed, presentation) {
  const c = SLIDE_COEFF[setting];

  const speedKnots =
    speed / 1.150779448;

  let depth =
    c.a *
    Math.pow(lineOut, c.b) *
    Math.pow(2 / speedKnots, 0.35) *
    1.05;

  if (presentation === '8" Flasher/Fly') {
    depth *= FLASHER_MULT[speed];
  }

  return round1(depth);
}

function slideBasis(setting, lineOut, speed, presentation) {
  const c = SLIDE_COEFF[setting];

  let lead;

  if (lineOut > c.gridMax) {
    lead = "POWER-CURVE EXTRAPOLATION";
  } else if (speed === 1.5 || speed === 3.5) {
    lead = "SPEED EXTRAPOLATION";
  } else {
    lead =
      "MODELLED FROM OFFICIAL 20LB MONO CARD";
  }

  const parts = [lead];

  if (presentation === '8" Flasher/Fly') {
    parts.push("PRESENTATION-ADJUSTED");
  }

  parts.push("50LB-BRAID-ESTIMATE");

  return parts.join("; ");
}

function slideConfidence(setting, lineOut, speed, presentation) {
  if (presentation === '8" Flasher/Fly') {
    return "Low";
  }

  if (
    lineOut > SLIDE_COEFF[setting].gridMax ||
    speed === 1.5 ||
    speed === 3.5
  ) {
    return "Low";
  }

  return "Moderate-Low";
}

function makeSlideRows() {
  const rows = [];

  const presentations = [
    "Spoon",
    '8" Flasher/Fly'
  ];

  const speeds = [1.5,2,2.5,3,3.5];
  const settings = [1,2,3,4,5,6];

  presentations.forEach(presentation => {
    speeds.forEach(speed => {
      settings.forEach(setting => {
        LINE_OUTS.forEach(lineOut => {

          rows.push({
            presentation,
            surface_speed_mph: speed,
            setting,
            line_out_ft: lineOut,
            estimated_depth_ft:
              slideDepth(
                setting,
                lineOut,
                speed,
                presentation
              ),
            confidence:
              slideConfidence(
                setting,
                lineOut,
                speed,
                presentation
              ),
            source_basis:
              slideBasis(
                setting,
                lineOut,
                speed,
                presentation
              )
          });

        });
      });
    });
  });

  return rows;
}

window.DIVER_DATA = {
  dreamweaver: makeDreamweaverRows(),
  slide: makeSlideRows(),

  // Scott's verification template currently contains
  // no confirmed boat measurements marked for use.
  verified: []
};
