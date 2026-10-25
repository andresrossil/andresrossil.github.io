import test from 'node:test'
import assert from 'node:assert/strict'
import {auditRows,auditExactness,invoices,freight,delivered,returned} from '../src/logisticsPresentationData.ts'
test('presentation audit exactness and differences reconcile',()=>{
 assert.equal(auditRows.length,4)
 assert.equal(auditExactness,75)
 assert.equal(auditRows.reduce((s,r)=>s+r.physical-r.theoretical,0),-1)
})
test('delivery settlement conserves invoice totals and freight CTS is consistent',()=>{
 assert.equal(delivered+returned,invoices.reduce((s,r)=>s+r.amount,0))
 assert.equal(freight.sales,delivered+returned)
 assert.equal(returned,1800)
 assert.equal(100*freight.cost/freight.sales,8)
 assert.equal(new Set(invoices.map(r=>r.id)).size,invoices.length)
})
