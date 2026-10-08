import { useState, useEffect } from 'react';
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

const CHRONICLES_BOOKS = [
  {
    id: 'academy',
    number: 'I',
    title: 'The Academy',
    shortTitle: 'The Academy',
    date: '2023 — 2027',
    place: 'G Narayanamma Institute of Technology and Science',
    cover: '#263f2d',
    coverLight: '#719b69',
    accent: '#9bc98b',

    chapters: [
      {
        number: 'I',
        title: 'The Academy',
        date: '2023 — 2027',
        place: 'G Narayanamma Institute of Technology and Science',
        text:
          'B.Tech Computer Science Engineering at GNITS. A chapter of learning, experimentation, problem solving and discovering how ideas can become real applications.',
      },
      {
        number: 'II',
        title: 'The Student',
        date: 'Present',
        place: 'Computer Science Engineering',
        text:
          'The journey has grown through programming, artificial intelligence, databases, web development and countless hours spent understanding how software works beneath the surface.',
      },
      {
        number: 'III',
        title: 'The Record',
        date: 'Academic journey',
        place: 'GNITS',
        text:
          'Academic excellence has remained an important part of the journey, alongside the desire to keep exploring technologies beyond the classroom.',
      },
    ],
  },

  {
    id: 'microsoft',
    number: 'II',
    title: 'The Microsoft Chapter',
    shortTitle: 'Microsoft',
    date: 'May — July 2026',
    place: 'Microsoft · Bangalore',
    cover: '#26394d',
    coverLight: '#7294b8',
    accent: '#a7c8ed',

    chapters: [
      {
        number: 'I',
        title: 'The Internship',
        date: 'May — July 2026',
        place: 'Microsoft · Bangalore',
        text:
          'A Software Engineering Internship where I worked on automating end-to-end UI testing using Playwright.',
      },
      {
        number: 'II',
        title: 'The Workflow',
        date: 'Engineering work',
        place: 'E2E UI Automation',
        text:
          'I developed automated workflows for UI testing, focusing on reliable and deterministic execution of multi-step interactions.',
      },
      {
        number: 'III',
        title: 'The Copilot Skill',
        date: 'A chapter in AI',
        place: 'Workflow automation',
        text:
          'I also developed a skill for Copilot containing workflow logic and deterministic scripts designed to ensure that Copilot followed the required steps without skipping parts of the workflow.',
      },
    ],
  },

  {
    id: 'earlier-years',
    number: 'III',
    title: 'The Earlier Years',
    shortTitle: 'Earlier Years',
    date: '2008 — 2022',
    place: 'Pallavi Model School · Gowtham Junior College',
    cover: '#49382b',
    coverLight: '#b08a61',
    accent: '#d7b27d',

    chapters: [
      {
        number: 'I',
        title: 'The Beginning',
        date: '2008 — 2020',
        place: 'Pallavi Model School',
        text:
          'The earlier years began at Pallavi Model School, where the foundations of curiosity, discipline and learning were built.',
      },
      {
        number: 'II',
        title: 'The Foundation',
        date: 'Schooling',
        place: 'CBSE',
        text:
          'Completed 10th Grade under the CBSE curriculum with an aggregate of 9.75.',
      },
      {
        number: 'III',
        title: 'The Next Chapter',
        date: '2020 — 2022',
        place: 'Gowtham Junior College',
        text:
          'Completed Intermediate with an aggregate of 9.77 before beginning the next chapter in Computer Science Engineering.',
      },
    ],
  },
];


/* ---------------------------------------------------------
   TYPING TEXT
   Makes the words appear as if they are being written.
--------------------------------------------------------- */

function ChronicleTyping({
  text,
  speed = 18,
}) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');

    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;

      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => {
      window.clearInterval(timer);
    };
  }, [text, speed]);

  return (
    <span className="chronicle-typing">
      {displayedText}
      {displayedText.length < text.length && (
        <span className="typing-cursor">▌</span>
      )}
    </span>
  );
}


/* ---------------------------------------------------------
   BOOK COVER
--------------------------------------------------------- */

