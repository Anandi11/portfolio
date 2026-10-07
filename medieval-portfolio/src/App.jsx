import { useState } from 'react';
import './App.css';
import LanternCursor from './components/LanternCursor';
import LandingScene from './scenes/LandingScene';
import WorldScene from './scenes/WorldScene';

const NAV_ITEMS = [
  { id: 'armory', icon: '⚔', label: 'Armory' },
  { id: 'chronicles', icon: '📖', label: 'Chronicles' },
  { id: 'hall', icon: '🏆', label: 'Hall of Fame' },
  { id: 'guild', icon: '🛡', label: 'Guild' },
  { id: 'contact', icon: '✉', label: 'Messenger' },
];

function App() {
  const [page, setPage] = useState('landing');

  const [portalOpen, setPortalOpen] = useState(false);

  const enterRealm = () => {
    setPortalOpen(true);

    window.setTimeout(() => {
      setPage('world');
    }, 1200);
  };

  const goTo = (id) => {
    setPage(id);
  };

  return (
    <div className="app-shell">
      {/* Lantern cursor only exists on the immersive scenes */}
      <LanternCursor enabled={page === 'landing' || page === 'world'} />

      {page === 'landing' && (
        <LandingScene
          opened={portalOpen}
          onEnter={enterRealm}
        />
      )}

      {page === 'world' && (
        <WorldScene
          onNavigate={goTo}
          onBack={() => setPage('landing')}
        />
      )}

      {page === 'armory' && <Armory onNavigate={goTo} />}
      {page === 'chronicles' && <Chronicles onNavigate={goTo} />}
      {page === 'hall' && <HallOfFame onNavigate={goTo} />}
      {page === 'guild' && <Guild onNavigate={goTo} />}
      {page === 'contact' && <Contact onNavigate={goTo} />}
    </div>
  );
}


/* =========================================================
   SHARED INNER PAGE SHELL
========================================================= */

function PageShell({ children, title, eyebrow, onNavigate }) {
  return (
    <main className="realm-page">
      <div className="page-stars" />

      <header className="page-header">
        <button
          className="brand-mark"
          onClick={() => onNavigate('world')}
        >
          THE CHRONICLES OF
          <br />
          <strong>ANANDI RAGHAVI</strong>
        </button>

        <nav className="top-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <section className="page-content">
        <p className="eyebrow">{eyebrow}</p>

        <h1>{title}</h1>

        {children}
      </section>

      <button
        className="return-world"
        onClick={() => onNavigate('world')}
      >
        ← Return to the realm
      </button>
    </main>
  );
}


/* =========================================================
   ARMORY
========================================================= */

function Armory({ onNavigate }) {
  const skills = [
    ['⚔', 'Python', 'Problem solving & AI'],
    ['🗡', 'C', 'Foundations & algorithms'],
    ['🏹', 'Java', 'Object-oriented programming'],
    ['🛡', 'HTML / CSS', 'Web foundations'],
    ['🔮', 'SQL', 'Data & databases'],
    ['📜', 'DSA', 'Logic & competitive problem solving'],
    ['⚙', 'Flask', 'Backend craft'],
    ['💻', 'GitHub', 'Version control & collaboration'],
    ['🧪', 'Google Colab', 'Machine-learning experimentation'],
  ];

  return (
    <PageShell
      eyebrow="THE ARMORY"
      title="Weapons forged through study"
      onNavigate={onNavigate}
    >
      <p className="page-intro">
        Every skill is a weapon. Every technology is another tool
        carried into the next quest.
      </p>

      <div className="armory-grid">
        {skills.map(([icon, name, desc]) => (
          <article className="weapon-card" key={name}>
            <div className="weapon-icon">{icon}</div>

            <h2>{name}</h2>

            <p>{desc}</p>
          </article>
        ))}
      </div>

      <div className="knowledge-panel">
        <span>CORE KNOWLEDGE</span>

        <p>
          OOP · DBMS · Computer Networks · Operating Systems
        </p>
      </div>
    </PageShell>
  );
}


/* =========================================================
   CHRONICLES
========================================================= */

