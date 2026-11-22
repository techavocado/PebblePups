import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Video } from 'lucide-react';
import { puppies, gonePuppies, happyFamiliesTestimonials } from '../data/puppiesData';
import TeddyRunner from '../components/TeddyRunner';

// ─── Organic Wave Divider Between Segments ───────────────
function WaveDivider({ fromColor, toColor, flip = false }) {
  return (
    <div
      aria-hidden="true"
      style={{
        background: fromColor,
        lineHeight: 0,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1440 46"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: 32,
          display: 'block',
          transform: flip ? 'scaleX(-1)' : 'none',
        }}
      >
        <path
          d={
            flip
              ? 'M0,18 C260,38 520,4 780,22 C1040,40 1260,8 1440,20 L1440,46 L0,46 Z'
              : 'M0,20 C240,4 480,38 720,20 C960,2 1200,36 1440,16 L1440,46 L0,46 Z'
          }
          fill={toColor}
        />
      </svg>
    </div>
  );
}

// ─── Puppy Circle Card (Sketchbook Double Ring + Doodles) ───
function PuppyCard({ puppy, index, onClick }) {
  const [imgErr, setImgErr] = useState(false);

  const doodleSets = [
    [
      { style: { top: '6px', left: '-12px' }, char: '🐾' },
      { style: { bottom: '18px', right: '-10px' }, char: '◎' },
    ],
    [
      { style: { top: '4px', left: '-10px' }, char: '♡' },
      { style: { top: '50%', right: '-12px' }, char: '✦' },
    ],
    [
      { style: { top: '6px', left: '-12px' }, char: '🐾' },
      { style: { bottom: '20px', right: '-12px' }, char: '♡' },
    ],
    [
      { style: { top: '4px', left: '-10px' }, char: '✦' },
      { style: { top: '50%', right: '-12px' }, char: '✦' },
    ],
  ];

  const decorations = doodleSets[index % doodleSets.length];

  return (
    <motion.div
      className="puppy-card"
      onClick={() => onClick(puppy)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      id={`puppy-card-${puppy.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(puppy)}
      aria-label={`View details for ${puppy.name || puppy.breed}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Photo circle with double sketchbook outline */}
      <div
        className="puppy-card__photo-wrap"
        style={{
          position: 'relative',
          padding: 5,
          borderRadius: '50%',
          background: '#fffdf8',
          border: '2.5px solid #2a170e',
          boxShadow: '0 4px 0 rgba(42,23,14,0.14)',
        }}
      >
        {!imgErr ? (
          <img
            src={puppy.image}
            alt={`${puppy.gender === 'girl' ? 'Female' : 'Male'} ${puppy.breed} puppy`}
            className="puppy-card__photo"
            style={{
              objectPosition: puppy.objectPosition || '50% 40%',
              borderRadius: '50%',
              border: '1.5px solid rgba(42,23,14,0.25)',
            }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: puppy.bgColor || '#8b5e3c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
            }}
          >
            🐾
          </div>
        )}

        {/* Status badge */}
        <span
          className={`puppy-card__status-badge puppy-card__status-badge--${puppy.status}`}
          style={{
            transform: 'rotate(-4deg)',
            border: '2px solid #2a170e',
            fontWeight: 700,
          }}
        >
          {puppy.status === 'available' ? 'Available' : 'gone home ♥'}
        </span>

        {/* Video badge */}
        {puppy.hasVideo && (
          <div className="puppy-card__video-badge">
            <Video size={10} /> video
          </div>
        )}

        {/* Sketchbook Doodles */}
        {decorations.map((d, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              ...d.style,
              color: '#9b4a1e',
              fontSize: '0.85rem',
              opacity: 0.75,
              pointerEvents: 'none',
            }}
          >
            {d.char}
          </span>
        ))}
      </div>

      {/* Name & info */}
      <h3 className="puppy-card__name font-plush" style={{ marginTop: '0.75rem', marginBottom: '0.15rem' }}>
        {puppy.name || puppy.breed}
      </h3>
      <p className="puppy-card__info" style={{ margin: 0 }}>
        {puppy.breed !== (puppy.name || puppy.breed) ? `${puppy.breed} · ` : ''}
        {puppy.gender} · {puppy.age}
      </p>
    </motion.div>
  );
}

