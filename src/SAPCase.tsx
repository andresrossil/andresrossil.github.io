import './SAPCase.css'
const copy={
 ES:{
 back:'Volver a proyectos',eyebrow:'SOLUCIONES ERP EMPRESARIALES',
 subtitle:'Personalización del ERP, controles empresariales, automatización e integración de sistemas.',
 intro:'Soluciones desarrolladas principalmente con formularios nativos, tablas personalizadas y lógica SQL para extender los procesos de SAP Business One.',
 blocks:[
 {title:'Gobierno del ERP y controles transaccionales',intro:'Reglas empresariales extendidas dentro del ERP, sin depender de interfaces externas.',cards:[
 ['Accesos y movimientos de inventario','Restricción de almacenes autorizados por usuario y control de productos permitidos por almacén mediante tablas personalizadas.'],
 ['Validaciones de documentos y datos maestros','Controles sobre documentos con valor cero, movimientos de inventario sin costo, estado comercial de datos maestros y restricciones de proveedores.'],
 ['Reglas transaccionales','Validaciones de negocio aplicadas a documentos mediante SBO_SP_TransactionNotification.']
 ]},
 {title:'Automatización financiera y documental',intro:'Controles financieros y procesamiento de documentos con herramientas de SQL Server.',cards:[
 ['Control presupuestario por centro de costo','Control alternativo que ampliaba las capacidades presupuestarias estándar: validaciones contra gasto, bloqueos configurables y notificaciones de excedentes.'],
 ['Procesamiento automático de documentos','SQL Server Agent, SSRS y mecanismos posteriores a transacciones para identificar y procesar órdenes de venta, facturas, órdenes de compra y entradas de mercancías. Un proceso revisaba órdenes de compra pendientes cada minuto para generar y enviar documentos mediante SSRS.'],
 ['Conciliación de factura electrónica','Procesos ETL para comparar facturas registradas en SAP Business One con registros fiscales gubernamentales mediante información FEL e identificar diferencias.']
 ]},
 {title:'Integración logística y de distribución',intro:'Procesos originalmente implementados en SAP que evolucionaron hacia aplicaciones móviles Power Apps, conservando las funciones del ERP como respaldo operativo.',cards:[
 ['Preparación y distribución','Picking parcial y completo por camión, pasillo, nivel y familia; manifiestos de carga, facturación, traslados entre almacenes y reportes de auditoría de inventario.'],
 ['Flota y liquidación de rutas','Administración de flotas, pilotos, unidades y asignaciones; integración de proformas y gastos de liquidación. Consulta del estado de liquidación desde Power Apps con información de SAP Business One.']
 ]},
 {title:'Integración de manufactura · Industria avícola',intro:'Experiencia en otra empresa, presentada como una solución independiente de las personalizaciones anteriores.',cards:[
 ['Complemento especializado VB.NET','Consultaba periódicamente el consumo de materias primas de un sistema externo de producción y generaba salidas de materiales y entradas de producto terminado. Se eligieron movimientos de inventario en lugar de órdenes de fabricación por las variaciones entre fórmulas teóricas y consumo real.'],
 ['Seguimiento de producción avícola','Formularios nativos de SAP Business One para administrar el ciclo de vida y la producción de gallinas, incluida la producción de huevos. Alimentación, vacunación y otros eventos de planta se obtenían de un sistema externo mediante procesos programados para su seguimiento y reportería en SAP.']
 ]}
 ],
 logisticsLink:'Ver Integrated Logistics Operations Suite',
 api:'En las integraciones logísticas definí los requerimientos y desarrollé SQL Server y las aplicaciones; las API fueron implementadas por otros desarrolladores.',
 architecture:'Arquitectura y decisiones técnicas',native:'Formularios nativos · Reglas de negocio',sql:'Tablas personalizadas · Validaciones · Automatización documental',external:'Sistemas operativos externos / Power Apps',
 decision:'Prioricé formularios y funcionalidades nativas de SAP Business One para reducir la dependencia de interfaces personalizadas y facilitar el mantenimiento durante las actualizaciones del ERP.',
 diagramNote:'Diagrama conceptual de componentes. Los mecanismos de integración variaban según la solución; el complemento VB.NET correspondía específicamente a manufactura.',
 roleTitle:'Mi participación y tecnologías',
 role:'Diseño de soluciones ERP, personalización de procesos, modelado de tablas y reglas de negocio, integración de sistemas, automatización documental, controles financieros y desarrollo de integraciones especializadas.'
 },
 EN:{
 back:'Back to projects',eyebrow:'ENTERPRISE ERP SOLUTIONS',
 subtitle:'ERP customization, business controls, automation and systems integration.',
 intro:'Solutions developed primarily through native forms, custom tables and SQL logic to extend SAP Business One processes.',
 blocks:[
 {title:'ERP Governance & Transaction Controls',intro:'Business rules extended within the ERP without reliance on external interfaces.',cards:[
 ['Access and inventory movements','User-specific authorized warehouse restrictions and product eligibility by warehouse through custom tables.'],
 ['Document and master-data validation','Controls for zero-value documents, inventory movements without cost, commercial eligibility of master data and supplier restrictions.'],
 ['Transaction rules','Document-level business validations through SBO_SP_TransactionNotification.']
 ]},
 {title:'Financial & Document Automation',intro:'Financial controls and document processing with SQL Server tools.',cards:[
 ['Budget Control by Cost Center','An alternative control extending standard budgeting capabilities with spending validation, configurable blocks and budget overrun notifications.'],
 ['Document Processing Automation','SQL Server Agent, SSRS and post-transaction mechanisms identified and processed sales orders, invoices, purchase orders and goods receipts. One process checked pending purchase orders every minute to generate and send documents through SSRS.'],
 ['Electronic Invoice Reconciliation','ETL processes compared invoices recorded in SAP Business One with government tax records using FEL information to identify differences.']
 ]},
 {title:'Logistics & Distribution Integration',intro:'Processes originally implemented in SAP later evolved into mobile Power Apps applications, retaining ERP functionality as an operational fallback.',cards:[
 ['Order preparation and distribution','Partial and complete picking by truck, aisle, level and product family; load manifests, invoicing, warehouse transfers and inventory audit reports.'],
 ['Fleet and route settlement','Management of fleets, drivers, vehicles and assignments; integration of pro formas and route settlement expenses. Settlement status queries from Power Apps using SAP Business One information.']
 ]},
 {title:'Manufacturing Integration · Poultry Industry',intro:'Experience at a different company, presented as an independent solution from the customizations above.',cards:[
 ['Specialized VB.NET Add-on','Periodically queried raw-material consumption recorded by an external production system and generated material issues and finished-goods receipts. Inventory movements were chosen instead of production orders because theoretical formulas differed from actual consumption.'],
 ['Poultry Production Tracking','Native SAP Business One forms managed hen lifecycle and production information, including egg production. Feeding, vaccination and other plant events came from an external system through scheduled processes for tracking and reporting in SAP.']
 ]}
 ],
 logisticsLink:'View Integrated Logistics Operations Suite',
 api:'For logistics integrations, I defined requirements and developed SQL Server and the applications; APIs were implemented by other developers.',
 architecture:'Architecture & technical decisions',native:'Native forms · Business rules',sql:'Custom tables · Validation · Document automation',external:'External operational systems / Power Apps',
 decision:'I prioritized native SAP Business One forms and functionality to reduce reliance on custom interfaces and facilitate maintenance during ERP upgrades.',
 diagramNote:'Conceptual component diagram. Integration mechanisms varied by solution; the VB.NET add-on was specific to manufacturing.',
 roleTitle:'My Role & Technology Stack',
 role:'ERP solution design, process customization, table and business-rule modeling, systems integration, document automation, financial controls and specialized integration development.'
 }
}
export default function SAPCase({language}:{language:'ES'|'EN'}){
 const t=copy[language]
 return <section className="content project-detail sap-case">
 <a className="back-projects" href="#proyectos">{t.back}</a><p className="eyebrow">{t.eyebrow}</p>
 <h1>SAP Business One <span className="sap-title-divider">|</span> Enterprise Process Solutions</h1>
 <p className="sap-subtitle">{t.subtitle}</p><p className="section-description">{t.intro}</p>
 <div className="sap-blocks">{t.blocks.map((block,i)=><section className="sap-block" key={block.title} aria-labelledby={`sap-block-${i}`}><header><span className="sap-block-number" aria-hidden="true">0{i+1}</span><div><h2 id={`sap-block-${i}`}>{block.title}</h2><p>{block.intro}</p></div></header><div className={`sap-cards ${block.cards.length===2?'sap-cards-two':''}`}>{block.cards.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>{i===2&&<div className="sap-logistics-footer"><p>{t.api}</p><a className="case-link" href="#/projects/integrated-logistics-operations-suite">{t.logisticsLink}</a></div>}</section>)}</div>
 <section className="sap-architecture"><h2>{t.architecture}</h2><div className="sap-diagram" aria-label={t.architecture}><article><h3>SAP Business One</h3><p>{t.native}</p></article><span className="sap-connector" aria-hidden="true">↔</span><article><h3>SQL Server</h3><p>{t.sql}</p></article><span className="sap-connector" aria-hidden="true">↔</span><article><h3>{t.external}</h3></article></div><p>{t.decision}</p><p className="sap-note">{t.diagramNote}</p></section>
 <section className="sap-role"><h2>{t.roleTitle}</h2><p>{t.role}</p><div className="project-technologies">{['SAP Business One','SQL Server','T-SQL','Transaction Notification','PostTransactionNotification','SQL Server Agent','SSRS','SSIS','Power Apps','VB.NET'].map(v=><span key={v}>{v}</span>)}</div></section>
 <a className="back-projects" href="#proyectos">{t.back}</a>
 </section>
}
