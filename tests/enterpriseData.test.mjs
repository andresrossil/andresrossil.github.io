import test from 'node:test'
import assert from 'node:assert/strict'
import {appReducer,initialAppState,truckLines,settlement,attendance} from '../src/enterpriseData.ts'
function ready(){let s=initialAppState();for(const line of truckLines('UNIT-01'))s=appReducer(s,{type:'pick',line:line.id,quantity:line.boxes});s=appReducer(s,{type:'certify',truck:'UNIT-01'});s=appReducer(s,{type:'load',truck:'UNIT-01',confirmed:true});s=appReducer(s,{type:'assign',truck:'UNIT-01',driver:'DR-01',assistant:'AS-01'});return appReducer(s,{type:'inspect',truck:'UNIT-01',tyres:true,condition:true,damage:'None',km:10012})}
test('picking audit rejects mismatches, locks certified lines and releases only certified loading',()=>{
 let s=initialAppState();assert.equal(appReducer(s,{type:'load',truck:'UNIT-01',confirmed:true}),s)
 s=appReducer(s,{type:'certify',truck:'UNIT-01'});assert.equal(s.audits[0].correct,0);assert.equal(s.certified.length,0)
 assert.equal(appReducer(s,{type:'pick',line:'L1',quantity:-1}),s)
 for(const line of truckLines('UNIT-01'))s=appReducer(s,{type:'pick',line:line.id,quantity:line.boxes})
 s=appReducer(s,{type:'certify',truck:'UNIT-01'});assert.deepEqual(s.certified,['UNIT-01']);assert.equal(s.reports.length,1)
 assert.equal(appReducer(s,{type:'pick',line:'L1',quantity:0}),s)
 assert.equal(appReducer(s,{type:'certify',truck:'UNIT-01'}),s)
})
test('assignments support changes, unique operational attendance and prevent double booking',()=>{
 let s=initialAppState();s=appReducer(s,{type:'assign',truck:'UNIT-01',driver:'DR-01',assistant:'AS-01'});assert.equal(attendance(s),2)
 s=appReducer(s,{type:'assign',truck:'UNIT-01',driver:'DR-02',assistant:'AS-01'});assert.equal(attendance(s),2)
 assert.equal(appReducer(s,{type:'assign',truck:'UNIT-02',driver:'DR-02',assistant:'AS-02'}),s)
})
test('delivery requires picking, load, crew, inspection, sequence and rejection reason',()=>{
 const blank=initialAppState();assert.equal(appReducer(blank,{type:'deliver',document:'INV-001',status:'delivered',reason:''}),blank)
 let s=ready();assert.equal(appReducer(s,{type:'deliver',document:'INV-002',status:'delivered',reason:''}),s)
 assert.equal(appReducer(s,{type:'deliver',document:'INV-001',status:'rejected',reason:''}),s)
 assert.equal(appReducer(s,{type:'close',truck:'UNIT-01'}),s)
 s=appReducer(s,{type:'deliver',document:'INV-001',status:'delivered',reason:''});assert.ok(s.deliveries['INV-001'].gps.startsWith('SIM-'))
 s=appReducer(s,{type:'deliver',document:'INV-002',status:'rejected',reason:'Fictional test rejection'})
 const totals=settlement(s,'UNIT-01');assert.equal(totals.invoiced,20500);assert.equal(totals.delivered,12000);assert.equal(totals.returned,8500);assert.equal(totals.delivered+totals.returned,totals.invoiced)
 s=appReducer(s,{type:'close',truck:'UNIT-01'});assert.deepEqual(s.credits,['INV-002']);assert.equal(s.reports.at(-1).kind,'closing')
 assert.equal(appReducer(s,{type:'close',truck:'UNIT-01'}),s);assert.equal(appReducer(s,{type:'assign',truck:'UNIT-01',driver:'DR-02',assistant:'AS-02'}),s)
})
test('inspection and counts validate data, snapshots stay static and counts notify automatically',()=>{
 let s=initialAppState();assert.equal(appReducer(s,{type:'inspect',truck:'UNIT-01',tyres:false,condition:true,damage:'None',km:10012}),s)
 assert.equal(appReducer(s,{type:'count',scope:'all',values:{'SKU-A':-2}}),s)
 assert.equal(appReducer(s,{type:'count',scope:'all',values:{}}),s)
 s=appReducer(s,{type:'count',scope:'Brand A',values:{'SKU-A':39}});assert.equal(s.counts.length,1);assert.equal(s.reports[0].kind,'count');const snapshot=s.reports[0].payload
 s=appReducer(s,{type:'count',scope:'Brand A',values:{'SKU-A':40}});assert.equal(s.reports[0].payload,snapshot)
 assert.deepEqual(appReducer(s,{type:'reset'}),initialAppState())
})
