import './DataArchitectureCase.css'
import { CaseNav } from './PortfolioAudit'
const copy={
 ES:{
 back:'Volver a proyectos',eyebrow:'INGENIERÍA DE DATOS · ARQUITECTURA BI',
 intro:'Integración empresarial con SQL Server y SSIS, desde la persistencia del dato original hasta su consumo analítico.',
 architecture:'Arquitectura empresarial de datos',
 separation:'El procesamiento analítico se separaba de los sistemas transaccionales: los reportes y dashboards consumían información preparada en SQL Server.',
 sources:'SAP Business One / Power Apps / Sistemas externos',
 stages:[['Fuentes empresariales','SAP Business One','Power Apps','Sistemas externos'],['Persistent Raw Data Layer','SQL Server'],['ETL','SSIS / SQL'],['Data Warehouse','Datos consolidados'],['Data Marts','Modelos analíticos'],['Consumo analítico','Power BI / SSRS / OLAP']],
 decisions:'Decisiones clave de ingeniería',
 cards:[
 ['Datos originales y trazabilidad','Datos originales conservados permanentemente, incluso con estructuras desnormalizadas, formatos inconsistentes o caracteres especiales. Identificadores de ejecución y fechas de carga permitían auditoría y diagnóstico.'],
 ['Procesamiento programado','Extracciones transaccionales pesadas alrededor de las 3:00 a. m. mediante SQL Server Agent, con un desfase analítico aproximado de un día.'],
 ['Eventos y procesos bajo demanda','Procesos activados mediante triggers y acciones de usuarios desde SAP y Power Apps. Determinados datos maestros se consultaban con mayor frecuencia o bajo demanda.'],
 ['Aislamiento de la carga del ERP','La transformación y preparación analítica se realizaban en SQL Server para evitar consultas analíticas pesadas y recurrentes directamente sobre el ERP.']
 ],
 roleTitle:'Mi participación y tecnologías',
 role:'Diseñé la arquitectura y desarrollé los procesos de integración, limpieza, normalización, transformación, auditoría de cargas y preparación analítica para Data Warehouse, Data Marts, reportes automáticos y cubos multidimensionales.',
 procedures:'Procedimientos almacenados',
 note:'Diagrama conceptual basado en mi experiencia profesional; no representa la documentación exacta de una infraestructura.'
 },
 EN:{
 back:'Back to projects',eyebrow:'DATA ENGINEERING · BI ARCHITECTURE',
 intro:'Enterprise integration with SQL Server and SSIS, from persistent original-data storage to analytical consumption.',
 architecture:'Enterprise Data Architecture',
 separation:'Analytical processing was separated from transactional systems: reports and dashboards consumed information prepared in SQL Server.',
 sources:'SAP Business One / Power Apps / External Systems',
 stages:[['Enterprise sources','SAP Business One','Power Apps','External Systems'],['Persistent Raw Data Layer','SQL Server'],['ETL','SSIS / SQL'],['Data Warehouse','Consolidated data'],['Data Marts','Analytical models'],['Analytical consumption','Power BI / SSRS / OLAP']],
 decisions:'Key Engineering Decisions',
 cards:[
 ['Raw Data & Traceability','Original data permanently retained, including denormalized structures, inconsistent formats and special characters. Execution identifiers and load dates supported load auditing and diagnostics.'],
 ['Scheduled Processing','Heavy transactional extractions around 3:00 a.m. through SQL Server Agent, with approximately one day of analytical latency.'],
 ['Event-driven & On-demand','Processes activated by triggers and user actions from SAP and Power Apps. Selected master data was queried more frequently or on demand.'],
 ['ERP Workload Isolation','Transformation and analytical preparation ran in SQL Server to avoid recurring, expensive analytical queries directly against the ERP.']
 ],
 roleTitle:'My Role & Technology Stack',
 role:'I designed the architecture and developed integration, cleaning, normalization, transformation, load auditing and analytical preparation processes for the Data Warehouse, Data Marts, automated reports and multidimensional cubes.',
 procedures:'Stored Procedures',
 note:'Conceptual diagram based on my professional experience; not exact documentation of any infrastructure.'
 }
}
export default function DataArchitectureCase({language}:{language:'ES'|'EN'}){
 const t=copy[language]
 const stack=['SQL Server','SSIS','SQL Server Agent','T-SQL',t.procedures,'Power BI','SSRS','SAP Business One','Power Apps']
 return <section className="content project-detail data-case">
  <a className="back-projects" href="#proyectos">{t.back}</a>
  <p className="eyebrow">{t.eyebrow}</p><h1>Enterprise Data Architecture &amp; ETL</h1>
  <p className="section-description">{t.intro}</p>
  <CaseNav language={language} items={[[ 'data-architecture-heading',language==='ES'?'Arquitectura':'Architecture'],['data-decisions-heading',language==='ES'?'Decisiones':'Decisions'],['data-role-heading',language==='ES'?'Mi participación':'My role']]}/>
  <section className="data-section" aria-labelledby="data-architecture-heading">
   <h2 id="data-architecture-heading">{t.architecture}</h2>
   <div className="data-diagram"><ol className="data-flow" aria-label={t.architecture}>{t.stages.map(([title,...details],i)=><li key={title}><span className="data-node-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><div>{details.map(detail=><span key={detail}>{detail}</span>)}</div></li>)}</ol></div>
   <p className="data-separation-summary">{t.separation}</p>
  </section>
  <section className="data-section" aria-labelledby="data-decisions-heading"><h2 id="data-decisions-heading">{t.decisions}</h2><div className="data-decisions">{t.cards.map(([title,text],i)=><article key={title}><span className="data-card-number" aria-hidden="true">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
  <section className="data-section data-role" aria-labelledby="data-role-heading"><h2 id="data-role-heading">{t.roleTitle}</h2><p>{t.role}</p><div className="project-technologies">{stack.map(tech=><span key={tech}>{tech}</span>)}</div></section>
  <p><a className="case-link" href="#/projects/corporate-bi-platform">{language==='ES'?'Ver soluciones de visualización y distribución de BI':'Explore BI visualization and reporting delivery'}</a></p>
  <p className="data-note">{t.note}</p><a className="back-projects" href="#proyectos">{t.back}</a>
 </section>
}
