// Exact planning rows packed from the uploaded completed CSV tables.
// This file reconstructs the row objects expected by app.js.
const PACKED = {"L":[25,50,75,100,125,150,175,200,225,250],"dreamweaver":{"B":["CALCULATED; SPEED-ADJUSTED; WIRE-ESTIMATE","MODELLED; SPEED-ADJUSTED; WIRE-ESTIMATE","INTERPOLATED; SPEED-ADJUSTED; WIRE-ESTIMATE","CALCULATED; WIRE-ESTIMATE","MODELLED; WIRE-ESTIMATE","INTERPOLATED; WIRE-ESTIMATE","CALCULATED; SPEED-ADJUSTED; PRESENTATION-ADJUSTED; WIRE-ESTIMATE","MODELLED; SPEED-ADJUSTED; PRESENTATION-ADJUSTED; WIRE-ESTIMATE","INTERPOLATED; SPEED-ADJUSTED; PRESENTATION-ADJUSTED; WIRE-ESTIMATE","CALCULATED; PRESENTATION-ADJUSTED; WIRE-ESTIMATE","MODELLED; PRESENTATION-ADJUSTED; WIRE-ESTIMATE","INTERPOLATED; PRESENTATION-ADJUSTED; WIRE-ESTIMATE","EXPERIMENTAL; SPEED-ADJUSTED; WIRE-ESTIMATE","EXPERIMENTAL; WIRE-ESTIMATE","EXPERIMENTAL; SPEED-ADJUSTED; PRESENTATION-ADJUSTED; WIRE-ESTIMATE","EXPERIMENTAL; PRESENTATION-ADJUSTED; WIRE-ESTIMATE"],"C":["Moderate-Low","Moderate","Low"],"S":{}},"slide":{"B":["MODELLED FROM OFFICIAL 20LB MONO CARD; 50LB-BRAID-ESTIMATE","POWER-CURVE EXTRAPOLATION; 50LB-BRAID-ESTIMATE","SPEED EXTRAPOLATION; 50LB-BRAID-ESTIMATE","MODELLED FROM OFFICIAL 20LB MONO CARD; PRESENTATION-ADJUSTED; 50LB-BRAID-ESTIMATE","POWER-CURVE EXTRAPOLATION; PRESENTATION-ADJUSTED; 50LB-BRAID-ESTIMATE","SPEED EXTRAPOLATION; PRESENTATION-ADJUSTED; 50LB-BRAID-ESTIMATE"],"C":["Moderate-Low","Low"],"S":{}}};

const L = PACKED.L;

function addSeries(system, presentation, speed, setting, depths, confidence, basis) {
  PACKED[system].S[
    presentation + "|" + speed + "|" + setting
  ] = {
    d: depths,
    c: confidence,
    b: basis
  };
}

// DREAMWEAVER 124 MM — SPOON
addSeries("dreamweaver","Spoon",1.5,1,
[10.76,21.53,31.21,40.89,49.22,57.55,64.81,72.07,78.52,84.96],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",1.5,1.5,
[9.15,18.3,26.49,34.67,41.66,48.65,54.7,60.75,66.12,71.48],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]);

addSeries("dreamweaver","Spoon",1.5,2,
[7.53,15.07,21.76,28.45,34.1,39.75,44.59,49.43,53.73,58.03],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",1.5,2.5,
[6.46,12.91,18.57,24.22,28.91,33.59,37.62,41.65,45.13,48.61],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]);

addSeries("dreamweaver","Spoon",1.5,3,
[5.38,10.76,15.37,19.98,23.7,27.42,30.64,33.86,36.53,39.2],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",1.5,3.5,
[3.23,6.46,8.99,11.52,13.3,15.08,16.7,18.32,19.33,20.34],
[2,2,2,2,2,2,2,2,2,2],
[12,12,12,12,12,12,12,12,12,12]);

addSeries("dreamweaver","Spoon",2,1,
[10.25,20.5,29.73,38.95,46.88,54.8,61.73,68.65,74.78,80.91],
[1,1,1,1,1,1,1,1,1,1],
[3,4,5,4,5,4,5,4,5,4]);

addSeries("dreamweaver","Spoon",2,1.5,
[8.71,17.43,25.23,33.03,39.67,46.32,52.1,57.87,62.98,68.08],
[0,0,0,0,0,0,0,0,0,0],
[3,3,3,3,3,3,3,3,3,3]);

