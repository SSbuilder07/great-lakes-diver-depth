# Dreamweaver 124 mm Ninja Diver — estimated dive charts

All depths are feet. Line: **30 lb PowerPro braid**. Settings: **0–5**.
These 720 values are modelled estimates, not measured Ninja speed/presentation tests.

## Source and assumptions

- Source: user-supplied “124mm (New Diver) - 30 lb Power Pro @ 2.0 - 2.2 MPH” image, supplied September 6, 2026. Original 30 depth anchors remain in NINJA_ANCHORS in data.js.
- The source does not identify the lure. Treating it as a spoon baseline is an explicit modelling assumption.
- Use 2.0 mph as the nominal baseline, consistent with the existing Dreamweaver model; the source range is 2.0–2.2 mph. App speeds use surface/GPS mph; the source image does not identify its speed measurement method.
- The Ninja curves resemble the original Dreamweaver more closely than the Slide Diver, so use the original Dreamweaver speed factors. Both existing models already share the same flasher/fly factors. These ratios themselves are model assumptions, not validated Ninja measurements.
- Retain the chart's 30 lb braid. Do not apply the original Dreamweaver model's 1.025 wire multiplier.
- Interpolate linearly between chart anchors. For line out below 50 ft, use the first anchor multiplied by line out / 50; this is low-confidence extrapolation.
- Formula: estimated depth = unrounded Ninja chart depth × speed factor × presentation factor. Round the final result to one decimal foot.
- Setting 5 gets shallower beyond 200 ft. Preserve this reversal at every speed and presentation. Reject target-depth requests with multiple line-out solutions or outside the model's 15–250 ft range.
- Confidence: Moderate-Low for spoon at 2.0/2.5 mph with at least 50 ft out; Low for all flasher/fly estimates, 1.5/3.0/3.5 mph, and below 50 ft out. App practical ranges are planning allowances, not statistical confidence intervals.

## Adopted ratios

Speed factors are relative to the assumed 2.0 mph spoon baseline. Flasher factor is relative to the spoon at the same speed. Combined factor multiplies the original Ninja chart depth.

| Speed (mph) | DW speed factor adopted for Ninja | Slide speed factor relative to 2.0 mph (comparison only) | Spoon factor | Flasher/fly factor | Combined flasher factor |
|---|---:|---:|---:|---:|---:|
| 1.5 | 1.05 | 1.106 | 1.00 | 0.92 | 0.9660 |
| 2.0 | 1.00 | 1.000 | 1.00 | 0.88 | 0.8800 |
| 2.5 | 0.95 | 0.925 | 1.00 | 0.84 | 0.7980 |
| 3.0 | 0.90 | 0.868 | 1.00 | 0.80 | 0.7200 |
| 3.5 | 0.85 | 0.822 | 1.00 | 0.76 | 0.6460 |

## Complete depth tables

Rows marked * are extrapolated below the first supplied chart line length. All lure/speed combinations remain modelled.

### Spoon — 1.5 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 12.0 | 11.7 | 11.3 | 11.7 | 11.0 | 10.1 |
| 25* | 20.0 | 19.4 | 18.9 | 19.4 | 18.4 | 16.8 |
| 35* | 27.9 | 27.2 | 26.5 | 27.2 | 25.7 | 23.5 |
| 50 | 39.9 | 38.9 | 37.8 | 38.9 | 36.8 | 33.6 |
| 75 | 57.8 | 55.7 | 53.6 | 52.0 | 48.8 | 44.6 |
| 100 | 75.6 | 72.5 | 69.3 | 65.1 | 60.9 | 55.7 |
| 125 | 84.0 | 80.3 | 77.2 | 74.6 | 70.9 | 66.2 |
| 150 | 92.4 | 88.2 | 85.1 | 84.0 | 80.9 | 76.7 |
| 175 | 103.4 | 101.3 | 98.7 | 96.1 | 91.9 | 87.7 |
| 200 | 114.5 | 114.5 | 112.4 | 108.2 | 102.9 | 98.7 |
| 225 | 117.1 | 116.6 | 115.0 | 111.8 | 105.0 | 97.1 |
| 250 | 119.7 | 118.7 | 117.6 | 115.5 | 107.1 | 95.6 |

