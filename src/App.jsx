import { useState, useEffect } from 'react'
import './App.css'

const THEME_KEY = 'portfolio-theme'

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
]

const resume = {
  name: 'Srikanth Chowdari Tallapaneni',
  about: 'Software Engineer with experience in full-stack development, cloud platforms, and building scalable applications. Focused on clean code, system reliability, and continuous improvement.',
  resumePdfUrl: '/resume.pdf',
  contact: {
    phone: '(+91) 9849625597',
    address: '14-2-30/4, Kandukur, Andhra Pradesh, India 523105',
    email: 'srikanthchowdaritallapaneni@gmail.com',
    linkedin: 'https://www.linkedin.com/in/srikanthchowdaritallapaneni/',
  },
  education: {
    institution: 'Andhra University (Visakhapatnam, Andhra Pradesh - India)',
    period: 'Aug 2016 - Apr 2020',
    degree: 'Bachelor of Technology - Computer Science and Engineering',
  },
  experience: [
    {
      role: 'Software Engineer',
      company: 'IBM',
      location: 'India',
      period: 'Nov 2023 - Till Date',
      bullets: [
        'Defined an error framework for better logging of errors in the overall application making it quick and easier to debug issues.',
        'Made use of MDC and ThreadContextMapFilter to segregate logs in a better way for understanding the flow of the application and identify the failures quickly.',
        'Utilized AWS S3 Cloud Object Storage to ingest and retrieve COG files, enabling real-time processing and API-based streaming of Geospatial data.',
        'Implemented Disaster Recovery (DR) solutions by designing and addressing various failure scenarios, enhancing system availability and resilience.',
        "Open-source contributor to IBM's Environmental-Intelligence GitHub project, showcasing the capabilities of IBM EI.",
        'Implemented caching mechanism by making use of ibmcloud which resulted in reduction of query time by more than 90% without increasing costs.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'CGI Information Systems and Management',
      location: 'India',
      period: 'Oct 2022 - Nov 2023',
      bullets: [
        'Orchestrated the creation of libraries and their deployment in a private NPM Registry, optimizing code re-usability and fostering a collaborative development environment; engineered Micro-Frontend web components with Angular elements, incorporating dynamic input fields and tailored validation through Reactive forms.',
        'Implemented real-time WebSocket communication and localization for languages such as English, Spanish, etc.',
        'Revamped REST API performance by implementing Hazelcast caching mechanism, resulting in an impressive 40% reduction in response time, enhancing user experience and overall system efficiency.',
        'Implemented thread pools to call REST APIs via services, slashing feature duration from 2 minutes to a mere 6 seconds, improving response time.',
        'Engaged in code reviews, reinforcing best practices and improving code quality, resulting in a 20% reduction in post-deployment issues.',
      ],
    },
  ],
  projects: [
    {
      name: 'Outage Prediction - IBM (ISL)',
      url: 'https://www.ibm.com/docs/en/environmental-intel-suite?topic=solutions-outage-prediction',
      period: 'May 2025 - till date',
      tech: 'React, NodeJS, PostgreSQL, AWX, Grafana',
      description: 'Outage Prediction provides a central place to view expected service outages and the types of outages within a defined service territory. These predictions help assess the impact of both weather and climate change on a utility system and help to determine the correct response to mitigate the impact.',
    },
    {
      name: 'Environmental Intelligence - IBM (ISL)',
      url: 'https://www.ibm.com/products/environmental-intelligence',
      period: 'Nov 2023 - May 2025',
      tech: 'Springboot, MySQL, Postgres, MongoDB, IBMCloud, AWS',
      description: "IBM Environmental Intelligence Suite is a SaaS platform to monitor, predict, and respond to weather and climate impact. It includes dashboards, alerts and notifications, Geospatial and weather data APIs, and add-ons with industry-specific environmental models for business resilience and optimization. It combines accurate weather, Geospatial, Greenhouse Gas (GHG) emissions and industry-specific data so you can build custom climate adaptation solutions that fit the needs of your enterprise.",
    },
    {
      name: 'CACS - Computer Assisted Collection System - CGI',
      url: 'https://www.cgi.com/au/en-au/solutions/banking-capital-markets/cacs-x-collections',
      period: 'Dec 2020 - Nov 2023',
      tech: 'Angular, Springboot, Kafka, Camunda, Keycloak, MySQL',
      description: "CACS is SaaS offering which offers a fully-integrated, end-to-end default management solution that empowers lenders to navigate cost pressures, streamline third-party integration, adapt to dynamic compliance requirements, and replace outdated processes and technologies. In simpler terms, it provides the lenders with the capabilities of managing defaulted accounts throughout the collection life cycle.",
    },
  ],
  skills: {
    languages: 'Java, Python, C, SQL, HTML, CSS, TypeScript',
    frameworksTools: 'Angular, Angular Material, Web Accessibility, WebSockets, Micro Front End, Springboot, Kubernetes, Docker, Git, Jira, Source Tree, debugging, VS Code, Spring Tool Suite',
  },
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = theme === 'dark'

  return (
    <div className="portfolio">
      <nav className="sticky-nav" aria-label="Page sections">
        <div className="sticky-nav-links">
          {NAV_SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="sticky-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection(id) }}>
              {label}
            </a>
          ))}
        </div>
        <div className="sticky-nav-actions">
          <a href={resume.resumePdfUrl} download="Srikanth_Tallapaneni_Resume.pdf" className="nav-download-btn" title="Download resume (PDF)">
            Download resume
          </a>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-label="Toggle dark mode"
          >
            <span className="theme-toggle-icon" aria-hidden>{isDark ? '☀️' : '🌙'}</span>
            <span className="theme-toggle-label">{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>

      <header className="header" id="about">
        <h1 className="name">{resume.name}</h1>
        <p className="about-intro">{resume.about}</p>
        <div className="contact">
          <span>{resume.contact.phone}</span>
          <span className="separator">•</span>
          <span>{resume.contact.address}</span>
          <span className="separator">•</span>
          <a href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a>
        </div>
        <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
          {resume.contact.linkedin.replace('https://', '')}
        </a>
      </header>

      <section className="section" id="education">
        <h2 className="section-title">Education</h2>
        <div className="education-block">
          <div className="section-row">
            <span className="institution">{resume.education.institution}</span>
            <span className="period">{resume.education.period}</span>
          </div>
          <p className="degree">{resume.education.degree}</p>
        </div>
      </section>

      <section className="section" id="experience">
        <h2 className="section-title">Experience</h2>
        {resume.experience.map((job, i) => (
          <div key={i} className="experience-block">
            <div className="section-row">
              <span className="role-company">{job.role}, {job.company}, {job.location}</span>
              <span className="period">{job.period}</span>
            </div>
            <ul className="bullets">
              {job.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="section" id="projects">
        <h2 className="section-title">Projects</h2>
        {resume.projects.map((project, i) => (
          <div key={i} className="project-block">
            <div className="section-row">
              <span className="project-name">
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </span>
              <span className="period">{project.period}</span>
            </div>
            <p className="tech-stack">{project.tech}</p>
            <ul className="bullets">
              <li>{project.description}</li>
            </ul>
          </div>
        ))}
      </section>

      <section className="section" id="skills">
        <h2 className="section-title">Skills</h2>
        <div className="skills-block">
          <p><strong>Languages:</strong> {resume.skills.languages}</p>
          <p><strong>Frameworks/Tools:</strong> {resume.skills.frameworksTools}</p>
        </div>
      </section>

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? 'back-to-top-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
      >
        ↑
      </button>
    </div>
  )
}

export default App
