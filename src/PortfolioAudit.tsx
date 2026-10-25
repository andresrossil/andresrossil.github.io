import './PortfolioAudit.css'
export function CaseNav({language,items}:{language:'ES'|'EN';items:[string,string][]}){
 return <nav className="case-section-nav" aria-label={language==='ES'?'Secciones del caso':'Case sections'}>{items.map(([id,title])=><a key={id} href={`#${id}`} onClick={e=>{e.preventDefault();document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}}>{title}</a>)}<a href="mailto:nestorrossil@hotmail.com">{language==='ES'?'Contacto':'Contact'}</a></nav>
}
export function MetricGuide({language,kind}:{language:'ES'|'EN';kind:'warehouse'|'cts'}){
 const es=language==='ES'
 const rows=kind==='warehouse'?(es?[
 ['Cajas, peso y volumen','Por línea: unidades surtidas / unidades por caja; peso y volumen = cajas equivalentes × peso o volumen de la caja del producto.'],
 ['Documentos y drop','Documentos únicos en cada vista. Drop = cajas, kg o m³ movilizados / documentos únicos.'],
 ['Cumplimiento y no surtido','Cumplimiento = unidades surtidas / solicitadas. No surtidas = solicitadas − surtidas; porcentaje no surtido = no surtidas / solicitadas.'],
 ['Documentos compartidos','Un documento puede incluir líneas de varios preparadores. Se cuenta una vez en cada grupo implicado; los conteos por preparador no se suman para obtener el total.'],
 ['Denominadores sin datos','Los cocientes sin denominador se muestran como —. Las existencias son referencias; no se calcula una recomendación de compra.']
 ]:[
 ['Boxes, weight and volume','Per line: fulfilled units / units per box; weight and volume = box equivalents × product box weight or volume.'],
 ['Documents and drop','Unique documents per view. Drop = moved boxes, kg or m³ / unique documents.'],
 ['Fulfillment and unfulfilled quantities','Fulfillment = fulfilled / requested units. Unfulfilled = requested − fulfilled; unfulfilled rate = unfulfilled / requested.'],
 ['Shared documents','One document may contain lines handled by several preparers. It is counted once in each relevant group; preparer document counts must not be summed to obtain the total.'],
 ['Empty denominators','Ratios with no denominator display —. Stock values are references; no purchase recommendation is calculated.']
 ]):(es?[
 ['Ventas y costo netos','Ventas = ventas brutas − devoluciones − descuentos + servicios. Costo = costo bruto − costo devuelto − descuentos de compra + facturas de servicio + diferencias − provisión.'],
 ['Margen','Margen neto = ventas netas − costo neto. Margen % = margen / ventas netas.'],
 ['Gastos asignados','Suma con signo de gastos directos, indirectos y corporativos del alcance. Se conservan los criterios por operación, superficie, recepción/despacho, ventas y reclasificación de servicios.'],
 ['CTS y contribución','CTS = gastos asignados / ventas netas. Contribución a fijos = margen − gastos asignados; contribución % = contribución / ventas netas. No equivale a utilidad neta.'],
 ['Cambio de alcance','Unidad de negocio incluye Distribución A, Distribución B, servicios y corporativo. Canal y centro muestran solo Distribución A. No se compara el total general con un subconjunto como si fueran el mismo alcance.'],
 ['Clasificación y corporativo','Algunos gastos directos por unidad son indirectos en el detalle por canal/centro; el total de Distribución A se conserva. CTS corporativo usa las ventas totales del negocio de los mismos meses, pues no tiene ventas propias. Ratios con denominador cero: —.'],
 ['Límite de verificación','Las fórmulas mostradas y los criterios disponibles están comprobados. Los cálculos SQL externos que no estaban incluidos en la fuente de referencia siguen pendientes de confirmación.']
 ]:[
 ['Net sales and cost','Sales = gross sales − returns − discounts + services. Cost = gross cost − returned cost − purchase discounts + service invoices + differences − provision.'],
 ['Margin','Net margin = net sales − net cost. Margin % = margin / net sales.'],
 ['Assigned expenses','Signed sum of direct, indirect and corporate expenses within scope. Operation, floor-area, receiving/dispatch, sales and service-reclassification criteria are retained.'],
 ['CTS and contribution','CTS = assigned expenses / net sales. Contribution to fixed costs = margin − assigned expenses; contribution % = contribution / net sales. It is not net profit.'],
 ['Scope changes','Business unit includes Distribution A, Distribution B, services and corporate. Channel and center cover Distribution A only. Overall totals and subsets represent different scopes.'],
 ['Classification and corporate','Some unit-level direct expenses are indirect at channel/center detail; Distribution A totals are conserved. Corporate CTS uses total business sales for the same months because it has no own sales. Ratios with zero denominators: —.'],
 ['Verification limit','Displayed formulas and available allocation criteria are verified. External SQL calculations absent from the reference source remain pending confirmation.']
 ])
 return <details className="metric-guide"><summary>{es?'Indicadores y alcance':'Metrics and scope'}</summary><dl>{rows.map(([title,text])=><div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl></details>
}