addSeries("dreamweaver","Spoon",2,2,
[7.18,14.35,20.73,27.1,32.48,37.85,42.47,47.08,51.17,55.27],
[1,1,1,1,1,1,1,1,1,1],
[3,4,5,4,5,4,5,4,5,4]);

addSeries("dreamweaver","Spoon",2,2.5,
[6.15,12.3,17.69,23.08,27.53,31.98,35.83,39.67,42.98,46.29],
[0,0,0,0,0,0,0,0,0,0],
[3,3,3,3,3,3,3,3,3,3]);

addSeries("dreamweaver","Spoon",2,3,
[5.13,10.25,14.68,19.1,22.58,26.05,29.19,32.29,34.79,37.31],
[1,1,1,1,1,1,1,1,1,1],
[3,4,5,4,5,4,5,4,5,4]);

addSeries("dreamweaver","Spoon",2,3.5,
[3.08,6.15,8.59,11.1,12.68,14.25,15.9,17.5,18.41,19.35],
[2,2,2,2,2,2,2,2,2,2],
[13,13,13,13,13,13,13,13,13,13]);

addSeries("dreamweaver","Spoon",2.5,1,
[9.74,19.48,28.24,37,44.53,52.06,58.64,65.22,71.04,76.86],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",2.5,1.5,
[8.28,16.55,23.97,31.38,37.69,44,49.49,54.98,59.83,64.68],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]);

addSeries("dreamweaver","Spoon",2.5,2,
[6.82,13.63,19.69,25.75,30.85,35.96,40.34,44.73,48.61,52.5],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",2.5,2.5,
[5.84,11.69,16.81,21.93,26.15,30.38,34.04,37.69,40.83,43.98],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]);

addSeries("dreamweaver","Spoon",2.5,3,
[4.87,9.74,13.94,18.15,21.45,24.75,27.73,30.68,33.05,35.44],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",2.5,3.5,
[2.92,5.84,8.16,10.55,12.05,13.54,15.11,16.63,17.49,18.38],
[2,2,2,2,2,2,2,2,2,2],
[12,12,12,12,12,12,12,12,12,12]);

addSeries("dreamweaver","Spoon",3,1,
[9.23,18.45,26.75,35.06,42.19,49.32,55.55,61.79,67.29,72.82],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",3,1.5,
[7.84,15.68,22.71,29.73,35.7,41.69,46.88,52.09,56.68,61.27],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]);

addSeries("dreamweaver","Spoon",3,2,
[6.46,12.92,18.66,24.39,29.23,34.07,38.21,42.38,46.06,49.74],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",3,2.5,
[5.54,11.07,15.92,20.77,24.78,28.78,32.25,35.7,38.68,41.67],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]);

addSeries("dreamweaver","Spoon",3,3,
[4.61,9.23,13.21,17.19,20.32,23.45,26.27,29.07,31.31,33.57],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",3,3.5,
[2.77,5.54,7.73,9.99,11.41,12.83,14.31,15.76,16.57,17.41],
[2,2,2,2,2,2,2,2,2,2],
[12,12,12,12,12,12,12,12,12,12]);

addSeries("dreamweaver","Spoon",3.5,1,
[8.71,17.43,25.26,33.11,39.84,46.58,52.47,58.35,63.55,68.77],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",3.5,1.5,
[7.4,14.81,21.45,28.08,33.72,39.37,44.27,49.19,53.52,57.84],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]);

addSeries("dreamweaver","Spoon",3.5,2,
[6.1,12.2,17.62,23.04,27.6,32.18,36.1,40.03,43.5,46.97],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",3.5,2.5,
[5.23,10.46,15.03,19.61,23.4,27.18,30.46,33.72,36.53,39.35],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]);

addSeries("dreamweaver","Spoon",3.5,3,
[4.36,8.71,12.49,16.23,19.19,22.14,24.81,27.46,29.57,31.7],
[0,0,0,0,0,0,0,0,0,0],
[0,1,2,1,2,1,2,1,2,1]);

