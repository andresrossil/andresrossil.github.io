import { useRef, useState } from 'react'
import images from './ilosImages.json'
import WarehousePreview from './WarehousePreview'
import './LogisticsCase.css'

const content = {
 EN: {
  eyebrow: 'BUSINESS APPLICATIONS · CASE STUDY', back: 'Back to projects',
  intro: 'Four independent Power Apps applications supporting warehouse execution, inventory and route auditing, transport expenses, and delivery settlement through shared operational information in SQL Server.',
  roleTitle: 'My responsibilities',
  role: 'I developed the Power Apps applications and the SQL Server layer. I defined the integration requirements for APIs implemented by third-party developers. Roadnet was the external route-planning system.',
  architecture: 'Shared architecture', architectureNote: 'Conceptual view of the confirmed components and responsibilities; connections do not describe specific endpoints or imply direct database access to SAP.',
  sql: 'Shared SQL Server layer', sqlText: 'Operational information shared across the four applications. Database development and application logic were part of my responsibilities.',
  api: 'Integration APIs', apiText: 'Developed by third parties under integration requirements that I defined.',
  sap: 'SAP Business One', sapText: 'ERP integration within the operational workflow.',
  roadnet: 'Roadnet', roadnetText: 'External route planning; separate from the applications I developed.',
  flow: 'Operational workflow', steps: ['Warehouse execution', 'Review and correction', 'Route execution', 'Returns and settlement'],
  expenseFlow: 'Transport expense requests and authorizations support the logistics operation as a separate workflow.',
  gallery: 'Application screens', imageNote: 'Warehouse is presented as a visual recreation with fictional data. Other application screens are from the original development environment. Empty fields and editor indicators are retained. The approval screen is a redacted derivative; these images do not demonstrate live system execution.',
  close: 'Close image', enlarge: 'Enlarge', redacted: 'Redacted for confidentiality',
  scopeTitle: 'Scope and deliverables',
  scope: 'Four business applications, a shared SQL Server layer and integration requirements for the external API developers. The case presents functional scope and interface evidence, without unverified impact metrics.',
  apps: [
   {id:'warehouse',title:'Warehouse Operations',text:'Picking by dispatch unit and category, organized around the physical warehouse and flow racks. Wall-to-Wall counts can cover the warehouse or a selected brand and aisle. Review and correction support the picking and loading process.',caps:['Wall-to-Wall count by location and SKU','Picking quantities in cases, packs and units','Truck correction: picking, physical quantity and difference']},
   {id:'auditing',title:'Inventory & Route Auditing',text:'Review of selected and loaded quantities, recounts, SKU confirmation and differences. The scope includes picking and loading certification, daily audit indicators and operational reports.',caps:['Load review and quantity validation','Recount and theoretical versus physical comparison','SKU confirmation and quantity registration']},
   {id:'freight',title:'Freight Management',text:'Transport expense management through pro forma requests and an authorization workflow. Forms collect the reason, dates, provider, cost and operational references; reviewers can approve or reject the request.',caps:['Transport expense request','Pro forma review and authorization']},
   {id:'delivery',title:'Route Delivery & Settlement',text:'Daily driver and assistant assignment, vehicle inspection, load manifest and delivery sequence. Delivery or rejection is recorded by document, with location capture, returns review and end-of-day settlement. The operational scope also includes credit-note processing and closing reports.',caps:['Route start and progress','Document delivery and return status','Complete return: general information, photo and reason','Route closing and return consolidation']}
  ]
 },
 ES: {
  eyebrow: 'APLICACIONES EMPRESARIALES · CASO DE ESTUDIO', back: 'Volver a proyectos',
  intro: 'Cuatro aplicaciones independientes en Power Apps para ejecución de almacén, auditoría de inventario y rutas, gastos de transporte y liquidación de entregas, con información operativa compartida en SQL Server.',
  roleTitle: 'Mi participación',
  role: 'Desarrollé las aplicaciones Power Apps y la capa SQL Server. Definí los requerimientos de integración para las API programadas por desarrolladores externos. Roadnet era el sistema externo de planificación de rutas.',
  architecture: 'Arquitectura compartida', architectureNote: 'Vista conceptual de los componentes y responsabilidades confirmados; las conexiones no describen endpoints específicos ni implican acceso directo a la base de SAP.',
  sql: 'Capa compartida SQL Server', sqlText: 'Información operativa compartida por las cuatro aplicaciones. El desarrollo de base de datos y la lógica de las aplicaciones formaron parte de mis responsabilidades.',
  api: 'API de integración', apiText: 'Programadas por terceros bajo los requerimientos de integración que definí.',
  sap: 'SAP Business One', sapText: 'Integración ERP dentro del flujo operativo.',
  roadnet: 'Roadnet', roadnetText: 'Planificación externa de rutas, separada de las aplicaciones que desarrollé.',
  flow: 'Flujo operativo', steps: ['Ejecución de almacén', 'Revisión y corrección', 'Ejecución de ruta', 'Devoluciones y liquidación'],
  expenseFlow: 'Las solicitudes y autorizaciones de gastos de transporte apoyan la operación logística mediante un flujo independiente.',
  gallery: 'Pantallas de las aplicaciones', imageNote: 'Warehouse se presenta como recreación visual con datos ficticios. Las demás capturas corresponden al entorno de desarrollo original. Se conservan los campos vacíos e indicadores del editor. La autorización es una copia anonimizada; las imágenes no demuestran una ejecución del sistema en producción.',
  close: 'Cerrar imagen', enlarge: 'Ampliar', redacted: 'Anonimizada por confidencialidad',
  scopeTitle: 'Alcance y entregables',
  scope: 'Cuatro aplicaciones empresariales, una capa SQL Server compartida y requerimientos de integración para los desarrolladores externos de API. El caso presenta alcance funcional y evidencia de interfaz, sin métricas de impacto no verificadas.',
  apps: [
   {id:'warehouse',title:'Warehouse Operations',text:'Picking por unidad de despacho y categoría, asociado a la distribución física del almacén y flow racks. Conteos Wall-to-Wall completos o segmentados por marca y pasillo. Revisión y corrección como apoyo al proceso de picking y carga.',caps:['Conteo Wall-to-Wall por ubicación y SKU','Picking en cajas, paquetes y unidades','Corrección por camión: picking, físico y diferencia']},
   {id:'auditing',title:'Inventory & Route Auditing',text:'Revisión de cantidades seleccionadas y cargadas, reconteos, confirmación de SKU y diferencias. El alcance comprende certificación de picking y carga, indicadores de auditoría diaria y reportes operativos.',caps:['Revisión de carga y validación de cantidades','Reconteo y comparación teórico/físico','Confirmación de SKU y registro de cantidades']},
   {id:'freight',title:'Freight Management',text:'Gestión de gastos de transporte mediante solicitudes de proforma y un flujo de autorización. Los formularios recogen motivo, fechas, proveedor, costo y referencias operativas; la revisión permite aprobar o rechazar la solicitud.',caps:['Ingreso de gasto de transporte','Revisión y autorización de proforma']},
   {id:'delivery',title:'Route Delivery & Settlement',text:'Asignación diaria de piloto y auxiliar, inspección del vehículo, manifiesto de carga y secuencia de entrega. Registro de entrega o rechazo por documento, captura de ubicación, revisión de devoluciones y liquidación diaria. El alcance operativo incluye gestión de notas de crédito y reportes de cierre.',caps:['Inicio y avance de ruta','Entrega de documentos y estado de devolución','Devolución completa: información general, foto y motivo','Fin de ruta y consolidado de devoluciones']}
  ]
 }
}
export default function LogisticsCase({language}:{language:'EN'|'ES'}) {
 const t=content[language]
 const [active,setActive]=useState<{src:string;caption:string}|null>(null)
 const dialog=useRef<HTMLDialogElement>(null)
 const show=(src:string,caption:string)=>{setActive({src,caption});dialog.current?.showModal()}
 return <section className="content project-detail ilos">
  <a className="back-projects" href="#proyectos">← {t.back}</a>
  <p className="eyebrow">{t.eyebrow}</p><h1>Integrated Logistics Operations Suite</h1>
  <p className="section-description">{t.intro}</p>
  <div className="project-technologies">{['Power Apps','SQL Server','SAP Business One','APIs','Roadnet'].map(x=><span key={x}>{x}</span>)}</div>
  <nav className="ilos-nav" aria-label={t.gallery}>{t.apps.map(a=><a href={`#ilos-${a.id}`} key={a.id} onClick={e=>{e.preventDefault();document.getElementById(`ilos-${a.id}`)?.scrollIntoView({behavior:'smooth'})}}>{a.title}</a>)}</nav>
  <section className="ilos-role"><h2>{t.roleTitle}</h2><p>{t.role}</p></section>
  <section aria-labelledby="ilos-architecture"><h2 id="ilos-architecture">{t.architecture}</h2><p>{t.architectureNote}</p>
   <div className="ilos-app-layer">{t.apps.map(a=><div key={a.id}><strong>{a.title}</strong><small>Power Apps</small></div>)}</div>
   <div className="ilos-connector" aria-hidden="true">↕</div>
   <div className="ilos-sql"><h3>{t.sql}</h3><p>{t.sqlText}</p></div>
   <div className="ilos-connector" aria-hidden="true">↕</div>
   <div className="ilos-integration"><div><h3>{t.api}</h3><p>{t.apiText}</p></div><div><h3>{t.sap}</h3><p>{t.sapText}</p></div><div><h3>{t.roadnet}</h3><p>{t.roadnetText}</p></div></div>
  </section>
  <section><h2>{t.flow}</h2><ol className="ilos-flow">{t.steps.map(s=><li key={s}>{s}</li>)}</ol><p>{t.expenseFlow}</p></section>
  <section><h2>{t.gallery}</h2><p>{t.imageNote}</p></section>
  {t.apps.map(app=><section className="ilos-module" id={`ilos-${app.id}`} key={app.id}><p className="eyebrow">POWER APPS</p><h2>{app.title}</h2><p>{app.text}</p>{app.id==='warehouse'?<WarehousePreview language={language}/>:<div className="ilos-gallery">{images.filter(i=>i.group===app.id).map((i,n)=>{const src=`/ilos/${i.file}`;return <figure key={src}><button className="ilos-image-button" onClick={()=>show(src,app.caps[n])} aria-label={`${t.enlarge}: ${app.caps[n]}`}><img src={src} alt={app.caps[n]} loading="lazy"/></button><figcaption>{app.caps[n]}{app.id==='freight'&&n===1&&<small>{t.redacted}</small>}</figcaption></figure>})}</div>}</section>)}
  <section className="ilos-role"><h2>{t.scopeTitle}</h2><p>{t.scope}</p></section>
  <a className="back-projects" href="#proyectos">← {t.back}</a>
  <dialog ref={dialog} className="ilos-dialog" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}><button className="back-projects" onClick={()=>dialog.current?.close()}>{t.close} ×</button>{active&&<><p>{active.caption}</p><img src={active.src} alt={active.caption}/></>}</dialog>
 </section>
}
