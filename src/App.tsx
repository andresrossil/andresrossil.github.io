
import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { career } from './career'
import BIArchitecture from './BIArchitecture'
import WarehouseDemo from './WarehouseDemo'
import EnterpriseDemo from './EnterpriseDemo'
import { appReducer, initialAppState } from './enterpriseData'

const currentYear = new Date().getFullYear()

type Language = 'EN' | 'ES'

const translations = {
  EN: {
    nav: ['Experience', 'Projects', 'Contact'],
    eyebrow: 'BUSINESS INTELLIGENCE & ERP SOLUTIONS',
    role: 'Senior BI & ERP Consultant',
    intro:
      '13+ years in BI and ERP, including end-to-end responsibility for the design and implementation of a corporate BI platform. Technical experience with SQL Server, Power BI, SSIS, Power Apps and SAP.',
    explore: 'Explore Projects',
    sapExperience: '10+ years working with SAP Business One as part of broader BI and ERP responsibilities.',
    years: 'Years of Experience',
    dashboards: 'Power BI Dashboards',
    etl: 'ETL Processes',
    experienceLabel: 'PROFESSIONAL BACKGROUND',
    experienceTitle: 'Professional Experience',
    experienceDescription:
      'Experience spanning BI architecture, ETL development, data modeling, enterprise applications and ERP functional support.',
    projectsLabel: 'FEATURED WORK',
    projectsTitle: 'Selected Case Studies',
    projects: [
      {
        category: 'DATA & ANALYTICS',
        title: 'Corporate BI Platform',
        description:
          'Corporate BI platform combining SQL Server reporting databases, SSIS data integration, centralized data models and Power BI dashboards.',
        technologies: ['SQL Server', 'SSIS', 'Power BI', 'SSRS', 'SQL Server Agent'],
      },
      {
        category: 'BUSINESS APPLICATIONS',
        title: 'Warehouse & Distribution Solutions',
        description:
          'Independent business applications originally developed in Power Apps for warehouse operations and fleet and delivery management, sharing operational information.',
        technologies: ['Power Apps', 'Inventory', 'Automation'],
      },
      {
        category: 'ERP AUTOMATION',
        title: 'SAP Business One Extensions and Automation',
        description:
          'SAP Business One extensions using VB.NET, SQL queries, stored procedures, formatted searches and approval procedures.',
        technologies: ['SAP Business One', 'SQL', 'VB.NET'],
      },
    ],
    contactLabel: 'GET IN TOUCH',
    contactTitle: 'Professional Contact',
    contactDescription:
      'For employment opportunities, technical collaboration or professional enquiries in Business Intelligence, data integration, Power Apps and SAP.',
    contactButton: 'Email',
    footer: 'Professional Portfolio',
  },
  ES: {
    nav: ['Experiencia', 'Proyectos', 'Contacto'],
    eyebrow: 'INTELIGENCIA DE NEGOCIOS Y SOLUCIONES ERP',
    role: 'Consultor Senior de BI y ERP',
    intro:
      '13+ años en BI y ERP, con responsabilidad integral en el diseño e implementación de una plataforma corporativa de BI. Experiencia técnica con SQL Server, Power BI, SSIS, Power Apps y SAP.',
    explore: 'Explorar proyectos',
    sapExperience: 'Más de 10 años trabajando con SAP Business One dentro de responsabilidades más amplias de BI y ERP.',
    years: 'Años de experiencia',
    dashboards: 'Dashboards Power BI',
    etl: 'Procesos ETL',
    experienceLabel: 'TRAYECTORIA PROFESIONAL',
    experienceTitle: 'Experiencia profesional',
    experienceDescription:
      'Experiencia en arquitectura de BI, desarrollo de procesos ETL, modelado de datos, aplicaciones empresariales y soporte funcional ERP.',
    projectsLabel: 'TRABAJOS DESTACADOS',
    projectsTitle: 'Casos de experiencia',
    projects: [
      {
        category: 'DATOS Y ANALÍTICA',
        title: 'Plataforma corporativa de BI',
        description:
          'Plataforma corporativa de BI que integra bases de reportería en SQL Server, procesos de integración con SSIS, modelos de datos centralizados y dashboards en Power BI.',
        technologies: ['SQL Server', 'SSIS', 'Power BI', 'SSRS', 'SQL Server Agent'],
      },
      {
        category: 'APLICACIONES EMPRESARIALES',
        title: 'Soluciones de almacén y distribución',
        description:
          'Aplicaciones empresariales independientes desarrolladas originalmente en Power Apps para operaciones de almacén y gestión de flota y entregas, con información operativa compartida.',
        technologies: ['Power Apps', 'Inventarios', 'Automatización'],
      },
      {
        category: 'AUTOMATIZACIÓN ERP',
        title: 'Extensiones y automatización de SAP Business One',
        description:
          'Extensiones de SAP Business One mediante VB.NET, consultas SQL, procedimientos almacenados, búsquedas formateadas y procedimientos de aprobación.',
        technologies: ['SAP Business One', 'SQL', 'VB.NET'],
      },
    ],
    contactLabel: 'CONTACTO',
    contactTitle: 'Contacto profesional',
    contactDescription:
      'Contacto para oportunidades laborales, colaboración técnica o consultas profesionales en Business Intelligence, integración de datos, Power Apps y SAP.',
    contactButton: 'Correo electrónico',
    footer: 'Portafolio profesional',
  },
}

