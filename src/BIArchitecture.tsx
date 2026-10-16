import { useId, useState } from 'react'

const copy = {
  EN: {
    title: 'Conceptual BI Architecture',
    note: 'Conceptual representation based on professional experience. It does not document the exact infrastructure of any company. Sources and connections are illustrative.',
    sources: 'Information sources',
    categories: ['ERP / Enterprise Systems', 'Warehouse Management System (WMS)', 'Business Applications / SQL Server', 'Excel / Flat Files', 'External Partner Data'],
    direct: 'Direct query', etl: 'ETL process',
    directNote: 'Illustrative query path for compatible SQL data sources. Excel, flat files and partner data may require prior preparation or loading; not every source supports direct querying.',
    etlNote: 'Illustrative integration path: extraction and transformation with SSIS, loading into SQL Server reporting models, and consumption through reporting and analytics tools.',
    query: 'SQL Server · Queries and stored procedures',
    transform: 'SSIS · Extraction and transformation',
    model: 'SQL Server · Reporting databases and data models',
    output: 'SSRS · Reports / Power BI · Dashboards',
    automation: 'Automation: SQL Server Agent and stored procedures for process execution; customized SSRS report distribution.',
  },
  ES: {
    title: 'Arquitectura conceptual de BI',
    note: 'Representación conceptual basada en la experiencia profesional. No documenta la infraestructura exacta de ninguna empresa. Las fuentes y conexiones son ilustrativas.',
    sources: 'Fuentes de información',
    categories: ['ERP / Sistemas empresariales', 'Sistema de gestión de almacenes (WMS)', 'Aplicaciones empresariales / SQL Server', 'Excel / Archivos planos', 'Datos de socios externos'],
    direct: 'Consulta directa', etl: 'Proceso ETL',
    directNote: 'Recorrido ilustrativo de consulta para fuentes SQL compatibles. Excel, archivos planos y datos de socios pueden requerir preparación o carga previa; no todas las fuentes admiten consulta directa.',
    etlNote: 'Recorrido ilustrativo de integración: extracción y transformación con SSIS, carga en modelos de reportería de SQL Server y consumo mediante herramientas de reportería y análisis.',
    query: 'SQL Server · Consultas y procedimientos almacenados',
    transform: 'SSIS · Extracción y transformación',
    model: 'SQL Server · Bases de reportería y modelos de datos',
    output: 'SSRS · Reportes / Power BI · Dashboards',
    automation: 'Automatización: SQL Server Agent y procedimientos almacenados para ejecutar procesos; distribución personalizada de reportes SSRS.',
  },
}

export default function BIArchitecture({ language }: { language: 'EN' | 'ES' }) {
  const [path, setPath] = useState<'direct' | 'etl'>('direct')
  const panelId = useId()
  const t = copy[language]
  const steps = path === 'direct' ? [t.query, t.output] : [t.transform, t.model, t.output]

  return (
    <details className="bi-architecture">
      <summary>{t.title}</summary>
      <p className="architecture-note">{t.note}</p>
      <h4>{t.sources}</h4>
      <ul className="architecture-sources">
        {t.categories.map(source => <li key={source}>{source}</li>)}
      </ul>
      <div className="architecture-controls" role="group" aria-label={t.title}>
        {(['direct', 'etl'] as const).map(option => (
          <button key={option} type="button" className={`language-btn ${path === option ? 'active' : ''}`} aria-pressed={path === option} aria-controls={panelId} onClick={() => setPath(option)}>{t[option]}</button>
        ))}
      </div>
      <div id={panelId} role="region" aria-label={t[path]} aria-live="polite">
        <p className="architecture-note">{path === 'direct' ? t.directNote : t.etlNote}</p>
        <ol className="architecture-path">
          {steps.map((step, index) => <li key={step}><span className="architecture-step">{index + 1}</span>{step}</li>)}
        </ol>
      </div>
      <p className="architecture-note">{t.automation}</p>
    </details>
  )
}
