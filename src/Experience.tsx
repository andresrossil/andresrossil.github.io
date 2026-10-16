
type Language = 'EN' | 'ES'

type Props = {
  language: Language
}

const experience = [
  {
    period: '2025 – Present',
    periodES: '2025 – Actualidad',
    company: 'Arium',
    titleEN: 'ERP Specialist',
    titleES: 'Especialista ERP',
    descriptionEN:
      'SAP S/4HANA implementation support, master data management, MM and SD functional support, and business application development with Power Apps.',
    descriptionES:
      'Apoyo en implementación SAP S/4HANA, gestión de datos maestros, soporte funcional MM y SD y desarrollo de aplicaciones empresariales con Power Apps.',
    skills: ['SAP S/4HANA', 'MM / SD', 'Power Apps'],
  },
  {
    period: '2017 – 2025',
    periodES: '2017 – 2025',
    company: 'Arium',
    titleEN: 'BI & Data Solutions Consultant',
    titleES: 'Consultor BI y Soluciones de Datos',
    descriptionEN:
      'Designed and implemented the corporate BI platform, developed over 50 Power BI dashboards and more than 20 SSIS ETL processes.',
    descriptionES:
      'Diseño e implementación de la plataforma corporativa BI, desarrollo de más de 50 dashboards Power BI y más de 20 procesos ETL con SSIS.',
    skills: ['Power BI', 'SQL Server', 'SSIS', 'SSRS'],
  },
  {
    period: '2015 – 2017',
    periodES: '2015 – 2017',
    company: 'Arium',
    titleEN: 'SAP Business One Administrator',
    titleES: 'Administrador SAP Business One',
    descriptionEN:
      'ERP administration, SQL development, Crystal Reports, approval procedures, and SAP Business One add-ons developed with VB.NET.',
    descriptionES:
      'Administración ERP, desarrollo SQL, Crystal Reports, procedimientos de aprobación y complementos SAP Business One con VB.NET.',
    skills: ['SAP B1', 'SQL Server', 'VB.NET'],
  },
  {
    period: '2013 – 2015',
    periodES: '2013 – 2015',
    company: 'Granjazul',
    titleEN: 'IT Manager',
    titleES: 'Gerente de IT',
    descriptionEN: '',
    descriptionES: '',
    skills: [],
  },
  {
    period: '2012',
    periodES: '2012',
    company: 'SAPBO',
    titleEN: 'Technical Support',
    titleES: 'Soporte Técnico',
    descriptionEN: '',
    descriptionES: '',
    skills: [],
  },
]

export default function Experience({ language }: Props) {
  return (
    <div className="timeline">
      {experience.map((job, index) => (
        <article className="timeline-item" key={index}>
          <div className="timeline-dot" />

          <div className="timeline-content">
            <span className="timeline-period">
              {language === 'EN' ? job.period : job.periodES}
            </span>

            <h3>
              {language === 'EN' ? job.titleEN : job.titleES}
            </h3>

            <h4>{job.company}</h4>

            {(language === 'EN'
              ? job.descriptionEN
              : job.descriptionES) && (
              <p>
                {language === 'EN'
                  ? job.descriptionEN
                  : job.descriptionES}
              </p>
            )}

            <div className="timeline-skills">
              {job.skills.map(skill => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
