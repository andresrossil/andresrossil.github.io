import { useId, useState } from 'react'
import './BIArchitecture.css'

const copy = {
  EN: {
    title: 'Conceptual BI Architecture',
    note: 'Conceptual representation based on professional experience, not the exact infrastructure of any company. Sources and connections are illustrative.',
    sources: 'Information sources',
    categories: ['ERP / Enterprise Systems', 'Warehouse Management System (WMS)', 'Business Applications / SQL Server', 'Excel / Flat Files', 'External Partner Data'],
    direct: 'SQL Query Access', etl: 'ETL Process',
    access: 'SQL access layer',
    mechanisms: 'Alternative or complementary access mechanisms',
    directNote: 'SQL query path for compatible sources. Files and external data may require prior loading. SQL access mechanisms are distinct from ETL processing and reporting tools.',
    etlNote: 'Data integration through SSIS and SQL Server. Select a stage to inspect its purpose and technologies.',
    directSteps: [
      { title: 'SQL views', text: 'SQL Server views expose selected operational data for reporting.' },
      { title: 'Queries', text: 'SQL queries retrieve and combine the data required by reports.' },
      { title: 'Stored procedures', text: 'Stored procedures encapsulate parameterized retrieval and reporting logic in SQL Server.' },
      { title: 'Reporting tools', text: 'SSRS reports and Power BI consume the prepared query outputs, according to the integration used.' },
    ],
    etlSteps: [
      { title: 'Extraction', text: 'SSIS extracts data from compatible enterprise sources, files and external datasets.' },
      { title: 'Staging', text: 'SQL Server staging tables hold extracted data before transformation.' },
      { title: 'Cleaning & normalization', text: 'SSIS transformations and SQL stored procedures standardize formats, types and values.' },
      { title: 'Validation', text: 'SQL checks and ETL rules assess data consistency before loading final tables.' },
      { title: 'Final tables', text: 'SQL Server reporting tables and data models organize validated data for consumption.' },
      { title: 'Information consumption', text: 'Power BI dashboards and SSRS reports use the consolidated reporting data.' },
    ],
    orchestration: 'Process orchestration: SQL Server Agent and stored procedures support scheduled execution and automation.',
    automationTitle: 'Advanced SSRS Subscription Automation',
    automation: 'Developed custom SSRS report distribution automation by reverse-engineering subscription XML structures and dynamically updating email delivery parameters, including sender, recipients, subject and message body. This enabled flexible, automated report distribution based on business requirements without manually reconfiguring individual subscriptions.',
  },
  ES: {
    title: 'Arquitectura conceptual de BI',
    note: 'Representación conceptual basada en la experiencia profesional, no en la infraestructura exacta de una empresa. Las fuentes y conexiones son ilustrativas.',
    sources: 'Fuentes de información',
    categories: ['ERP / Sistemas empresariales', 'Sistema de gestión de almacenes (WMS)', 'Aplicaciones empresariales / SQL Server', 'Excel / Archivos planos', 'Datos de socios externos'],
    direct: 'Acceso mediante consultas SQL', etl: 'Proceso ETL',
    access: 'Capa de acceso SQL',
    mechanisms: 'Mecanismos de acceso alternativos o complementarios',
    directNote: 'Recorrido de consulta SQL para fuentes compatibles. Los archivos y datos externos pueden requerir carga previa. Los mecanismos de acceso SQL son distintos del procesamiento ETL y de las herramientas de reportería.',
    etlNote: 'Integración de datos mediante SSIS y SQL Server. Selecciona una etapa para consultar su función y tecnologías.',
    directSteps: [
      { title: 'Vistas SQL', text: 'Las vistas de SQL Server exponen datos operativos seleccionados para reportería.' },
      { title: 'Consultas', text: 'Las consultas SQL recuperan y combinan los datos requeridos por los reportes.' },
      { title: 'Procedimientos almacenados', text: 'Los procedimientos almacenados encapsulan consultas parametrizadas y lógica de reportería en SQL Server.' },
      { title: 'Herramientas de reportería', text: 'Los reportes SSRS y Power BI consumen las salidas de consulta preparadas, según la integración utilizada.' },
    ],
    etlSteps: [
      { title: 'Extracción', text: 'SSIS extrae datos de fuentes empresariales compatibles, archivos y conjuntos de datos externos.' },
      { title: 'Staging', text: 'Las tablas de staging en SQL Server reciben los datos extraídos antes de su transformación.' },
      { title: 'Limpieza y normalización', text: 'Las transformaciones de SSIS y los procedimientos almacenados SQL estandarizan formatos, tipos y valores.' },
      { title: 'Validación', text: 'Las comprobaciones SQL y reglas ETL evalúan la consistencia antes de cargar las tablas finales.' },
      { title: 'Tablas finales', text: 'Las tablas de reportería y modelos de datos en SQL Server organizan los datos validados para su consumo.' },
      { title: 'Consumo de información', text: 'Los dashboards Power BI y reportes SSRS utilizan los datos consolidados de reportería.' },
    ],
    orchestration: 'Orquestación de procesos: SQL Server Agent y procedimientos almacenados permiten programar la ejecución y automatizar procesos.',
    automationTitle: 'Automatización avanzada de suscripciones SSRS',
    automation: 'Desarrollé una automatización personalizada de distribución de reportes SSRS mediante ingeniería inversa de la estructura XML de las suscripciones. Actualizaba dinámicamente remitente, destinatarios, asunto, cuerpo del mensaje y otros parámetros de entrega según los requerimientos del negocio, permitiendo distribuciones masivas sin reconfigurar manualmente cada suscripción.',
  },
}