function ChronicleBook({
  book,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      className={`chronicle-library-book ${
        selected ? 'chronicle-library-book--selected' : ''
      }`}
      style={{
        '--book-cover': book.cover,
        '--book-cover-light': book.coverLight,
        '--book-accent': book.accent,
      }}
      onClick={() => onSelect(book)}
      aria-label={`Open ${book.title}`}
    >
      <span className="chronicle-book-shadow" />

      <span className="chronicle-book-cover">
        <span className="chronicle-book-number">
          {book.number}
        </span>

        <span className="chronicle-book-decoration">
          ✦
        </span>

        <span className="chronicle-book-title">
          {book.shortTitle}
        </span>

        <span className="chronicle-book-subtitle">
          THE CHRONICLES
        </span>

        <span className="chronicle-book-line" />
      </span>

      <span className="chronicle-book-spine">
        {book.number}
      </span>
    </button>
  );
}


/* ---------------------------------------------------------
   LIBRARY SHELF
--------------------------------------------------------- */

function ChronicleLibrary({
  selectedBook,
  onSelect,
}) {
  return (
    <div className="chronicles-library">
      <div className="chronicles-library-heading">
        <span className="chronicles-library-rule" />

        <span>
          THE LIBRARY OF MY JOURNEY
        </span>

        <span className="chronicles-library-rule" />
      </div>

      <p className="chronicles-library-hint">
        Choose a volume to open its story.
      </p>

      <div className="chronicles-shelf">
        <div className="chronicles-books">
          {CHRONICLES_BOOKS.map((book) => (
            <ChronicleBook
              key={book.id}
              book={book}
              selected={selectedBook?.id === book.id}
              onSelect={onSelect}
            />
          ))}
        </div>

        <div className="chronicles-shelf-board" />
      </div>
    </div>
  );
}


/* ---------------------------------------------------------
   OPEN BOOK
--------------------------------------------------------- */

