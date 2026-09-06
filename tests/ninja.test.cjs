// Run: node tests/ninja.test.cjs (no dependencies required).
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
function setup() {
  const elements = {};
  for (const id of ['calculate','system','presentation','speed','setting','result','value','configText','byLine','byDepth','valueLabel']) {
    elements[id] = {value:'',innerHTML:'',disabled:false,classList:{add(){},remove(){},toggle(){}},addEventListener(){},scrollIntoView(){},childNodes:[{}],selectedOptions:[{textContent:'Ninja'}]};
  }
  elements.system.value='ninja'; elements.presentation.value='Spoon'; elements.speed.value='2';
  const ctx={window:{},document:{getElementById:id=>elements[id]},navigator:{}};
  vm.createContext(ctx);
  for (const name of ['data.js','app.js']) vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),ctx);
  return {ctx,elements,rows:ctx.window.DIVER_DATA.ninja};
}
const chart=[[38,72,88,109,114],[37,69,84,109,113],[36,66,81,107,112],[37,62,80,103,110],[35,58,77,98,102],[32,53,73,94,91]];
test('720 unique finite rows; all source anchors preserved at assumed spoon baseline',()=>{
  const {rows}=setup(); assert.equal(rows.length,720);
  assert.equal(new Set(rows.map(r=>[r.presentation,r.surface_speed_mph,r.setting,r.line_out_ft].join('|'))).size,720);
  for(const row of rows) {
    assert(Number.isFinite(row.estimated_depth_ft)&&row.estimated_depth_ft>0);
    assert(row.source_basis.startsWith('MODELLED'));
    assert(!row.source_basis.includes('WIRE'));
  }
  for(let s=0;s<6;s++)for(let i=0;i<5;i++) {
    assert.equal(rows.find(r=>r.presentation==='Spoon'&&r.surface_speed_mph===2&&r.setting===s&&r.line_out_ft===(i+1)*50).estimated_depth_ft,chart[s][i]);
  }
});
test('independent expected spoon and flasher depths across all speeds',()=>{
  const {rows}=setup();
  const expected={1.5:[85.1,78.2],2:[81,71.3],2.5:[77,64.6],3:[72.9,58.3],3.5:[68.9,52.3]};
  for(const [speed,depths] of Object.entries(expected))for(const [i,p] of ['Spoon','8" Flasher/Fly'].entries()) {
    assert.equal(rows.find(r=>r.presentation===p&&r.surface_speed_mph===Number(speed)&&r.setting===2&&r.line_out_ft===150).estimated_depth_ft,depths[i]);
  }
});
test('every selectable combination calculates and retains the target-depth reversal guard',()=>{
  const {ctx,elements:e,rows}=setup();
  for(const p of ['Spoon','8" Flasher/Fly'])for(const speed of [1.5,2,2.5,3,3.5])for(let setting=0;setting<6;setting++) {
    e.presentation.value=p;e.speed.value=String(speed);e.setting.value=String(setting);
    ctx.setMode('line');e.value.value='150';ctx.calculate();
    assert(e.result.innerHTML.includes('Estimated depth'));
    assert(e.result.innerHTML.includes('MODELLED — ESTIMATED RATIOS'));
    assert(e.result.innerHTML.includes(`${speed} mph GPS`));
    e.value.value='25';ctx.calculate();assert(e.result.innerHTML.includes('LOW CONFIDENCE'));
    ctx.setMode('depth');
    const get=l=>rows.find(r=>r.presentation===p&&r.surface_speed_mph===speed&&r.setting===setting&&r.line_out_ft===l).estimated_depth_ft;
    e.value.value=String((get(200)+get(250))/2);ctx.calculate();
    assert(e.result.innerHTML.includes(setting===5?'No unique':'Recommended line out'));
  }
  e.system.value='slide';ctx.updateSystem();e.system.value='ninja';ctx.updateSystem();
  assert(!e.presentation.disabled&&!e.speed.disabled);assert(e.setting.innerHTML.includes('value="0"'));
});
test('short-line estimates, interpolation and range limits',()=>{
  const {ctx,elements:e,rows}=setup();e.setting.value='2';
  const get=l=>rows.find(r=>r.presentation==='Spoon'&&r.surface_speed_mph===2&&r.setting===2&&r.line_out_ft===l);
  assert.equal(get(15).estimated_depth_ft,10.8);assert.equal(get(25).estimated_depth_ft,18);assert.equal(get(35).estimated_depth_ft,25.2);
  assert.equal(get(75).estimated_depth_ft,51);
  e.value.value='137';ctx.calculate();assert(e.result.innerHTML.includes('77 ft'));
  for(const l of [0,14,251]){e.value.value=String(l);ctx.calculate();assert(e.result.innerHTML.includes('15–250'));}
  ctx.setMode('depth');e.value.value='200';ctx.calculate();assert(e.result.innerHTML.includes('outside'));
});
