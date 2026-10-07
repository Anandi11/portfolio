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
  const [doorHovered, setDoorHovered] = useState(false);

  useEffect(() => {
    const ambient = new Audio('/assets/landing/ambient.wav');

    ambient.loop = true;
    ambient.volume = 0.3;

    ambientAudioRef.current = ambient;

    // Try to start immediately when the page loads
    ambient.play().catch(() => {
      // Browser blocked autoplay.
      // It will start on the user's first interaction instead.
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

  const handleDoorClick = () => {
    if (!opened && typeof onEnter === 'function') {

      // Stop landing-page ambience
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current.currentTime = 0;
      }

      // Play the actual portal swoosh
      const swoosh = new Audio(
        '/assets/landing/portal-swoosh.wav'
      );

      swoosh.volume = 0.8;

      swoosh.play().catch(() => {});

      // Start the visual portal transition
      onEnter();
    }
  };

  return (
    <main
      className={`landing-scene ${
        doorHovered ? 'door-is-hovered' : ''
      } ${opened ? 'landing-is-opening' : ''}`}
    >
      {/* RESPONSIVE ART STAGE
          The background and arch live in the same 16:9 coordinate system.
          This prevents the arch from drifting when the browser aspect ratio changes. */}
      <div className="landing-stage">
        {/* BACKGROUND */}
        <img
          src="/assets/landing/bg2.png"
          className="landing-background"
          alt=""
          draggable="false"
        />

        {/* ARCH */}
        <div className="portal-area">
        <img
          src="/assets/landing/fdoor.png"
          className="landing-archdoor"
          alt="Ancient forest portal"
          draggable="false"
        />

        {/* SPARKLES AROUND THE PORTAL WHILE HOVERING */}
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
        <div className="portal-transition" aria-hidden="true">
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
