import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import TeddyRunner from '../components/TeddyRunner';
import PuppyDetailModal from '../components/PuppyDetailModal';
import {
  puppies, gonePuppies, processSteps, faqs,
  happyFamiliesTestimonials, getWhatsAppLink
} from '../data/puppiesData';

// ─── Wavy underline SVG ───────────────────────────────────
function WavyUnderline() {
  return (
    <svg
      viewBox="0 0 220 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ position: 'absolute', bottom: -8, left: 0, height: 12, width: '100%', color: '#c47a30' }}
    >
      <path
        d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Hero Arched Door (hover speech bubble like original) ──
function HeroDoor({ puppy, height, onClick }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <li className="tp-hero-door-item">
      <span className="tp-hero-bubble">{puppy.breed}</span>
      <button
        onClick={() => onClick(puppy)}
        className="tp-door"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        aria-label={`Meet ${puppy.name || puppy.breed}`}
        id={`hero-door-${puppy.id}`}
      >
        <div
          className="tp-door__frame"
          style={{
            background: puppy.bgColor || '#8b5e3c',
            height: `${height}px`,
          }}
        >
          {!imgErr && (
            <img
              src={puppy.image}
              alt={`${puppy.gender === 'girl' ? 'Female' : 'Male'} ${puppy.breed} puppy`}
              className="tp-door__img"
              onError={() => setImgErr(true)}
            />
          )}
        </div>
      </button>
    </li>
  );
}

// ─── Individual 3D Wooden Puppy Door (Closes by default, swings open on hover) ───
function PuppyDoor({ puppy, index, onClick }) {
  const [imgErr, setImgErr] = useState(false);

  const doorColors = ['#b85d28', '#523426', '#d88c3a', '#8c441e', '#6b422d'];
  const doorBg = puppy.doorColor || doorColors[index % doorColors.length];

  return (
    <li className="tp-door-item">
      <div className="tp-door__header">
        <p className="tp-door__name font-plush">{puppy.name || puppy.breed}</p>
        <p className="tp-door__sub">
          {puppy.breed !== puppy.name ? `${puppy.breed}, ` : ''}
          {puppy.gender}, {puppy.age}
          {puppy.hasVideo ? ', with video' : ''}
        </p>
      </div>

      <button
        onClick={() => onClick(puppy)}
        className="tp-door"
        aria-label={`Meet ${puppy.name || puppy.breed}`}
        id={`door-${puppy.id}`}
      >
        <div className="tp-door__frame">
          {!imgErr && (
            <img
              src={puppy.image}
              alt={`${puppy.gender === 'girl' ? 'Female' : 'Male'} ${puppy.breed} puppy`}
              className="tp-door__img"
              onError={() => setImgErr(true)}
            />
          )}

          {/* 3D Hinged Wooden Door Leaf */}
          <div className="tp-door__leaf" style={{ backgroundColor: doorBg }}>
            <div className="tp-door__panel" />
            <svg className="tp-door__paw" viewBox="0 0 32 32" aria-hidden="true">
              <ellipse cx="16" cy="21" rx="6.5" ry="5" fill="rgba(255,253,248,0.45)" />
              <circle cx="8.5" cy="13" r="2.6" fill="rgba(255,253,248,0.45)" />
              <circle cx="13.5" cy="10" r="2.6" fill="rgba(255,253,248,0.45)" />
              <circle cx="18.5" cy="10" r="2.6" fill="rgba(255,253,248,0.45)" />
              <circle cx="23.5" cy="13" r="2.6" fill="rgba(255,253,248,0.45)" />
            </svg>
            <span className="tp-door__knob" />
          </div>
        </div>

        <span className="tp-door__status">Available</span>
      </button>
    </li>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────
function HeroSection({ onPuppyClick }) {
  const leftPups = puppies.slice(0, 3);
  const rightPups = puppies.slice(3, 6);
  const leftHeights = [145, 195, 160];
  const rightHeights = [180, 205, 135];

  return (
    <section
      className="tp-hero"
      aria-labelledby="hero-title"
      style={{
        background: 'linear-gradient(180deg, #fffdf8 0%, #fff1d8 100%)',
        paddingTop: 'calc(var(--header-h) + 0.35rem)',
        gap: '1.1rem',
      }}
    >
      <motion.div
        className="tp-hero__copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 0 }}
      >
        <p className="tp-hero__note font-scrawl">
          every puppy is family
          <WavyUnderline />
        </p>
        <h1 id="hero-title" className="tp-hero__title font-plush">
          Premium teacup
          <br />
          puppies in Dubai
        </h1>
        <p className="tp-hero__lede">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>
        <div className="tp-hero__actions" style={{ marginBottom: 0 }}>
          <Link to="/puppies" className="btn btn-primary" id="hero-view-puppies">
            View available puppies
          </Link>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            id="hero-whatsapp"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </motion.div>

      <motion.div
        className="tp-hero__stage"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        style={{ marginTop: 0 }}
      >
        <ul className="tp-hero-lineup" aria-label="Some of the puppies in our showroom">
          {leftPups.map((pup, idx) => (
            <HeroDoor key={pup.id} puppy={pup} height={leftHeights[idx]} onClick={onPuppyClick} />
          ))}

          <li className="tp-hero-mascot" aria-hidden="true">
            <TeddyRunner style={{ width: 175, height: 155 }} />
          </li>

          {rightPups.map((pup, idx) => (
            <HeroDoor key={pup.id} puppy={pup} height={rightHeights[idx]} onClick={onPuppyClick} />
          ))}
        </ul>

        <div className="tp-quilt-banner" aria-hidden="true">
          <svg width="100%" height="28" preserveAspectRatio="none" style={{ display: 'block', marginTop: '-26px' }}>
            <defs>
              <pattern id="hero-scallop-quilt" width="76" height="28" patternUnits="userSpaceOnUse">
                <path d="M0 28V18A38 18 0 0 1 76 18V28Z" fill="#fbe3b4" />
                <path d="M0 18A38 18 0 0 1 76 18" fill="none" stroke="#2a170e" strokeWidth="2.5" />
                <path
                  d="M11 23A27 13 0 0 1 65 23"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                  opacity="0.45"
                />
              </pattern>
            </defs>
            <rect width="100%" height="28" fill="url(#hero-scallop-quilt)" />
          </svg>
          <div className="tp-quilt-fabric" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── MEET THE PUPS ────────────────────────────────────────
function MeetThePups({ onPuppyClick }) {
  const featured = puppies.slice(0, 4);

  return (
    <section className="tp-meet-section">
      <div className="tp-meet-header gutter">
        <div>
          <h2 className="section-title font-plush">Meet the pups</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>
            Real puppies, real photos, looking for their families right now.
          </p>
        </div>
        <Link to="/puppies" className="btn btn-toffee" style={{ flexShrink: 0 }}>
          See all available puppies
        </Link>
      </div>

      <div className="tp-meet-stage">
        <div className="tp-meet-mascot" aria-hidden="true">
          <TeddyRunner style={{ width: 135, height: 115 }} />
        </div>

        <ul className="tp-meet-lineup">
          {featured.map((pup, idx) => (
            <PuppyDoor key={pup.id} puppy={pup} index={idx} onClick={onPuppyClick} />
          ))}
        </ul>
      </div>

      <div className="tp-meet-floor" aria-hidden="true" />
    </section>
  );
}

// ─── TWO WAYS TO MEET + SCROLLING AIRPLANE + JOURNEY ──────
function HowItWorksTeaser() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Airplane moves along the Korea -> Dubai arc as user scrolls
  const planeX = useTransform(scrollYProgress, [0.1, 0.65], [-65, 95]);
  const planeY = useTransform(scrollYProgress, [0.1, 0.38, 0.65], [32, -26, 18]);
  const planeRotate = useTransform(scrollYProgress, [0.1, 0.38, 0.65], [-24, 0, 22]);

  const showroomPup = puppies[0]?.image;
  const planePup = puppies[1]?.image || puppies[0]?.image;

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#f8d38d',
        position: 'relative',
        padding: '0 var(--gutter) clamp(3.5rem, 7vw, 5.5rem)',
      }}
    >
      {/* Top Scalloped / Wavy Lace Edge */}
      <div
        aria-hidden="true"
        style={{
          margin: '0 calc(var(--gutter) * -1) clamp(2.5rem, 5vw, 3.75rem)',
          overflow: 'hidden',
        }}
      >
        <svg width="100%" height="22" preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <pattern id="honey-top-scallop" width="52" height="22" patternUnits="userSpaceOnUse">
              <path d="M0 0 H52 V8 A26 13 0 0 1 0 8 Z" fill="#fffdf8" />
              <path d="M0 8 A26 13 0 0 0 52 8" fill="none" stroke="rgba(42,23,14,0.22)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="22" fill="url(#honey-top-scallop)" />
        </svg>
      </div>

      {/* Centered Title */}
      <h2
        className="font-plush"
        style={{
          textAlign: 'center',
          fontSize: 'clamp(2.2rem, 5.2vw, 3.75rem)',
          lineHeight: 1.05,
          margin: '0 auto 1.75rem',
          maxWidth: 620,
        }}
      >
        Two ways to
        <br />
        meet your puppy
      </h2>

      {/* Wooden Signpost + Left Showroom Scene + Center Post + Right Airplane Arc */}
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto clamp(3.5rem, 7vw, 5.5rem)',
          position: 'relative',
        }}
      >
        {/* Signpost Arrows Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            position: 'relative',
            zIndex: 4,
            flexWrap: 'wrap',
          }}
        >
          {/* Left Sign Arrow */}
          <div
            style={{
              background: '#c98849',
              border: '2.5px solid #2a170e',
              padding: '0.6rem 1.6rem 0.6rem 2rem',
              clipPath: 'polygon(18px 0%, 100% 0%, 100% 100%, 18px 100%, 0% 50%)',
              borderRadius: '0 8px 8px 0',
              fontWeight: 800,
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              boxShadow: '0 3px 0 #2a170e',
            }}
            className="font-plush"
          >
            Puppies in Dubai
          </div>

          {/* Right Sign Arrow */}
          <div
            style={{
              background: '#c98849',
              border: '2.5px solid #2a170e',
              padding: '0.6rem 2rem 0.6rem 1.6rem',
              clipPath: 'polygon(0% 0%, calc(100% - 18px) 0%, 100% 50%, calc(100% - 18px) 100%, 0% 100%)',
              borderRadius: '8px 0 0 8px',
              fontWeight: 800,
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              boxShadow: '0 3px 0 #2a170e',
            }}
            className="font-plush"
          >
            Imported for you
          </div>
        </div>

        {/* Two Columns Divided by Center Wooden Post */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '2.5rem',
            alignItems: 'end',
            position: 'relative',
            paddingTop: '1.75rem',
          }}
        >
          {/* Center Vertical Wooden Post (Desktop) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '50%',
              top: -42,
              bottom: 135,
              width: 13,
              transform: 'translateX(-50%)',
              background: '#b67438',
              border: '2.5px solid #2a170e',
              borderRadius: 6,
              zIndex: 2,
            }}
          />

          {/* LEFT COLUMN: Dubai Showroom Window + Skyline + Mascot */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 420,
                height: 245,
                borderBottom: '2.5px solid rgba(42,23,14,0.45)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                padding: '0 1rem',
                marginBottom: '1.25rem',
              }}
            >
              {/* Subtle Dubai Skyline Silhouette SVG */}
              <svg
                viewBox="0 0 400 160"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  opacity: 0.35,
                }}
              >
                <path
                  d="M15 160 V115 H38 V160 M155 160 V95 H175 V65 L182 22 L189 65 V95 H205 V160 M218 160 V105 H246 V160 M260 160 V82 H286 V160 M298 160 V110 H326 V160"
                  fill="none"
                  stroke="#7a4c22"
                  strokeWidth="2.2"
                />
              </svg>

              {/* Showroom Photo Frame with Striped Awning */}
              <div style={{ position: 'relative', zIndex: 3, marginBottom: 4 }}>
                {/* Striped Awning */}
                <div
                  style={{
                    width: 146,
                    height: 16,
                    margin: '0 auto',
                    border: '2.5px solid #2a170e',
                    borderRadius: '4px 4px 0 0',
                    background:
                      'repeating-linear-gradient(90deg, #b85d28 0 14px, #fffdf8 14px 28px)',
                  }}
                />
                {/* Framed Photo */}
                <div
                  style={{
                    width: 134,
                    height: 162,
                    margin: '0 auto',
                    border: '2.5px solid #2a170e',
                    borderTop: 'none',
                    background: '#fffdf8',
                    overflow: 'hidden',
                  }}
                >
                  {showroomPup && (
                    <img
                      src={showroomPup}
                      alt="Puppy in our Dubai showroom"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <span
                  className="font-scrawl"
                  style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginTop: 2 }}
                >
                  In our showroom
                </span>
              </div>

              {/* Teddy Mascot standing near center post */}
              <div style={{ position: 'relative', zIndex: 4, marginBottom: -14 }} aria-hidden="true">
                <TeddyRunner style={{ width: 112, height: 98 }} />
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'rgba(42,23,14,0.82)', maxWidth: 330, margin: '0 0 1.25rem', lineHeight: 1.55 }}>
              See them, love them, take them home. Come meet our locally available puppies before you decide.
            </p>
            <Link to="/puppies" className="btn btn-toffee">
              Meet local puppies
            </Link>
          </div>

          {/* RIGHT COLUMN: Korea -> Dubai Arc + Scroll-Animated Airplane */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 420,
                height: 245,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              {/* Dotted Flight Path Arc (Korea -> Dubai) */}
              <svg viewBox="0 0 380 190" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <path
                  d="M 55 150 Q 195 35 335 102"
                  fill="none"
                  stroke="#8b5a2b"
                  strokeWidth="2.5"
                  strokeDasharray="4 7"
                  strokeLinecap="round"
                />
                {/* Korea Pin */}
                <circle cx="55" cy="150" r="4.5" fill="#b85d28" stroke="#2a170e" strokeWidth="1.5" />
                <text x="55" y="172" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2a170e">
                  Korea
                </text>

                {/* Dubai Pin */}
                <circle cx="335" cy="102" r="4.5" fill="#b85d28" stroke="#2a170e" strokeWidth="1.5" />
                <text x="335" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2a170e">
                  Dubai
                </text>
              </svg>

              {/* Scroll-Driven Moving Airplane with Puppy Window */}
              <motion.div
                style={{
                  position: 'absolute',
                  x: planeX,
                  y: planeY,
                  rotate: planeRotate,
                  width: 155,
                  height: 92,
                  pointerEvents: 'none',
                }}
              >
                <svg viewBox="0 0 180 105" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  {/* Top Wing */}
                  <polygon points="75,42 105,8 122,14 102,42" fill="#b85d28" stroke="#2a170e" strokeWidth="2.8" strokeLinejoin="round" />
                  {/* Tail Fin */}
                  <polygon points="22,48 12,26 32,28 42,46" fill="#b85d28" stroke="#2a170e" strokeWidth="2.8" strokeLinejoin="round" />
                  {/* Fuselage Body */}
                  <path
                    d="M 24 52 C 45 34, 132 32, 162 50 C 135 70, 50 72, 24 52 Z"
                    fill="#fffdf8"
                    stroke="#2a170e"
                    strokeWidth="3"
                  />
                  {/* Bottom Wing */}
                  <polygon points="74,62 96,95 114,91 102,60" fill="#b85d28" stroke="#2a170e" strokeWidth="2.8" strokeLinejoin="round" />
                  {/* Nose Cone */}
                  <path d="M 148 43 Q 165 50 148 58" fill="#c98849" stroke="#2a170e" strokeWidth="2.5" />
                </svg>

                {/* Puppy Photo inside Round Airplane Window */}
                {planePup && (
                  <img
                    src={planePup}
                    alt="Imported teacup puppy"
                    style={{
                      position: 'absolute',
                      top: '31%',
                      left: '48%',
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #2a170e',
                      background: '#fbe3b4',
                    }}
                  />
                )}
              </motion.div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'rgba(42,23,14,0.82)', maxWidth: 340, margin: '0 0 1.25rem', lineHeight: 1.55 }}>
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.
            </p>
            <Link to="/puppies" className="btn btn-toffee">
              See imported puppies
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom: Your Puppy Journey + Mascot ("coming?") + WhatsApp Card */}
      <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2.5rem',
    alignItems: 'center',
    maxWidth: 1120,
    margin: '0 auto',
  }}