### Spoon — 2.0 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 11.4 | 11.1 | 10.8 | 11.1 | 10.5 | 9.6 |
| 25* | 19.0 | 18.5 | 18.0 | 18.5 | 17.5 | 16.0 |
| 35* | 26.6 | 25.9 | 25.2 | 25.9 | 24.5 | 22.4 |
| 50 | 38.0 | 37.0 | 36.0 | 37.0 | 35.0 | 32.0 |
| 75 | 55.0 | 53.0 | 51.0 | 49.5 | 46.5 | 42.5 |
| 100 | 72.0 | 69.0 | 66.0 | 62.0 | 58.0 | 53.0 |
| 125 | 80.0 | 76.5 | 73.5 | 71.0 | 67.5 | 63.0 |
| 150 | 88.0 | 84.0 | 81.0 | 80.0 | 77.0 | 73.0 |
| 175 | 98.5 | 96.5 | 94.0 | 91.5 | 87.5 | 83.5 |
| 200 | 109.0 | 109.0 | 107.0 | 103.0 | 98.0 | 94.0 |
| 225 | 111.5 | 111.0 | 109.5 | 106.5 | 100.0 | 92.5 |
| 250 | 114.0 | 113.0 | 112.0 | 110.0 | 102.0 | 91.0 |

### Spoon — 2.5 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 10.8 | 10.5 | 10.3 | 10.5 | 10.0 | 9.1 |
| 25* | 18.1 | 17.6 | 17.1 | 17.6 | 16.6 | 15.2 |
| 35* | 25.3 | 24.6 | 23.9 | 24.6 | 23.3 | 21.3 |
| 50 | 36.1 | 35.2 | 34.2 | 35.2 | 33.3 | 30.4 |
| 75 | 52.3 | 50.3 | 48.4 | 47.0 | 44.2 | 40.4 |
| 100 | 68.4 | 65.6 | 62.7 | 58.9 | 55.1 | 50.3 |
| 125 | 76.0 | 72.7 | 69.8 | 67.5 | 64.1 | 59.9 |
| 150 | 83.6 | 79.8 | 77.0 | 76.0 | 73.1 | 69.4 |
| 175 | 93.6 | 91.7 | 89.3 | 86.9 | 83.1 | 79.3 |
| 200 | 103.6 | 103.6 | 101.6 | 97.9 | 93.1 | 89.3 |
| 225 | 105.9 | 105.5 | 104.0 | 101.2 | 95.0 | 87.9 |
| 250 | 108.3 | 107.4 | 106.4 | 104.5 | 96.9 | 86.5 |

### Spoon — 3.0 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 10.3 | 10.0 | 9.7 | 10.0 | 9.5 | 8.6 |
| 25* | 17.1 | 16.7 | 16.2 | 16.7 | 15.8 | 14.4 |
| 35* | 23.9 | 23.3 | 22.7 | 23.3 | 22.1 | 20.2 |
| 50 | 34.2 | 33.3 | 32.4 | 33.3 | 31.5 | 28.8 |
| 75 | 49.5 | 47.7 | 45.9 | 44.6 | 41.9 | 38.3 |
| 100 | 64.8 | 62.1 | 59.4 | 55.8 | 52.2 | 47.7 |
| 125 | 72.0 | 68.9 | 66.2 | 63.9 | 60.8 | 56.7 |
| 150 | 79.2 | 75.6 | 72.9 | 72.0 | 69.3 | 65.7 |
| 175 | 88.7 | 86.9 | 84.6 | 82.4 | 78.8 | 75.2 |
| 200 | 98.1 | 98.1 | 96.3 | 92.7 | 88.2 | 84.6 |
| 225 | 100.4 | 99.9 | 98.6 | 95.9 | 90.0 | 83.3 |
| 250 | 102.6 | 101.7 | 100.8 | 99.0 | 91.8 | 81.9 |

