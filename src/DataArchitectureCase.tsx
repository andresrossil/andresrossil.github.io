import './DataArchitectureCase.css'
const copy={
 ES:{
 back:'Volver a proyectos',eyebrow:'INGENIERÍA DE DATOS · ARQUITECTURA BI',
 intro:'Arquitectura de integración empresarial desarrollada con SQL Server y SSIS: desde la recepción persistente de datos originales hasta su transformación, organización y consumo analítico.',
 note:'Representación conceptual basada en mi experiencia profesional; no es documentación exacta de la infraestructura de una empresa.',
 diagram:'Arquitectura de extremo a extremo',diagramText:'Un flujo de datos preparado para separar la operación transaccional del consumo analítico.',
 stages:[
 ['Fuentes empresariales','SAP Business One, sistemas logísticos y plataformas operativas externas. Power Apps formaba parte de los sistemas integrados.','SAP Business One · Power Apps'],
 ['Ingesta y persistencia del original','Recepción y almacenamiento permanente de los datos tal como se recibían, antes de su limpieza y transformación.','Persistent Raw Data Layer · SQL Server'],
 ['Procesos ETL','Extracción, limpieza, normalización, transformación e integración de información de múltiples sistemas.','SSIS · Procedimientos almacenados'],
 ['Data Warehouse','Información procesada y consolidada para sostener el análisis empresarial.','Microsoft SQL Server'],
 ['Data Marts y modelos analíticos','Organización de información para los distintos ámbitos de análisis y consumo.','Modelos de datos'],
 ['Consumo analítico','Información preparada para dashboards, reportes automáticos y análisis multidimensional.','Power BI · SSRS · Cubos multidimensionales']
 ],
 rawTitle:'Persistent Raw Data Layer',rawSub:'Datos originales conservados permanentemente en SQL Server',
 rawText:'Las tablas persistentes conservaban los datos recibidos aunque incluyeran estructuras desnormalizadas, formatos inconsistentes o caracteres especiales. La normalización se realizaba posteriormente en ETL, sin reemplazar esa evidencia de origen.',
 trace:'Trazabilidad y diagnóstico',traceItems:['Identificador de ejecución','Fecha de carga','Datos originales recibidos'],
 pipeline:'Ingesta, auditoría y transformación',pipelineText:'La trazabilidad acompaña el recorrido desde el ingreso del dato hasta su preparación analítica.',
 pipelineSteps:[['01','Ingesta','Recibir y persistir los datos originales.'],['02','Registro de carga','Asociar ejecución y fecha para trazabilidad y diagnóstico.'],['03','Transformación','Limpiar, normalizar e integrar mediante SSIS y SQL.'],['04','Preparación analítica','Alimentar Data Warehouse, Data Marts y modelos.']],
 hybrid:'Dos modos de procesamiento',hybridText:'Programación y eventos coexistían según el tipo de información y la necesidad operativa.',
 night:'Cargas nocturnas programadas',time:'Alrededor de las 3:00 a. m.',nightText:'Extracciones transaccionales pesadas programadas con SQL Server Agent para evitar cargar el ERP durante el consumo analítico.',nightFresh:'Datos transaccionales analíticos: desfase aproximado de un día.',
 demand:'Procesos por eventos o bajo demanda',trigger:'Eventos · triggers · acciones de usuarios',demandText:'Procesos iniciados por eventos, triggers o acciones desde SAP y Power Apps, combinados con procedimientos almacenados.',demandFresh:'Determinados datos maestros: consulta más frecuente o bajo demanda.',
 protection:'Separación entre operación y análisis',transaction:'Sistema transaccional',transactionText:'SAP Business One y sistemas operativos atendían los procesos del negocio.',bridge:'Extracción programada e integración',analytics:'Entorno analítico',analyticsText:'SQL Server almacenaba y procesaba información para que dashboards y reportes evitaran consultas analíticas costosas directamente sobre el ERP.',
 freshness:'La actualización no era uniforme: la analítica transaccional podía tener un desfase cercano a un día; algunos datos maestros se consultaban con mayor frecuencia o según la necesidad.',
 responsibility:'Mi responsabilidad técnica',role:'Diseñé la arquitectura de integración y desarrollé los procesos de extracción, limpieza, normalización, transformación e integración. Implementé la persistencia de datos originales con trazabilidad y combiné la programación de cargas con procesos iniciados por eventos y acciones de usuarios.',
 responsibilities:['Diseño de capas SQL Server para persistencia e información analítica.','Desarrollo ETL con SSIS y lógica SQL mediante procedimientos almacenados y triggers.','Programación de cargas pesadas con SQL Server Agent y actualización diferenciada.','Preparación de información para Data Marts, Power BI, SSRS y cubos multidimensionales.'],
 technologies:'Tecnologías utilizadas',technologyGroups:[['Almacenamiento y modelado',['Microsoft SQL Server','Data Warehouse','Data Marts']],['Integración y orquestación',['SSIS','SQL Server Agent','Procedimientos almacenados','Triggers']],['Consumo y sistemas integrados',['SSRS','Power BI','Cubos multidimensionales','SAP Business One','Power Apps']]]
 },
 EN:{
 back:'Back to projects',eyebrow:'DATA ENGINEERING · BI ARCHITECTURE',
 intro:'Enterprise integration architecture developed with SQL Server and SSIS: from persistent ingestion of original data to transformation, organization and analytical consumption.',
 note:'Conceptual representation based on my professional experience; not exact documentation of any company’s infrastructure.',
 diagram:'End-to-end data architecture',diagramText:'A data flow designed to separate transactional operations from analytical consumption.',
 stages:[
 ['Enterprise sources','SAP Business One, logistics systems and external operational platforms. Power Apps was part of the integrated systems.','SAP Business One · Power Apps'],
 ['Ingestion and original-data persistence','Permanent storage of data as received, before cleaning and transformation.','Persistent Raw Data Layer · SQL Server'],
 ['ETL processes','Extraction, cleaning, normalization, transformation and integration of information from multiple systems.','SSIS · Stored procedures'],
 ['Data Warehouse','Processed and consolidated information supporting enterprise analysis.','Microsoft SQL Server'],
 ['Data Marts and analytical models','Information organized for distinct analytical and consumption needs.','Data models'],
 ['Analytical consumption','Prepared information for dashboards, automated reporting and multidimensional analysis.','Power BI · SSRS · Multidimensional cubes']
 ],
 rawTitle:'Persistent Raw Data Layer',rawSub:'Original data permanently retained in SQL Server',
 rawText:'Persistent tables retained received data even when it contained denormalized structures, inconsistent formats or special characters. Normalization happened later in ETL, preserving the original input.',
 trace:'Traceability and diagnostics',traceItems:['Execution identifier','Load date','Original received data'],
 pipeline:'Ingestion, load auditing and transformation',pipelineText:'Traceability accompanies the flow from data arrival to analytical preparation.',
 pipelineSteps:[['01','Ingestion','Receive and persist original data.'],['02','Load registration','Associate execution and load date for traceability and diagnostics.'],['03','Transformation','Clean, normalize and integrate through SSIS and SQL.'],['04','Analytical preparation','Feed the Data Warehouse, Data Marts and models.']],
 hybrid:'Two processing modes',hybridText:'Scheduling and events coexisted according to information type and operational needs.',
 night:'Scheduled nightly loads',time:'Around 3:00 a.m.',nightText:'Heavy transactional extractions scheduled with SQL Server Agent to avoid burdening the ERP during analytical consumption.',nightFresh:'Analytical transactional data: approximately one day of latency.',
 demand:'Event-driven or on-demand processes',trigger:'Events · triggers · user actions',demandText:'Processes initiated by events, triggers or actions from SAP and Power Apps, combined with stored procedures.',demandFresh:'Selected master data: more frequent or on-demand queries.',
 protection:'Separating operations from analytics',transaction:'Transactional system',transactionText:'SAP Business One and operational systems supported business processes.',bridge:'Scheduled extraction and integration',analytics:'Analytical environment',analyticsText:'SQL Server stored and processed information so dashboards and reports could avoid expensive analytical queries directly against the ERP.',
 freshness:'Refresh frequency varied: transactional analytics could lag by approximately one day, while selected master data was queried more frequently or as needed.',
 responsibility:'My technical responsibilities',role:'I designed the integration architecture and developed extraction, cleaning, normalization, transformation and integration processes. I implemented persistent original-data storage with traceability and combined scheduled loads with processes initiated by events and user actions.',
 responsibilities:['Design of SQL Server layers for persistence and analytical information.','ETL development with SSIS and SQL logic using stored procedures and triggers.','Heavy-load scheduling with SQL Server Agent and differentiated refresh frequency.','Preparation of information for Data Marts, Power BI, SSRS and multidimensional cubes.'],
 technologies:'Technologies used',technologyGroups:[['Storage and modeling',['Microsoft SQL Server','Data Warehouse','Data Marts']],['Integration and orchestration',['SSIS','SQL Server Agent','Stored procedures','Triggers']],['Consumption and integrated systems',['SSRS','Power BI','Multidimensional cubes','SAP Business One','Power Apps']]]
 }
}
export default function DataArchitectureCase({language}:{language:'ES'|'EN'}){
 const t=copy[language]
 return <section className="content project-detail data-case">
  <a className="back-projects" href="#proyectos">{t.back}</a>
  <p className="eyebrow">{t.eyebrow}</p><h1>Enterprise Data Architecture &amp; ETL</h1>
  <p className="section-description">{t.intro}</p>
  <div className="project-technologies">{['Data Engineering','BI Architecture','ETL','Enterprise Data Integration'].map(v=><span key={v}>{v}</span>)}</div>
  <section className="data-section"><h2>{t.diagram}</h2><p>{t.diagramText}</p><ol className="data-spine">{t.stages.map(([title,text,tech],i)=><li key={title}><span className="data-step-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p><span className="data-tech">{tech}</span></div></li>)}</ol></section>
  <section className="data-raw"><div><p className="eyebrow">SQL SERVER</p><h2>{t.rawTitle}</h2><h3>{t.rawSub}</h3><p>{t.rawText}</p></div><aside><h3>{t.trace}</h3><ul>{t.traceItems.map(v=><li key={v}>{v}</li>)}</ul></aside></section>
  <section className="data-section"><h2>{t.pipeline}</h2><p>{t.pipelineText}</p><ol className="data-pipeline">{t.pipelineSteps.map(([n,title,text])=><li key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><div className="data-trace-band">{t.traceItems.join(' · ')}</div></section>
  <section className="data-section"><h2>{t.hybrid}</h2><p>{t.hybridText}</p><div className="data-modes"><article><span className="data-mode-icon" aria-hidden="true">◷</span><h3>{t.night}</h3><strong>{t.time}</strong><p>{t.nightText}</p><div>{t.nightFresh}</div></article><article><span className="data-mode-icon" aria-hidden="true">⌘</span><h3>{t.demand}</h3><strong>{t.trigger}</strong><p>{t.demandText}</p><div>{t.demandFresh}</div></article></div></section>
  <section className="data-section"><h2>{t.protection}</h2><div className="data-separation"><article><span>ERP</span><h3>{t.transaction}</h3><p>{t.transactionText}</p></article><div className="data-transfer"><span aria-hidden="true">⇢</span>{t.bridge}</div><article><span>SQL SERVER · BI</span><h3>{t.analytics}</h3><p>{t.analyticsText}</p></article></div><p className="data-freshness">{t.freshness}</p></section>
  <section className="data-section"><h2>{t.responsibility}</h2><p>{t.role}</p><ul className="data-responsibilities">{t.responsibilities.map(v=><li key={v}>{v}</li>)}</ul></section>
  <section className="data-section"><h2>{t.technologies}</h2><div className="data-technologies">{t.technologyGroups.map(([title,items])=><article key={String(title)}><h3>{title}</h3><ul>{(items as string[]).map(v=><li key={v}>{v}</li>)}</ul></article>)}</div></section>
  <p className="data-note">{t.note}</p><a className="back-projects" href="#proyectos">{t.back}</a>
 </section>
}