function Chronicles({ onNavigate }) {
  const chapters = [
    {
      number: 'I',
      title: 'The Academy',
      date: '2023 — 2027',
      place: 'G Narayanamma Institute of Technology and Science',
      text:
        'B.Tech Computer Science Engineering (GNITS). Aggregate 9.62.',
    },
    {
      number: 'II',
      title: 'The Internship',
      date: 'May — July 2026',
      place: 'Microsoft · Bangalore',
      text:
        'Software Engineering Intern. Built automated E2E UI test suites using Playwright and designed a Copilot skill with deterministic workflow automation.',
    },
    {
      number: 'III',
      title: 'The Earlier Years',
      date: '2008 — 2022',
      place: 'Pallavi Model School · Gowtham Junior College',
      text:
        '10th Grade (CBSE) aggregate 9.75 and Intermediate (SSC) aggregate 9.77.',
    },
  ];

  return (
    <PageShell
      eyebrow="THE CHRONICLES"
      title="A story still being written"
      onNavigate={onNavigate}
    >
      <div className="book">
        {chapters.map((chapter) => (
          <article className="chapter" key={chapter.number}>
            <div className="chapter-seal">
              {chapter.number}
            </div>

            <div>
              <span className="chapter-date">
                {chapter.date}
              </span>

              <h2>{chapter.title}</h2>

              <h3>{chapter.place}</h3>

              <p>{chapter.text}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}


/* =========================================================
   HALL OF FAME
========================================================= */

function HallOfFame({ onNavigate }) {
  const projects = [
    {
      icon: '🏰',
      title: 'PlaceIt',
      subtitle: 'The Recruitment Citadel',
      stack: 'Flask · SQLAlchemy · Vue.js · Redis · Celery',
      text:
        'A full-stack placement portal connecting students, companies and administrators with role-based dashboards, application tracking, interview scheduling and automated email notifications.',
    },
    {
      icon: '🅿',
      title: 'ParkEasy',
      subtitle: 'The Keeper of the Roads',
      stack: 'Flask · SQLAlchemy · HTML/CSS · Jinja',
      text:
        'A vehicle parking web application where users book hourly parking spots and administrators can manage lots and view booking statistics.',
    },
    {
      icon: '🔮',
      title: 'DR Progression AI',
      subtitle: 'The Oracle of Sight',
      stack: 'Python · PyTorch · OpenCV · Streamlit',
      text:
        'An ML-based tool designed to detect diabetic retinopathy and simulate future progression using EfficientNet classification and CycleGAN stage progression.',
    },
  ];

  return (
    <PageShell
      eyebrow="THE HALL OF FAME"
      title="Artifacts of the journey"
      onNavigate={onNavigate}
    >
      <div className="project-grid">
        {projects.map((project) => (
          <article
            className="project-card"
            key={project.title}
          >
            <div className="project-emblem">
              {project.icon}
            </div>

            <p className="project-subtitle">
              {project.subtitle}
            </p>

            <h2>{project.title}</h2>

            <div className="tech-ribbon">
              {project.stack}
            </div>

            <p>
              {project.text}
            </p>

            <button
              className="rune-button"
              onClick={() =>
                window.alert(
                  'Project details can be linked here later.'
                )
              }
            >
              VIEW ARTIFACT
            </button>
          </article>
        ))}
      </div>
    </PageShell>
  );
}


/* =========================================================
   GUILD
========================================================= */

function Guild({ onNavigate }) {
  const roles = [
    [
      '08/2026 — Present',
      'Vice President',
      'Student Council',
    ],
    [
      '09/2023 — Present',
      'Class Representative',
      'GNITS',
    ],
    [
      '06/2025 — 04/2026',
      'Documentation Head',
      'ACM-W',
    ],
  ];

  const awards = [
    [
      '🥇',
      'First Place',
      'Climate Champion Hackathon · InnovatioCuris',
      '16/11/2024',
    ],
    [
      '👑',
      'Academic Excellence',
      'Highest CGPA in the academic year · GNITS',
      '25/01/2025',
    ],
    [
      '🥈',
      'Second Place',
      'Healthcare Domain · NHETIS Hackathon · GRIET',
      '26/09/2025',
    ],
    [
      '📜',
      'Special Mention',
      'International Press · Model United Nations',
      '28/02/2026',
    ],
  ];

  const certs = [
    'Problem Solving Through Programming in C',
    'Foundation in Programming and Data Science from IIT Madras',
    'Diploma in Programming Languages from IIT Madras',
  ];

  return (
    <PageShell
      eyebrow="THE GUILD"
      title="Deeds, honours & seals"
      onNavigate={onNavigate}
    >
      <div className="guild-layout">

        <section className="guild-section">
          <h2>Honours</h2>

          {awards.map(
            ([icon, title, text, date]) => (
              <article
                className="award-row"
                key={title}
              >
                <span className="award-icon">
                  {icon}
                </span>

                <div>
                  <span>{date}</span>

                  <h3>{title}</h3>

                  <p>{text}</p>
                </div>
              </article>
            )
          )}
        </section>


        <section className="guild-section">
          <h2>Responsibilities</h2>

          {roles.map(
            ([date, title, org]) => (
              <article
                className="role-row"
                key={title}
              >
                <span>{date}</span>

                <strong>{title}</strong>

                <p>{org}</p>
              </article>
            )
          )}

          <h2 className="cert-title">
            Certifications
          </h2>

          <ul className="scroll-list">
            {certs.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </section>

      </div>
    </PageShell>
  );
}


/* =========================================================
   CONTACT
========================================================= */

function Contact({ onNavigate }) {
  return (
    <PageShell
      eyebrow="THE MESSENGER"
      title="Send a message to the realm"
      onNavigate={onNavigate}
    >
      <div className="contact-card">

        <p className="page-intro">
          Whether it is an opportunity, collaboration or
          simply a conversation about technology, the gates
          are open.
        </p>

        <div className="contact-links">
          <a href="mailto:anandiraghavi2005@gmail.com">
            ✉ anandiraghavi2005@gmail.com
          </a>

          <a
            href="https://github.com/Anandi11"
            target="_blank"
            rel="noreferrer"
          >
            ◈ github.com/Anandi11
          </a>

          <a
            href="https://linkedin.com/in/anandi-raghavi-k"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/anandi-raghavi-k
          </a>

          <a href="tel:6281466649">
            ☏ 6281466649
          </a>
        </div>

        <p className="location">
          Hyderabad, Telangana
        </p>

      </div>
    </PageShell>
  );
}

export default App;