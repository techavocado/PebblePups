import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import TeddyRunner from '../components/TeddyRunner';
import { faqs, getWhatsAppLink } from '../data/puppiesData';

const PIN_COLORS = ['#c45b38', '#4a7bb7', '#d99a32', '#b85772'];

const STRIP_STYLES = [
  { tilt: '-1.2deg', marginLeft: '1%', marginRight: '3%', pinLeft: '52%' },
  { tilt: '1.1deg', marginLeft: '4%', marginRight: '0%', pinLeft: '55%' },
  { tilt: '-1deg', marginLeft: '0.5%', marginRight: '3.5%', pinLeft: '50%' },
  { tilt: '1.2deg', marginLeft: '3.5%', marginRight: '0.5%', pinLeft: '54%' },
  { tilt: '-1.1deg', marginLeft: '1.5%', marginRight: '2.5%', pinLeft: '51%' },
  { tilt: '0.9deg', marginLeft: '3%', marginRight: '1%', pinLeft: '56%' },
  { tilt: '-1deg', marginLeft: '1%', marginRight: '3%', pinLeft: '53%' },
  { tilt: '1.1deg', marginLeft: '3.5%', marginRight: '0.5%', pinLeft: '52%' },
  { tilt: '-0.9deg', marginLeft: '2%', marginRight: '2%', pinLeft: '55%' },
];

