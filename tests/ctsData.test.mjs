import test from 'node:test'
import assert from 'node:assert/strict'
import {allocate,netSales,netCost,ratio,ctsRows,ctsPools,ctsAllocations,sourceInputs,selectCTS,sumCTS,scopeCTSTotal,corporateSalesBase,groupCTS,selectedAllocations} from '../src/ctsData.ts'
const all={period:'all',unit:'all',channel:'all',center:'all'}
test('visible financial formulas and zero denominators',()=>{
 assert.equal(netSales(100000,5000,2000,3000),96000)
 assert.equal(netCost(70000,3500,800,400,200,600),65700)
 assert.equal(ratio(300,1000),.3);assert.equal(ratio(1,0),null)
 const row={id:'fixture',month:'2025-01',unit:'X',channel:'X',center:'X',sales:96000,cost:65700,direct:10000,indirect:3000,corporate:0,expenses:13000,margin:30300,contribution:17300}
 const result=sumCTS([row]);assert.equal(result.cts,13000/96000);assert.equal(result.contributionRate,17300/96000)
})
test('signed integer allocations conserve cents and reject nonexistent drivers',()=>{
 assert.deepEqual(allocate(100,[1,1,1]),[34,33,33]);assert.deepEqual(allocate(-100,[1,1,1]),[-34,-33,-33])
 assert.deepEqual(allocate(0,[0,0]),[0,0]);assert.throws(()=>allocate(1,[0,0]));assert.throws(()=>allocate(1,[-1,2]))
 assert.deepEqual(allocate(1000,[0,1,0]),[0,1000,0])
})
test('all pools fully allocate once without duplicating recipients',()=>{
 assert.equal(new Set(ctsRows.map(r=>r.id)).size,ctsRows.length)
 assert.equal(new Set(ctsAllocations.map(r=>r.id)).size,ctsAllocations.length)
 for(const pool of ctsPools){assert.equal(ctsAllocations.filter(a=>a.pool===pool.id).reduce((n,a)=>n+a.amount,0),pool.amount)}
 for(const a of ctsAllocations)assert.ok(ctsRows.some(r=>r.id===a.row&&r.month===a.month))
})
test('source components reconcile; services have no merchandise cost',()=>{
 for(const input of sourceInputs){const rows=ctsRows.filter(r=>r.month===input.month&&r.unit===input.unit);assert.equal(rows.reduce((n,r)=>n+r.sales,0),netSales(input.gross,input.returns,input.discounts,input.services));assert.equal(rows.reduce((n,r)=>n+r.cost,0),netCost(input.grossCost,input.returnedCost,input.purchaseDiscount,input.serviceInvoices,input.differences,input.provision))}
 const services=sumCTS(selectCTS('unit',{...all,unit:'U-S'}));assert.equal(services.cost,0);assert.equal(services.marginRate,1)
})
test('area, 50/50 warehouse and service reclassification use distinct drivers',()=>{
 for(let month=1;month<=12;month++){
  const m=`2025-${String(month).padStart(2,'0')}`,p=ctsPools.filter(p=>p.month===m)
  const warehouse=(11000+month*65)*100
  const unitB=allocate(warehouse,[6400,1600])[1]
  assert.equal(p.find(p=>p.id.endsWith(':warehouse-b')).amount,unitB)
  const receiving=p.find(p=>p.id.endsWith(':warehouse-receiving')).amount
  const dispatch=p.filter(p=>p.id.includes(':warehouse-dispatch-')).reduce((n,p)=>n+p.amount,0)
  assert.equal(receiving+dispatch,warehouse-unitB);assert.ok(Math.abs(receiving-dispatch)<=1)
  const transfer=p.filter(p=>p.id.includes('service-offset')).reduce((n,p)=>n+p.amount,0);assert.equal(transfer,0)
  const service=ctsRows.find(r=>r.month===m&&r.unit==='U-S')
  assert.equal(p.find(p=>p.id.endsWith(':service-offset-in')).amount,Math.round(service.sales*.8))
 }
 assert.ok(ctsAllocations.filter(a=>a.method==='retained-corporate').every(a=>ctsRows.find(r=>r.id===a.row).unit==='CORP'))
})
test('unit A reconciles to channel and center populations; corporate has correct denominator',()=>{
 const u=sumCTS(selectCTS('unit',{...all,unit:'U-A'}))
 for(const perspective of ['channel','center']){const s=sumCTS(selectCTS(perspective,all));for(const key of ['sales','cost','margin','expenses','contribution'])assert.equal(s[key],u[key]);assert.equal(s.direct+s.indirect,u.direct)}
 const corpRows=selectCTS('unit',{...all,unit:'CORP'});const total=scopeCTSTotal(corpRows)
 assert.equal(total.sales,0);assert.equal(total.cts,total.expenses/corporateSalesBase([...new Set(corpRows.map(r=>r.month))]));assert.equal(total.contributionRate,null);assert.equal(groupCTS(corpRows,'unit')[0].cts,total.cts);assert.ok(groupCTS(corpRows,'month').every(g=>g.cts!==null))
})
test('all monthly filters and grouping views conserve amounts without rebasing allocations',()=>{
 for(const period of ['all',...Array.from({length:12},(_,i)=>`2025-${String(i+1).padStart(2,'0')}`)]){
  for(const perspective of ['unit','channel','center']){
   const rows=selectCTS(perspective,{...all,period}),summary=sumCTS(rows)
   for(const dim of ['unit','channel','center','month']){const groups=groupCTS(rows,dim);for(const metric of ['sales','cost','margin','expenses','contribution'])assert.equal(groups.reduce((n,g)=>n+g[metric],0),summary[metric])}
   assert.equal(selectedAllocations(rows,perspective).reduce((n,a)=>n+a.amount,0),summary.expenses)
   assert.equal(summary.contribution,summary.margin-summary.expenses)
   assert.equal(summary.marginRate,summary.margin/summary.sales)
  }
  for(const channel of ['all','CH-1','CH-2','CH-3','CH-4','OTHER'])for(const center of ['all','DC-1','DC-2','DC-3','OTHER']){
   const f={...all,period,channel,center};const a=selectCTS('channel',f),b=selectCTS('center',f)
   assert.deepEqual(sumCTS(a),sumCTS(b))
   for(const r of a){const original=selectCTS('channel',all).find(x=>x.id===r.id);assert.deepEqual(r,original)}
  }
 }
 const empty=scopeCTSTotal([]);assert.equal(empty.cts,null);assert.equal(empty.marginRate,null)
})
