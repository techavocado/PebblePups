import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, Heart, Smile, Truck, Calendar, MessageSquare, Plane, Home } from 'lucide-react';
import TeddyRunner from '../components/TeddyRunner';
import { getWhatsAppLink } from '../data/puppiesData';

const dubaiSteps = [
  {
    step: 'Step 1',
    title: 'Explore our puppies',
    desc: 'Browse our website to view the available puppies. Each listing includes photos, breed details, age,',
    icon: Search,
    badgeBg: '#fce7be',
    badgeColor: '#9b4a1e',
  },
  {
    step: 'Step 2',
    title: 'Choose your puppy',
    desc: 'Once you find a puppy you love, open their profile for more information or to enquire further.',
    icon: Heart,
    badgeBg: '#fad8d2',
    badgeColor: '#b44a38',
  },
  {
    step: 'Step 3',
    title: 'Meet before you choose',
    desc: 'Spend time bonding before making your decision.',
    icon: Smile,
    badgeBg: '#d9e6f5',
    badgeColor: '#3b628c',
  },
  {
    step: 'Step 4',
    title: 'Pick-up or delivery',
    desc: 'Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe',
    icon: Truck,
    badgeBg: '#dcf0dc',
    badgeColor: '#2f6b3a',
  },
];

const importedSteps = [
  {
    step: 'Step 1',
    title: 'Reserve your puppy',
    desc: 'Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.',
    icon: Calendar,
    badgeBg: '#fce7be',
    badgeColor: '#9b4a1e',
  },
  {
    step: 'Step 2',
    title: 'Personalized consultation',
    desc: 'Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy’s journey.',
    icon: MessageSquare,
    badgeBg: '#fad8d2',
    badgeColor: '#b44a38',
  },
  {
    step: 'Step 3',
    title: 'Import and arrival',
    desc: 'We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.',
    icon: Plane,
    badgeBg: '#d9e6f5',
    badgeColor: '#3b628c',
  },
  {
    step: 'Step 4',
    title: 'Welcome home',
    desc: 'Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.',
    icon: Home,
    badgeBg: '#dcf0dc',
    badgeColor: '#2f6b3a',
  },
];

// Clean, recognizable airplane SVG group centered around (0, 0) pointing right (+X)
function CleanPlaneSprite({ scale = 1, fill = '#fffdf8', accent = '#b85d28', strokeWidth = 2.2 }) {
  return (
    <g transform={`scale(${scale})`}>
      {/* Top swept wing */}
      <path
        d="M -6 -3 L 9 -18 L 15 -18 L 5 -3 Z"
        fill={accent}
        stroke="#2a170e"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Tail vertical stabilizer */}
      <path
        d="M -20 -3 L -27 -14 L -20 -14 L -14 -3 Z"
        fill={accent}
        stroke="#2a170e"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Main fuselage body with rounded nose */}
      <path
        d="M -23 0 C -23 -4.5, -19 -5.5, -12 -5.5 L 14 -5.5 C 21 -5.5, 25 -3, 25 0 C 25 3.2, 21 5.5, 14 5.5 L -12 5.5 C -19 5.5, -23 4.5, -23 0 Z"
        fill={fill}
        stroke="#2a170e"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Cabin window */}
      <circle cx="11" cy="-0.5" r="1.8" fill="#2a170e" />
      {/* Bottom near wing */}
      <path
        d="M -8 4.5 L 4 15 L 10 15 L 1 4.5 Z"
        fill={accent}
        stroke="#2a170e"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </g>
  );
}

