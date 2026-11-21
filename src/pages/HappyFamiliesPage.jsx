import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeddyRunner from '../components/TeddyRunner';
import { happyFamiliesTestimonials, puppies } from '../data/puppiesData';

const polaroidStyles = [
  { tilt: '-2.2deg', tapeColor: 'rgba(245, 224, 184, 0.92)', caption: '', height: 295, offsetY: 0 },
  { tilt: '1.4deg', tapeColor: 'rgba(247, 212, 200, 0.92)', caption: '', height: 265, offsetY: 14 },
  { tilt: '-1.5deg', tapeColor: 'rgba(247, 212, 200, 0.92)', caption: '', height: 280, offsetY: 4 },
  { tilt: '2deg', tapeColor: 'rgba(245, 224, 184, 0.92)', caption: 'Lulu 🐶 with her new mummy ❤️', height: 215, offsetY: 0 },
  { tilt: '-1.8deg', tapeColor: 'rgba(247, 212, 200, 0.92)', caption: '', height: 255, offsetY: 10 },
  { tilt: '1.6deg', tapeColor: 'rgba(238, 224, 196, 0.92)', caption: '', height: 315, offsetY: -8 },
  { tilt: '-1.2deg', tapeColor: 'rgba(216, 226, 236, 0.92)', caption: '', height: 270, offsetY: 6 },
  { tilt: '2.1deg', tapeColor: 'rgba(247, 212, 200, 0.92)', caption: 'Adorable Maltipoo baby 🐶❤️', height: 220, offsetY: 12 },
  { tilt: '-2deg', tapeColor: 'rgba(216, 226, 236, 0.92)', caption: '', height: 285, offsetY: 0 },
  { tilt: '1.5deg', tapeColor: 'rgba(245, 224, 184, 0.92)', caption: '', height: 310, offsetY: -6 },
  { tilt: '-1.4deg', tapeColor: 'rgba(245, 224, 184, 0.92)', caption: '', height: 260, offsetY: 10 },
  { tilt: '1.8deg', tapeColor: 'rgba(245, 224, 184, 0.92)', caption: 'My new teddy puppy 🥳🐶', height: 215, offsetY: 4 },
  { tilt: '-1.9deg', tapeColor: 'rgba(245, 224, 184, 0.92)', caption: '', height: 245, offsetY: 8 },
  { tilt: '1.7deg', tapeColor: 'rgba(245, 224, 184, 0.92)', caption: '', height: 295, offsetY: -4 },
  { tilt: '-1.3deg', tapeColor: 'rgba(245, 224, 184, 0.92)', caption: 'Our new puppies 🐶🤗', height: 215, offsetY: 6 },
  { tilt: '1.9deg', tapeColor: 'rgba(245, 224, 184, 0.92)', caption: '', height: 255, offsetY: 2 },
];

