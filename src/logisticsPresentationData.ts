export const auditRows = [
 {sku:'SKU-001',theoretical:12,physical:11},
 {sku:'SKU-002',theoretical:8,physical:8},
 {sku:'SKU-003',theoretical:6,physical:6},
 {sku:'SKU-004',theoretical:10,physical:10},
]
export const invoices = [
 {id:'FC-1001',client:'C-001',amount:2400,status:'delivered'},
 {id:'FC-1002',client:'C-002',amount:1800,status:'returned'},
 {id:'FC-1003',client:'C-003',amount:3200,status:'delivered'},
]
export const freight = {id:'PF-0104',cost:592,sales:7400,route:'RT-014',truck:'CAM-014'}
export const auditExactness=100*auditRows.filter(r=>r.theoretical===r.physical).length/auditRows.length
export const delivered=invoices.filter(r=>r.status==='delivered').reduce((s,r)=>s+r.amount,0)
export const returned=invoices.filter(r=>r.status==='returned').reduce((s,r)=>s+r.amount,0)
