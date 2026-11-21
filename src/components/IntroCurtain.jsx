import { motion, AnimatePresence } from 'framer-motion';
import TeddyRunner from './TeddyRunner';
import PawIcon from './PawIcon';

// Scalloped curtain SVG edge
function ScallopEdge({ fill = '#fbe3b4' }) {
  return (
    <svg width="100%" height="40" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="curtain-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill={fill} />
          <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
          <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity="0.42" />
        </pattern>
      </defs>
      <rect width="100%" height="40" fill="url(#curtain-scallop)" />
    </svg>
  );
}

const pawPositions = [
  { left: '18%', top: '6px', rotate: '14deg', delay: 0.16 },
  { left: '27%', top: '-4px', rotate: '6deg', delay: 0.28 },
  { left: '36%', top: '7px', rotate: '18deg', delay: 0.40 },
  { left: '45%', top: '-3px', rotate: '4deg', delay: 0.52 },
  { left: '54%', top: '6px', rotate: '16deg', delay: 0.64 },
];

export default function IntroCurtain({ onComplete }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col"
        style={{ background: '#fbe3b4' }}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        onAnimationComplete={onComplete}
      >
        {/* Top scallop */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <ScallopEdge />
        </div>

        {/* Stage area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            position: 'relative',
            paddingTop: '40px',
            paddingBottom: '40px',
          }}
        >
          {/* Paw prints scattered across top */}
          <div style={{ position: 'absolute', top: '48px', left: 0, right: 0, height: '50px', pointerEvents: 'none' }}>
            {pawPositions.map((pos, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: pos.left,
                  top: pos.top,
                  rotate: pos.rotate,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: pos.delay, duration: 0.3 }}
              >
                <PawIcon style={{ width: '28px', height: '28px', color: '#2a170e' }} />
              </motion.div>
            ))}
          </div>

          {/* Running puppy mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TeddyRunner style={{ width: '220px', height: '180px' }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="font-scrawl"
            style={{ fontSize: '1.4rem', color: '#a24a1a', margin: 0 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            every puppy is family
          </motion.p>
        </div>

        {/* Bottom scallop */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, transform: 'rotate(180deg)' }}>
          <ScallopEdge />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