// ─── Gone-home puppy card (Fixed Compact Circle Size + Unique Image) ───
function GoneCard({ puppy, imageSrc, size = 108 }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      id={`gone-card-${puppy.id}`}
      style={{
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: size + 16,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          padding: 4,
          borderRadius: '50%',
          background: '#fffdf8',
          border: '2.5px solid #2a170e',
          boxShadow: '0 4px 0 rgba(42,23,14,0.16)',
          flexShrink: 0,
        }}
      >
        {!imgErr && imageSrc ? (
          <img
            src={imageSrc}
            alt={puppy.name}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
              border: '1.5px solid rgba(42,23,14,0.25)',
            }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#c8a060',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
            }}
          >
            🐾
          </div>
        )}

        {/* Tilted Bottom Pill Badge */}
        <span
          className="font-scrawl"
          style={{
            position: 'absolute',
            bottom: -9,
            left: '50%',
            transform: 'translateX(-50%) rotate(-4deg)',
            background: '#fffdf8',
            color: '#a24a1a',
            border: '2px solid #2a170e',
            borderRadius: 999,
            padding: '1px 10px',
            fontSize: '0.72rem',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 0 #2a170e',
          }}
        >
          gone home ♥
        </span>

        {/* Subtle Doodles */}
        <span
          aria-hidden="true"
          style={{ position: 'absolute', top: 2, left: -10, color: '#9b4a1e', fontSize: '0.75rem', opacity: 0.7 }}
        >
          ♡
        </span>
        <span
          aria-hidden="true"
          style={{ position: 'absolute', top: '46%', right: -11, color: '#9b4a1e', fontSize: '0.72rem', opacity: 0.7 }}
        >
          ✦
        </span>
      </div>

      <h3 className="font-plush" style={{ fontSize: '0.95rem', marginTop: '0.85rem', marginBottom: 0, textAlign: 'center' }}>
        {puppy.name}
      </h3>
    </div>
  );
}

