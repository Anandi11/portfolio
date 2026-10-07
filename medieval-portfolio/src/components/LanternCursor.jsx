import { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 18;

export default function LanternCursor({ enabled = true }) {
  const mouseRef = useRef({
    x: -100,
    y: -100,
  });

  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (!enabled) {
      setTrail([]);
      return undefined;
    }

    let animationFrame;

    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      setTrail((previousTrail) => {
        const nextTrail = [
          {
            x: mouseRef.current.x,
            y: mouseRef.current.y,
          },
          ...previousTrail,
        ];

        return nextTrail.slice(0, TRAIL_LENGTH);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="mouse-magic-trail" aria-hidden="true">

      {trail.map((point, index) => {
        const progress = 1 - index / TRAIL_LENGTH;

        const size = 5 + progress * 14;

        const opacity =
          progress * progress * 0.28;

        return (
          <span
            key={`${index}-${point.x}-${point.y}`}
            className="mouse-trail-particle"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,

              width: `${size}px`,
              height: `${size}px`,

              opacity,
            }}
          />
        );
      })}

      {/* Main soft light surrounding the cursor */}
      {trail.length > 0 && (
        <span
          className="mouse-light"
          style={{
            left: `${trail[0].x}px`,
            top: `${trail[0].y}px`,
          }}
        />
      )}

    </div>
  );
}