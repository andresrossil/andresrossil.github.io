// Shared normalized, entirely fictional model. No network integrations or real identities.
export const demoDay = '2025-03-17'
export const appProducts = [
 {id:'SKU-A',category:0,brand:'A',aisle:'01',rack:'FR-01',stock:40},
 {id:'SKU-B',category:1,brand:'B',aisle:'02',rack:'FR-02',stock:30},
 {id:'SKU-C',category:0,brand:'B',aisle:'01',rack:'FR-03',stock:24},
]
export const appTrucks=['UNIT-01','UNIT-02']
export const appPeople=[{id:'DR-01',role:'driver'},{id:'DR-02',role:'driver'},{id:'AS-01',role:'assistant'},{id:'AS-02',role:'assistant'}]
export const appDocuments=[{id:'INV-001',truck:'UNIT-01',stop:1,amount:12000},{id:'INV-002',truck:'UNIT-01',stop:2,amount:8500},{id:'INV-003',truck:'UNIT-02',stop:1,amount:6400},{id:'INV-004',truck:'UNIT-02',stop:2,amount:9200}]
export const appLines=[{id:'L1',document:'INV-001',product:'SKU-A',boxes:8},{id:'L2',document:'INV-001',product:'SKU-B',boxes:4},{id:'L3',document:'INV-002',product:'SKU-C',boxes:6},{id:'L4',document:'INV-003',product:'SKU-A',boxes:3},{id:'L5',document:'INV-004',product:'SKU-B',boxes:5}]
export function truckLines(truck:string){const ids=new Set(appDocuments.filter(d=>d.truck===truck).map(d=>d.id));return appLines.filter(l=>ids.has(l.document))}
export type AppState={picked:Record<string,number>;certified:string[];loaded:string[];audits:{truck:string;correct:number;total:number}[];assignments:Record<string,{driver:string;assistant:string}>;inspections:Record<string,{tyres:boolean;condition:boolean;damage:string;km:number}>;deliveries:Record<string,{status:'delivered'|'rejected';reason:string;gps:string}>;closed:string[];credits:string[];counts:{id:number;scope:string;values:Record<string,number>}[];reports:{id:number;kind:string;unit:string;payload:string}[]}
export const initialAppState=():AppState=>({picked:{},certified:[],loaded:[],audits:[],assignments:{},inspections:{},deliveries:{},closed:[],credits:[],counts:[],reports:[]})
export type AppAction=
 |{type:'pick';line:string;quantity:number}|{type:'certify';truck:string}|{type:'load';truck:string;confirmed:boolean}
 |{type:'assign';truck:string;driver:string;assistant:string}|{type:'inspect';truck:string;tyres:boolean;condition:boolean;damage:string;km:number}
 |{type:'deliver';document:string;status:'delivered'|'rejected';reason:string}
 |{type:'close';truck:string}|{type:'count';scope:string;values:Record<string,number>}|{type:'reset'}
export function settlement(state:AppState,truck:string){const docs=appDocuments.filter(d=>d.truck===truck);return {invoiced:docs.reduce((n,d)=>n+d.amount,0),delivered:docs.filter(d=>state.deliveries[d.id]?.status==='delivered').reduce((n,d)=>n+d.amount,0),returned:docs.filter(d=>state.deliveries[d.id]?.status==='rejected').reduce((n,d)=>n+d.amount,0),rejections:docs.filter(d=>state.deliveries[d.id]?.status==='rejected')}}
export function attendance(state:AppState){return new Set(Object.values(state.assignments).flatMap(a=>[a.driver,a.assistant])).size}
function report(state:AppState,kind:string,unit:string,payload:unknown):AppState{return {...state,reports:[...state.reports,{id:state.reports.length+1,kind,unit,payload:JSON.stringify(payload)}]}}
export function appReducer(state:AppState,action:AppAction):AppState{
 if(action.type==='reset')return initialAppState()
 if(action.type==='pick'){
  const line=appLines.find(l=>l.id===action.line);if(!line||!Number.isInteger(action.quantity)||action.quantity<0)return state
  const doc=appDocuments.find(d=>d.id===line.document)!;if(state.certified.includes(doc.truck))return state
  return {...state,picked:{...state.picked,[action.line]:action.quantity}}
 }
 if(action.type==='count'){
  const entries=Object.entries(action.values);if(!entries.length||entries.some(([id,q])=>!appProducts.some(p=>p.id===id)||!Number.isInteger(q)||q<0))return state
  return report({...state,counts:[...state.counts,{id:state.counts.length+1,scope:action.scope,values:action.values}]},'count',action.scope,action.values)
 }
 if(action.type==='deliver'){
  const doc=appDocuments.find(d=>d.id===action.document);if(!doc||state.closed.includes(doc.truck)||state.deliveries[doc.id]||!state.loaded.includes(doc.truck)||!state.assignments[doc.truck]||!state.inspections[doc.truck])return state
  const earlier=appDocuments.filter(d=>d.truck===doc.truck&&d.stop<doc.stop);if(earlier.some(d=>!state.deliveries[d.id])||(action.status==='rejected'&&!action.reason.trim()))return state
  return {...state,deliveries:{...state.deliveries,[doc.id]:{status:action.status,reason:action.status==='rejected'?action.reason.trim():'',gps:`SIM-GRID-${doc.stop}-${doc.truck.slice(-2)}`}}}
 }
 if(!appTrucks.includes(action.truck))return state
 const truck=action.truck
 if(action.type==='certify'){
  if(state.certified.includes(truck))return state
  const lines=truckLines(truck),correct=lines.filter(l=>state.picked[l.id]===l.boxes).length
  const next={...state,audits:[...state.audits,{truck,correct,total:lines.length}],certified:correct===lines.length?[...state.certified,truck]:state.certified}
  return correct===lines.length?report(next,'picking',truck,{correct,total:lines.length}):next
 }
 if(action.type==='load')return !action.confirmed||!state.certified.includes(truck)||state.loaded.includes(truck)?state:report({...state,loaded:[...state.loaded,truck]},'loading',truck,{documents:appDocuments.filter(d=>d.truck===truck).map(d=>d.id)})
 if(action.type==='assign'){
  if(state.closed.includes(truck)||!appPeople.some(p=>p.id===action.driver&&p.role==='driver')||!appPeople.some(p=>p.id===action.assistant&&p.role==='assistant'))return state
  if(Object.entries(state.assignments).some(([id,a])=>id!==truck&&(a.driver===action.driver||a.assistant===action.assistant)))return state
  return {...state,assignments:{...state.assignments,[truck]:{driver:action.driver,assistant:action.assistant}}}
 }
 if(action.type==='inspect'){
  if(state.closed.includes(truck)||!action.tyres||!action.condition||!Number.isInteger(action.km)||action.km<10000||!action.damage.trim())return state
  return {...state,inspections:{...state.inspections,[truck]:{tyres:action.tyres,condition:action.condition,damage:action.damage.trim(),km:action.km}}}
 }
 if(action.type==='close'){
  const docs=appDocuments.filter(d=>d.truck===truck);if(state.closed.includes(truck)||!state.loaded.includes(truck)||!state.assignments[truck]||!state.inspections[truck]||docs.some(d=>!state.deliveries[d.id]))return state
  const rejected=docs.filter(d=>state.deliveries[d.id]?.status==='rejected').map(d=>d.id)
  return report({...state,closed:[...state.closed,truck],credits:[...state.credits,...rejected]},'closing',truck,{...settlement(state,truck),driver:state.assignments[truck].driver,credits:rejected})
 }
 return state
}