>
  <div>
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        paddingRight: 'clamp(5.2rem, 7.5vw, 6.4rem)',
      }}
    >
      <h2
        className="font-plush"
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
          lineHeight: 1.05,
          margin: '0 0 0.75rem',
        }}
      >
        Your puppy journey
      </h2>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0,
          bottom: -14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            background: '#fffdf8',
            border: '2px solid #2a170e',
            borderRadius: 999,
            padding: '2px 10px',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: -4,
            boxShadow: '0 2px 0 #2a170e',
            whiteSpace: 'nowrap',
          }}
        >
          coming?
        </span>
        <TeddyRunner style={{ width: 80, height: 68 }} />
      </div>
    </div>

          <p style={{ fontSize: '0.95rem', color: 'rgba(42,23,14,0.8)', maxWidth: 460, margin: '0 0 2rem' }}>
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {processSteps.map(step => (
              <div key={step.step} id={`step-${step.step}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: '#a85d28',
                    color: '#fffdf8',
                    border: '2.5px solid #2a170e',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {step.step}
                </span>
                <div>
                  <h3 className="font-plush" style={{ fontSize: '1.15rem', margin: '0 0 0.25rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(42,23,14,0.8)', margin: 0, lineHeight: 1.5 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Phone Preview Card */}
        <div
          style={{
            background: '#fffdf8',
            border: '3px solid #2a170e',
            borderRadius: '1.75rem',
            overflow: 'hidden',
            boxShadow: '0 8px 0 #2a170e',
            maxWidth: 420,
            width: '100%',
            justifySelf: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.9rem 1.25rem',
              borderBottom: '2px solid #2a170e',
              background: '#fffdf8',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#fbe3b4',
                border: '2px solid #2a170e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
              }}
            >
              🐾
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0 }}>PebblePups U.A.E.</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(42,23,14,0.6)', margin: 0 }}>typing...</p>
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem',
              minHeight: 260,
              backgroundColor: '#f7efe2',
              backgroundImage: 'radial-gradient(rgba(196,122,48,0.16) 2px, transparent 2px)',
              backgroundSize: '22px 22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                style={{
                  background: '#fffdf8',
                  border: '2px solid #2a170e',
                  borderRadius: '1rem 1rem 1rem 0.25rem',
                  padding: '0.75rem 1rem',
                  fontSize: '0.88rem',
                  maxWidth: '85%',
                }}
              >
                Hi there! 🐶 Looking for a teacup Maltipoo, Poodle, or Cavapoo in Dubai?
              </div>
              <div
                style={{
                  background: '#dcf8c6',
                  border: '2px solid #2a170e',
                  borderRadius: '1rem 1rem 0.25rem 1rem',
                  padding: '0.75rem 1rem',
                  fontSize: '0.88rem',
                  maxWidth: '82%',
                  alignSelf: 'flex-end',
                }}
              >
                Yes! Can you share videos of your available puppies?
              </div>
            </div>

            <a
              href={getWhatsAppLink("Hi PebblePups! I'd love to know more about your puppies.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              💬 Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS STEPS (combined in HowItWorksTeaser above) ───
function ProcessSection() {
  return null;
}

// ─── TRUST SECTION (Open Puppy Passport Book) ─────────────
function TrustSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #f3be6b 0%, #e49f46 100%)',
        padding: 'clamp(3.5rem, 8vw, 5.5rem) var(--gutter)',
        borderTop: '3px solid #2a170e',
      }}
    >
      {/* Leather Passport Outer Cover */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          background: '#9b4a1e',
          border: '3px solid #2a170e',
          borderRadius: '1.75rem',
          padding: 'clamp(0.75rem, 1.8vw, 1.15rem)',
          transform: 'rotate(-0.8deg)',
          boxShadow: '0 14px 30px rgba(42,23,14,0.22)',
        }}
      >
        {/* Two-Page Cream Spread */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            backgroundColor: '#fffdf8',
            backgroundImage: 'radial-gradient(rgba(196,122,48,0.14) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
            border: '2.5px solid #2a170e',
            borderRadius: '1.25rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Left Page: Title + Teddy Mascot */}
          <div
            style={{
              padding: 'clamp(2rem, 4.5vw, 3.5rem)',
              borderRight: '2px solid rgba(42,23,14,0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 380,
              position: 'relative',
              background: 'linear-gradient(90deg, #fffdf8 88%, rgba(42,23,14,0.08) 100%)',
            }}
          >
            <div>
              <p className="font-scrawl" style={{ fontSize: '1.1rem', color: '#9b4a1e', margin: '0 0 0.5rem', fontWeight: 700 }}>
                puppy passport
              </p>
              <h2
                className="font-plush"
                style={{ fontSize: 'clamp(2.1rem, 4vw, 3.2rem)', lineHeight: 1.05, margin: 0 }}
              >
                Why
                <br />
                families trust
                <br />
                PebblePups
              </h2>
            </div>

            <div style={{ alignSelf: 'flex-end', marginRight: '-1rem', marginBottom: '-1.5rem' }} aria-hidden="true">
              <TeddyRunner style={{ width: 130, height: 112 }} />
            </div>
          </div>

          {/* Right Page: 4 Passport Stamps */}
          <div
            style={{
              padding: 'clamp(2rem, 4.5vw, 3.25rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '2rem 1.5rem',
              alignItems: 'center',
              background: 'linear-gradient(270deg, #fffdf8 90%, rgba(42,23,14,0.06) 100%)',
            }}
          >
            {/* Stamp 1: Vet-checked & healthy */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: '50%',
                  border: '2.5px solid #9b4a1e',
                  outline: '1.5px solid #9b4a1e',
                  outlineOffset: -6,
                  margin: '0 auto 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-6deg)',
                  color: '#9b4a1e',
                  padding: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.35rem', marginBottom: 2 }}>💓</span>
                <span className="font-plush" style={{ fontSize: '0.82rem', lineHeight: 1.15 }}>
                  Vet-checked
                  <br />
                  &amp; healthy
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(42,23,14,0.75)', margin: 0, lineHeight: 1.45 }}>
                Every puppy comes vaccinated, dewormed, and with a verified health certificate.
              </p>
            </div>

            {/* Stamp 2: Korea to Dubai, safely */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 138,
                  height: 98,
                  borderRadius: 10,
                  border: '2.5px solid #3c7a57',
                  outline: '1.5px dashed #3c7a57',
                  outlineOffset: -6,
                  margin: '0 auto 0.95rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(4deg)',
                  color: '#3c7a57',
                  padding: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.25rem', marginBottom: 2 }}>✈️</span>
                <span className="font-plush" style={{ fontSize: '0.82rem', lineHeight: 1.15 }}>
                  Korea to
                  <br />
                  Dubai, safely
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(42,23,14,0.75)', margin: 0, lineHeight: 1.45 }}>
                Trusted breeders, safe travel, and premium care from start to finish.
              </p>
            </div>

            {/* Stamp 3: Support 24/7 */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 138,
                  height: 92,
                  borderRadius: '50%',
                  border: '2.5px solid #5c3a21',
                  outline: '1.5px solid #5c3a21',
                  outlineOffset: -6,
                  margin: '0 auto 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-5deg)',
                  color: '#5c3a21',
                  padding: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.2rem', marginBottom: 2 }}>💬</span>
                <span className="font-plush" style={{ fontSize: '0.82rem' }}>
                  Support 24/7
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(42,23,14,0.75)', margin: 0, lineHeight: 1.45 }}>
                Always here to help, from choosing your puppy to post-delivery support.
              </p>
            </div>

            {/* Stamp 4: Trusted by families worldwide */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 126,
                  height: 126,
                  borderRadius: '50%',
                  border: '3px dotted #b85d28',
                  outline: '1.5px solid #b85d28',
                  outlineOffset: -7,
                  margin: '0 auto 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b85d28',
                  padding: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1.25rem', marginBottom: 2 }}>🌐</span>
                <span className="font-plush" style={{ fontSize: '0.78rem', lineHeight: 1.15 }}>
                  Trusted
                  <br />
                  by families
                  <br />
                  worldwide
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(42,23,14,0.75)', margin: 0, lineHeight: 1.45 }}>
                Puppies delivered to loving homes all around the world.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── HAPPY FAMILIES TEASER (Terracotta Wood Wall + 8 Captioned Polaroids) ───
function HappyFamiliesTeaser() {
  const polaroids = [
    {
      image: happyFamiliesTestimonials[0]?.image || puppies[0]?.image,
      caption: 'Lulu 🐶 with her new mummy ❤️',
      tilt: '-2deg',
    },
    {
      image: happyFamiliesTestimonials[1]?.image || puppies[1]?.image,
      caption: 'Adorable Maltipoo baby 🐶❤️',
      tilt: '1.6deg',
    },
    {
      image: happyFamiliesTestimonials[2]?.image || puppies[2]?.image,
      caption: 'My new teddy puppy 🥳🐶',
      tilt: '-1.2deg',
    },
    {
      image: happyFamiliesTestimonials[3]?.image || puppies[3]?.image,
      caption: 'Our new puppies 🐶🤗',
      tilt: '2deg',
    },
    {
      image: happyFamiliesTestimonials[4]?.image || puppies[4]?.image || puppies[0]?.image,
      caption: 'New puppy 🐶😍',
      tilt: '-1.8deg',
    },
    {
      image: happyFamiliesTestimonials[5]?.image || puppies[5]?.image || puppies[1]?.image,
      caption: 'Gang of 3 😍🐶',
      tilt: '2.2deg',
    },
    {
      image: happyFamiliesTestimonials[6]?.image || puppies[2]?.image,
      caption: 'Forever besties 🐾💛',
      tilt: '-1.5deg',
    },
    {
      image: happyFamiliesTestimonials[7]?.image || puppies[3]?.image,
      caption: 'New pup 🫠',
      tilt: '1.4deg',
    },
  ];

  return (
    <section
      style={{
        background: '#9b5833',
        color: '#fffdf8',
        padding: 'clamp(3.5rem, 7vw, 5rem) 0 0',
        borderTop: '3px solid #2a170e',
        overflow: 'hidden',
      }}
    >
      {/* Top Row: Heading Left + Speech Bubble Quote Right */}
      <div
        className="gutter"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2.75rem',
        }}
      >
        <div>
          <h2
            className="font-plush"
            style={{ fontSize: 'clamp(2.3rem, 5vw, 3.6rem)', lineHeight: 1.02, margin: '0 0 1rem', color: '#fffdf8' }}
          >
            Happy families
            <br />
            &amp; puppies
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,253,248,0.88)', maxWidth: 440, lineHeight: 1.6, margin: 0 }}>
            We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
          </p>
        </div>

        {/* Speech Bubble Testimonial Card */}
        <div
          style={{
            background: '#fffdf8',
            color: '#2a170e',
            border: '2.5px solid #2a170e',
            borderRadius: '1.35rem',
            padding: '1.35rem 1.6rem',
            position: 'relative',
            maxWidth: 460,
            justifySelf: 'end',
            boxShadow: '0 6px 0 rgba(42,23,14,0.35)',
          }}
        >
          <p style={{ fontSize: '0.9rem', lineHeight: 1.55, margin: '0 0 0.75rem' }}>
            &ldquo;PebblePups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.&rdquo;
          </p>
          <p className="font-scrawl" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#9b5833', margin: 0 }}>
            Sarah M., Dubai, UAE
          </p>
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: -13,
              left: 34,
              width: 20,
              height: 20,
              background: '#fffdf8',
              borderRight: '2.5px solid #2a170e',
              borderBottom: '2.5px solid #2a170e',
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      </div>

      {/* Wooden Shelf Trim */}
      <div
        aria-hidden="true"
        style={{
          height: 16,
          background: '#7b4122',
          borderTop: '2.5px solid #2a170e',
          borderBottom: '2.5px solid #2a170e',
        }}
      />

      {/* Lower Wood Paneling with 8 Taped Polaroids + Teddy Mascot */}
      <div
        className="gutter"
        style={{
          background: '#8a4c2a',
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(42,23,14,0.22) 0 2px, transparent 2px 280px), repeating-linear-gradient(180deg, rgba(42,23,14,0.12) 0 1px, transparent 1px 44px)',
          padding: '2.5rem var(--gutter) 3.75rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.25rem 1.75rem',
            alignItems: 'start',
            position: 'relative',
          }}
        >
          {polaroids.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
              style={{
                background: '#fffdf8',
                color: '#2a170e',
                padding: '10px 10px 12px',
                border: '2px solid #2a170e',
                boxShadow: '0 10px 22px rgba(0,0,0,0.3)',
                transform: `rotate(${item.tilt})`,
                position: 'relative',
              }}
            >
              {/* Masking Tape Strip at Top */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: -11,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 58,
                  height: 18,
                  background: 'rgba(251, 235, 200, 0.88)',
                  border: '1px solid rgba(42,23,14,0.25)',
                }}
              />
              <img
                src={item.image}
                alt={item.caption}
                style={{ width: '100%', height: 235, objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <p
                className="font-scrawl"
                style={{
                  textAlign: 'center',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  margin: '10px 0 2px',
                  color: '#2a170e',
                }}
              >
                {item.caption}
              </p>
            </motion.div>
          ))}

          {/* Peeking Teddy Mascot on Bottom Row */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '24%',
              bottom: -14,
              zIndex: 6,
              pointerEvents: 'none',
            }}
          >
            <TeddyRunner style={{ width: 118, height: 102 }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.75rem' }}>
          <Link to="/happy-families" className="btn btn-primary" id="happy-families-link">
            See all happy families
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ TEASER (Dark Chocolate + Sparkles + Mascot) ──────
function FaqTeaser() {
  const featuredFaqs = [
    {
      question: 'Are your puppies vaccinated and health-checked?',
      answer:
        'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
    },
    {
      question: 'Can I meet a puppy before I decide?',
      answer:
        'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
    },
    {
      question: 'Can I take my puppy home the same day?',
      answer:
        'Local puppies are available immediately, so you can take your puppy home the same day.',
    },
  ];

  const sparkles = [
    { top: '12%', left: '39%', size: 12 },
    { top: '9%', left: '72%', size: 12 },
    { top: '26%', left: '88%', size: 9 },
    { top: '63%', left: '83%', size: 10 },
    { top: '82%', left: '63%', size: 9 },
    { top: '52%', left: '95%', size: 7 },
    { top: '89%', left: '39%', size: 7 },
  ];

  return (
    <section
      style={{
        background: '#331b0e',
        color: '#fffdf8',
        padding: 'clamp(4rem, 8vw, 6rem) var(--gutter)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '3px solid #2a170e',
      }}
    >
      {/* Decorative Golden Four-Point Sparkles */}
      {sparkles.map((sp, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: sp.top,
            left: sp.left,
            fontSize: sp.size,
            color: '#f3be6b',
            pointerEvents: 'none',
            opacity: 0.9,
          }}
        >
          ✦
        </span>
      ))}

      <div
        style={{
          maxWidth: 1140,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Title + Outline Button + Curious Teddy Mascot */}
        <div>
          <h2
            className="font-plush"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              lineHeight: 1.04,
              margin: '0 0 1.5rem',
              color: '#fffdf8',
            }}
          >
            Questions,
            <br />
            answered
          </h2>

          <Link
            to="/faq"
            id="all-faqs-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.7rem 1.65rem',
              borderRadius: 999,
              border: '2px solid rgba(255, 253, 248, 0.85)',
              color: '#fffdf8',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            Read all questions
          </Link>

          {/* Teddy Mascot with "?" above head */}
          <div
            aria-hidden="true"
            style={{
              position: 'relative',
              width: 145,
              marginTop: '0.75rem',
            }}
          >
            <span
              className="font-plush"
              style={{
                position: 'absolute',
                top: -6,
                right: 16,
                fontSize: '2.1rem',
                color: '#f3be6b',
                transform: 'rotate(10deg)',
                fontWeight: 900,
              }}
            >
              ?
            </span>
            <TeddyRunner style={{ width: 132, height: 114 }} />
          </div>
        </div>

        {/* Right Column: Sparkle-Bulleted Open Q&A List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
          {featuredFaqs.map((faq, i) => (
            <div key={i} id={`faq-home-${i}`}>
              <h3
                className="font-plush"
                style={{
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.48rem)',
                  margin: '0 0 0.5rem',
                  color: '#fffdf8',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  lineHeight: 1.25,
                }}
              >
                <span style={{ color: '#f3be6b', fontSize: '1rem', marginTop: 4, flexShrink: 0 }}>✦</span>
                <span>{faq.question}</span>
              </h3>
              <p
                style={{
                  margin: 0,
                  paddingLeft: '1.65rem',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  color: 'rgba(255, 253, 248, 0.78)',
                  maxWidth: 520,
                }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GONE HOME SECTION (Scrapbook Keepsake Portraits + Guaranteed Unique Photos) ───
function GoneHomeSection() {
  // Saare available image pools collect karein (puppies + happyFamilies + gonePuppies)
  const rawPool = [
    ...puppies.map((p) => p?.image),
    ...happyFamiliesTestimonials.map((h) => h?.image),
    ...gonePuppies.map((g) => g?.image),
  ].filter((img) => typeof img === 'string' && img.trim().length > 0);

  // Unique URLs ka ordered list
  const uniquePool = Array.from(new Set(rawPool));
  const used = new Set();

  const distinctGonePups = gonePuppies.map((pup, idx) => {
    let pick = null;

    // 1. Pehle koi aisi unique image lo jo abhi tak use nahi hui
    const nextUnused = uniquePool.find((url) => !used.has(url));
    if (nextUnused) {
      pick = nextUnused;
    } else if (uniquePool.length > 0) {
      // 2. Agar pool chhota hai toh har card ke liye alag step se rotate karo
      pick = uniquePool[(idx * 2 + 1) % uniquePool.length];
    } else {
      pick = pup?.image || '';
    }

    if (pick) used.add(pick);

    return {
      ...pup,
      displayImage: pick,
    };
  });

  const tilts = ['-3deg', '2.5deg', '-2deg', '3deg', '-2.5deg'];

  return (
    <section
      id="gone-home"
      style={{
        background: 'linear-gradient(180deg, #fff8eb 0%, #fbe8c4 100%)',
        padding: 'clamp(3.5rem, 7vw, 5rem) var(--gutter)',
        borderTop: '3px solid #2a170e',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Paw Watermark Pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(184, 93, 40, 0.12) 2px, transparent 2px)',
          backgroundSize: '26px 26px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left Copy */}
        <div>
          <span
            className="font-scrawl"
            style={{
              display: 'inline-block',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#b85d28',
              marginBottom: '0.35rem',
            }}
          >
            forever loved &amp; adopted
          </span>
          <h2
            className="section-title font-plush"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', lineHeight: 1.05, margin: 0 }}
          >
            Already gone home
          </h2>
          <p
            style={{
              color: 'rgba(42,23,14,0.78)',
              margin: '0.75rem 0 1.5rem',
              fontSize: '0.96rem',
              maxWidth: 380,
              lineHeight: 1.6,
            }}
          >
            These lucky PebblePups have already found their loving families across Dubai and beyond.
          </p>
          <Link to="/puppies?tab=gone" className="btn btn-toffee" id="gone-home-cta">
            See the puppies who&apos;ve gone home
          </Link>
        </div>

        {/* Right: Framed Memory Portraits */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(1.25rem, 2.5vw, 1.85rem)',
          }}
        >
          {distinctGonePups.map((pup, idx) => (
            <motion.div
              key={`${pup.id || pup.name}-${idx}`}
              whileHover={{ y: -6, rotate: 0, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `rotate(${tilts[idx % tilts.length]})`,
              }}
            >
              <Link
                to={`/puppies/${pup.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Circular Keepsake Frame */}
                <div
                  style={{
                    position: 'relative',
                    width: 116,
                    height: 116,
                    borderRadius: '50%',
                    padding: 4,
                    background: '#fffdf8',
                    border: '2.5px solid #2a170e',
                    boxShadow: '0 6px 0 #2a170e',
                    marginBottom: '0.75rem',
                  }}
                >
                  {pup.displayImage && (
                    <img
                      src={pup.displayImage}
                      alt={pup.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        border: '1.5px solid rgba(42,23,14,0.2)',
                        transform: 'translateZ(0)',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}

                  {/* Sticker Pill at Bottom */}
                  <span
                    className="font-scrawl"
                    style={{
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%) rotate(-3deg)',
                      background: '#fffdf8',
                      color: '#b85d28',
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
                </div>

                {/* Puppy Name + Breed */}
                <span
                  className="font-plush"
                  style={{ fontSize: '1rem', fontWeight: 800, color: '#2a170e', marginTop: 2 }}
                >
                  {pup.name}
                </span>
                {pup.breed && pup.breed !== pup.name && (
                  <span style={{ fontSize: '0.75rem', color: 'rgba(42,23,14,0.65)', marginTop: 1 }}>
                    {pup.breed}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER (Dark Chocolate Wall + Open Arched Doorway) ───
function CtaBanner() {
  const featuredPup = puppies[0]?.image;

  return (
    <section
      style={{
        background: '#331b0e',
        color: '#fffdf8',
        padding: 'clamp(3.5rem, 8vw, 5.5rem) var(--gutter)',
        textAlign: 'center',
        borderTop: '3px solid #2a170e',
      }}
    >
      <h2
        className="font-plush"
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
          lineHeight: 1.05,
          margin: '0 auto 1rem',
          maxWidth: 620,
          color: '#fffdf8',
        }}
      >
        Ready to meet your
        <br />
        new best friend?
      </h2>
      <p
        style={{
          fontSize: '0.96rem',
          color: 'rgba(255,253,248,0.8)',
          maxWidth: 480,
          margin: '0 auto 2.5rem',
          lineHeight: 1.6,
        }}
      >
        Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
      </p>

      {/* Center Wall Backdrop with Open Doorway + Potted Plant + Teddy Mascot */}
      <div
        style={{
          maxWidth: 500,
          margin: '0 auto 2.25rem',
          position: 'relative',
          paddingTop: '1.5rem',
        }}
      >
        {/* Wooden Siding Wall Panel */}
        <div
          style={{
            background: '#4a2b19',
            backgroundImage:
              'repeating-linear-gradient(180deg, rgba(255,253,248,0.04) 0 1px, transparent 1px 28px)',
            borderRadius: '1.25rem 1.25rem 0 0',
            height: 245,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            position: 'relative',
            padding: '0 2rem',
          }}
        >
          {/* Left Potted Plant */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: '16%', bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ width: 42, height: 48, borderRadius: '20px 20px 8px 8px', background: '#4e8a48' }} />
            <div style={{ width: 38, height: 32, background: '#c66828', clipPath: 'polygon(0 0, 100% 0, 86% 100%, 14% 100%)' }} />
          </div>

          {/* Open Arched Doorway */}
          <div style={{ position: 'relative', width: 148, height: 215, zIndex: 3 }}>
            {/* Open Door Leaf Swung Left */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: -44,
                top: -6,
                width: 46,
                height: 221,
                background: '#a65624',
                border: '2.5px solid #2a170e',
                borderRadius: '44px 0 0 0',
                transform: 'skewY(-8deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 44,
                  borderRadius: 999,
                  background: '#fbe3b4',
                  border: '2px solid #2a170e',
                }}
              />
            </div>

            {/* Warm Glowing Arch Frame with Puppy Photo */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '74px 74px 0 0',
                border: '3px solid #2a170e',
                background: '#fbe3b4',
                overflow: 'hidden',
                boxShadow: '0 0 28px rgba(251, 227, 180, 0.25)',
              }}
            >
              {featuredPup && (
                <img
                  src={featuredPup}
                  alt="Welcome home puppy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          {/* Porch Sconce Light */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '26%',
              top: '34%',
              width: 22,
              height: 28,
              borderRadius: '4px 4px 10px 10px',
              background: '#ffe699',
              border: '2px solid #2a170e',
              boxShadow: '0 0 18px rgba(255, 230, 153, 0.65)',
            }}
          />

          {/* Right Potted Plant */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', right: '15%', bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ width: 46, height: 52, borderRadius: '22px 22px 8px 8px', background: '#4e8a48' }} />
            <div style={{ width: 40, height: 34, background: '#c66828', clipPath: 'polygon(0 0, 100% 0, 86% 100%, 14% 100%)' }} />
          </div>

          {/* Teddy Mascot Standing Left of Doormat */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: '10%', bottom: -12, zIndex: 5 }}
          >
            <TeddyRunner style={{ width: 112, height: 98 }} />
          </div>
        </div>

        {/* Floor Step + "welcome home" Doormat */}
        <div
          style={{
            height: 18,
            background: '#241208',
            borderRadius: 4,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span
            className="font-scrawl"
            style={{
              background: '#e5a95c',
              color: '#2a170e',
              border: '2px solid #2a170e',
              borderRadius: 6,
              padding: '2px 22px',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginTop: -6,
              height: 24,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            welcome home
          </span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
          id="cta-whatsapp"
          style={{ padding: '0.85rem 1.85rem' }}
        >
          Enquire on WhatsApp
        </a>
        <Link
          to="/visit"
          className="btn"
          id="cta-visit"
          style={{
            padding: '0.85rem 1.85rem',
            background: 'transparent',
            color: '#fffdf8',
            border: '2px solid #fffdf8',
            borderRadius: 999,
          }}
        >
          Visit &amp; contact
        </Link>
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────
export default function HomePage() {
  const [selectedPuppy, setSelectedPuppy] = useState(null);

  return (
    <>
      <HeroSection onPuppyClick={setSelectedPuppy} />
      <MeetThePups onPuppyClick={setSelectedPuppy} />
      <HowItWorksTeaser />
      <ProcessSection />
      <TrustSection />
      <HappyFamiliesTeaser />
      <FaqTeaser />
      <GoneHomeSection />
      <CtaBanner />

      <PuppyDetailModal puppy={selectedPuppy} onClose={() => setSelectedPuppy(null)} />
    </>
  );
}