addSeries("dreamweaver","Spoon",3.5,3.5,
[2.61,5.23,7.3,9.44,10.77,12.12,13.52,14.89,15.65,16.44],
[2,2,2,2,2,2,2,2,2,2],
[12,12,12,12,12,12,12,12,12,12]);

// DREAMWEAVER 124 MM — 8" FLASHER/FLY
const dwSpoonKeys = Object.keys(PACKED.dreamweaver.S).filter(k => k.startsWith("Spoon|"));

const flasherMultiplier = {
  1.5: 0.92,
  2: 0.88,
  2.5: 0.84,
  3: 0.80,
  3.5: 0.76
};

dwSpoonKeys.forEach(key => {
  const [, speed, setting] = key.split("|");
  const source = PACKED.dreamweaver.S[key];

  const depths = source.d.map(
    d => Math.round(d * flasherMultiplier[Number(speed)] * 100) / 100
  );

  const basis = source.b.map(code => {
    const label = PACKED.dreamweaver.B[code];

    if (label.includes("EXPERIMENTAL")) {
      return Number(speed) === 2 ? 15 : 14;
    }

    if (label.includes("CALCULATED")) {
      return Number(speed) === 2 ? 9 : 6;
    }

    if (label.includes("INTERPOLATED")) {
      return Number(speed) === 2 ? 11 : 8;
    }

    return Number(speed) === 2 ? 10 : 7;
  });

  addSeries(
    "dreamweaver",
    '8" Flasher/Fly',
    Number(speed),
    Number(setting),
    depths,
    source.c.map(() => Number(setting) === 3.5 ? 2 : 0),
    basis
  );
});

// SLIDE DIVER
// Exact completed-table depths are generated from the documented
// standard-weight / large-ring / 50 lb PowerPro model.
const slideCoefficients = {
  1: [1.235673, 0.747804],
  2: [1.053895, 0.742381],
  3: [0.875856, 0.735856],
  4: [0.759142, 0.726905],
  5: [0.651037, 0.718703],
  6: [0.560386, 0.711097]
};

const mphToKnots = mph => mph / 1.150779448;
const slideSpeedExponent = 0.35;
const braidMultiplier = 1.05;

[1.5,2,2.5,3,3.5].forEach(speed => {
  [1,2,3,4,5,6].forEach(setting => {
    const [a,b] = slideCoefficients[setting];

    const spoonDepths = L.map(line => {
      const base = a * Math.pow(line,b);
      const speedFactor =
        Math.pow(2 / mphToKnots(speed), slideSpeedExponent);

      return Math.round(
        base * speedFactor * braidMultiplier * 100
      ) / 100;
    });

    const spoonBasis = L.map(line => {
      if (line > 150) return 1;
      return (speed === 2 || speed === 2.5) ? 0 : 2;
    });

    const spoonConfidence = L.map(line =>
      line > 150 ? 1 :
      ((speed === 2 || speed === 2.5) ? 0 : 1)
    );

    addSeries(
      "slide",
      "Spoon",
      speed,
      setting,
      spoonDepths,
      spoonConfidence,
      spoonBasis
    );

    const ffDepths = spoonDepths.map(
      d => Math.round(d * flasherMultiplier[speed] * 100) / 100
    );

    const ffBasis = spoonBasis.map(code => {
      if (code === 1) return 4;
      if (code === 2) return 5;
      return 3;
    });

    addSeries(
      "slide",
      '8" Flasher/Fly',
      speed,
      setting,
      ffDepths,
      spoonConfidence.map(() => 1),
      ffBasis
    );
  });
});

function unpackSystem(name) {
  const packed = PACKED[name];
  const rows = [];

  for (const [key, values] of Object.entries(packed.S)) {
    const [presentation, speed, setting] = key.split("|");

    PACKED.L.forEach((lineOut, i) => {
      rows.push({
        presentation,
        surface_speed_mph: Number(speed),
        setting: Number(setting),
        line_out_ft: lineOut,
        estimated_depth_ft: values.d[i],
        confidence: packed.C[values.c[i]],
        source_basis: packed.B[values.b[i]]
      });
    });
  }

  return rows;
}

window.DIVER_DATA = {
  dreamweaver: unpackSystem("dreamweaver"),
  slide: unpackSystem("slide"),

  // Scott_Verified_Boat_Data_Template.csv currently has no
  // confirmed measurements marked for verified use.
  verified: []
};
