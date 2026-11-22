import { useEffect, useRef, useState } from 'react';

function PawSvg({ size = 18, fill = '#b85d28', stroke = '#2a170e' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <ellipse
        cx="32"
        cy="39"
        rx="10.5"
        ry="8.5"
        fill={fill}
        stroke={stroke}
        strokeWidth="3.5"
      />
      <circle cx="19" cy="26" r="4.5" fill={fill} stroke={stroke} strokeWidth="3" />
      <circle cx="28" cy="20" r="4.5" fill={fill} stroke={stroke} strokeWidth="3" />
      <circle cx="37" cy="20" r="4.5" fill={fill} stroke={stroke} strokeWidth="3" />
      <circle cx="45" cy="26" r="4.5" fill={fill} stroke={stroke} strokeWidth="3" />
    </svg>
  );
}

export default function PawCursorTrail() {
  const [prints, setPrints] = useState([]);
  const [pos, setPos] = useState({ x: -100, y: -100, visible: false });
  const lastPrintRef = useRef({ x: null, y: null, leftStep: true });
  const idRef = useRef(0);

  useEffect(() => {
    // Touch-only devices par custom cursor skip karein
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y, visible: true });

      const prev = lastPrintRef.current;
      if (prev.x === null || prev.y === null) {
        lastPrintRef.current = { x, y, leftStep: true };
        return;
      }

      const dx = x - prev.x;
      const dy = y - prev.y;
      const dist = Math.hypot(dx, dy);

      // Har 48px move hone par ek paw print chhodein
      if (dist >= 48) {
        const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        const tilt = prev.leftStep ? -14 : 14;
        const id = ++idRef.current;

        lastPrintRef.current = { x, y, leftStep: !prev.leftStep };

        setPrints((curr) => [
          ...curr.slice(-18), // Maximum 18 prints ek saath
          {
            id,
            x,
            y,
            rotation: angleDeg + tilt,
          },
        ]);

        setTimeout(() => {
          setPrints((curr) => curr.filter((item) => item.id !== id));
        }, 850);
      }
    };

    const handleMouseLeave = () => {
      setPos((p) => ({ ...p, visible: false }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!pos.visible && prints.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Peeche chhute hue paw prints */}
      {prints.map((print) => (
        <div
          key={print.id}
          className="paw-print-fade"
          style={{
            position: 'fixed',
            left: print.x,
            top: print.y,
            transform: `translate(-50%, -50%) rotate(${print.rotation}deg)`,
          }}
        >
          <PawSvg size={18} fill="#e8b878" stroke="#2a170e" />
        </div>
      ))}

      {/* Active cursor paw */}
      {pos.visible && (
        <div
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            transform: 'translate(-45%, -45%)',
            filter: 'drop-shadow(0 2px 3px rgba(42, 23, 14, 0.25))',
            transition: 'transform 0.05s linear',
          }}
        >
          <PawSvg size={24} fill="#b85d28" stroke="#2a170e" />
        </div>
      )}
    </div>
  );
}