// ─── TAPED SKETCHBOOK FILTER BOX ──────────────────────────
function PuppyFilters({ filters, setFilters }) {
  const breeds = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];
  const locations = ['Everywhere', 'Imported', 'Korean Teacup'];
  const genders = ['Boys', 'Girls'];

  const pillStyle = (isActive) => ({
    padding: '0.42rem 1.05rem',
    borderRadius: 999,
    border: '2px solid #2a170e',
    background: isActive ? '#2a170e' : '#fffdf8',
    color: isActive ? '#fffdf8' : '#2a170e',
    fontWeight: 700,
    fontSize: '0.84rem',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
  });

  return (
    <div
      id="puppy-filters"
      style={{
        position: 'relative',
        background: '#fffdf8',
        border: '2.5px solid #2a170e',
        borderRadius: '1.35rem',
        padding: 'clamp(1.25rem, 3vw, 1.85rem) clamp(1.25rem, 3.5vw, 2.25rem)',
        marginBottom: '2rem',
        transform: 'rotate(-0.55deg)',
        boxShadow: '0 6px 0 rgba(42,23,14,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.95rem',
      }}
    >
      {/* Top-Left Masking Tape Strip */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -12,
          left: 56,
          width: 68,
          height: 20,
          background: 'rgba(246, 224, 178, 0.92)',
          border: '1px solid rgba(42, 23, 14, 0.22)',
          transform: 'rotate(-2deg)',
        }}
      />

      {/* Row 1: where */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.55rem' }}>
        <span
          className="font-scrawl"
          style={{
            width: 82,
            fontSize: '1rem',
            fontWeight: 700,
            color: 'rgba(42,23,14,0.75)',
            flexShrink: 0,
          }}
        >
          where
        </span>
        {locations.map(loc => {
          const active = filters.location === loc;
          return (
            <button
              key={loc}
              id={`filter-loc-${loc.toLowerCase().replace(' ', '-')}`}
              onClick={() => setFilters(f => ({ ...f, location: f.location === loc ? 'Everywhere' : loc }))}
              style={pillStyle(active)}
            >
              {loc}
            </button>
          );
        })}
      </div>

      {/* Row 2: breed */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.55rem' }}>
        <span
          className="font-scrawl"
          style={{
            width: 82,
            fontSize: '1rem',
            fontWeight: 700,
            color: 'rgba(42,23,14,0.75)',
            flexShrink: 0,
          }}
        >
          breed
        </span>
        {breeds.map(breed => {
          const active = filters.breed === breed;
          return (
            <button
              key={breed}
              id={`filter-breed-${breed.toLowerCase()}`}
              onClick={() => setFilters(f => ({ ...f, breed: f.breed === breed ? '' : breed }))}
              style={pillStyle(active)}
            >
              {breed}
            </button>
          );
        })}
      </div>

      {/* Row 3: boy or girl */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.55rem' }}>
        <span
          className="font-scrawl"
          style={{
            width: 82,
            fontSize: '1rem',
            fontWeight: 700,
            color: 'rgba(42,23,14,0.75)',
            flexShrink: 0,
          }}
        >
          boy or girl
        </span>
        {genders.map(g => {
          const active = filters.gender === g;
          return (
            <button
              key={g}
              id={`filter-gender-${g.toLowerCase()}`}
              onClick={() => setFilters(f => ({ ...f, gender: f.gender === g ? '' : g }))}
              style={pillStyle(active)}
            >
              {g}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── PUPPIES PAGE ─────────────────────────────────────────
export default function PuppiesPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get('tab') || 'available';
  const [activeTab, setActiveTab] = useState(tab === 'gone' ? 'gone' : 'available');
  const [filters, setFilters] = useState({ location: 'Everywhere', breed: '', gender: '' });

  useEffect(() => {
    setActiveTab(tab === 'gone' ? 'gone' : 'available');
  }, [tab]);

  const handlePuppyClick = (puppy) => {
    navigate(`/puppies/${puppy.id}`);
  };

  const filteredPuppies = useMemo(() => {
    return puppies.filter(p => {
      if (filters.location === 'Korean Teacup' && p.type !== 'korean-teacup') return false;
      if (filters.location === 'Imported' && p.type === 'korean-teacup') return false;
      if (filters.breed && !p.breed.toLowerCase().includes(filters.breed.toLowerCase())) return false;
      if (filters.gender === 'Boys' && p.gender !== 'boy') return false;
      if (filters.gender === 'Girls' && p.gender !== 'girl') return false;
      return true;
    });
  }, [filters]);

  // Distinct image list for "Already gone home" with guaranteed varied photos
  const distinctGoneList = useMemo(() => {
    const uniquePool = Array.from(
      new Set(
        [
          ...puppies.map((p) => p?.image),
          ...happyFamiliesTestimonials.map((h) => h?.image),
          ...gonePuppies.map((g) => g?.image),
        ].filter((img) => typeof img === 'string' && img.trim().length > 0)
      )
    );

    const used = new Set();

    return gonePuppies.map((pup, idx) => {
      let chosen = uniquePool.find((img) => !used.has(img)) || null;

      if (!chosen && uniquePool.length > 0) {
        chosen = uniquePool[(idx * 2 + 1) % uniquePool.length];
      }

      if (!chosen) {
        chosen = pup?.image || '';
      }

      if (chosen) {
        used.add(chosen);
      }

      return { ...pup, displayImg: chosen };
    });
  }, []);

  return (
    <div>
      {/* Segment 1: Sketchbook Page Header */}
      <section
        style={{
          backgroundColor: '#fbf6eb',
          backgroundImage: 'radial-gradient(rgba(184, 93, 40, 0.13) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
          padding: 'clamp(2rem, 4.5vw, 3.25rem) var(--gutter) 1.25rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: 680 }}>
            <p
              className="font-scrawl"
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#9b4a1e',
                margin: '0 0 0.25rem',
              }}
            >
              from Teddy&apos;s sketchbook
            </p>
            <h1
              className="font-plush"
              style={{
                fontSize: 'clamp(2.6rem, 6.8vw, 4.75rem)',
                lineHeight: 0.98,
                margin: 0,
                color: '#2a170e',
              }}
            >
              Available puppies
            </h1>

            {/* Thick Terracotta Curved Brush Underline */}
            <svg
              viewBox="0 0 520 22"
              preserveAspectRatio="none"
              aria-hidden="true"
              style={{ width: '100%', maxWidth: 520, height: 16, display: 'block', margin: '0.35rem 0 1rem' }}
            >
              <path
                d="M4 14 Q 170 4, 340 12 T 514 11"
                fill="none"
                stroke="#b85d28"
                strokeWidth="7.5"
                strokeLinecap="round"
              />
            </svg>

            <p style={{ fontSize: '0.96rem', color: 'rgba(42,23,14,0.75)', maxWidth: 460, lineHeight: 1.6, margin: 0 }}>
              Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
            </p>
          </div>

          {/* Mascot Double-Ring Self-Portrait */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 124,
                height: 124,
                borderRadius: '50%',
                padding: 4,
                border: '2.5px solid #2a170e',
                background: '#fffdf8',
                boxShadow: '0 4px 0 rgba(42,23,14,0.12)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '1.5px solid #2a170e',
                  background: '#fbe6be',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <TeddyRunner style={{ width: 96, height: 82, transform: 'translateX(4px)' }} />
              </div>
            </div>
            <span
              className="font-scrawl"
              style={{ fontSize: '0.92rem', fontWeight: 700, color: 'rgba(42,23,14,0.75)', marginTop: 6 }}
            >
              self-portrait
            </span>
          </div>
        </div>

        {/* Tab Switcher when viewing Gone Home */}
        {activeTab === 'gone' && (
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              id="tab-available"
              onClick={() => setActiveTab('available')}
              className="filter-pill"
              style={{ fontSize: '0.9rem', padding: '0.45rem 1.15rem' }}
            >
              🐾 Back to available puppies
            </button>
          </div>
        )}
      </section>

      {/* Wave Between Header & Filter/Grid Segment */}
      <WaveDivider fromColor="#fbf6eb" toColor="#fffdf8" />

      {/* Segment 2: Filter Box + Puppy Grid */}
      <section style={{ background: '#fffdf8', padding: '1.5rem var(--gutter) clamp(3.5rem, 6vw, 4.75rem)' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'available' ? (
            <motion.div
              key="available"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <PuppyFilters filters={filters} setFilters={setFilters} />

              <p
                className="font-scrawl"
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#2a170e',
                  marginBottom: '1.75rem',
                }}
              >
                {filteredPuppies.length} {filteredPuppies.length === 1 ? 'puppy' : 'puppies'} looking for a home
              </p>

              <div className="puppy-grid" id="puppy-grid">
                {filteredPuppies.map((pup, idx) => (
                  <PuppyCard key={pup.id} puppy={pup} index={idx} onClick={handlePuppyClick} />
                ))}
              </div>

              {filteredPuppies.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(42,23,14,0.6)' }}>
                  <p style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🐾</p>
                  <p>No puppies match your filters. Try adjusting them!</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="gone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div
                style={{
                  background: '#fffdf8',
                  borderRadius: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '2rem',
                  border: '2.5px solid #2a170e',
                }}
              >
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(42,23,14,0.8)' }}>
                  These puppies have already found their forever families. 🏠
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '2rem',
                }}
              >
                {distinctGoneList.map(pup => (
                  <GoneCard key={pup.id} puppy={pup} imageSrc={pup.displayImg} size={150} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Wave Between Grid & "Already gone home" Segment */}
      <WaveDivider fromColor="#fffdf8" toColor="#f8d696" flip />

      {/* Segment 3: Bottom "Already gone home" Warm Honey Strip */}
      <section
        style={{
          background: 'linear-gradient(180deg, #f8d696 0%, #f5ca7b 100%)',
          padding: 'clamp(2.5rem, 5.5vw, 4rem) var(--gutter)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2
              className="font-plush"
              style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.1rem)', lineHeight: 1.02, margin: '0 0 0.5rem', color: '#2a170e' }}
            >
              Already
              <br />
              gone home
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'rgba(42,23,14,0.75)', margin: '0 0 1.25rem' }}>
              These puppies have found their families.
            </p>
            <button
              onClick={() => {
                setActiveTab('gone');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-toffee"
            >
              See the puppies who&apos;ve gone home
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.25rem',
            }}
          >
            {distinctGoneList.slice(0, 5).map(pup => (
              <GoneCard key={pup.id} puppy={pup} imageSrc={pup.displayImg} size={108} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}