### Spoon — 3.5 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 9.7 | 9.4 | 9.2 | 9.4 | 8.9 | 8.2 |
| 25* | 16.2 | 15.7 | 15.3 | 15.7 | 14.9 | 13.6 |
| 35* | 22.6 | 22.0 | 21.4 | 22.0 | 20.8 | 19.0 |
| 50 | 32.3 | 31.5 | 30.6 | 31.5 | 29.8 | 27.2 |
| 75 | 46.8 | 45.1 | 43.4 | 42.1 | 39.5 | 36.1 |
| 100 | 61.2 | 58.7 | 56.1 | 52.7 | 49.3 | 45.1 |
| 125 | 68.0 | 65.0 | 62.5 | 60.4 | 57.4 | 53.6 |
| 150 | 74.8 | 71.4 | 68.9 | 68.0 | 65.5 | 62.1 |
| 175 | 83.7 | 82.0 | 79.9 | 77.8 | 74.4 | 71.0 |
| 200 | 92.6 | 92.6 | 91.0 | 87.6 | 83.3 | 79.9 |
| 225 | 94.8 | 94.4 | 93.1 | 90.5 | 85.0 | 78.6 |
| 250 | 96.9 | 96.1 | 95.2 | 93.5 | 86.7 | 77.4 |

### 8" Flasher/Fly — 1.5 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 11.0 | 10.7 | 10.4 | 10.7 | 10.1 | 9.3 |
| 25* | 18.4 | 17.9 | 17.4 | 17.9 | 16.9 | 15.5 |
| 35* | 25.7 | 25.0 | 24.3 | 25.0 | 23.7 | 21.6 |
| 50 | 36.7 | 35.7 | 34.8 | 35.7 | 33.8 | 30.9 |
| 75 | 53.1 | 51.2 | 49.3 | 47.8 | 44.9 | 41.1 |
| 100 | 69.6 | 66.7 | 63.8 | 59.9 | 56.0 | 51.2 |
| 125 | 77.3 | 73.9 | 71.0 | 68.6 | 65.2 | 60.9 |
| 150 | 85.0 | 81.1 | 78.2 | 77.3 | 74.4 | 70.5 |
| 175 | 95.2 | 93.2 | 90.8 | 88.4 | 84.5 | 80.7 |
| 200 | 105.3 | 105.3 | 103.4 | 99.5 | 94.7 | 90.8 |
| 225 | 107.7 | 107.2 | 105.8 | 102.9 | 96.6 | 89.4 |
| 250 | 110.1 | 109.2 | 108.2 | 106.3 | 98.5 | 87.9 |

### 8" Flasher/Fly — 2.0 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 10.0 | 9.8 | 9.5 | 9.8 | 9.2 | 8.4 |
| 25* | 16.7 | 16.3 | 15.8 | 16.3 | 15.4 | 14.1 |
| 35* | 23.4 | 22.8 | 22.2 | 22.8 | 21.6 | 19.7 |
| 50 | 33.4 | 32.6 | 31.7 | 32.6 | 30.8 | 28.2 |
| 75 | 48.4 | 46.6 | 44.9 | 43.6 | 40.9 | 37.4 |
| 100 | 63.4 | 60.7 | 58.1 | 54.6 | 51.0 | 46.6 |
| 125 | 70.4 | 67.3 | 64.7 | 62.5 | 59.4 | 55.4 |
| 150 | 77.4 | 73.9 | 71.3 | 70.4 | 67.8 | 64.2 |
| 175 | 86.7 | 84.9 | 82.7 | 80.5 | 77.0 | 73.5 |
| 200 | 95.9 | 95.9 | 94.2 | 90.6 | 86.2 | 82.7 |
| 225 | 98.1 | 97.7 | 96.4 | 93.7 | 88.0 | 81.4 |
| 250 | 100.3 | 99.4 | 98.6 | 96.8 | 89.8 | 80.1 |

