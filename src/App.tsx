
import { useEffect, useState } from 'react'
import './App.css'
import { career } from './career'

const currentYear = new Date().getFullYear()

type Language = 'EN' | 'ES'

const translations = {
  EN: {
    nav: ['Experience', 'Projects', 'Contact'],
    eyebrow: 'BUSINESS INTELLIGENCE & ERP SOLUTIONS',
    role: 'Senior BI & ERP Consultant',
    intro:
      'Transforming business data and processes into intelligent solutions. Over 13 years of experience in Business Intelligence, automation, and enterprise systems.',
    explore: 'Explore Projects',
    years: 'Years of Experience',
    dashboards: 'Power BI Dashboards',
    etl: 'ETL Processes',
    experienceLabel: 'PROFESSIONAL BACKGROUND',
    experienceTitle: 'Professional Experience',
    experienceDescription:
      'Specialist in data solutions, systems integration, business process automation, and ERP platforms.',
    projectsLabel: 'FEATURED WORK',
    projectsTitle: 'Selected Case Studies',
    projects: [
      {
        category: 'DATA & ANALYTICS',
        title: 'Enterprise BI Platform',
        description:
          'Designed and implemented a corporate Business Intelligence platform, integrating data sources, ETL processes, centralized reporting models, and executive dashboards.',
        technologies: ['SQL Server', 'SSIS', 'Power BI'],
      },
      {
        category: 'BUSINESS APPLICATIONS',
        title: 'Warehouse Management Solutions',
        description:
          'Developed business applications using Microsoft Power Apps to support inventory counts, warehouse picking, and operational workflows.',
        technologies: ['Power Apps', 'Inventory', 'Automation'],
      },
      {
        category: 'ERP AUTOMATION',
        title: 'SAP Business One Automation',
        description:
          'Developed SQL queries, stored procedures, approval workflows, and VB.NET add-ons to support ERP operations and business process automation.',
        technologies: ['SAP Business One', 'SQL', 'VB.NET'],
      },
    ],
    contactLabel: 'GET IN TOUCH',
    contactTitle: "Let's build something valuable.",
    contactDescription:
      'Interested in Business Intelligence, ERP solutions, or process automation? Let’s connect.',
    contactButton: 'Contact Me',
    footer: 'Professional Portfolio',
  },
  ES: {
    nav: ['Experiencia', 'Proyectos', 'Contacto'],
    eyebrow: 'INTELIGENCIA DE NEGOCIOS Y SOLUCIONES ERP',
    role: 'Consultor Senior de BI y ERP',
    intro:
      'Transformando datos y procesos empresariales en soluciones inteligentes. Más de 13 años de experiencia en Inteligencia de Negocios, automatización y sistemas empresariales.',
    explore: 'Explorar proyectos',
    years: 'Años de experiencia',
    dashboards: 'Dashboards Power BI',
    etl: 'Procesos ETL',
    experienceLabel: 'TRAYECTORIA PROFESIONAL',
    experienceTitle: 'Experiencia profesional',
    experienceDescription:
      'Especialista en soluciones de datos, integración de sistemas, automatización de procesos empresariales y plataformas ERP.',
    projectsLabel: 'TRABAJOS DESTACADOS',
    projectsTitle: 'Casos de éxito',
    projects: [
      {
        category: 'DATOS Y ANALÍTICA',
        title: 'Plataforma corporativa de BI',
        description:
          'Diseño e implementación de una plataforma corporativa de Inteligencia de Negocios, integrando fuentes de datos, procesos ETL, modelos centralizados de reportería y dashboards ejecutivos.',
        technologies: ['SQL Server', 'SSIS', 'Power BI'],
      },
      {
        category: 'APLICACIONES EMPRESARIALES',
        title: 'Soluciones de gestión de almacenes',
        description:
          'Desarrollo de aplicaciones empresariales con Microsoft Power Apps para conteos físicos, picking de almacén y procesos operativos.',
        technologies: ['Power Apps', 'Inventarios', 'Automatización'],
      },
      {
        category: 'AUTOMATIZACIÓN ERP',
        title: 'Automatización SAP Business One',
        description:
          'Desarrollo de consultas SQL, procedimientos almacenados, flujos de aprobación y complementos VB.NET para operaciones ERP y automatización empresarial.',
        technologies: ['SAP Business One', 'SQL', 'VB.NET'],
      },
    ],
    contactLabel: 'CONTACTO',
    contactTitle: 'Construyamos algo valioso.',
    contactDescription:
      '¿Te interesan las soluciones de Inteligencia de Negocios, ERP o automatización de procesos? Conversemos.',
    contactButton: 'Contactar',
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

function App() {
  const [language, setLanguage] = useState<Language>('ES')
  const t = translations[language]

  const background = career[language]

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase()
    document.title = language === 'ES'
      ? 'Andrés Rossil | Consultor Senior de BI y ERP'
      : 'Andrés Rossil | Senior BI & ERP Consultant'
  }, [language])

  return (
    <main className="portfolio">
      <nav className="navbar">
        <a className="logo" href="#inicio">
          AR<span>.</span>
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
            Andrés <span>Rossil.</span>
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

        <div className="hero-decoration" aria-hidden="true">
          <div className="decoration-circle">
            <span>AR</span>
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

              <p>{project.description}</p>

              <dl className="case-details">
                <dt>{background.solution}</dt>
                <dd>{background.cases[index].solution}</dd>
                <dt>{background.result}</dt>
                <dd>{background.cases[index].result}</dd>
              </dl>

              <div className="project-technologies">
                {project.technologies.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="section-description case-note">{background.note}</p>
      </section>

      <footer id="contacto">
        <p className="eyebrow">{t.contactLabel}</p>

        <h2>{t.contactTitle}</h2>

        <p className="contact-description">
          {t.contactDescription}
        </p>

        <a
          className="primary contact-button"
          href="mailto:nestorrossil@hotmail.com"
        >
          {t.contactButton} →
        </a>

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
