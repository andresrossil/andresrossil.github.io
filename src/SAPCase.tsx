import './SAPCase.css'
import { CaseNav } from './PortfolioAudit'
const copy={
 ES:{
 back:'Volver a proyectos',eyebrow:'SOLUCIONES ERP EMPRESARIALES',
 subtitle:'Implementación de ERP, configuración funcional, personalización de procesos e integración empresarial.',
 intro:'Experiencia técnico-funcional para poner en funcionamiento SAP Business One, adaptar sus procesos y extenderlo cuando la configuración estándar no cubría las necesidades del negocio.',
 capabilities:['Implementar','Configurar','Extender e integrar'],
 implementation:'Implementación y administración',
 hanaTitle:'Migración y soporte SAP HANA',
 hanaText:'Participé en un proyecto de migración de SAP Business One a SAP HANA, con desarrollo y ejecución de consultas SQL en HANA y administración básica del entorno. Mi experiencia principal de instalación e implementación de infraestructura ERP se concentra en SAP Business One sobre SQL Server.',
 implementationCards:[
 ['Infraestructura e implementación','Preparación de servidores SAP Business One y SQL Server; instalación y configuración de componentes, servicios y acceso web. Implementaciones en empresas y proyectos independientes.'],
 ['Configuración de empresas y ERP','Aproximadamente diez empresas SAP Business One configuradas desde cero. Parametrización administrativa y operativa, series documentales, autorizaciones y ajustes específicos de validación e impuestos según los requerimientos de cada empresa.'],
 ['Configuración financiera y documental','Administración de cuentas de mayor y determinación contable, incluida la configuración por almacén. Conciliación de extractos bancarios; formatos de impresión de cheques y documentos comerciales. Adaptación a facturación electrónica con formatos personalizados y códigos de barras para lectura con escáner.']
 ],
 blocks:[
 {title:'Gobierno del ERP y controles transaccionales',intro:'Reglas empresariales extendidas dentro del ERP, sin depender de interfaces externas.',cards:[
 ['Accesos y movimientos de inventario','Restricción de almacenes autorizados por usuario y control de productos permitidos por almacén mediante tablas personalizadas.'],
 ['Validaciones de documentos y datos maestros','Controles sobre documentos con valor cero, movimientos de inventario sin costo, estado comercial de datos maestros y restricciones de proveedores.'],
 ['Reglas transaccionales','Validaciones de negocio aplicadas a documentos mediante SBO_SP_TransactionNotification, incluidas reglas especiales de aplicación de impuestos a determinados productos.']
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
 role:'Mi participación comenzaba con las necesidades de las áreas de negocio: analizaba los problemas, evaluaba las posibilidades de SAP Business One, proponía alternativas y las implementaba mediante configuración estándar, personalizaciones o integraciones. Este enfoque dio lugar al control presupuestario por centro de costo, la adaptación a facturación electrónica, la integración de consumos reales de materia prima y reglas específicas de impuestos.'
 },
 EN:{
 back:'Back to projects',eyebrow:'ENTERPRISE ERP SOLUTIONS',
 subtitle:'ERP deployment, functional configuration, business process customization and enterprise integration.',
 intro:'Technical and functional experience deploying SAP Business One, adapting its processes and extending it when standard configuration did not meet business needs.',
 capabilities:['Implement','Configure','Extend & Integrate'],
 implementation:'Implementation & Administration',
 hanaTitle:'SAP HANA Migration & Support',
 hanaText:'Participated in a SAP Business One migration to SAP HANA, gaining hands-on experience developing and executing HANA SQL queries and performing basic administration. My primary ERP infrastructure deployment experience remains focused on SAP Business One with SQL Server.',
 implementationCards:[
 ['Infrastructure & Deployment','Server preparation for SAP Business One and SQL Server; installation and configuration of components, services and web access. Deployment experience in companies and independent projects.'],
 ['Company Setup & ERP Configuration','Approximately ten SAP Business One companies configured from scratch. Practical administrative and operational setup, document numbering series, authorizations and specific validation and tax settings tailored to each company’s requirements.'],
 ['Financial & Document Configuration','General ledger account administration and account determination, including warehouse-specific settings. Bank statement reconciliation; print layouts for checks and commercial documents. Electronic invoicing adaptation through custom layouts with barcodes for scanner reading.']
 ],
 blocks:[
 {title:'ERP Governance & Transaction Controls',intro:'Business rules extended within the ERP without reliance on external interfaces.',cards:[
 ['Access and inventory movements','User-specific authorized warehouse restrictions and product eligibility by warehouse through custom tables.'],
 ['Document and master-data validation','Controls for zero-value documents, inventory movements without cost, commercial eligibility of master data and supplier restrictions.'],
 ['Transaction rules','Document-level business validations through SBO_SP_TransactionNotification, including special tax application rules for selected products.']
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
 role:'My involvement began with business teams’ needs: I analyzed problems, assessed SAP Business One capabilities, proposed alternatives and implemented them through standard configuration, customization or integration. This approach supported cost-center budget control, electronic invoicing adaptation, integration of actual raw-material consumption and specific tax rules.'
 }
}
export default function SAPCase({language}:{language:'ES'|'EN'}){
 const t=copy[language]
 return <section className="content project-detail sap-case">
 <a className="back-projects" href="#proyectos">{t.back}</a><p className="eyebrow">{t.eyebrow}</p>
 <h1>SAP Business One <span className="sap-title-divider">|</span> Implementation &amp; Enterprise Solutions</h1>
 <p className="sap-subtitle">{t.subtitle}</p><p className="section-description">{t.intro}</p>
 <CaseNav language={language} items={[[ 'sap-implementation',language==='ES'?'Implementación':'Implementation'],['sap-solutions',language==='ES'?'Soluciones':'Solutions'],['sap-architecture',language==='ES'?'Arquitectura':'Architecture'],['sap-role',language==='ES'?'Mi participación':'My role']]}/>
 <ul className="sap-capabilities" aria-label={t.implementation}>{t.capabilities.map((v,i)=><li key={v}><span aria-hidden="true">0{i+1}</span>{v}</li>)}</ul>
 <section className="sap-implementation" id="sap-implementation"><h2>{t.implementation}</h2><div className="sap-cards">{t.implementationCards.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="sap-hana-note"><h3>{t.hanaTitle}</h3><p>{t.hanaText}</p></aside></section>
 <div className="sap-blocks" id="sap-solutions">{t.blocks.map((block,i)=><section className="sap-block" key={block.title} aria-labelledby={`sap-block-${i}`}><header><span className="sap-block-number" aria-hidden="true">0{i+1}</span><div><h2 id={`sap-block-${i}`}>{block.title}</h2><p>{block.intro}</p></div></header><div className={`sap-cards ${block.cards.length===2?'sap-cards-two':''}`}>{block.cards.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>{i===2&&<div className="sap-logistics-footer"><p>{t.api}</p><a className="case-link" href="#/projects/integrated-logistics-operations-suite">{t.logisticsLink}</a></div>}</section>)}</div>
 <section className="sap-architecture" id="sap-architecture"><h2>{t.architecture}</h2><div className="sap-diagram" aria-label={t.architecture}><article><h3>SAP Business One</h3><p>{t.native}</p></article><span className="sap-connector" aria-hidden="true">↔</span><article><h3>SQL Server</h3><p>{t.sql}</p></article><span className="sap-connector" aria-hidden="true">↔</span><article><h3>{t.external}</h3></article></div><p>{t.decision}</p><p className="sap-note">{t.diagramNote}</p></section>
 <section className="sap-role" id="sap-role"><h2>{t.roleTitle}</h2><p>{t.role}</p><div className="project-technologies">{['SAP Business One','SQL Server','T-SQL','Transaction Notification','PostTransactionNotification','SQL Server Agent','SSRS','SSIS','Power Apps','VB.NET','SAP HANA'].map(v=><span key={v}>{v}</span>)}</div></section>
 <a className="back-projects" href="#proyectos">{t.back}</a>
 </section>
}
