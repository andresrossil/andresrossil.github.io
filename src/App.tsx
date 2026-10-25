
import { useEffect, useState } from 'react'
import './App.css'
import { homeProjects } from './homeProjects'
import { career } from './career'
import BIArchitecture from './BIArchitecture'
import BIReportingCapabilities from './BIReportingCapabilities'
import WarehouseDemo from './WarehouseDemo'
import CTSDashboard from './CTSDashboard'
import LogisticsCase from './LogisticsCase'
import DataArchitectureCase from './DataArchitectureCase'
import SAPCase from './SAPCase'

const currentYear = new Date().getFullYear()

type Language = 'EN' | 'ES'

const translations = {
  EN: {
    nav: ['Projects', 'Experience', 'Contact'],
    eyebrow: 'BUSINESS INTELLIGENCE & ERP SOLUTIONS',
    role: 'Senior Enterprise Systems & BI Solutions Consultant',
    intro:
      "I work at the intersection of business operations and technology, translating operational requirements into practical enterprise solutions. My experience spans solution design, SAP Business One implementation and customization, SQL Server, data integration, business intelligence and process automation—from identifying business needs to delivering working solutions.",
    specialty: 'SAP Business One | SQL Server | Business Intelligence | Enterprise Integration',
    approach: 'How I work',
    capabilities: [
      ['Business Needs Analysis','Working directly with business teams to understand operational needs and problems.'],
      ['Solution Design','Evaluating alternatives and proposing practical technical solutions.'],
      ['Implementation & Integration','Developing, configuring and integrating enterprise systems.'],
      ['Business Intelligence & Automation','Turning data and processes into tools that support decision-making.'],
    ],
    explore: 'Explore Projects',
    sapExperience: '10+ years working with SAP Business One as part of broader BI and ERP responsibilities. Installation and configuration of SAP Business One and SQL Server environments, company databases, services and web access; functional and administrative ERP configuration, native forms, process controls and external integrations. Approximately ten companies configured in SAP Business One.',
    years: 'Years of Experience',
    dashboards: 'Power BI Dashboards',
    etl: 'ETL Processes',
    experienceLabel: 'PROFESSIONAL BACKGROUND',
    experienceTitle: 'Professional Experience',
    experienceDescription:
      'Business needs analysis, solution design and end-to-end implementation, backed by hands-on BI, SQL Server, integration and ERP experience.',
    projectsLabel: 'FEATURED WORK',
    projectsTitle: 'Selected Case Studies',
    projects: [
      {
        category: 'DATA & ANALYTICS',
        title: 'Corporate BI Platform',
        description:
          'Enterprise BI solutions combining SQL Server, data integration, Power BI dashboards, automated SSRS reporting and Excel analytics.',
        technologies: ['SQL Server', 'SSIS', 'Power BI', 'SSRS', 'Excel', 'SQL Server Agent'],
      },
      {
        category: 'BUSINESS APPLICATIONS',
        title: 'Integrated Logistics Operations Suite',
        description:
          'Four Power Apps applications for warehouse operations, auditing, transport expenses and route delivery, supported by shared SQL Server information and SAP Business One integration.',
        technologies: ['Power Apps', 'SQL Server', 'SAP Business One'],
      },
      {
        category: 'ERP AUTOMATION',
        title: 'SAP Business One Extensions and Automation',
        description:
          'SAP Business One extensions using VB.NET, SQL queries, stored procedures, formatted searches and approval procedures.',
        technologies: ['SAP Business One', 'SQL', 'VB.NET'],
      },
      {category:'DATA ENGINEERING',title:'Enterprise Data Architecture & ETL',description:'Enterprise integration and analytical architecture with SQL Server and SSIS.',technologies:['SQL Server','SSIS','SQL Server Agent','ETL']},
    ],
    contactLabel: 'GET IN TOUCH',
    contactTitle: 'Professional Contact',
    contactDescription:
      'For employment opportunities, technical collaboration or professional enquiries in Business Intelligence, data integration, Power Apps and SAP.',
    contactButton: 'Email',
    footer: 'Professional Portfolio',
  },
  ES: {
    nav: ['Proyectos', 'Experiencia', 'Contacto'],
    eyebrow: 'INTELIGENCIA DE NEGOCIOS Y SOLUCIONES ERP',
    role: 'Consultor sénior en sistemas empresariales y soluciones BI',
    intro:
      'Trabajo en la intersección entre las operaciones empresariales y la tecnología, transformando necesidades operativas en soluciones prácticas. Mi experiencia abarca el diseño de soluciones, implementación y personalización de SAP Business One, SQL Server, integración de datos, inteligencia de negocios y automatización de procesos, desde la identificación de necesidades hasta la implementación.',
    specialty: 'SAP Business One | SQL Server | Inteligencia de negocios | Integración empresarial',
    approach: 'Mi forma de trabajar',
    capabilities: [
      ['Análisis de necesidades','Trabajo directo con las áreas de negocio para comprender necesidades y problemas operativos.'],
      ['Diseño de soluciones','Evaluación de alternativas y propuesta de soluciones técnicas prácticas.'],
      ['Implementación e integración','Desarrollo, configuración e integración de sistemas empresariales.'],
      ['Inteligencia de negocios y automatización','Transformación de datos y procesos en herramientas para la toma de decisiones.'],
    ],
    explore: 'Explorar proyectos',
    sapExperience: 'Más de 10 años trabajando con SAP Business One dentro de responsabilidades más amplias de BI y ERP. Instalación y configuración de entornos SAP Business One y SQL Server, empresas, servicios y acceso web; parametrización funcional y administrativa, formularios nativos, controles de procesos e integraciones externas. Aproximadamente diez empresas configuradas en SAP Business One.',
    years: 'Años de experiencia',
    dashboards: 'Dashboards Power BI',
    etl: 'Procesos ETL',
    experienceLabel: 'TRAYECTORIA PROFESIONAL',
    experienceTitle: 'Experiencia profesional',
    experienceDescription:
      'Análisis de necesidades, diseño de soluciones e implementación de principio a fin, con experiencia técnica en BI, SQL Server, integración y sistemas ERP.',
    projectsLabel: 'TRABAJOS DESTACADOS',
    projectsTitle: 'Casos de experiencia',
    projects: [
      {
        category: 'DATOS Y ANALÍTICA',
        title: 'Plataforma corporativa de BI',
        description:
          'Soluciones empresariales de BI con SQL Server, integración de datos, dashboards Power BI, reportes SSRS automatizados y análisis en Excel.',
        technologies: ['SQL Server', 'SSIS', 'Power BI', 'SSRS', 'Excel', 'SQL Server Agent'],
      },
      {
        category: 'APLICACIONES EMPRESARIALES',
        title: 'Integrated Logistics Operations Suite',
        description:
          'Cuatro aplicaciones Power Apps para almacén, auditoría, gastos de transporte y entregas, con información compartida en SQL Server e integración con SAP Business One.',
        technologies: ['Power Apps', 'SQL Server', 'SAP Business One'],
      },
      {
        category: 'AUTOMATIZACIÓN ERP',
        title: 'Extensiones y automatización de SAP Business One',
        description:
          'Extensiones de SAP Business One mediante VB.NET, consultas SQL, procedimientos almacenados, búsquedas formateadas y procedimientos de aprobación.',
        technologies: ['SAP Business One', 'SQL', 'VB.NET'],
      },
      {category:'INGENIERÍA DE DATOS',title:'Enterprise Data Architecture & ETL',description:'Integración empresarial y arquitectura analítica con SQL Server y SSIS.',technologies:['SQL Server','SSIS','SQL Server Agent','ETL']},
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

const projectRoutes = ['corporate-bi-platform', 'integrated-logistics-operations-suite', 'sap-business-one', 'enterprise-data-architecture-etl']

function App() {
  const [language, setLanguage] = useState<Language>('EN')
  const [hash, setHash] = useState(() => window.location.hash)
  const caseIndex = projectRoutes.findIndex(route => hash.split('?')[0] === `#/projects/${route}` || (route === 'integrated-logistics-operations-suite' && hash.split('?')[0] === '#/projects/warehouse-operations'))
  const t = translations[language]

  const background = career[language]

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase()
    document.title = language === 'ES'
      ? 'Andrés Rossil | Consultor sénior en sistemas empresariales y BI'
      : 'Andrés Rossil | Senior Enterprise Systems & BI Solutions Consultant'
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

  if (caseIndex === 0 && hash.endsWith('?cts')) {
    return <main className="warehouse-app"><header className="warehouse-app-header"><a href="#/projects/corporate-bi-platform">{language === 'EN' ? 'Back to case study' : 'Volver al caso'}</a><div className="language-switch" role="group" aria-label="Language / Idioma">{(['ES','EN'] as const).map(option=><button key={option} className={`language-btn ${language===option?'active':''}`} aria-pressed={language===option} onClick={()=>setLanguage(option)}>{option}</button>)}</div></header><CTSDashboard language={language}/></main>
  }

  if (caseIndex === 0 && (hash.endsWith('?warehouse') || hash.endsWith('?demo'))) {
    return <main className="warehouse-app"><header className="warehouse-app-header"><a href="#/projects/corporate-bi-platform">{language === 'EN' ? 'Back to case study' : 'Volver al caso'}</a><div className="language-switch" role="group" aria-label="Language / Idioma">{(['ES','EN'] as const).map(option=><button key={option} className={`language-btn ${language===option?'active':''}`} aria-pressed={language===option} onClick={()=>setLanguage(option)}>{option}</button>)}</div></header><WarehouseDemo language={language}/></main>
  }

  if (caseIndex === 1) {
    return <main className="portfolio project-page"><nav className="navbar"><a className="logo" href="#inicio">AR</a><div className="language-switch" role="group" aria-label="Language / Idioma">{(['ES','EN'] as const).map(option=><button key={option} className={`language-btn ${language===option?'active':''}`} aria-pressed={language===option} onClick={()=>setLanguage(option)}>{option}</button>)}</div></nav><LogisticsCase language={language}/></main>
  }

  if (caseIndex === 2) {
    return <main className="portfolio project-page"><nav className="navbar"><a className="logo" href="#inicio">AR</a><div className="language-switch" role="group" aria-label="Language / Idioma">{(['ES','EN'] as const).map(option=><button key={option} type="button" className={`language-btn ${language===option?'active':''}`} aria-pressed={language===option} onClick={()=>setLanguage(option)}>{option}</button>)}</div></nav><SAPCase language={language}/></main>
  }

  if (caseIndex === 3) {
    return <main className="portfolio project-page"><nav className="navbar"><a className="logo" href="#inicio">AR</a><div className="language-switch" role="group" aria-label="Language / Idioma">{(['ES','EN'] as const).map(option=><button key={option} type="button" className={`language-btn ${language===option?'active':''}`} aria-pressed={language===option} onClick={()=>setLanguage(option)}>{option}</button>)}</div></nav><DataArchitectureCase language={language}/></main>
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
          <a className="back-projects" href="#proyectos">{language === 'EN' ? 'Back to projects' : 'Volver a proyectos'}</a>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="section-description">{project.description}</p>
          <strong className="case-highlight">{caseStudy.highlight}</strong>
          {caseIndex === 0 && <p><a className="back-projects" href="#/projects/corporate-bi-platform?warehouse">{language === 'EN' ? 'View Warehouse Operations Analytics' : 'Ver analítica de operaciones de almacén'}</a></p>}
          {caseIndex === 0 && <p><a className="back-projects" href="#/projects/corporate-bi-platform?cts">{language === 'EN' ? 'View Cost to Serve' : 'Ver Cost to Serve'}</a></p>}
          <dl className="case-overview">
            <div><dt>{background.objective}</dt><dd>{caseStudy.objective}</dd></div>
            <div><dt>{background.solution}</dt><dd>{caseIndex===0?(language==='ES'?'Comprensión de necesidades de información, preparación de consultas SQL y estructuras de datos, desarrollo de análisis y reportes, y automatización de su distribución. Adaptación de cada solución a las herramientas y accesos disponibles para los usuarios.':'Understanding information needs, preparing SQL queries and data structures, developing analytics and reports, and automating distribution. Adapting each solution to the tools and access available to its users.'):caseStudy.solution}</dd></div>
            <div><dt>{background.result}</dt><dd>{caseStudy.result}</dd></div>
          </dl>
          {caseIndex === 0 && <><BIReportingCapabilities language={language}/><BIArchitecture language={language} /></>}
          <div className="project-technologies">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
          <a className="secondary contact-button" href="#proyectos">{language === 'EN' ? 'Back to projects' : 'Volver a proyectos'}</a>
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
          <p className="hero-specialty">{t.specialty}</p>

          <p className="description">{t.intro}</p>

          <div className="actions">
            <a className="primary" href="mailto:nestorrossil@hotmail.com">{language==='ES'?'Contactar':'Contact'}</a>
            <a className="primary" href="#proyectos">
              {t.explore}
            </a>

            <a
              className="secondary"
              href="https://github.com/andresrossil"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a className="secondary" href="#experiencia" onClick={e=>{e.preventDefault();document.getElementById('experiencia')?.scrollIntoView({behavior:'smooth'})}}>
              {language==='ES'?'Experiencia':'Experience'}
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

      <div className="home-capabilities" role="region" aria-label={t.approach}>
        <ul>{t.capabilities.map(([title,text],i)=><li key={title}><span aria-hidden="true">0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ul>
      </div>

      <section className="content projects-section" id="proyectos">
        <p className="eyebrow">{t.projectsLabel}</p>

        <h2>{t.projectsTitle}</h2>

        <div className="projects projects-four">
          {t.projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <span className="project-category">
                {String(index + 1).padStart(2, '0')}
                {' / '}
                {project.category}
              </span>

              <h3>{homeProjects[language][index].title}</h3>

              <p className="project-subtitle">{homeProjects[language][index].subtitle}</p>
              <strong className="case-highlight">{homeProjects[language][index].highlight}</strong>
              <dl className="home-project-scope">
                <div><dt>{language==='ES'?'Alcance':'Scope'}</dt><dd>{homeProjects[language][index].scope}</dd></div>
                <div><dt>{language==='ES'?'Mi responsabilidad':'My responsibility'}</dt><dd>{homeProjects[language][index].role}</dd></div>
                <div><dt>{language==='ES'?'Procesos empresariales':'Business processes'}</dt><dd>{homeProjects[language][index].processes}</dd></div>
              </dl>

              <a className="case-link" href={`#/projects/${projectRoutes[index]}`}>
                {background.readCase}
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
            <span key={skill}>{language==='ES' && skill==='Data Modeling'?'Modelado de datos':language==='ES' && skill==='ETL / ELT'?'Integración de datos · ETL / ELT':skill}</span>
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
          {t.contactButton}
        </a>
        <a
          className="secondary contact-button"
          href="https://www.linkedin.com/in/andres-rossil-9b958364/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
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
