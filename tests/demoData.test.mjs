import test from 'node:test'
import assert from 'node:assert/strict'
import { demoOrders, periodMonths, selectOrders, summarize, salesChange } from '../src/demoData.ts'
const all = { period: 'year', region: 'all', category: 'all', search: '' }
test('synthetic orders are unique and financially coherent', () => {
  assert.equal(demoOrders.length, 432)
  assert.equal(new Set(demoOrders.map(row => row.id)).size, 432)
  for (const row of demoOrders) {
    assert.ok(Number.isInteger(row.sales) && Number.isInteger(row.cost))
    assert.ok(row.sales > row.cost && row.cost > 0)
  }
})
test('known financial fixture and zero base', () => {
  const result = summarize([{ sales: 10000, cost: 6000 }, { sales: 20000, cost: 15000 }])
  assert.deepEqual(result, { sales: 30000, cost: 21000, orders: 2, profit: 9000, margin: 0.3 })
  assert.equal(salesChange(12000, 10000), 0.2)
  assert.equal(salesChange(0, 10000), -1)
  assert.equal(salesChange(10000, 0), null)
  assert.equal(summarize([]).margin, null)
})
test('comparison periods cross year boundaries correctly', () => {
  assert.deepEqual(periodMonths('q1', true), ['2024-10', '2024-11', '2024-12'])
  assert.deepEqual(periodMonths('q4', true), ['2025-07', '2025-08', '2025-09'])
  assert.equal(periodMonths('year', true)[0], '2024-01')
  assert.equal(periodMonths('year', true).at(-1), '2024-12')
})
test('all period, region and category combinations reconcile with detail and charts', () => {
  for (const period of ['year', 'q1', 'q2', 'q3', 'q4']) {
    for (const region of ['all', '0', '1', '2']) {
      for (const category of ['all', '0', '1', '2']) {
        const filters = { ...all, period, region, category }
        const rows = selectOrders(demoOrders, filters)
        const expected = (period === 'year' ? 12 : 3) * (region === 'all' ? 3 : 1) * (category === 'all' ? 3 : 1) * 2
        assert.equal(rows.length, expected)
        assert.equal(selectOrders(demoOrders, filters, true).length, expected)
        const summary = summarize(rows)
        const monthlyTotal = periodMonths(period).reduce((sum, month) => sum + summarize(rows.filter(row => row.month === month)).sales, 0)
        const categoryTotal = [0, 1, 2].reduce((sum, cat) => sum + summarize(rows.filter(row => row.category === cat)).sales, 0)
        assert.equal(summary.sales, monthlyTotal)
        assert.equal(summary.sales, categoryTotal)
        assert.equal(summary.profit, summary.sales - summary.cost)
      }
    }
  }
})
test('bilingual search and empty states apply to current and comparison data', () => {
  assert.equal(selectOrders(demoOrders, { ...all, search: 'north' }).length, 72)
  assert.equal(selectOrders(demoOrders, { ...all, search: 'norte' }).length, 72)
  assert.equal(selectOrders(demoOrders, { ...all, search: 'norte' }, true).length, 72)
  assert.equal(selectOrders(demoOrders, { ...all, search: 'DEMO-2025-01-000' }).length, 1)
  assert.equal(selectOrders(demoOrders, { ...all, search: 'no-such-order' }).length, 0)
})
