import { useState } from 'react';


/* =========================================================
   DIALOGUE
========================================================= */

const DIALOGUE_OPTIONS = [
  {
    id: 'intro',
    label: 'Introduce yourself',
    type: 'dialogue',
    text:
      "Greetings, traveler. I'm Anandi Raghavi — a Computer Science student who enjoys turning ideas into things people can actually use.",
  },

  {
    id: 'skills',
    label: 'What skills do you have?',
    type: 'page',
    page: 'armory',
  },

  {
    id: 'experience',
    label: 'What is your experience?',
    type: 'page',
    page: 'chronicles',
  },

  {
    id: 'projects',
    label: 'What projects have you worked on?',
    type: 'page',
    page: 'hall',
  },

  {
    id: 'interesting',
    label: 'Anything interesting?',
    type: 'page',
    page: 'guild',
  },
];


/* =========================================================
   MAIN WORLD SCENE
========================================================= */

export default function WorldScene({
  onNavigate,
  onBack,
}) {

  /* -------------------------------------------------------
     KNIGHT HOVER
     ------------------------------------------------------- */

  const [knightHovered, setKnightHovered] =
    useState(false);


  /* -------------------------------------------------------
     DIALOGUE
     ------------------------------------------------------- */

  const [dialogueOpen, setDialogueOpen] =
    useState(false);

  const [dialogueText, setDialogueText] =
    useState(null);


  /* =======================================================
     KNIGHT CLICK
  ======================================================= */

  const handleKnightClick = () => {
    setDialogueOpen(true);
    setKnightHovered(false);
  };


  /* =======================================================
     DIALOGUE OPTION
  ======================================================= */

  const handleOptionClick = (option) => {

    /*
      Portfolio pages are handled by App.jsx.
    */

    if (option.type === 'page') {

      setDialogueOpen(false);
      setDialogueText(null);

      onNavigate(option.page);

      return;
    }


    /*
      Normal dialogue response.
    */

    setDialogueText(option.text);
  };

  


  /* =======================================================
     CLOSE DIALOGUE
  ======================================================= */

  const closeDialogue = () => {

    setDialogueOpen(false);
    setDialogueText(null);

  };


  /* =======================================================
     WORLD
  ======================================================= */

  return (
    <main className="world-scene">


      {/* ===================================================
          SINGLE WORLD BACKGROUND
      =================================================== */}

      <img
        src="/assets/world/world-background.png"
        className="world-background"
        alt=""
        draggable="false"
      />


      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="world-header">

        <button
          type="button"
          className="world-brand"
          onClick={onBack}
        >

          <strong>
            THE REALM
          </strong>

          <br />

          OF ANANDI RAGHAVI

        </button>


        <span>
          A STORY STILL BEING WRITTEN
        </span>

      </header>


      {/* ===================================================
          KNIGHT
          NORMAL + HOVER VERSION
      =================================================== */}

      <div
        className={`
          world-knight
          ${knightHovered ? 'is-hovered' : ''}
          ${dialogueOpen ? 'is-speaking' : ''}
        `}

        onMouseEnter={() =>
          setKnightHovered(true)
        }

        onMouseLeave={() =>
          setKnightHovered(false)
        }

        onClick={handleKnightClick}

        role="button"
        tabIndex={0}

        aria-label="Speak with the knight"

        onKeyDown={(event) => {

          if (
            event.key === 'Enter' ||
            event.key === ' '
          ) {

            event.preventDefault();

            handleKnightClick();
          }

        }}
      >

        {/* -----------------------------------------------
            NORMAL STANDING KNIGHT
        ------------------------------------------------ */}

        <img
          src="/assets/world/knight-standing.png"
          className="knight-standing"
          alt=""
          draggable="false"
        />


        {/* -----------------------------------------------
            HOVER STANDING KNIGHT
        ------------------------------------------------ */}

        <img
          src="/assets/world/knight-standing-hover.png"
          className="knight-standing-hover"
          alt=""
          draggable="false"
        />

      </div>


      {/* ===================================================
          VIGNETTE
      =================================================== */}

      <div className="world-vignette" />


      {/* ===================================================
          RPG DIALOGUE
      =================================================== */}

      {dialogueOpen && (

        <div className="world-dialogue-v2">


          {/* -----------------------------------------------
              CHARACTER NAME
          ------------------------------------------------ */}

          <div className="dialogue-character-name">
            ANANDI
          </div>


          {/* -----------------------------------------------
              SPEECH
          ------------------------------------------------ */}

          {dialogueText && (

            <div className="dialogue-speech-v2">
              {dialogueText}
            </div>

          )}


          {!dialogueText && (

            <div className="dialogue-speech-v2">

              Welcome, traveler.

              <br />

              What would you like to know?

            </div>

          )}


          {/* -----------------------------------------------
              OPTIONS
          ------------------------------------------------ */}

          <div className="dialogue-options-v2">

            {DIALOGUE_OPTIONS.map(
              (option, index) => (

                <button
                  type="button"
                  className="dialogue-option-v2"
                  key={option.id}

                  onClick={() =>
                    handleOptionClick(option)
                  }
                >

                  <span className="dialogue-icon">
                    💬
                  </span>

                  <span>
                    {option.label}
                  </span>

                  <span className="dialogue-option-number">
                    {index + 1}
                  </span>

                </button>

              )
            )}

          </div>


          {/* -----------------------------------------------
              CLOSE
          ------------------------------------------------ */}

          <button
            type="button"
            className="dialogue-close-v2"
            onClick={closeDialogue}
          >
            CLOSE
          </button>

        </div>

      )}

    </main>
  );
}