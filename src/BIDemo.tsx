import { useId, useMemo, useState } from 'react'
import { demoLabels, demoOrders, periodMonths, salesChange, selectOrders, summarize } from './demoData'

const copy = {
  EN: { title: 'Interactive BI Demo', subtitle: 'Sales & Operations', note: 'Web demonstration inspired by professional BI experience. All orders and amounts are synthetic. This is not an Arium system or an embedded Power BI report.', period: 'Period', region: 'Region', category: 'Category', all: 'All', annual: 'Full year 2025', quarter: 'Quarter', sales: 'Sales', orders: 'Orders', margin: 'Gross margin', change: 'Sales vs previous period', monthly: 'Monthly sales', distribution: 'Sales by category', detail: 'Order detail', search: 'Search orders, regions or categories', reset: 'Reset filters', id: 'Order', month: 'Month', cost: 'Cost', profit: 'Gross profit', empty: 'No orders match the filters.', na: 'N/A', compare: 'Previous period', basis: 'Gross margin = (sales − cost) / sales. Comparison uses the preceding quarter or preceding year with the same filters and search. N/A indicates a zero comparison base or no sales for margin.', matches: 'matching orders', currency: 'USD · Fictional data', tableNote: 'Search applies to KPIs, both charts, detail and previous-period comparison. Amounts are in USD.' },
  ES: { title: 'Demostración interactiva de BI', subtitle: 'Ventas y operaciones', note: 'Demostración web inspirada en la experiencia profesional en BI. Todos los pedidos e importes son sintéticos. No es un sistema de Arium ni un reporte Power BI integrado.', period: 'Periodo', region: 'Región', category: 'Categoría', all: 'Todas', annual: 'Año completo 2025', quarter: 'Trimestre', sales: 'Ventas', orders: 'Pedidos', margin: 'Margen bruto', change: 'Ventas frente al periodo anterior', monthly: 'Ventas mensuales', distribution: 'Ventas por categoría', detail: 'Detalle de pedidos', search: 'Buscar pedidos, regiones o categorías', reset: 'Restablecer filtros', id: 'Pedido', month: 'Mes', cost: 'Costo', profit: 'Utilidad bruta', empty: 'No hay pedidos que coincidan con los filtros.', na: 'N/D', compare: 'Periodo anterior', basis: 'Margen bruto = (ventas − costo) / ventas. La comparación usa el trimestre o año anterior con los mismos filtros y búsqueda. N/D indica una base de comparación igual a cero o ventas inexistentes para el margen.', matches: 'pedidos coincidentes', currency: 'USD · Datos ficticios', tableNote: 'La búsqueda se aplica a KPIs, ambas gráficas, detalle y comparación con el periodo anterior. Importes en USD.' },
}
export default function BIDemo({ language }: { language: 'EN' | 'ES' }) {
  const [period, setPeriod] = useState('year')
  const [region, setRegion] = useState('all')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const uid = useId()
  const t = copy[language]
  const labels = demoLabels[language]
  const locale = language === 'EN' ? 'en-US' : 'es-GT'
  const money = (cents: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100)
  const preciseMoney = (cents: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(cents / 100)
  const percent = (value: number | null) => value === null ? t.na : new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }).format(value)
  const monthLabel = (month: string) => new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month}-01T00:00:00Z`))
  const filters = useMemo(() => ({ period, region, category, search }), [period, region, category, search])
  const rows = useMemo(() => selectOrders(demoOrders, filters), [filters])
  const previousRows = useMemo(() => selectOrders(demoOrders, filters, true), [filters])
  const current = summarize(rows)
  const previous = summarize(previousRows)
  const change = salesChange(current.sales, previous.sales)
  const months = periodMonths(period)
  const monthly = months.map(month => ({ month, sales: rows.filter(row => row.month === month).reduce((sum, row) => sum + row.sales, 0) }))
  const categories = labels.categories.map((label, index) => ({ label, sales: rows.filter(row => row.category === index).reduce((sum, row) => sum + row.sales, 0) }))
  const maxMonth = Math.max(1, ...monthly.map(item => item.sales))
  const comparisonMonths = periodMonths(period, true)
  return (
    <section className="bi-demo" id="interactive-bi-demo" aria-labelledby={`${uid}-title`}>
      <p className="eyebrow">{t.currency}</p><h2 id={`${uid}-title`}>{t.title}</h2><h3>{t.subtitle}</h3>
      <p className="demo-notice">{t.note}</p>
      <div className="demo-filters">
        <label>{t.period}<select value={period} onChange={event => setPeriod(event.target.value)}><option value="year">{t.annual}</option>{[1, 2, 3, 4].map(q => <option key={q} value={`q${q}`}>{t.quarter} {q} · 2025</option>)}</select></label>
        <label>{t.region}<select value={region} onChange={event => setRegion(event.target.value)}><option value="all">{t.all}</option>{labels.regions.map((label, index) => <option key={index} value={index}>{label}</option>)}</select></label>
        <label>{t.category}<select value={category} onChange={event => setCategory(event.target.value)}><option value="all">{t.all}</option>{labels.categories.map((label, index) => <option key={index} value={index}>{label}</option>)}</select></label>
        <button type="button" className="secondary" onClick={() => { setPeriod('year'); setRegion('all'); setCategory('all'); setSearch('') }}>{t.reset}</button>
      </div>
      <div className="demo-kpis" aria-live="polite">
        {[{ label: t.sales, value: preciseMoney(current.sales) }, { label: t.orders, value: current.orders.toLocaleString(locale) }, { label: t.margin, value: percent(current.margin) }, { label: t.change, value: `${change !== null && change > 0 ? '+' : ''}${percent(change)}` }].map(kpi => <div key={kpi.label}><span>{kpi.label}</span><strong>{kpi.value}</strong></div>)}
      </div>
      <p className="demo-method">{t.compare}: {monthLabel(comparisonMonths[0])} – {monthLabel(comparisonMonths.at(-1)!)} · {preciseMoney(previous.sales)}. {t.basis}</p>
      <div className="demo-charts">
        <section className="demo-chart" aria-label={t.monthly}><h3>{t.monthly}</h3><div className="monthly-chart">{monthly.map(item => <div className="monthly-column" key={item.month}><span className="chart-value">{money(item.sales)}</span><div className="monthly-track"><div className="monthly-bar" style={{ height: `${item.sales / maxMonth * 100}%` }} /></div><span>{monthLabel(item.month)}</span></div>)}</div></section>
        <section className="demo-chart" aria-label={t.distribution}><h3>{t.distribution}</h3>{categories.map(item => <div className="category-bar" key={item.label}><div><span>{item.label}</span><strong>{preciseMoney(item.sales)} · {percent(current.sales ? item.sales / current.sales : 0)}</strong></div><div className="category-track"><div style={{ width: `${current.sales ? item.sales / current.sales * 100 : 0}%` }} /></div></div>)}</section>
      </div>
      <h3>{t.detail}</h3><label className="demo-search">{t.search}<input type="search" value={search} onChange={event => setSearch(event.target.value)} /></label><p className="demo-method">{t.tableNote}</p>
      <p aria-live="polite">{rows.length} {t.matches}</p>
      <div className="demo-table-wrap" role="region" aria-label={t.detail} tabIndex={0}><table><caption className="sr-only">{t.detail} · {t.currency}</caption><thead><tr>{[t.id, t.month, t.region, t.category, t.sales, t.cost, t.profit].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.id}><th scope="row">{row.id}</th><td>{monthLabel(row.month)}</td><td>{labels.regions[row.region]}</td><td>{labels.categories[row.category]}</td><td>{preciseMoney(row.sales)}</td><td>{preciseMoney(row.cost)}</td><td>{preciseMoney(row.sales - row.cost)}</td></tr>)}</tbody><tfoot><tr><th colSpan={4} scope="row">{t.sales} · {rows.length} {t.orders}</th><td>{preciseMoney(current.sales)}</td><td>{preciseMoney(current.cost)}</td><td>{preciseMoney(current.profit)}</td></tr></tfoot></table></div>
      {rows.length === 0 && <p role="status">{t.empty}</p>}
    </section>
  )
}