const skills = [
  'Power BI',
  'SQL Server',
  'SSIS',
  'SSRS',
  'Crystal Reports',
  'Power Apps',
  'SAP Business One',
  'SAP S/4HANA',
  'Data Modeling',
  'ETL / ELT',
]

const projectRoutes = ['corporate-bi-platform', 'warehouse-operations', 'sap-business-one']

function App() {
  const [enterpriseState, enterpriseDispatch] = useReducer(appReducer, undefined, initialAppState)
  const [language, setLanguage] = useState<Language>('EN')
  const [hash, setHash] = useState(() => window.location.hash)
  const caseIndex = projectRoutes.findIndex(route => hash.split('?')[0] === `#/projects/${route}`)
  const enterpriseMode = caseIndex === 1 ? (hash.endsWith('?warehouseapp') ? 'warehouse' : hash.endsWith('?fleetapp') ? 'fleet' : null) : null
  const t = translations[language]

  const background = career[language]

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase()
    document.title = language === 'ES'
      ? 'Andrés Rossil | Consultor Senior de BI y ERP'
      : 'Andrés Rossil | Senior BI & ERP Consultant'
  }, [language])

  useEffect(() => {
    const navigate = () => setHash(window.location.hash)
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])

  useEffect(() => {
    if (caseIndex >= 0) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (hash.startsWith('#') && !hash.startsWith('#/')) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    }
  }, [hash, caseIndex])

  if (caseIndex === 0 && (hash.endsWith('?warehouse') || hash.endsWith('?demo'))) {
    return <main className="warehouse-app"><header className="warehouse-app-header"><a href="#/projects/corporate-bi-platform">← {language === 'EN' ? 'Back to case study' : 'Volver al caso'}</a><div className="language-switch" role="group" aria-label="Language / Idioma">{(['ES','EN'] as const).map(option=><button key={option} className={`language-btn ${language===option?'active':''}`} aria-pressed={language===option} onClick={()=>setLanguage(option)}>{option}</button>)}</div></header><WarehouseDemo language={language}/></main>
  }

  if (caseIndex >= 0) {
    const project = t.projects[caseIndex]
    const caseStudy = background.cases[caseIndex]
    return (
      <main className={`portfolio project-page ${caseIndex === 0 ? 'bi-project' : ''}`}>
        <nav className="navbar">
          <a className="logo" href="#inicio">AR</a>
          <div className="language-switch" role="group" aria-label="Language / Idioma">
            {(['ES', 'EN'] as const).map(option => <button key={option} type="button" className={`language-btn ${language === option ? 'active' : ''}`} aria-pressed={language === option} onClick={() => setLanguage(option)}>{option}</button>)}
          </div>
        </nav>
        <section className="content project-detail">
          <a className="back-projects" href="#proyectos">← {language === 'EN' ? 'Back to projects' : 'Volver a proyectos'}</a>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="section-description">{project.description}</p>
          <strong className="case-highlight">{caseStudy.highlight}</strong>
          {caseIndex === 0 && <p><a className="back-projects" href="#/projects/corporate-bi-platform?warehouse">{language === 'EN' ? 'View Warehouse Operations Analytics' : 'Ver analítica de operaciones de almacén'} ↓</a></p>}
          {caseIndex === 1 && <div className="enterprise-links"><a className="secondary contact-button" href="#/projects/warehouse-operations?warehouseapp">Warehouse Operations →</a><a className="secondary contact-button" href="#/projects/warehouse-operations?fleetapp">Fleet & Delivery Management →</a></div>}
          {enterpriseMode ? <EnterpriseDemo key={enterpriseMode} mode={enterpriseMode} language={language} state={enterpriseState} dispatch={enterpriseDispatch} /> : <>
          <dl className="case-overview">
            <div><dt>{background.objective}</dt><dd>{caseStudy.objective}</dd></div>
            <div><dt>{background.solution}</dt><dd>{caseStudy.solution}</dd></div>
            <div><dt>{background.result}</dt><dd>{caseStudy.result}</dd></div>
          </dl>
          {caseIndex === 0 && <><BIArchitecture language={language} /></>}
          </>}
          <div className="project-technologies">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
          <a className="secondary contact-button" href="#proyectos">← {language === 'EN' ? 'Back to projects' : 'Volver a proyectos'}</a>
        </section>
      </main>
    )
  }

  return (
    <main className="portfolio">
      <nav className="navbar">
        <a className="logo" href="#inicio">
          AR
        </a>

        <div className="nav-links">
          <a href="#experiencia">{t.nav[0]}</a>
          <a href="#proyectos">{t.nav[1]}</a>
          <a href="#contacto">{t.nav[2]}</a>


<div className="language-switch" role="group" aria-label="Language / Idioma">
  <button
    type="button"
    className={`language-btn ${language === 'ES' ? 'active' : ''}`}
    onClick={() => setLanguage('ES')}
    aria-pressed={language === 'ES'}
  >
    ES
  </button>

  <button
    type="button"
    className={`language-btn ${language === 'EN' ? 'active' : ''}`}
    onClick={() => setLanguage('EN')}
    aria-pressed={language === 'EN'}
  >
    EN
  </button>
</div>

        </div>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-content">
          <p className="eyebrow">{t.eyebrow}</p>

          <h1>
            Andrés <span>Rossil</span>
          </h1>

          <h2>{t.role}</h2>

          <p className="description">{t.intro}</p>

          <div className="actions">
            <a className="primary" href="#proyectos">
              {t.explore} <span aria-hidden="true">→</span>
            </a>

            <a
              className="secondary"
              href="https://github.com/andresrossil"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="decoration-circle">
            <img src="/andres-rossil.png" alt="Andrés Rossil" width="800" height="800" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-item">
          <strong>13+</strong>
          <span>{t.years}</span>
        </div>

        <div className="stat-item">
          <strong>50+</strong>
          <span>{t.dashboards}</span>
        </div>

        <div className="stat-item">
          <strong>20+</strong>
          <span>{t.etl}</span>
        </div>
      </section>

      <section className="content experience" id="experiencia">
        <p className="eyebrow">{t.experienceLabel}</p>

        <h2>{t.experienceTitle}</h2>

        <p className="section-description">
          {t.experienceDescription}
        </p>

        <p className="experience-highlight">{t.sapExperience}</p>

        <ol className="timeline">
          {background.timeline.map(job => (
            <li className="timeline-item" key={`${job.company}-${job.period}`}>
              <p className="timeline-period">{job.period}</p>
              <h3>{job.role}</h3>
              <p className="timeline-company">{job.company}</p>
              {job.details && <p className="timeline-details">{job.details}</p>}
            </li>
          ))}
        </ol>

        <div className="tags">
          {skills.map(skill => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="content projects-section" id="proyectos">
        <p className="eyebrow">{t.projectsLabel}</p>

        <h2>{t.projectsTitle}</h2>

        <div className="projects">
          {t.projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <span className="project-category">
                {String(index + 1).padStart(2, '0')}
                {' / '}
                {project.category}
              </span>

              <h3>{project.title}</h3>

              <strong className="case-highlight">{background.cases[index].highlight}</strong>

              <p>{project.description}</p>

              <a className="case-link" href={`#/projects/${projectRoutes[index]}`}>
                {background.readCase} <span aria-hidden="true">→</span>
              </a>

              <div className="project-technologies">
                {project.technologies.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer id="contacto">
        <p className="eyebrow">{t.contactLabel}</p>

        <h2>{t.contactTitle}</h2>

        <p className="contact-description">
          {t.contactDescription}
        </p>

        <div className="contact-actions">
        <a
          className="primary contact-button"
          href="mailto:nestorrossil@hotmail.com"
        >
          {t.contactButton} →
        </a>
        <a
          className="secondary contact-button"
          href="https://www.linkedin.com/in/andres-rossil-9b958364/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
        </div>

        <div className="footer-bottom">
          <span>
            © {currentYear} Andrés Rossil
          </span>

          <span>{t.footer}</span>
        </div>
      </footer>
    </main>
  )
}

export default App
