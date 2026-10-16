export type DemoOrder = { id: string; month: string; region: number; category: number; sales: number; cost: number }
export type DemoFilters = { period: string; region: string; category: string; search: string }
// Deterministic synthetic orders. Monetary values are integer USD cents.
export const demoOrders: DemoOrder[] = []
for (let year = 2024; year <= 2025; year++) {
  for (let month = 1; month <= 12; month++) {
    for (let region = 0; region < 3; region++) {
      for (let category = 0; category < 3; category++) {
        for (let order = 0; order < 2; order++) {
          const sales = (900 + month * 43 + region * 137 + category * 211 + order * 89 + (year - 2024) * 175) * 100
          demoOrders.push({ id: `DEMO-${year}-${String(month).padStart(2, '0')}-${region}${category}${order}`, month: `${year}-${String(month).padStart(2, '0')}`, region, category, sales, cost: Math.round(sales * (0.58 + category * 0.05 + region * 0.02)) })
        }
      }
    }
  }
}
export const demoLabels = {
  EN: { regions: ['North', 'Central', 'South'], categories: ['Equipment', 'Supplies', 'Services'] },
  ES: { regions: ['Norte', 'Centro', 'Sur'], categories: ['Equipos', 'Suministros', 'Servicios'] },
}
export function periodMonths(period: string, previous = false): string[] {
  let year = 2025
  let start = period === 'year' ? 1 : (Number(period.slice(1)) - 1) * 3 + 1
  const length = period === 'year' ? 12 : 3
  if (previous) {
    start -= length
    if (start < 1) { year--; start += 12 }
  }
  return Array.from({ length }, (_, index) => `${year}-${String(start + index).padStart(2, '0')}`)
}
export function selectOrders(orders: DemoOrder[], filters: DemoFilters, previous = false): DemoOrder[] {
  const months = new Set(periodMonths(filters.period, previous))
  const query = filters.search.trim().toLocaleLowerCase()
  return orders.filter(row => months.has(row.month)
    && (filters.region === 'all' || row.region === Number(filters.region))
    && (filters.category === 'all' || row.category === Number(filters.category))
    && (!query || `${row.id} ${demoLabels.EN.regions[row.region]} ${demoLabels.ES.regions[row.region]} ${demoLabels.EN.categories[row.category]} ${demoLabels.ES.categories[row.category]}`.toLocaleLowerCase().includes(query)))
}
export function summarize(orders: DemoOrder[]) {
  const sales = orders.reduce((sum, row) => sum + row.sales, 0)
  const cost = orders.reduce((sum, row) => sum + row.cost, 0)
  return { sales, cost, orders: orders.length, profit: sales - cost, margin: sales ? (sales - cost) / sales : null }
}
export function salesChange(current: number, previous: number) { return previous ? (current - previous) / previous : null }
