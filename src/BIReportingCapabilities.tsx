import './BIReportingCapabilities.css'
const copy={
 ES:{
 title:'Entrega de analítica y reportería empresarial',
 intro:'La herramienta se elegía según la necesidad de información del área y los accesos disponibles para sus usuarios.',
 cards:[
 {title:'Analítica interactiva',tech:'Power BI',label:'Análisis operativo, logístico y comercial',text:'Dashboards para operaciones y ventas. El análisis comercial permitía revisar el desempeño por vendedor, camión de distribución y ubicación geográfica.'},
 {title:'Reportería automatizada',tech:'SSRS · SQL Server',label:'Análisis comercial y distribución de información',text:'Generación y distribución automática de reportes comerciales a múltiples usuarios, incluido personal sin acceso o licencia de Power BI.'},
 {title:'Analítica con Excel y SQL',tech:'Excel · SQL Server',label:'Recursos Humanos y apoyo a planificación de demanda',text:'Reportes de RR. HH. en Excel conectado a SQL Server, con tablas dinámicas, KPI y gráficas de empleados, plazas ocupadas y vacantes, y rotación por área.',extra:'Para planificación de demanda, preparé consultas SQL y conjuntos de datos estructurados para analizar consumos históricos.'}
 ]
 },
 EN:{
 title:'Enterprise Reporting & Analytics Delivery',
 intro:'Tools were selected according to each business area’s information needs and the access available to its users.',
 cards:[
 {title:'Interactive Analytics',tech:'Power BI',label:'Operational, logistics and commercial analysis',text:'Dashboards for operations and sales. Commercial analysis covered performance by salesperson, delivery truck and geographic area.'},
 {title:'Automated Reporting',tech:'SSRS · SQL Server',label:'Sales analytics and information distribution',text:'Automatic generation and distribution of commercial reports to multiple business users, including staff without Power BI access or licenses.'},
 {title:'Excel & SQL Analytics',tech:'Excel · SQL Server',label:'HR analytics and demand planning data support',text:'HR reports in Excel connected to SQL Server, with PivotTables, KPI indicators and charts covering headcount, occupied and vacant positions, and turnover by department.',extra:'For demand planning, I prepared SQL queries and structured datasets to analyze historical consumption.'}
 ]
 }
}
export default function BIReportingCapabilities({language}:{language:'ES'|'EN'}){
 const t=copy[language]
 return <section className="bi-delivery" aria-labelledby="bi-delivery-title"><h2 id="bi-delivery-title">{t.title}</h2><p>{t.intro}</p><div className="bi-delivery-cards">{t.cards.map(card=><article key={card.title}><span className="bi-delivery-tech">{card.tech}</span><h3>{card.title}</h3><h4>{card.label}</h4><p>{card.text}</p>{'extra' in card&&<p>{card.extra}</p>}</article>)}</div></section>
}