export default function BIArchitecture({ language }: { language: 'EN' | 'ES' }) {
  const [path, setPath] = useState<'direct' | 'etl'>('direct')
  const [selected, setSelected] = useState(0)
  const panelId = useId()
  const t = copy[language]
  const steps = path === 'direct' ? t.directSteps : t.etlSteps

  return (
    <section className="bi-architecture" id="bi-architecture" aria-labelledby={`${panelId}-heading`}>
      <h2 id={`${panelId}-heading`}>{t.title}</h2>
      <p className="architecture-note">{t.note}</p>
      <h3>{t.sources}</h3>
      <ul className="architecture-sources">{t.categories.map(source => <li key={source}>{source}</li>)}</ul>
      <div className="architecture-controls" role="group" aria-label={t.title}>
        {(['direct', 'etl'] as const).map(option => <button key={option} type="button" className={`language-btn ${path === option ? 'active' : ''}`} aria-pressed={path === option} aria-controls={panelId} onClick={() => { setPath(option); setSelected(0) }}>{t[option]}</button>)}
      </div>
      <p className="architecture-note">{path === 'direct' ? t.directNote : t.etlNote}</p>
      {path === 'direct' ? (
        <ol className="architecture-flow direct-access-flow">
          <li className="sql-access-layer">
            <h3>{t.access}</h3>
            <p>{t.mechanisms}</p>
            <div className="sql-access-options">
              {t.directSteps.slice(0, 3).map((step, index) => <button key={step.title} type="button" className={selected === index ? 'selected' : ''} aria-pressed={selected === index} aria-controls={panelId} onClick={() => setSelected(index)}>{step.title}</button>)}
            </div>
          </li>
          <li><button type="button" className={selected === 3 ? 'selected' : ''} aria-pressed={selected === 3} aria-controls={panelId} onClick={() => setSelected(3)}>{t.directSteps[3].title}</button></li>
        </ol>
      ) : (
        <ol className="architecture-flow">
          {steps.map((step, index) => <li key={step.title}><button type="button" className={index === selected ? 'selected' : ''} aria-pressed={index === selected} aria-controls={panelId} onClick={() => setSelected(index)}>{step.title}</button></li>)}
        </ol>
      )}
      <div id={panelId} className="architecture-inspector" role="region" aria-label={t[path]} aria-live="polite"><h3>{steps[selected].title}</h3><p>{steps[selected].text}</p></div>
      <p className="architecture-note">{t.orchestration}</p>
      <aside className="ssrs-capability"><h3>{t.automationTitle}</h3><p>{t.automation}</p></aside>
    </section>
  )
}