### 8" Flasher/Fly — 2.5 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 9.1 | 8.9 | 8.6 | 8.9 | 8.4 | 7.7 |
| 25* | 15.2 | 14.8 | 14.4 | 14.8 | 14.0 | 12.8 |
| 35* | 21.2 | 20.7 | 20.1 | 20.7 | 19.6 | 17.9 |
| 50 | 30.3 | 29.5 | 28.7 | 29.5 | 27.9 | 25.5 |
| 75 | 43.9 | 42.3 | 40.7 | 39.5 | 37.1 | 33.9 |
| 100 | 57.5 | 55.1 | 52.7 | 49.5 | 46.3 | 42.3 |
| 125 | 63.8 | 61.0 | 58.7 | 56.7 | 53.9 | 50.3 |
| 150 | 70.2 | 67.0 | 64.6 | 63.8 | 61.4 | 58.3 |
| 175 | 78.6 | 77.0 | 75.0 | 73.0 | 69.8 | 66.6 |
| 200 | 87.0 | 87.0 | 85.4 | 82.2 | 78.2 | 75.0 |
| 225 | 89.0 | 88.6 | 87.4 | 85.0 | 79.8 | 73.8 |
| 250 | 91.0 | 90.2 | 89.4 | 87.8 | 81.4 | 72.6 |

### 8" Flasher/Fly — 3.0 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 8.2 | 8.0 | 7.8 | 8.0 | 7.6 | 6.9 |
| 25* | 13.7 | 13.3 | 13.0 | 13.3 | 12.6 | 11.5 |
| 35* | 19.2 | 18.6 | 18.1 | 18.6 | 17.6 | 16.1 |
| 50 | 27.4 | 26.6 | 25.9 | 26.6 | 25.2 | 23.0 |
| 75 | 39.6 | 38.2 | 36.7 | 35.6 | 33.5 | 30.6 |
| 100 | 51.8 | 49.7 | 47.5 | 44.6 | 41.8 | 38.2 |
| 125 | 57.6 | 55.1 | 52.9 | 51.1 | 48.6 | 45.4 |
| 150 | 63.4 | 60.5 | 58.3 | 57.6 | 55.4 | 52.6 |
| 175 | 70.9 | 69.5 | 67.7 | 65.9 | 63.0 | 60.1 |
| 200 | 78.5 | 78.5 | 77.0 | 74.2 | 70.6 | 67.7 |
| 225 | 80.3 | 79.9 | 78.8 | 76.7 | 72.0 | 66.6 |
| 250 | 82.1 | 81.4 | 80.6 | 79.2 | 73.4 | 65.5 |

### 8" Flasher/Fly — 3.5 mph

| Line out (ft) | Setting 0 | Setting 1 | Setting 2 | Setting 3 | Setting 4 | Setting 5 |
|---|---:|---:|---:|---:|---:|---:|
| 15* | 7.4 | 7.2 | 7.0 | 7.2 | 6.8 | 6.2 |
| 25* | 12.3 | 12.0 | 11.6 | 12.0 | 11.3 | 10.3 |
| 35* | 17.2 | 16.7 | 16.3 | 16.7 | 15.8 | 14.5 |
| 50 | 24.5 | 23.9 | 23.3 | 23.9 | 22.6 | 20.7 |
| 75 | 35.5 | 34.2 | 32.9 | 32.0 | 30.0 | 27.5 |
| 100 | 46.5 | 44.6 | 42.6 | 40.1 | 37.5 | 34.2 |
| 125 | 51.7 | 49.4 | 47.5 | 45.9 | 43.6 | 40.7 |
| 150 | 56.8 | 54.3 | 52.3 | 51.7 | 49.7 | 47.2 |
| 175 | 63.6 | 62.3 | 60.7 | 59.1 | 56.5 | 53.9 |
| 200 | 70.4 | 70.4 | 69.1 | 66.5 | 63.3 | 60.7 |
| 225 | 72.0 | 71.7 | 70.7 | 68.8 | 64.6 | 59.8 |
| 250 | 73.6 | 73.0 | 72.4 | 71.1 | 65.9 | 58.8 |