function ChronicleBookSpread({
  book,
  currentChapter,
  isTurning,
  onClose,
  onPrevious,
  onNext,
  onTurnPage,
}) {
  const chapter = book.chapters[currentChapter];

  const isLastChapter =
    currentChapter >= book.chapters.length - 1;

  return (
    <div className="chronicles-overlay">
      <div className="chronicles-open-book">

        {/* HEADER */}
        <div className="chronicles-open-header">

          <div>
            <span className="chronicles-open-eyebrow">
              THE CHRONICLES · VOLUME {book.number}
            </span>

            <span className="chronicles-writing-status">
              <span className="chronicles-status-dot" />

              {isTurning
                ? 'Turning the page...'
                : isLastChapter
                ? 'The story is complete.'
                : 'The ink is writing...'}
            </span>
          </div>

          <button
            type="button"
            className="chronicles-close"
            onClick={onClose}
            aria-label="Close book"
          >
            ×
          </button>

        </div>


        {/* BOOK */}
        <div className="chronicles-book-spread">

          {/* CURRENT PAGE */}
          <div className="chronicles-page chronicles-page-left">

            <article
              className={`chronicles-written-page chronicles-sequential-page ${
                isTurning
                  ? 'chronicles-page-turning'
                  : 'chronicles-written-page--visible'
              }`}
              onClick={!isTurning ? onTurnPage : undefined}
            >

              <div className="chronicles-page-seal">
                {chapter.number}
              </div>

              <div className="chronicles-page-content">

                <span className="chronicles-page-date">
                  {chapter.date}
                </span>

                <h2>
                  {chapter.title}
                </h2>

                <h3>
                  {chapter.place}
                </h3>

                <p>
                  <ChronicleTyping
                    key={`${book.id}-${currentChapter}`}
                    text={chapter.text}
                    speed={17}
                  />
                </p>

              </div>

            </article>

          </div>


          {/* BINDING */}
          <div
            className="chronicles-book-binding"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>


          {/* RIGHT PAGE — intentionally empty */}
          <div className="chronicles-page chronicles-page-right">

            <div className="chronicles-empty-page">
              <span className="chronicles-page-number">
                VOLUME {book.number}
              </span>
            </div>

          </div>


          {/* PHYSICAL PAGE TURN */}
          {isTurning && (
            <div className="chronicles-page-turn-layer">

              <div className="chronicles-page-turn-sheet">

                <div className="chronicles-page-turn-front">
                  <span className="chronicles-page-seal">
                    {chapter.number}
                  </span>

                  <div className="chronicles-page-content">
                    <span className="chronicles-page-date">
                      {chapter.date}
                    </span>

                    <h2>{chapter.title}</h2>

                    <h3>{chapter.place}</h3>
                  </div>
                </div>

                <div className="chronicles-page-turn-back" />

              </div>

            </div>
          )}

        </div>


        {/* FOOTER */}
        <div className="chronicles-book-footer">

          <div className="chronicles-footer-left">

            <span className="chronicles-page-progress">
              PAGE {currentChapter + 1} / {book.chapters.length}
            </span>

            {!isLastChapter && (
              <button
                type="button"
                className="chronicles-reveal-button"
                onClick={onTurnPage}
                disabled={isTurning}
              >
                TURN PAGE
                <span>→</span>
              </button>
            )}

            {isLastChapter && (
              <span className="chronicles-story-complete">
                THE STORY IS COMPLETE
              </span>
            )}

          </div>


          <div className="chronicles-book-navigation">

            <button
              type="button"
              onClick={onPrevious}
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={onNext}
            >
              Next →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   CHRONICLES PAGE
========================================================= */

function Chronicles({ onNavigate }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const [currentChapter, setCurrentChapter] = useState(0);

  const [isTurning, setIsTurning] = useState(false);


  /* -------------------------------------------------------
     Open a book
  ------------------------------------------------------- */

  const openBook = (book) => {
    setCurrentChapter(0);
    setIsTurning(false);
    setSelectedBook(book);
  };


  /* -------------------------------------------------------
     Close the book
  ------------------------------------------------------- */

  const closeBook = () => {
    setSelectedBook(null);
    setCurrentChapter(0);
    setIsTurning(false);
  };


  /* -------------------------------------------------------
     Turn to the next chapter
  ------------------------------------------------------- */

  const turnPage = () => {
  if (!selectedBook) return;

  if (isTurning) return;

  if (
    currentChapter >=
    selectedBook.chapters.length - 1
  ) {
    return;
  }

  setIsTurning(true);

  window.setTimeout(() => {
    setCurrentChapter((chapter) => chapter + 1);
    setIsTurning(false);
  }, 900);
};


  /* -------------------------------------------------------
     Previous / Next BOOK
  ------------------------------------------------------- */

  const currentIndex = selectedBook
    ? CHRONICLES_BOOKS.findIndex(
        (book) => book.id === selectedBook.id
      )
    : -1;


  const previousBook =
    currentIndex > 0
      ? CHRONICLES_BOOKS[currentIndex - 1]
      : CHRONICLES_BOOKS[
          CHRONICLES_BOOKS.length - 1
        ];


  const nextBook =
    currentIndex < CHRONICLES_BOOKS.length - 1
      ? CHRONICLES_BOOKS[currentIndex + 1]
      : CHRONICLES_BOOKS[0];


  /* -------------------------------------------------------
     Keyboard controls
  ------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedBook) return;

      if (event.key === 'Escape') {
        closeBook();
        return;
      }

      if (event.key === 'ArrowRight') {
        turnPage();
        return;
      }

      if (event.key === 'ArrowLeft') {
        openBook(previousBook);
      }
    };


    window.addEventListener(
      'keydown',
      handleKeyDown
    );


    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [
    selectedBook,
    currentChapter,
    isTurning,
    currentIndex,
  ]);


  return (
    <PageShell
      eyebrow="THE CHRONICLES"
      title="A story still being written"
      onNavigate={onNavigate}
    >

      <div className="chronicles-page-wrapper">

        {/* LIBRARY */}
        <ChronicleLibrary
          selectedBook={selectedBook}
          onSelect={openBook}
        />


        {/* OPEN BOOK */}
        {selectedBook && (
          <ChronicleBookSpread
            book={selectedBook}
            currentChapter={currentChapter}
            isTurning={isTurning}
            onClose={closeBook}
            onPrevious={() =>
              openBook(previousBook)
            }
            onNext={() =>
              openBook(nextBook)
            }
            onTurnPage={turnPage}
          />
        )}

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