function AnimatedPlaneBadge({ size = 22, tilt = -12 }) {
  return (
    <motion.span
      aria-hidden="true"
      animate={{
        y: [0, -3, 0],
        x: [0, 3, 0],
        rotate: [tilt, tilt + 4, tilt],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Plane size={size} strokeWidth={2.2} />
    </motion.span>
  );
}

function DubaiSkylineIllustration() {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #fffdf8 0%, #fce8c3 100%)',
        border: '2.5px solid #2a170e',
        borderRadius: '1.15rem',
        padding: '1rem 1.25rem 0.6rem',
        boxShadow: '0 6px 0 rgba(42, 23, 14, 0.14)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="font-scrawl"
        style={{ fontSize: '0.92rem', fontWeight: 700, color: '#2a170e', marginBottom: 4 }}
      >
        Downtown Dubai
      </div>

      <svg viewBox="0 0 380 135" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <motion.circle
          cx="305"
          cy="34"
          r="20"
          fill="#f8cf86"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '305px 34px' }}
        />

        <path
          d="M12 118 H42 V76 H66 V94 H88 V66 H112 V118 H138 V58 H164 V88 H186 V118 H208 V34 L214 22 L220 34 V118 H242 V72 H268 V88 H292 V68 H318 V118 H366"
          fill="none"
          stroke="#2a170e"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <line x1="8" y1="118" x2="372" y2="118" stroke="#c89b5a" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ImportFlightIllustration() {
  // Start: (52, 98), Peak: (192, 26), End: (332, 94)
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #edf4fb 0%, #fffdf8 100%)',
        border: '2.5px solid #2a170e',
        borderRadius: '1.15rem',
        padding: '1rem 1.25rem 0.85rem',
        boxShadow: '0 6px 0 rgba(42, 23, 14, 0.14)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 380 135" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
        {/* Flight Arc from Start to End */}
        <path
          id="import-arc-path"
          d="M 52 98 Q 192 22 332 94"
          fill="none"
          stroke="#9b4a1e"
          strokeWidth="2.4"
          strokeDasharray="3 6"
          strokeLinecap="round"
        />

        {/* Start & End Waypoint Dots */}
        <circle cx="52" cy="98" r="4.5" fill="#9b4a1e" />
        <circle cx="332" cy="94" r="4.5" fill="#9b4a1e" />

        {/* Airplane flying smoothly from Start (Europe · Korea) to End (Dubai) */}
        <motion.g
          initial={{ x: 52, y: 98, rotate: -26, opacity: 0 }}
          animate={{
            x: [52, 118, 192, 266, 332],
            y: [98, 52, 34, 54, 94],
            rotate: [-26, -14, 0, 14, 24],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          <CleanPlaneSprite scale={0.92} fill="#fffdf8" accent="#b85d28" strokeWidth={2.1} />
        </motion.g>

        <text
          x="32"
          y="118"
          fill="#2a170e"
          fontSize="11"
          fontWeight="700"
          className="font-scrawl"
        >
          Europe · Korea
        </text>
        <text
          x="315"
          y="114"
          fill="#2a170e"
          fontSize="11"
          fontWeight="700"
          className="font-scrawl"
        >
          Dubai
        </text>
      </svg>
    </div>
  );
}

function DeliverySkylineFlightSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scrollShiftX = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  // Start: Korea (54, 146) -> Arch over skyline (222, 58) -> End: Dubai (384, 122)
  return (
    <div ref={sectionRef} style={{ position: 'relative' }}>
      <svg viewBox="0 0 430 220" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
        {/* Full Start-to-End Dotted Flight Path */}
        <path
          d="M 54 146 Q 222 52 384 122"
          fill="none"
          stroke="#9b4a1e"
          strokeWidth="2.6"
          strokeDasharray="2.5 7"
          strokeLinecap="round"
        />

        {/* Start & End Pins */}
        <circle cx="54" cy="146" r="4.5" fill="#9b4a1e" />
        <circle cx="384" cy="122" r="4.5" fill="#9b4a1e" />

        {/* City Skyline */}
        <path
          d="M34 166 H72 V124 H98 V142 H122 V108 H148 V166 H184 V98 H212 V166 H234 V66 L242 52 L250 66 V166 H274 V126 H302 V146 H328 V122 H356 V166 H408"
          fill="none"
          stroke="#c89b5a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <line x1="28" y1="166" x2="412" y2="166" stroke="#c89b5a" strokeWidth="3.2" strokeLinecap="round" />

        {/* Origin & Destination Labels */}
        <text x="36" y="162" fill="#2a170e" fontSize="12" fontWeight="700" className="font-scrawl">
          Korea
        </text>
        <text x="372" y="140" fill="#2a170e" fontSize="12" fontWeight="700" className="font-scrawl">
          Dubai
        </text>

        {/* Animated Airplane Flying From Korea Start to Dubai End */}
        <motion.g style={{ x: scrollShiftX }}>
          <motion.g
            initial={{ x: 54, y: 146, rotate: -28, opacity: 0 }}
            animate={{
              x: [54, 132, 222, 308, 384],
              y: [146, 94, 76, 94, 122],
              rotate: [-28, -14, -2, 10, 18],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            <CleanPlaneSprite scale={1.45} fill="#fffdf8" accent="#b85d28" strokeWidth={2.1} />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}

export default function HowItWorksPage() {
  const [wayMode, setWayMode] = useState('dubai'); // 'dubai' | 'imported'

  const activeSteps = wayMode === 'dubai' ? dubaiSteps : importedSteps;

  const navPills = [
    { num: '1', label: 'Two ways home', href: '#two-ways-home' },
    { num: '2', label: 'Our premium puppy promise', href: '#premium-promise' },
    { num: '3', label: 'Delivery & collection', href: '#delivery-collection' },
    { num: '4', label: 'Why choose us', href: '#why-choose-us' },
  ];

  const whyChooseItems = [
    {
      title: 'International cargo',
      desc: 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.',
      icon: Plane,
      tilt: -10,
    },
    {
      title: 'Support 24/7',
      desc: "Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away.",
      icon: MessageSquare,
      tilt: 0,
    },
    {
      title: 'Health guarantee',
      desc: 'All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
      icon: Heart,
      tilt: 0,
    },
  ];

  return (
    <div style={{ color: '#2a170e' }}>
      {/* Top Hero Header + Quick Nav Pills */}
      <section
        style={{
          background: '#fbf6eb',
          padding: 'clamp(2.5rem, 5.5vw, 4.25rem) var(--gutter) 2rem',
        }}
      >
        <div
          style={{
            maxWidth: 1220,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <h1
            className="font-plush"
            style={{
              fontSize: 'clamp(2.8rem, 6.8vw, 4.65rem)',
              lineHeight: 0.98,
              margin: 0,
              color: '#2a170e',
            }}
          >
            How it works
          </h1>

          <p
            style={{
              fontSize: '0.96rem',
              color: 'rgba(42, 23, 14, 0.78)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 430,
              justifySelf: 'end',
            }}
          >
            Whether you choose to visit us locally or order a premium breed from overseas, PebblePups is here to make the experience unforgettable.
          </p>
        </div>

        {/* Anchor Pills */}
        <div
          style={{
            maxWidth: 1220,
            margin: '1.75rem auto 0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
          }}
        >
          {navPills.map((pill) => (
            <a
              key={pill.num}
              href={pill.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1rem',
                borderRadius: 999,
                border: '1.8px solid #2a170e',
                background: '#fffdf8',
                color: '#2a170e',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'transform 0.15s ease, background 0.15s ease',
              }}
            >
              <span className="font-scrawl" style={{ color: '#9b4a1e', fontWeight: 700 }}>
                {pill.num}
              </span>
              <span>{pill.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Section 1: Two Ways Home with Interactive Flip Toggle */}
      <section
        id="two-ways-home"
        style={{
          background: '#fbf6eb',
          padding: '1.5rem var(--gutter) clamp(3.5rem, 6vw, 4.75rem)',
        }}
      >
        <div style={{ maxWidth: 1220, margin: '0 auto' }}>
          {/* Heading + Segmented Toggle + Teddy Mascot */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2.25rem',
            }}
          >
            <div>
              <p
                className="font-scrawl"
                style={{ fontSize: '0.98rem', fontWeight: 700, color: '#9b4a1e', margin: '0 0 0.25rem' }}
              >
                choose your way
              </p>
              <h2
                className="font-plush"
                style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.25rem)', lineHeight: 1.02, margin: 0 }}
              >
                Two ways home
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div
                role="tablist"
                aria-label="Two ways home"
                style={{
                  display: 'inline-flex',
                  padding: 4,
                  borderRadius: 999,
                  border: '2.2px solid #2a170e',
                  background: '#fffdf8',
                  boxShadow: '0 4px 0 rgba(42, 23, 14, 0.1)',
                }}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={wayMode === 'dubai'}
                  id="toggle-in-dubai"
                  onClick={() => setWayMode('dubai')}
                  style={{
                    border: 'none',
                    borderRadius: 999,
                    padding: '0.5rem 1.35rem',
                    cursor: 'pointer',
                    background: wayMode === 'dubai' ? '#b85d28' : 'transparent',
                    color: wayMode === 'dubai' ? '#fffdf8' : '#2a170e',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span className="font-plush" style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.15 }}>
                    In Dubai
                  </span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.88 }}>meet in person</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={wayMode === 'imported'}
                  id="toggle-imported"
                  onClick={() => setWayMode('imported')}
                  style={{
                    border: 'none',
                    borderRadius: 999,
                    padding: '0.5rem 1.35rem',
                    cursor: 'pointer',
                    background: wayMode === 'imported' ? '#b85d28' : 'transparent',
                    color: wayMode === 'imported' ? '#fffdf8' : '#2a170e',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span className="font-plush" style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.15 }}>
                    Imported
                  </span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.88 }}>order upon request</span>
                </button>
              </div>

              <TeddyRunner style={{ width: 88, height: 74 }} />
            </div>
          </div>

          {/* Animated Flip Content */}
          <div style={{ perspective: 1200 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={wayMode}
                initial={{ opacity: 0, rotateY: wayMode === 'imported' ? 18 : -18, y: 12 }}
                animate={{ opacity: 1, rotateY: 0, y: 0 }}
                exit={{ opacity: 0, rotateY: wayMode === 'imported' ? -18 : 18, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                    gap: '2.25rem',
                    alignItems: 'center',
                    marginBottom: '2.25rem',
                  }}
                >
                  <div>
                    <h3
                      className="font-plush"
                      style={{ fontSize: 'clamp(1.65rem, 3.2vw, 2.25rem)', margin: '0 0 0.75rem' }}
                    >
                      {wayMode === 'dubai' ? 'Meet your puppy in person' : 'Order upon request'}
                    </h3>

                    {wayMode === 'dubai' ? (
                      <p style={{ fontSize: '0.94rem', color: 'rgba(42, 23, 14, 0.78)', lineHeight: 1.65, margin: 0 }}>
                        Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they&apos;re raised with care, proper nutrition, and veterinary checks.
                      </p>
                    ) : (
                      <>
                        <p style={{ fontSize: '0.94rem', color: 'rgba(42, 23, 14, 0.78)', lineHeight: 1.65, margin: '0 0 0.85rem' }}>
                          Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world&apos;s most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.
                        </p>
                        <p className="font-scrawl" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#9b4a1e', margin: 0 }}>
                          From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world&apos;s finest puppies to Dubai, just for you.
                        </p>
                      </>
                    )}
                  </div>

                  <div>
                    {wayMode === 'dubai' ? <DubaiSkylineIllustration /> : <ImportFlightIllustration />}
                  </div>
                </div>

                {/* 4 Step Cards */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                    gap: '1.15rem',
                  }}
                >
                  {activeSteps.map((s) => {
                    const IconComp = s.icon;
                    return (
                      <div
                        key={s.step}
                        style={{
                          background: '#fffdf8',
                          border: '2px solid #2a170e',
                          borderRadius: '1.1rem',
                          padding: '1.35rem',
                          boxShadow: '0 5px 0 rgba(42, 23, 14, 0.1)',
                        }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: s.badgeBg,
                            color: s.badgeColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.85rem',
                          }}
                        >
                          <IconComp size={16} strokeWidth={2.2} />
                        </div>

                        <div
                          className="font-scrawl"
                          style={{ fontSize: '0.82rem', fontWeight: 700, color: '#9b4a1e', marginBottom: 4 }}
                        >
                          {s.step}
                        </div>

                        <h4
                          className="font-plush"
                          style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.45rem' }}
                        >
                          {s.title}
                        </h4>

                        <p style={{ fontSize: '0.84rem', color: 'rgba(42, 23, 14, 0.75)', lineHeight: 1.55, margin: 0 }}>
                          {s.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Section 2: Our Premium Puppy Promise */}
      <section
        id="premium-promise"
        style={{
          background: '#f8d696',
          padding: 'clamp(2.5rem, 5vw, 3.75rem) var(--gutter)',
        }}
      >
        <div
          style={{
            maxWidth: 1220,
            margin: '0 auto',
            background: '#fffdf8',
            border: '2.5px solid #2a170e',
            borderRadius: '1.35rem',
            padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            boxShadow: '0 6px 0 rgba(42, 23, 14, 0.12)',
          }}
        >
          <p className="font-scrawl" style={{ fontSize: '0.96rem', fontWeight: 700, color: '#9b4a1e', margin: '0 0 0.25rem' }}>
            puppy passport
          </p>
          <h2
            className="font-plush"
            style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.1rem)', lineHeight: 1.02, margin: '0 0 2.25rem' }}
          >
            Our premium
            <br />
            puppy promise
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
              alignItems: 'start',
            }}
          >
            {/* Stamp 1: Hand-selected breeders */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 116,
                  height: 116,
                  borderRadius: '50%',
                  border: '2px dashed #b85d28',
                  padding: 5,
                  transform: 'rotate(-8deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.85rem',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '1.5px solid #b85d28',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9b4a1e',
                  }}
                >
                  <Heart size={16} />
                  <span className="font-scrawl" style={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.15, marginTop: 4 }}>
                    Hand-selected
                    <br />
                    breeders
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(42, 23, 14, 0.72)', maxWidth: 210, lineHeight: 1.5, margin: 0 }}>
                We work only with breeders who uphold the highest ethical and health standards.
              </p>
            </div>

            {/* Stamp 2: Full transparency */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 124,
                  height: 98,
                  borderRadius: 12,
                  border: '2px solid #2e6f40',
                  padding: 4,
                  transform: 'rotate(3deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.85rem',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 8,
                    border: '1.5px dashed #2e6f40',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2e6f40',
                  }}
                >
                  <AnimatedPlaneBadge size={18} tilt={-8} />
                  <span className="font-scrawl" style={{ fontSize: '0.84rem', fontWeight: 700, lineHeight: 1.15, marginTop: 3 }}>
                    Full
                    <br />
                    transparency
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(42, 23, 14, 0.72)', maxWidth: 220, lineHeight: 1.5, margin: 0 }}>
                Photos, videos, and health certificates are shared before your puppy travels.
              </p>
            </div>

            {/* Stamp 3: Safe, stress-free delivery */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 132,
                  height: 102,
                  borderRadius: '50%',
                  border: '2px solid #8c5a2b',
                  padding: 4,
                  transform: 'rotate(-5deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.85rem',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '1.5px dashed #8c5a2b',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#7a4b20',
                  }}
                >
                  <MessageSquare size={16} />
                  <span className="font-scrawl" style={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.15, marginTop: 3 }}>
                    Safe, stress-
                    <br />
                    free delivery
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(42, 23, 14, 0.72)', maxWidth: 220, lineHeight: 1.5, margin: 0 }}>
                We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Delivery & Collection */}
      <section
        id="delivery-collection"
        style={{
          background: '#f8d696',
          padding: 'clamp(1.5rem, 4vw, 3rem) var(--gutter) clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            maxWidth: 1220,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <div>
            <h2
              className="font-plush"
              style={{
                fontSize: 'clamp(2.2rem, 4.8vw, 3.3rem)',
                lineHeight: 0.98,
                margin: '0 0 0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span>
                Delivery &amp;
                <br />
                collection
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '2.5px solid #2a170e',
                  fontSize: '1.55rem',
                  lineHeight: 1,
                }}
              >
                &amp;
              </span>
            </h2>

            <p style={{ fontSize: '0.92rem', color: 'rgba(42, 23, 14, 0.78)', lineHeight: 1.6, margin: '0 0 1.75rem', maxWidth: 460 }}>
              From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem 1.75rem' }}>
              <div>
                <h3 className="font-plush" style={{ fontSize: '0.98rem', fontWeight: 700, margin: '0 0 0.3rem' }}>
                  Take your puppy home the same day
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(42, 23, 14, 0.72)', lineHeight: 1.55, margin: 0 }}>
                  Local puppies are available immediately — visit, fall in love, and go home together.
                </p>
              </div>

              <div>
                <h3 className="font-plush" style={{ fontSize: '0.98rem', fontWeight: 700, margin: '0 0 0.3rem' }}>
                  Delivery within Dubai
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(42, 23, 14, 0.72)', lineHeight: 1.55, margin: 0 }}>
                  Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.
                </p>
              </div>

              <div>
                <h3 className="font-plush" style={{ fontSize: '0.98rem', fontWeight: 700, margin: '0 0 0.3rem' }}>
                  Safe international cargo
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(42, 23, 14, 0.72)', lineHeight: 1.55, margin: 0 }}>
                  We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.
                </p>
              </div>

              <div>
                <h3 className="font-plush" style={{ fontSize: '0.98rem', fontWeight: 700, margin: '0 0 0.3rem' }}>
                  Worldwide delivery
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(42, 23, 14, 0.72)', lineHeight: 1.55, margin: 0 }}>
                  We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.
                </p>
              </div>
            </div>
          </div>

          <DeliverySkylineFlightSection />
        </div>
      </section>

      {/* Section 4: Why Choose Us + Bottom Card */}
      <section
        id="why-choose-us"
        style={{
          background: '#f8d696',
          padding: 'clamp(1.5rem, 4vw, 3rem) var(--gutter) 0',
        }}
      >
        <div style={{ maxWidth: 1220, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '2.25rem',
              alignItems: 'start',
              marginBottom: '2.75rem',
            }}
          >
            <div>
              <h2
                className="font-plush"
                style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.25rem)', lineHeight: 0.98, margin: '0 0 0.9rem' }}
              >
                Why
                <br />
                choose us
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'rgba(42, 23, 14, 0.78)', lineHeight: 1.6, margin: 0, maxWidth: 420 }}>
                We&apos;re here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we&apos;re with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              {whyChooseItems.map((item) => {
                const IconComp = item.icon;
                return (
                  <div key={item.title} style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        color: '#9b4a1e',
                        marginTop: 3,
                        flexShrink: 0,
                        display: 'inline-flex',
                      }}
                    >
                      {item.icon === Plane ? (
                        <AnimatedPlaneBadge size={20} tilt={item.tilt} />
                      ) : (
                        <IconComp size={20} strokeWidth={2.1} />
                      )}
                    </span>
                    <div>
                      <h3 className="font-plush" style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: 'rgba(42, 23, 14, 0.75)', lineHeight: 1.55, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unique and high quality puppies card */}
          <div
            style={{
              background: '#fffdf8',
              border: '2.5px solid #2a170e',
              borderRadius: '1.35rem',
              padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              boxShadow: '0 6px 0 rgba(42, 23, 14, 0.14)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.75rem',
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h3
                className="font-plush"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', margin: '0 0 0.65rem' }}
              >
                Unique and high quality puppies
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(42, 23, 14, 0.75)', lineHeight: 1.6, margin: '0 0 1.35rem' }}>
                When you choose PebblePups, you can trust that you&apos;re getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <a
                  href={getWhatsAppLink("Hi PebblePups! I'd love to know more about your puppies.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  id="how-it-works-wa-cta"
                >
                  Ask us on WhatsApp
                </a>

                <Link
                  to="/puppies"
                  style={{
                    padding: '0.68rem 1.35rem',
                    borderRadius: 999,
                    border: '2px solid #2a170e',
                    background: '#fffdf8',
                    color: '#2a170e',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                  }}
                >
                  See available puppies
                </Link>
              </div>
            </div>

            <TeddyRunner style={{ width: 116, height: 96 }} />
          </div>
        </div>

        {/* Organic Wave Transition into Dark Chocolate Footer */}
        <div aria-hidden="true" style={{ margin: '2.5rem calc(var(--gutter) * -1) 0', lineHeight: 0, overflow: 'hidden' }}>
          <svg viewBox="0 0 1440 54" preserveAspectRatio="none" style={{ width: '100%', height: 40, display: 'block' }}>
            <path
              d="M0,26 C260,6 540,42 840,22 C1120,4 1300,34 1440,18 L1440,54 L0,54 Z"
              fill="#331b0e"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}