function CorkboardNoteItem({ faq, index, totalCount }) {
  const [open, setOpen] = useState(false);
  const styleCfg = STRIP_STYLES[index % STRIP_STYLES.length];
  const pinColor = PIN_COLORS[index % PIN_COLORS.length];
  const isLast = index === totalCount - 1;

  return (
    <motion.div
      id={`faq-${index}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
      style={{
        position: 'relative',
        marginLeft: styleCfg.marginLeft,
        marginRight: styleCfg.marginRight,
        transform: `rotate(${open ? 0 : styleCfg.tilt})`,
        transition: 'transform 0.22s ease',
        zIndex: open ? 15 : 1,
      }}
    >
      {/* Top Pin */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -9,
          left: styleCfg.pinLeft,
          transform: 'translateX(-50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65), ${pinColor} 58%, rgba(42,23,14,0.65) 100%)`,
          border: '1.8px solid #2a170e',
          boxShadow: '0 3px 5px rgba(42,23,14,0.3)',
          zIndex: 4,
        }}
      />

      {/* Large Note Card */}
      <div
        style={{
          position: 'relative',
          background: '#fdf3e2',
          border: '2.2px solid #2a170e',
          borderRadius: 6,
          boxShadow: '0 5px 0 rgba(42, 23, 14, 0.18)',
          overflow: 'hidden',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            padding: '1.12rem 1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#2a170e',
          }}
        >
          <span
            className="font-plush"
            style={{
              fontSize: 'clamp(1.04rem, 1.65vw, 1.24rem)',
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {faq.question}
          </span>

          <ChevronDown
            size={18}
            strokeWidth={2.4}
            style={{
              color: '#9b4a1e',
              flexShrink: 0,
              marginRight: 8,
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.22s ease',
            }}
          />
        </button>

        {/* Bottom-right corner fold */}
        {!isLast && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 16,
              height: 16,
              background: '#ebd8b7',
              borderTop: '1.8px solid #2a170e',
              borderLeft: '1.8px solid #2a170e',
              pointerEvents: 'none',
            }}
          />
        )}

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  padding: '0.25rem 1.6rem 1.2rem',
                  borderTop: '1px dashed rgba(42, 23, 14, 0.22)',
                  fontSize: '0.94rem',
                  lineHeight: 1.62,
                  color: 'rgba(42, 23, 14, 0.86)',
                }}
              >
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return faqs || [];
    return (faqs || []).filter(
      (item) =>
        item.question?.toLowerCase().includes(q) ||
        item.answer?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalNotes = faqs?.length || 9;

  return (
    <div style={{ background: '#8c4a20', color: '#fffdf8' }}>
      <section
        style={{
          padding: 'clamp(1.75rem, 3.5vw, 2.5rem) var(--gutter) clamp(2.25rem, 4vw, 3.25rem)',
          maxWidth: 1360,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(290px, 380px) minmax(0, 1fr)',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Heading + Description + Search + Mascot + Ask CTA */}
          <div>
            <h1
              className="font-plush"
              style={{
                fontSize: 'clamp(2.85rem, 6.2vw, 4.5rem)',
                lineHeight: 0.96,
                margin: '0 0 0.9rem',
                color: '#fffdf8',
              }}
            >
              Questions
              <br />
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '0.8em',
                  height: '0.8em',
                  borderRadius: '50%',
                  border: '0.06em solid #fffdf8',
                  fontSize: '0.78em',
                  marginRight: '0.16em',
                  verticalAlign: 'middle',
                }}
              >
                &amp;
              </span>
              answers
            </h1>

            <p
              style={{
                fontSize: '0.94rem',
                color: 'rgba(255, 253, 248, 0.88)',
                lineHeight: 1.55,
                margin: '0 0 1.85rem',
                maxWidth: 360,
              }}
            >
              Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.
            </p>

            <div style={{ maxWidth: 300 }}>
              <label
                htmlFor="faq-search-input"
                className="font-scrawl"
                style={{
                  display: 'block',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  color: '#ffe5b4',
                  marginBottom: '0.5rem',
                }}
              >
                sniff out a question
              </label>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  background: '#fffdf8',
                  color: '#2a170e',
                  border: '2.2px solid #2a170e',
                  borderRadius: 999,
                  padding: '0.55rem 0.95rem',
                  boxShadow: '0 4px 0 rgba(42, 23, 14, 0.22)',
                }}
              >
                <Search size={16} strokeWidth={2.2} style={{ color: 'rgba(42, 23, 14, 0.5)', flexShrink: 0 }} />
                <input
                  id="faq-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="delivery, Korea, vaccinated..."
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    color: '#2a170e',
                    fontSize: '0.86rem',
                    width: '100%',
                  }}
                />
              </div>

              <p
                className="font-scrawl"
                style={{
                  fontSize: '0.88rem',
                  color: 'rgba(255, 253, 248, 0.85)',
                  margin: '0.6rem 0 2rem',
                }}
              >
                {totalNotes} notes on the board
              </p>

              {/* Mascot + ? Bubble */}
              <div style={{ position: 'relative', width: 118, marginBottom: '1.1rem' }}>
                <span
                  aria-hidden="true"
                  className="font-plush"
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: 12,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#fffdf8',
                    color: '#2a170e',
                    border: '2px solid #2a170e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    boxShadow: '0 3px 0 rgba(42, 23, 14, 0.24)',
                    zIndex: 2,
                  }}
                >
                  ?
                </span>
                <TeddyRunner style={{ width: 96, height: 80 }} />
              </div>

              <a
                href={getWhatsAppLink("Hi PebblePups! I have a question about your puppies.")}
                target="_blank"
                rel="noopener noreferrer"
                id="faq-whatsapp-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.68rem 1.4rem',
                  borderRadius: 999,
                  background: '#1f7a4c',
                  color: '#fffdf8',
                  border: '2px solid #12482c',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 0 rgba(18, 72, 44, 0.45)',
                }}
              >
                Ask your own question
              </a>
            </div>
          </div>

          {/* Right Column: Corkboard Aligned Flush With Top */}
          <div
            style={{
              backgroundColor: '#cfa372',
              backgroundImage:
                'radial-gradient(rgba(92, 52, 24, 0.22) 1px, transparent 1px), radial-gradient(rgba(255, 245, 224, 0.24) 1px, transparent 1px)',
              backgroundPosition: '0 0, 7px 7px',
              backgroundSize: '14px 14px',
              border: '3px solid #2a170e',
              borderRadius: '1.2rem',
              padding: '1.35rem clamp(1.35rem, 2.8vw, 2.25rem) clamp(1.75rem, 3.2vw, 2.5rem)',
              boxShadow: 'inset 0 0 0 5px #8e562b, 0 8px 0 rgba(42, 23, 14, 0.24)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.15rem',
            }}
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <CorkboardNoteItem
                  key={faq.id || `${faq.question}-${i}`}
                  faq={faq}
                  index={i}
                  totalCount={filteredFaqs.length}
                />
              ))
            ) : (
              <div
                style={{
                  background: '#fdf3e2',
                  border: '2px solid #2a170e',
                  borderRadius: 8,
                  padding: '1.5rem',
                  color: '#2a170e',
                  textAlign: 'center',
                }}
              >
                <p className="font-plush" style={{ fontWeight: 700, margin: '0 0 0.35rem' }}>
                  No matching notes found
                </p>
                <p style={{ fontSize: '0.88rem', margin: 0, color: 'rgba(42, 23, 14, 0.72)' }}>
                  Try another keyword or ask directly on WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Wave into Footer */}
      <div aria-hidden="true" style={{ lineHeight: 0, overflow: 'hidden' }}>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: '100%', height: 38, display: 'block' }}>
          <path
            d="M0,26 C260,6 540,42 840,22 C1120,4 1300,34 1440,18 L1440,52 L0,52 Z"
            fill="#2b1409"
          />
        </svg>
      </div>
    </div>
  );
}