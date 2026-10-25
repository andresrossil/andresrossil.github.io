// Synthetic CTS reconstruction. Original files are read-only references, never imported at runtime.
export type Perspective = 'unit' | 'channel' | 'center'
export type CostKind = 'direct' | 'indirect' | 'corporate'
export type CTSRow = { id:string; month:string; unit:string; channel:string; center:string; sales:number; cost:number }
export type Allocation = { id:string; pool:string; month:string; row:string; category:string; method:string; amount:number; unitKind:CostKind; detailKind:CostKind }
export type CTSFilters = { period:string; unit:string; channel:string; center:string }
export const units = ['U-A','U-B','U-S','CORP']
export const channels = ['CH-1','CH-2','CH-3','CH-4','OTHER']
export const centers = ['DC-1','DC-2','DC-3','OTHER']
export function netSales(gross:number,returns:number,discounts:number,services:number){return gross-returns-discounts+services}
export function netCost(gross:number,returns:number,purchaseDiscount:number,serviceInvoices:number,differences:number,provision:number){return gross-returns-purchaseDiscount+serviceInvoices+differences-provision}
export function ratio(n:number,d:number){return d===0?null:n/d}
// Signed largest-remainder allocation conserves integer cents exactly.
export function allocate(amount:number,weights:number[]):number[]{
 if(!Number.isSafeInteger(amount)||weights.some(w=>!Number.isFinite(w)||w<0))throw new Error('Invalid allocation input')
 const sum=weights.reduce((a,b)=>a+b,0)
 if(sum===0){if(amount!==0)throw new Error('Nonzero pool has no allocation basis');return weights.map(()=>0)}
 const sign=amount<0?-1:1,absolute=Math.abs(amount),raw=weights.map(w=>absolute*w/sum),base=raw.map(Math.floor)
 let remaining=absolute-base.reduce((a,b)=>a+b,0)
 const order=raw.map((v,i)=>({i,remainder:v-base[i]})).sort((a,b)=>b.remainder-a.remainder||a.i-b.i)
 for(const item of order){if(remaining--<=0)break;base[item.i]++}
 return base.map(v=>v*sign)
}
export const ctsRows:CTSRow[]=[]
export const ctsAllocations:Allocation[]=[]
export const ctsPools:{id:string;month:string;amount:number;category:string;method:string}[]=[]
export const sourceInputs:{month:string;unit:string;gross:number;returns:number;discounts:number;services:number;grossCost:number;returnedCost:number;purchaseDiscount:number;serviceInvoices:number;differences:number;provision:number}[]=[]
function addPool(id:string,month:string,amount:number,category:string,method:string,targets:CTSRow[],weights:number[],unitKind:CostKind='direct',detailKind:CostKind='direct'){
 if(!targets.length)throw new Error('No targets')
 const pool=`${month}:${id}`;ctsPools.push({id:pool,month,amount,category,method})
 allocate(amount,weights).forEach((value,i)=>{if(value!==0)ctsAllocations.push({id:`${pool}:${targets[i].id}`,pool,month,row:targets[i].id,category,method,amount:value,unitKind,detailKind})})
}
for(let m=1;m<=12;m++){
 const month=`2025-${String(m).padStart(2,'0')}`
 // Anonymous business units and synthetic monthly source components, all USD cents.
 for(const [index,unit] of ['U-A','U-B','U-S'].entries()){
  const services=unit==='U-S'?(29000+m*731)*100: (700+m*13)*100
  const gross=unit==='U-S'?0:(index===0?390000+m*8471:107000+m*2623)*100
  const returns=Math.round(gross*.022),discounts=Math.round(gross*.018)
  const grossCost=unit==='U-S'?0:Math.round(gross*(index===0?.69:.74))
  const returnedCost=Math.round(returns*.68),purchaseDiscount=unit==='U-S'?0:(600+m*19)*100,serviceInvoices=unit==='U-S'?0:(390+m*7)*100,differences=unit==='U-S'?0:(m%2===0?125:-85)*100,provision=unit==='U-S'?0:(240+m*3)*100
  sourceInputs.push({month,unit,gross,returns,discounts,services,grossCost,returnedCost,purchaseDiscount,serviceInvoices,differences,provision})
  const sales=netSales(gross,returns,discounts,services),cost=netCost(grossCost,returnedCost,purchaseDiscount,serviceInvoices,differences,provision)
  if(unit==='U-A'){
   const cells=[...['DC-1','DC-2','DC-3'].flatMap((center,i)=>['CH-1','CH-2'].map((channel,j)=>({channel,center,weight:150+i*34+j*41+(m%3)*7}))),{channel:'CH-3',center:'OTHER',weight:231+m*2},{channel:'CH-4',center:'OTHER',weight:278-m*2},{channel:'OTHER',center:'OTHER',weight:11}]
   const splitSales=allocate(sales,cells.map(c=>c.weight)),splitCost=allocate(cost,splitSales)
   cells.forEach((cell,i)=>ctsRows.push({id:`${month}:${unit}:${i}`,month,unit,channel:cell.channel,center:cell.center,sales:splitSales[i],cost:splitCost[i]}))
  }else ctsRows.push({id:`${month}:${unit}`,month,unit,channel:'NA',center:'NA',sales,cost})
 }
 const corporate:CTSRow={id:`${month}:CORP`,month,unit:'CORP',channel:'NA',center:'NA',sales:0,cost:0};ctsRows.push(corporate)
 const a=ctsRows.filter(r=>r.month===month&&r.unit==='U-A'),b=ctsRows.find(r=>r.month===month&&r.unit==='U-B')!,service=ctsRows.find(r=>r.month===month&&r.unit==='U-S')!
 // Tagged direct expenses: no sales proration when the operation is known.
 for(const [i,row] of [...a,b,service].entries())addPool(`tagged-${i}`,month,(row.unit==='U-S'?3500+m*43:900+i*95+m*21)*100,'operations','tagged',[row],[1])
 // District management: sales split within served locations, not company-wide.
 const districts=a.filter(r=>r.center!=='OTHER')
 addPool('district-management',month,(4200+m*33)*100,'management','location-sales',districts,districts.map(r=>r.sales))
 // Shared warehouse occupancy: fictional areas replace original site measurements.
 const warehouse=(11000+m*65)*100,areaParts=allocate(warehouse,[6400,1600])
 addPool('warehouse-b',month,areaParts[1],'occupancy','area',[b],[1])
 // Half reception, half dispatch. Corporate/unit totals are not reallocated by UI filters.
 const [receiving,dispatch]=allocate(areaParts[0],[1,1])
 addPool('warehouse-receiving',month,receiving,'occupancy','receiving-share',a,a.map(r=>r.sales),'direct','indirect')
 const channelWeights=['CH-3','CH-4','transfer'].map(c=>a.filter(r=>c==='transfer'?!['CH-3','CH-4'].includes(r.channel):r.channel===c).reduce((n,r)=>n+r.sales,0))
 // Synthetic supplier-direct shipments excluded from the transfer driver only.
 channelWeights[2]=Math.max(0,channelWeights[2]-(17000+m*115)*100)
 const dispatchParts=allocate(dispatch,channelWeights)
 ;['CH-3','CH-4','transfer'].forEach((c,i)=>{const group=a.filter(r=>c==='transfer'?!['CH-3','CH-4'].includes(r.channel):r.channel===c);addPool(`warehouse-dispatch-${i}`,month,dispatchParts[i],'occupancy','dispatch-sales',group,group.map(r=>r.sales))})
 addPool('support',month,(9100+m*47)*100,'support','scoped-sales',a,a.map(r=>r.sales),'direct','indirect')
 // Dedicated freight tagged to wholesale and modern channels; no unrelated recipients.
 for(const channel of ['CH-3','CH-4']){const group=a.filter(r=>r.channel===channel);addPool(`freight-${channel}`,month,(2900+(channel==='CH-4'?800:0)+m*23)*100,'distribution','tagged',group,group.map(()=>1))}
 // Documented service-expense reclassification: 80% service revenue moved from unit A to services.
 const offset=Math.round(service.sales*.8)
 addPool('service-offset-out',month,-offset,'service-transfer','service-offset',a,a.map(r=>r.sales))
 addPool('service-offset-in',month,offset,'service-transfer','service-offset',[service],[1])
 // Corporate has no revenue: retain separately, use total revenue for its CTS, no invented spread.
 addPool('corporate',month,(16500+m*83)*100,'corporate','retained-corporate',[corporate],[1],'corporate','corporate')
}
export type CTSResult=CTSRow&{direct:number;indirect:number;corporate:number;expenses:number;margin:number;contribution:number}
export function modelRows(perspective:Perspective):CTSResult[]{
 const expenses=new Map<string,{direct:number;indirect:number;corporate:number}>()
 for(const a of ctsAllocations){const values=expenses.get(a.row)??{direct:0,indirect:0,corporate:0};values[perspective==='unit'?a.unitKind:a.detailKind]+=a.amount;expenses.set(a.row,values)}
 // Channel/centre detail is the distribution unit's scope, as in the documented model.
 return ctsRows.filter(r=>perspective==='unit'||r.unit==='U-A').map(r=>{const costs=expenses.get(r.id)??{direct:0,indirect:0,corporate:0};const total=costs.direct+costs.indirect+costs.corporate;return {...r,...costs,expenses:total,margin:r.sales-r.cost,contribution:r.sales-r.cost-total}})
}
export function selectCTS(perspective:Perspective,filters:CTSFilters){return modelRows(perspective).filter(r=>(filters.period==='all'||r.month===filters.period)&&(perspective!=='unit'||filters.unit==='all'||r.unit===filters.unit)&&(perspective==='unit'||filters.channel==='all'||r.channel===filters.channel)&&(perspective==='unit'||filters.center==='all'||r.center===filters.center))}
export function sumCTS(rows:CTSResult[]){
 const totals=rows.reduce((a,r)=>({sales:a.sales+r.sales,cost:a.cost+r.cost,direct:a.direct+r.direct,indirect:a.indirect+r.indirect,corporate:a.corporate+r.corporate,expenses:a.expenses+r.expenses,margin:a.margin+r.margin,contribution:a.contribution+r.contribution}),{sales:0,cost:0,direct:0,indirect:0,corporate:0,expenses:0,margin:0,contribution:0})
 return {...totals,marginRate:ratio(totals.margin,totals.sales),cts:ratio(totals.expenses,totals.sales),contributionRate:ratio(totals.contribution,totals.sales)}
}
export function groupCTS(rows:CTSResult[],key:'unit'|'channel'|'center'|'month') {return [...new Set(rows.map(r=>r[key]))].map(id=>({id,...scopeCTSTotal(rows.filter(r=>r[key]===id))}))}
export function selectedAllocations(rows:CTSResult[],perspective:Perspective){const ids=new Set(rows.map(r=>r.id));return ctsAllocations.filter(a=>ids.has(a.row)).map(a=>({...a,kind:perspective==='unit'?a.unitKind:a.detailKind}))}

// Corporate has no revenue of its own; its CTS uses total business sales for the same months.
export function corporateSalesBase(months:string[]){return ctsRows.filter(r=>months.includes(r.month)&&r.unit!=='CORP').reduce((n,r)=>n+r.sales,0)}
export function scopeCTSTotal(rows:CTSResult[]){const totals=sumCTS(rows);return {...totals,cts:totals.sales===0&&rows.length>0&&rows.every(r=>r.unit==='CORP')?ratio(totals.expenses,corporateSalesBase([...new Set(rows.map(r=>r.month))])):totals.cts}}
