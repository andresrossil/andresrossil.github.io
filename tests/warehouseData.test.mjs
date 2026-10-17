import test from 'node:test'
import assert from 'node:assert/strict'
import { warehouseProducts, warehouseLines, warehouseSelect, warehouseSummary, warehouseGroups } from '../src/warehouseData.ts'
const all={month:'all',picker:'all',product:'all',brand:'all',supplier:'all',search:''}
test('physical calculations and unique document denominator use line quantities',()=>{
 const lines=[{document:'D1',date:'2025-01-01',product:'SKU-01',picker:'P-1',requested:24,fulfilled:12},{document:'D1',date:'2025-01-01',product:'SKU-02',picker:'P-2',requested:12,fulfilled:6}]
 const s=warehouseSummary(lines)
 assert.equal(s.documents,1);assert.equal(s.boxes,2);assert.equal(s.kg,18);assert.equal(s.m3,.065)
 assert.equal(s.requested,36);assert.equal(s.fulfilled,18);assert.equal(s.missing,18);assert.equal(s.cut,.5);assert.equal(s.fulfillment,.5)
 assert.equal(s.dropBoxes,2);assert.equal(s.dropKg,18);assert.equal(s.dropM3,.065)
 assert.equal(warehouseGroups(lines,l=>l.picker).reduce((n,g)=>n+g.documents,0),2)
 assert.equal(warehouseGroups(lines,l=>l.document).length,1)
})
test('synthetic relationships, requested and fulfilled conservation',()=>{
 assert.equal(warehouseLines.length,180);assert.equal(warehouseSummary(warehouseLines).documents,60)
 for(const line of warehouseLines){assert.ok(warehouseProducts.some(p=>p.id===line.product));assert.ok(line.requested>=line.fulfilled&&line.fulfilled>=0);assert.ok(Number.isInteger(line.requested)&&Number.isInteger(line.fulfilled))}
})
test('all filter combinations reconcile groups and protect zero denominators',()=>{
 for(const month of ['all','01','02','03']) for(const picker of ['all','P-1','P-2','P-3']) for(const brand of ['all','A','B','C']) for(const supplier of ['all','01','02','03']) {
  const rows=warehouseSelect(warehouseLines,{...all,month,picker,brand,supplier});const total=warehouseSummary(rows)
  for(const key of [r=>r.product,r=>r.document,r=>r.picker]){
   const groups=warehouseGroups(rows,key)
   for(const metric of ['requested','fulfilled','missing','boxes','kg','m3']) assert.ok(Math.abs(total[metric]-groups.reduce((n,g)=>n+g[metric],0))<1e-8)
  }
  assert.equal(total.requested,total.fulfilled+total.missing)
  if(total.requested) assert.ok(Math.abs(total.cut+total.fulfillment-1)<1e-10)
 }
 const empty=warehouseSummary([]);for(const field of ['cut','fulfillment','dropBoxes','dropKg','dropM3'])assert.equal(empty[field],null)
 assert.equal(warehouseSelect(warehouseLines,{...all,search:'no-match'}).length,0)
 assert.equal(warehouseSelect(warehouseLines,{...all,search:'WH-1-001'}).length,3)
 assert.ok(warehouseSelect(warehouseLines,{...all,product:'SKU-01'}).every(l=>l.product==='SKU-01'))
})