function PhotoLightboxModal({ items, activeIndex, onClose, onSelectIndex }) {
  const isOpen = activeIndex !== null && items.length > 0;
  const total = items.length;

  const handlePrev = useCallback(() => {
    if (activeIndex === null || total === 0) return;
    onSelectIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex === null || total === 0) return;
    onSelectIndex((activeIndex + 1) % total);
  }, [activeIndex, total, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  const currentItem = isOpen ? items[activeIndex] : null;
  const displayNumber = activeIndex !== null ? activeIndex + 1 : 0;

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          id="happy-family-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(34, 18, 9, 0.94)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(1rem, 3vw, 1.75rem) clamp(1.25rem, 4vw, 2.5rem)',
          }}
        >
          {/* Top Bar: Counter (Top-Left) & Close Pill (Top-Right) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <span
              style={{
                color: '#fffdf8',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
              }}
            >
              {displayNumber} / {total}
            </span>

            <button
              type="button"
              id="lightbox-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              style={{
                background: '#fffdf8',
                color: '#2a170e',
                border: 'none',
                borderRadius: 999,
                padding: '0.45rem 1.15rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
              }}
            >
              Close
            </button>
          </div>

          {/* Center Photo */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem 0',
              minHeight: 0,
            }}
          >
            {currentItem.image ? (
              <motion.img
                key={`${currentItem.id}-${activeIndex}`}
                src={currentItem.image}
                alt={currentItem.alt}
                initial={{ opacity: 0.7, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  maxWidth: 'min(90vw, 560px)',
                  maxHeight: '68vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: 4,
                  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.5)',
                  background: '#1a0e07',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  width: 320,
                  height: 380,
                  background: '#fff1d8',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                }}
              >
                🐾
              </div>
            )}
          </div>

          {/* Bottom Controls: Previous & Next Pills */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.85rem',
              paddingBottom: '0.25rem',
            }}
          >
            <button
              type="button"
              id="lightbox-prev-btn"
              onClick={handlePrev}
              style={{
                background: 'rgba(42, 23, 14, 0.85)',
                color: '#fffdf8',
                border: '1.5px solid rgba(255, 253, 248, 0.8)',
                borderRadius: 999,
                padding: '0.52rem 1.4rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
            >
              Previous
            </button>

            <button
              type="button"
              id="lightbox-next-btn"
              onClick={handleNext}
              style={{
                background: '#f5c77e',
                color: '#2a170e',
                border: '1.5px solid #f5c77e',
                borderRadius: 999,
                padding: '0.52rem 1.5rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(245, 199, 126, 0.25)',
                transition: 'transform 0.15s ease',
              }}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HappyFamiliesPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const wallItems = useMemo(() => {
    const baseItems = (happyFamiliesTestimonials || []).map((item, idx) => ({
      id: item.id || `hf-${idx}`,
      image: item.image,
      alt: item.caption || 'A happy PebblePups family with their new puppy',
    }));

    const seenImages = new Set(baseItems.map(i => i.image).filter(Boolean));
    const extraFromPuppies = (puppies || [])
      .filter(p => p.image && !seenImages.has(p.image))
      .map((p, idx) => {
        seenImages.add(p.image);
        return {
          id: `extra-pup-${p.id || idx}`,
          image: p.image,
          alt: `${p.name || p.breed} family moment`,
        };
      });

    const combined = [...baseItems, ...extraFromPuppies];
    while (combined.length < 12 && combined.length > 0) {
      const nextIdx = combined.length;
      const sourceItem = combined[nextIdx % baseItems.length || 0];
      combined.push({
        ...sourceItem,
        id: `loop-${nextIdx}`,
      });
    }

    return combined;
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#fff4e0',
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(184, 93, 40, 0.045) 0 1px, transparent 1px 160px)',
        color: '#2a170e',
      }}
    >
      {/* Top Header + Lined Note Quote Card */}
      <section style={{ padding: 'clamp(2.5rem, 5.5vw, 4.25rem) var(--gutter) 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.25rem',
            alignItems: 'center',
            maxWidth: 1220,
            margin: '0 auto',
          }}
        >
          <div>
            <p
              className="font-scrawl"
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#9b4a1e',
                margin: '0 0 0.35rem',
              }}
            >
              our wall of happy endings
            </p>

            <h1
              className="font-plush"
              style={{
                fontSize: 'clamp(2.6rem, 6.2vw, 4.35rem)',
                lineHeight: 0.98,
                margin: '0 0 1rem',
                color: '#2a170e',
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span>
                Happy
                <br />
                families
              </span>
              <span style={{ color: '#b85d28', fontSize: '0.78em' }}>♡</span>
            </h1>

            <p
              style={{
                fontSize: '0.95rem',
                color: 'rgba(42, 23, 14, 0.78)',
                maxWidth: 440,
                lineHeight: 1.6,
                margin: '0 0 1rem',
              }}
            >
              Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
            </p>

            <p
              className="font-scrawl"
              style={{
                fontSize: '0.98rem',
                fontWeight: 700,
                color: '#9b4a1e',
                margin: 0,
              }}
            >
              64 moments and counting
            </p>
          </div>

          {/* Taped Lined Note Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              position: 'relative',
              backgroundColor: '#fffdf9',
              backgroundImage:
                'repeating-linear-gradient(180deg, transparent 0 23px, rgba(160, 130, 105, 0.22) 23px 24px)',
              borderRadius: 6,
              padding: '1.35rem 1.5rem 1.15rem',
              boxShadow: '0 8px 20px rgba(42, 23, 14, 0.1)',
              maxWidth: 420,
              justifySelf: 'end',
              transform: 'rotate(0.6deg)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: -10,
                left: '54%',
                transform: 'translateX(-50%) rotate(-1.5deg)',
                width: 64,
                height: 18,
                background: 'rgba(202, 218, 234, 0.9)',
                borderRadius: 2,
              }}
            />
            <p
              style={{
                fontSize: '0.88rem',
                lineHeight: '24px',
                color: '#2a170e',
                margin: '0 0 0.4rem',
              }}
            >
              &ldquo;PebblePups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.&rdquo;
            </p>
            <p
              className="font-scrawl"
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#9b4a1e',
                margin: 0,
                lineHeight: '24px',
              }}
            >
              Sarah M., Dubai, UAE
            </p>
          </motion.div>
        </div>
      </section>

      {/* Polaroid Scrapbook Wall */}
      <section style={{ padding: '1.5rem var(--gutter) 2rem' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(235px, 1fr))',
            gap: '2.25rem 1.75rem',
            alignItems: 'start',
          }}
        >
          {wallItems.map((item, i) => {
            const meta = polaroidStyles[i % polaroidStyles.length];
            const hasCaption = Boolean(meta.caption);

            return (
              <motion.div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedIndex(i)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(i)}
                aria-label={`View photo ${i + 1} of ${wallItems.length}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -5, rotate: 0, zIndex: 10 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: 'relative',
                  background: '#ffffff',
                  padding: hasCaption ? '10px 10px 12px' : '10px 10px 26px',
                  boxShadow: '0 8px 18px rgba(42, 23, 14, 0.14)',
                  transform: `rotate(${meta.tilt}) translateY(${meta.offsetY}px)`,
                  cursor: 'pointer',
                }}
              >
                {/* Top Masking Tape Strip */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: -11,
                    left: '50%',
                    transform: `translateX(-50%) rotate(${i % 2 === 0 ? '-2deg' : '2deg'})`,
                    width: 62,
                    height: 18,
                    background: meta.tapeColor,
                    borderRadius: 2,
                    zIndex: 2,
                  }}
                />

                {item.image ? (
                  <img
                    src={item.image}
                    alt={meta.caption || item.alt}
                    style={{
                      width: '100%',
                      height: meta.height,
                      objectFit: 'cover',
                      display: 'block',
                      background: '#fff1d8',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: meta.height,
                      background: '#fff1d8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                    }}
                  >
                    🐾
                  </div>
                )}

                {hasCaption && (
                  <p
                    className="font-scrawl"
                    style={{
                      textAlign: 'center',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#2a170e',
                      margin: '10px 0 2px',
                    }}
                  >
                    {meta.caption}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Lower Mascot & Caption Row */}
        <div
          style={{
            maxWidth: 1240,
            margin: '3.75rem auto 0.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <TeddyRunner style={{ width: 98, height: 82 }} />
          <p
            className="font-scrawl"
            style={{
              fontSize: '0.96rem',
              fontWeight: 700,
              color: 'rgba(42, 23, 14, 0.78)',
              margin: 0,
            }}
          >
            every one of them was a Teddy Pup once
          </p>
        </div>
      </section>

      {/* Organic Wave Transition */}
      <div aria-hidden="true" style={{ lineHeight: 0, overflow: 'hidden' }}>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: '100%', height: 38, display: 'block' }}>
          <path
            d="M0,26 C260,6 540,42 840,22 C1120,4 1300,34 1440,18 L1440,52 L0,52 Z"
            fill="#331b0e"
          />
        </svg>
      </div>

      {/* Full-Screen Lightbox Viewer */}
      <PhotoLightboxModal
        items={wallItems}
        activeIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={setSelectedIndex}
      />
    </div>
  );
}