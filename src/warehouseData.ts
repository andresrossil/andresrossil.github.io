export const warehouseProducts = [
  { id: 'SKU-01', brand: 'A', supplier: '01', unitsPerBox: 12, boxKg: 8, boxM3: 0.025, stockUnits: 96 },
  { id: 'SKU-02', brand: 'A', supplier: '02', unitsPerBox: 6, boxKg: 10, boxM3: 0.04, stockUnits: 30 },
  { id: 'SKU-03', brand: 'B', supplier: '01', unitsPerBox: 24, boxKg: 6, boxM3: 0.018, stockUnits: 144 },
  { id: 'SKU-04', brand: 'B', supplier: '03', unitsPerBox: 8, boxKg: 12, boxM3: 0.05, stockUnits: 16 },
  { id: 'SKU-05', brand: 'C', supplier: '02', unitsPerBox: 10, boxKg: 7, boxM3: 0.03, stockUnits: 60 },
  { id: 'SKU-06', brand: 'C', supplier: '03', unitsPerBox: 4, boxKg: 9, boxM3: 0.035, stockUnits: 12 },
]
export type WarehouseLine = { document: string; date: string; product: string; picker: string; requested: number; fulfilled: number }
export const warehouseLines: WarehouseLine[] = []
for (let month = 1; month <= 3; month++) {
  for (let doc = 1; doc <= 20; doc++) {
    for (let item = 0; item < 3; item++) {
      const product = warehouseProducts[(doc + item + month) % 6]
      const requested = (2 + (doc + item) % 7) * product.unitsPerBox
      const missing = (doc + item + month) % 5 === 0 ? Math.min(requested, product.unitsPerBox * (1 + doc % 2)) : 0
      warehouseLines.push({ document: `WH-${month}-${String(doc).padStart(3, '0')}`, date: `2025-${String(month).padStart(2, '0')}-${String(doc).padStart(2, '0')}`, product: product.id, picker: `P-${1 + (doc + item) % 3}`, requested, fulfilled: requested - missing })
    }
  }
}
export type WarehouseFilters = { month: string; picker: string; product: string; brand: string; supplier: string; search: string; start?: string; end?: string }
export function productFor(id: string) {
  const product = warehouseProducts.find(item => item.id === id)
  if (!product) throw new Error(`Unknown synthetic product: ${id}`)
  return product
}
export function warehouseSelect(lines: WarehouseLine[], filters: WarehouseFilters) {
  const query = filters.search.trim().toLowerCase()
  return lines.filter(line => {
    const product = productFor(line.product)
    return (!filters.start || line.date >= filters.start) && (!filters.end || line.date <= filters.end)
      && (filters.month === 'all' || line.date.slice(5, 7) === filters.month)
      && (filters.picker === 'all' || line.picker === filters.picker)
      && (filters.product === 'all' || line.product === filters.product)
      && (filters.brand === 'all' || product.brand === filters.brand)
      && (filters.supplier === 'all' || product.supplier === filters.supplier)
      && (!query || `${line.document} ${line.product} ${line.picker}`.toLowerCase().includes(query))
  })
}
export function warehouseSummary(lines: WarehouseLine[]) {
  const requested = lines.reduce((sum, line) => sum + line.requested, 0)
  const fulfilled = lines.reduce((sum, line) => sum + line.fulfilled, 0)
  const documents = new Set(lines.map(line => line.document)).size
  const boxes = lines.reduce((sum, line) => sum + line.fulfilled / productFor(line.product).unitsPerBox, 0)
  const kg = lines.reduce((sum, line) => sum + line.fulfilled / productFor(line.product).unitsPerBox * productFor(line.product).boxKg, 0)
  const m3 = lines.reduce((sum, line) => sum + line.fulfilled / productFor(line.product).unitsPerBox * productFor(line.product).boxM3, 0)
  const missingBoxes = lines.reduce((sum, line) => sum + (line.requested - line.fulfilled) / productFor(line.product).unitsPerBox, 0)
  return { requested, fulfilled, missing: requested - fulfilled, documents, boxes, kg, m3, missingBoxes, cut: requested ? (requested - fulfilled) / requested : null, fulfillment: requested ? fulfilled / requested : null, dropBoxes: documents ? boxes / documents : null, dropKg: documents ? kg / documents : null, dropM3: documents ? m3 / documents : null }
}
export function warehouseGroups(lines: WarehouseLine[], key: (line: WarehouseLine) => string) {
  const groups = new Map<string, WarehouseLine[]>()
  for (const line of lines) { const id = key(line); groups.set(id, [...(groups.get(id) ?? []), line]) }
  return [...groups].map(([id, rows]) => ({ id, ...warehouseSummary(rows) }))
}
