import { useEffect, useRef, useState } from 'react';

const PARTICLES = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  left: 10 + Math.random() * 80,
  top: 10 + Math.random() * 82,
  size: 2 + Math.random() * 4,
  duration: 2.2 + Math.random() * 2.8,
  delay: Math.random() * 3,
  drift: -25 + Math.random() * 50,
}));

// These begin around the portal and burst outward during the transition.
const TRANSITION_PARTICLES = Array.from({ length: 120 }, (_, index) => ({
  id: index,
  x: -75 + Math.random() * 150,
  y: -65 + Math.random() * 130,
  size: 2 + Math.random() * 4.5,
  delay: Math.random() * 0.18,
  duration: 0.8 + Math.random() * 0.42,
  rotation: Math.random() * 360,
}));

export default function LandingScene({ opened, onEnter }) {
  const ambientAudioRef = useRef(null);
  const landingSceneRef = useRef(null);
  const rippleFrameRef = useRef(null);

  const [doorHovered, setDoorHovered] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  /*
   * ---------------------------------------------------------
   * AMBIENT LANDING SOUND
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const ambient = new Audio('/assets/landing/ambient.wav');

    ambient.loop = true;
    ambient.volume = 0.3;

    ambientAudioRef.current = ambient;

    // Try to start immediately.
    ambient.play().catch(() => {
      // Browser blocked autoplay.
      // Start after the first interaction instead.
      const startAmbient = () => {
        ambient.play().catch(() => {});
      };

      window.addEventListener('pointerdown', startAmbient, {
        once: true,
      });
    });

    return () => {
      ambient.pause();
      ambient.currentTime = 0;
      ambientAudioRef.current = null;
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * MOUSE RIPPLE
   *
   * Only updates CSS variables.
   * The actual distortion is handled by CSS/SVG.
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const scene = landingSceneRef.current;

    if (!scene) return;

    const handlePointerMove = (event) => {
      if (opened) return;

      if (rippleFrameRef.current) {
        cancelAnimationFrame(rippleFrameRef.current);
      }

      rippleFrameRef.current = requestAnimationFrame(() => {
        const rect = scene.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        scene.style.setProperty('--ripple-x', `${xPercent}%`);
        scene.style.setProperty('--ripple-y', `${yPercent}%`);

        // Stronger effect when the cursor is actually moving.
        setRippleActive(true);
      });
    };

    const handlePointerLeave = () => {
      setRippleActive(false);
    };

    const handlePointerEnter = () => {
      if (!opened) {
        setRippleActive(true);
      }
    };

    scene.addEventListener('pointermove', handlePointerMove);
    scene.addEventListener('pointerleave', handlePointerLeave);
    scene.addEventListener('pointerenter', handlePointerEnter);

    return () => {
      scene.removeEventListener('pointermove', handlePointerMove);
      scene.removeEventListener('pointerleave', handlePointerLeave);
      scene.removeEventListener('pointerenter', handlePointerEnter);

      if (rippleFrameRef.current) {
        cancelAnimationFrame(rippleFrameRef.current);
      }
    };
  }, [opened]);

  /*
   * ---------------------------------------------------------
   * DOOR HOVER
   * ---------------------------------------------------------
   */
  const handleDoorEnter = () => {
    if (!opened) {
      setDoorHovered(true);
    }
  };

  const handleDoorLeave = () => {
    if (!opened) {
      setDoorHovered(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * DOOR CLICK
   * ---------------------------------------------------------
   */
  const handleDoorClick = () => {
    if (!opened && typeof onEnter === 'function') {
      // Stop landing-page ambience.
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current.currentTime = 0;
      }

      // Play actual portal swoosh.
      const swoosh = new Audio(
        '/assets/landing/portal-swoosh.wav'
      );

      swoosh.volume = 0.8;

      swoosh.play().catch(() => {});

      // Start visual transition.
      onEnter();
    }
  };

  return (
    <main
      ref={landingSceneRef}
      className={`landing-scene ${
        doorHovered ? 'door-is-hovered' : ''
      } ${rippleActive ? 'ripple-active' : ''} ${
        opened ? 'landing-is-opening' : ''
      }`}
    >
      {/* =====================================================
          SVG FILTER DEFINITIONS

          These are invisible.
          They are used only to distort the background.
      ====================================================== */}
      <svg
        className="landing-ripple-defs"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="forest-ripple"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.035"
              numOctaves="2"
              seed="8"
              result="noise"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* =====================================================
          RESPONSIVE ART STAGE
      ====================================================== */}
      <div className="landing-stage">

        {/* ===================================================
            ORIGINAL FOREST
        ==================================================== */}
        <img
          src="/assets/landing/bg2.png"
          className="landing-background"
          alt=""
          draggable="false"
        />

        {/* ===================================================
            RIPPLE VERSION OF FOREST

            This is clipped around the cursor, so ONLY this
            small region gets distorted.
        ==================================================== */}
        <img
          src="/assets/landing/bg2.png"
          className="landing-background-ripple"
          alt=""
          draggable="false"
        />

        {/* Soft ripple rings around the cursor */}
        <div
          className="forest-ripple-ring forest-ripple-ring-one"
          aria-hidden="true"
        />

        <div
          className="forest-ripple-ring forest-ripple-ring-two"
          aria-hidden="true"
        />

        {/* ===================================================
            ARCH
        ==================================================== */}
        <div className="portal-area">
          <img
            src="/assets/landing/fdoor.png"
            className="landing-archdoor"
            alt="Ancient forest portal"
            draggable="false"
          />

          {/* SPARKLES AROUND PORTAL */}
          {doorHovered && !opened && (
            <div className="portal-particles">
              {PARTICLES.map((particle) => (
                <span
                  key={particle.id}
                  className="portal-particle"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    animationDuration: `${particle.duration}s`,
                    animationDelay: `${particle.delay}s`,
                    '--particle-drift': `${particle.drift}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* ACTUAL CLICK / HOVER TARGET */}
          <button
            type="button"
            className="portal-hit-area"
            aria-label="Enter the realm"
            onMouseEnter={handleDoorEnter}
            onMouseLeave={handleDoorLeave}
            onClick={handleDoorClick}
          />
        </div>
      </div>

      {/* TITLE */}
      <header className="landing-title">
        <p>THE CHRONICLES OF</p>
        <h1>ANANDI RAGHAVI</h1>
      </header>

      {/* ENTER TEXT */}
      <div className="portal-hint">
        <span>✦</span>
        ENTER THE REALM
        <span>✦</span>
      </div>

      {/* FULL-SCREEN PORTAL TRANSITION */}
      {opened && (
        <div
          className="portal-transition"
          aria-hidden="true"
        >
          <div className="portal-transition-flash" />

          <div className="portal-transition-particles">
            {TRANSITION_PARTICLES.map((particle) => (
              <span
                key={particle.id}
                className="portal-transition-particle"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  '--particle-x': `${particle.x}vw`,
                  '--particle-y': `${particle.y}vh`,
                  '--particle-delay': `${particle.delay}s`,
                  '--particle-duration': `${particle.duration}s`,
                  '--particle-rotation': `${particle.rotation}deg`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* FINAL FADE */}
      <div className="landing-fade" />
    </main>
  );
}