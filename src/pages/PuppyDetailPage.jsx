// import { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import PawIcon from '../components/PawIcon';
// import TeddyRunner from '../components/TeddyRunner';
// import { puppies, gonePuppies, getWhatsAppLink } from '../data/puppiesData';

// export default function PuppyDetailPage() {
//   const { id } = useParams();
//   const [enquiryOpen, setEnquiryOpen] = useState(false);

//   const allPuppies = [...puppies, ...gonePuppies];
//   const puppy = allPuppies.find(p => String(p.id) === String(id)) || puppies[0];
//   const isAvailable = !gonePuppies.some(g => g.id === puppy.id);

//   return (
//     <div className="tp-detail-page">
//       {/* White Scalloped Edge Under Header */}
//       <div className="tp-detail-scallop" aria-hidden="true">
//         <svg width="100%" height="18" preserveAspectRatio="none" style={{ display: 'block' }}>
//           <defs>
//             <pattern id="detail-header-scallop" width="48" height="18" patternUnits="userSpaceOnUse">
//               <path d="M0 0 H48 V6 A24 12 0 0 1 0 6 Z" fill="#fffdf8" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="18" fill="url(#detail-header-scallop)" />
//         </svg>
//       </div>

//       {/* Top Breadcrumb + "hello, it's me" */}
//       <div className="tp-detail-top gutter">
//         <div className="tp-detail-bookmark" aria-hidden="true" />
//         <div>
//           <nav className="tp-detail-crumb" aria-label="Breadcrumb">
//             <Link to="/puppies">Available puppies</Link>
//             <span> / </span>
//             <strong>{puppy.name || puppy.breed}</strong>
//           </nav>

//           <div className="tp-detail-hello">
//             <span className="tp-detail-num">1</span>
//             <span className="font-scrawl">hello, it&apos;s me</span>
//           </div>
//         </div>
//       </div>

//       {/* Main 2-Column Scrapbook Grid */}
//       <div className="tp-detail-grid gutter">
//         {/* Left: Stacked Notebook Photo Card */}
//         <motion.div
//           className="tp-detail-photo-stack"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45 }}
//         >
//           <div className="tp-detail-photo-card">
//             <img
//               src={puppy.image}
//               alt={`${puppy.name || puppy.breed}`}
//               className="tp-detail-photo"
//             />
//           </div>
//         </motion.div>

//         {/* Right: Passport Info Card with Ring & Mascot */}
//         <motion.div
//           className="tp-detail-info-card"
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           {/* Top-Left Binder Grommet Ring */}
//           <span className="tp-detail-ring" aria-hidden="true" />

//           {/* Top-Right Peeking Teddy Mascot */}
//           <div className="tp-detail-mascot" aria-hidden="true">
//             <TeddyRunner style={{ width: 68, height: 60 }} />
//           </div>

//           {/* Status Pill */}
//           <div className="tp-detail-badge">
//             <PawIcon style={{ width: 13, height: 13, color: '#c47a30' }} />
//             <span>{isAvailable ? 'Available' : 'Gone home'}</span>
//           </div>

//           {/* Name & Subtitle */}
//           <h1 className="tp-detail-name font-plush">{puppy.name || puppy.breed}</h1>
//           <p className="tp-detail-breed">{puppy.breed}</p>

//           {/* 2x2 Spec Grid */}
//           <div className="tp-detail-specs">
//             <div className="tp-detail-spec">
//               <span className="tp-detail-spec__label font-scrawl">Breed</span>
//               <span className="tp-detail-spec__val">{puppy.breed}</span>
//             </div>
//             <div className="tp-detail-spec">
//               <span className="tp-detail-spec__label font-scrawl">Boy or girl</span>
//               <span className="tp-detail-spec__val" style={{ textTransform: 'capitalize' }}>
//                 {puppy.gender}
//               </span>
//             </div>
//             <div className="tp-detail-spec">
//               <span className="tp-detail-spec__label font-scrawl">Age</span>
//               <span className="tp-detail-spec__val">{puppy.age}</span>
//             </div>
//             <div className="tp-detail-spec">
//               <span className="tp-detail-spec__label font-scrawl">Where</span>
//               <span className="tp-detail-spec__val">
//                 {puppy.location || 'Imported for you'}
//               </span>
//             </div>
//           </div>

//           {/* Full-width Action Pills */}
//           <div className="tp-detail-actions">
//             <a
//               href={getWhatsAppLink(`Hi TeddyPups! I'd love to ask about ${puppy.name || puppy.breed}.`)}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn btn-whatsapp tp-detail-btn"
//             >
//               Ask about {puppy.name || puppy.breed} on WhatsApp
//             </a>
//             <button
//               type="button"
//               onClick={() => setEnquiryOpen(!enquiryOpen)}
//               className="btn btn-ghost tp-detail-btn"
//             >
//               Send an enquiry
//             </button>
//           </div>

//           {enquiryOpen && (
//             <form
//               className="tp-detail-enquiry-form"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 alert(`Enquiry sent for ${puppy.name || puppy.breed}!`);
//                 setEnquiryOpen(false);
//               }}
//             >
//               <input type="text" placeholder="Your name" required />
//               <input type="tel" placeholder="WhatsApp / Phone number" required />
//               <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
//                 Submit enquiry
//               </button>
//             </form>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, PawPrint, Check } from 'lucide-react';
import TeddyRunner from '../components/TeddyRunner';
import { puppies, getPuppyWhatsAppLink, getWhatsAppLink } from '../data/puppiesData';

const JOURNEY_STEPS = [
  {
    num: 1,
    title: 'Reserve your puppy',
    desc: 'Tell us which puppy has captured your heart.',
  },
  {
    num: 2,
    title: 'Personalized consultation',
    desc: "We finalize details with you and share updates on your puppy's journey.",
  },
  {
    num: 3,
    title: 'Import and arrival',
    desc: 'We manage health checks, travel arrangements, and documentation.',
  },
  {
    num: 4,
    title: 'Welcome home',
    desc: 'We help your new puppy settle in and ensure a smooth transition into your home.',
  },
];

export default function PuppyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentIndex = useMemo(() => {
    const idx = puppies.findIndex((p) => String(p.id) === String(id));
    return idx >= 0 ? idx : 0;
  }, [id]);

  const puppy = puppies[currentIndex] || puppies[0];
  const prevPuppy = puppies[(currentIndex - 1 + puppies.length) % puppies.length];
  const nextPuppy = puppies[(currentIndex + 1) % puppies.length];

  const displayTitle = puppy.name || puppy.breed;
  const originLabel =
    puppy.where ||
    puppy.origin ||
    (puppy.type === 'korean-teacup' ? 'Imported for you' : 'Dubai Showroom');

  // Build gallery array (supports puppy.images array or falls back cleanly)
  const gallery = useMemo(() => {
    if (Array.isArray(puppy.images) && puppy.images.length > 0) {
      return puppy.images;
    }
    const extraPhotos = puppies
      .filter((p) => p.id !== puppy.id && p.image)
      .slice(0, 3)
      .map((p) => p.image);
    return [puppy.image, ...extraPhotos].filter(Boolean);
  }, [puppy]);

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Enquiry Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formArea, setFormArea] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [enquirySent, setEnquirySent] = useState(false);

  // Reset state when switching between puppies
  useEffect(() => {
    setActiveImgIdx(0);
    setFormMessage(`Hi! I'd love to know more about ${displayTitle}.`);
    setEnquirySent(false);
    setFormError('');
  }, [puppy.id, displayTitle]);

  const handlePrevImage = () => {
    setActiveImgIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNextImage = () => {
    setActiveImgIdx((prev) => (prev + 1) % gallery.length);
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('puppy-enquiry-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      setFormError('Please fill in your name and phone/WhatsApp number.');
      return;
    }
    setFormError('');
    setEnquirySent(true);
  };

  const waDirectLink = getPuppyWhatsAppLink(puppy);
  const waPrefilledEnquiryLink = getWhatsAppLink(
    [
      `Hi PebblePups! I'm interested in ${displayTitle}.`,
      formName.trim() ? `Name: ${formName.trim()}.` : null,
      formPhone.trim() ? `Phone: ${formPhone.trim()}.` : null,
      formArea.trim() ? `Area: ${formArea.trim()}.` : null,
      formMessage.trim() ? formMessage.trim() : null,
    ]
      .filter(Boolean)
      .join(' ')
  );

  return (
    <div className="pdp-root">
      <div className="pdp-container">
        {/* ============================================================
            SECTION 1: BREADCRUMB + PHOTO GALLERY + PASSPORT & HEALTH
           ============================================================ */}
        <div className="pdp-section-block">
          <span aria-hidden="true" className="pdp-bookmark" />

          <div className="pdp-top-header">
            <nav aria-label="Breadcrumb" className="pdp-breadcrumb">
              <Link to="/puppies">Available puppies</Link>
              <span> / </span>
              <strong>{displayTitle}</strong>
            </nav>

            <div className="pdp-step-tag">
              <span className="pdp-num-circle">1</span>
              <span className="font-scrawl">hello, it&apos;s me</span>
            </div>
          </div>

          <div className="pdp-hero-grid">
            {/* LEFT: Stacked Notebook Photo Carousel + Thumbnails */}
            <div className="pdp-gallery-col">
              <div className="pdp-photo-stack">
                <div className="pdp-photo-frame">
                  <img
                    src={gallery[activeImgIdx] || puppy.image}
                    alt={`${displayTitle} view ${activeImgIdx + 1}`}
                    className="pdp-main-img"
                    style={{ objectPosition: puppy.objectPosition || '50% 40%' }}
                  />

                  {gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        aria-label="Previous photo"
                        className="pdp-nav-arrow pdp-nav-arrow--left"
                      >
                        <ChevronLeft size={16} strokeWidth={2.5} />
                      </button>

                      <span className="pdp-counter-pill">
                        {activeImgIdx + 1}/{gallery.length}
                      </span>

                      <button
                        type="button"
                        onClick={handleNextImage}
                        aria-label="Next photo"
                        className="pdp-nav-arrow pdp-nav-arrow--right"
                      >
                        <ChevronRight size={16} strokeWidth={2.5} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {gallery.length > 1 && (
                <div className="pdp-thumbs-row">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={`${imgUrl}-${idx}`}
                      type="button"
                      onClick={() => setActiveImgIdx(idx)}
                      aria-label={`View photo ${idx + 1}`}
                      className={`pdp-thumb-btn ${idx === activeImgIdx ? 'active' : ''}`}
                    >
                      <img src={imgUrl} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Passport Card + Health Card */}
            <div className="pdp-cards-col">
              {/* Passport Info Card */}
              <div className="pdp-passport-card">
                <span aria-hidden="true" className="pdp-binder-ring" />
                <div aria-hidden="true" className="pdp-peeking-mascot">
                  <TeddyRunner style={{ width: 64, height: 54 }} />
                </div>

                <div className="pdp-avail-pill">
                  <PawPrint size={13} style={{ color: '#c47a30' }} />
                  <span>{puppy.status === 'gone' ? 'Adopted' : 'Available'}</span>
                </div>

                <h1 className="font-plush pdp-title">{displayTitle}</h1>

                {/* 2x2 Spec Grid */}
                <div className="pdp-specs-grid">
                  <div>
                    <div className="font-scrawl pdp-spec-label">Breed</div>
                    <div className="pdp-spec-val">{puppy.breed}</div>
                  </div>
                  <div>
                    <div className="font-scrawl pdp-spec-label">Boy or girl</div>
                    <div className="pdp-spec-val" style={{ textTransform: 'capitalize' }}>
                      {puppy.gender || 'Girl'}
                    </div>
                  </div>
                  <div>
                    <div className="font-scrawl pdp-spec-label">Age</div>
                    <div className="pdp-spec-val">{puppy.age || '2 months'}</div>
                  </div>
                  <div>
                    <div className="font-scrawl pdp-spec-label">Where</div>
                    <div className="pdp-spec-val">{originLabel}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pdp-cta-stack">
                  <a
                    href={waDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdp-btn-wa"
                  >
                    Ask about this puppy on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={scrollToEnquiry}
                    className="pdp-btn-secondary"
                  >
                    Send an enquiry
                  </button>
                </div>
              </div>

              {/* Card 2: Health & Guarantee Box */}
              <div className="pdp-health-card">
                <div className="pdp-step-tag" style={{ marginBottom: '0.35rem' }}>
                  <span className="pdp-num-circle">2</span>
                  <span className="font-scrawl">what comes with this {displayTitle}</span>
                </div>

                <h2 className="font-plush pdp-health-heading">Every PebblePup comes</h2>

                <ul className="pdp-health-list">
                  <li>
                    <Check size={16} strokeWidth={2.6} className="pdp-check-icon" />
                    <span>Vaccinated</span>
                  </li>
                  <li>
                    <Check size={16} strokeWidth={2.6} className="pdp-check-icon" />
                    <span>Dewormed</span>
                  </li>
                  <li>
                    <Check size={16} strokeWidth={2.6} className="pdp-check-icon" />
                    <span>Verified health certificate from licensed vets</span>
                  </li>
                  <li>
                    <Check size={16} strokeWidth={2.6} className="pdp-check-icon" />
                    <span>Thoroughly checked before joining your family</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            SECTION 3: THE WAY HOME (4-STEP TIMELINE)
           ============================================================ */}
        <section className="pdp-journey-section">
          <div className="pdp-step-tag" style={{ marginBottom: '0.35rem' }}>
            <span className="pdp-num-circle">3</span>
            <span className="font-scrawl">the way home</span>
          </div>

          <h2 className="font-plush pdp-journey-title">Coming home from abroad</h2>

          <div className="pdp-journey-grid">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step.num} className="pdp-journey-step">
                <div className="pdp-journey-top">
                  <span className="pdp-journey-num font-plush">{step.num}</span>
                  {i < JOURNEY_STEPS.length - 1 && (
                    <span aria-hidden="true" className="pdp-paw-trail" />
                  )}
                </div>
                <h3 className="pdp-journey-step-title">{step.title}</h3>
                <p className="pdp-journey-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 4: ENQUIRY LETTER BOX ("Ask about this puppy")
           ============================================================ */}
        <section id="puppy-enquiry-section" className="pdp-section-block">
          <span aria-hidden="true" className="pdp-bookmark pdp-bookmark--tall" />

          <div className="pdp-enquiry-card">
            <span aria-hidden="true" className="pdp-paw-stamp">
              <PawPrint size={19} style={{ color: '#9b4a1e' }} />
            </span>

            <div className="pdp-enquiry-grid">
              {/* Left Copy */}
              <div>
                <div className="pdp-step-tag" style={{ marginBottom: '0.45rem' }}>
                  <span className="pdp-num-circle">4</span>
                  <span className="font-scrawl">dear PebblePups...</span>
                </div>

                <h2 className="font-plush pdp-enquiry-title">
                  Ask about
                  <br />
                  this puppy
                </h2>

                <p className="pdp-enquiry-sub">
                  Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.
                </p>
              </div>

              {/* Right Form */}
              <div>
                {!enquirySent ? (
                  <form onSubmit={handleEnquirySubmit} className="pdp-form">
                    <div className="pdp-form-row">
                      <div className="pdp-field">
                        <label htmlFor="pdp-name">Your name *</label>
                        <input
                          id="pdp-name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder=""
                        />
                      </div>

                      <div className="pdp-field">
                        <label htmlFor="pdp-phone">Phone or WhatsApp *</label>
                        <input
                          id="pdp-phone"
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder=""
                        />
                        <span className="pdp-hint">With country code, e.g. +971 50 123 4567</span>
                      </div>
                    </div>

                    <div className="pdp-form-row">
                      <div className="pdp-field">
                        <label htmlFor="pdp-email">Email (optional)</label>
                        <input
                          id="pdp-email"
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder=""
                        />
                      </div>

                      <div className="pdp-field">
                        <label htmlFor="pdp-area">Your area (optional)</label>
                        <input
                          id="pdp-area"
                          type="text"
                          value={formArea}
                          onChange={(e) => setFormArea(e.target.value)}
                          placeholder=""
                        />
                        <span className="pdp-hint">e.g. Dubai Marina</span>
                      </div>
                    </div>

                    <div className="pdp-field">
                      <label htmlFor="pdp-msg">Message (optional)</label>
                      <textarea
                        id="pdp-msg"
                        rows={3}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                      />
                    </div>

                    {formError && <p className="pdp-form-error">{formError}</p>}

                    <div>
                      <button type="submit" className="pdp-submit-btn">
                        Send enquiry
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pdp-sent-box"
                  >
                    <h3 className="font-plush" style={{ margin: '0 0 0.4rem', fontSize: '1.35rem' }}>
                      Enquiry sent!
                    </h3>
                    <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: 'rgba(42,23,14,0.78)' }}>
                      Thank you, {formName}! Our team will reach out shortly about {displayTitle}.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                      <a
                        href={waPrefilledEnquiryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdp-btn-wa"
                        style={{ width: 'auto', padding: '0.62rem 1.3rem' }}
                      >
                        Chat on WhatsApp now
                      </a>
                      <button
                        type="button"
                        onClick={() => setEnquirySent(false)}
                        style={{
                          background: 'none',
                          border: 'none',
                          textDecoration: 'underline',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          color: '#2a170e',
                        }}
                      >
                        Edit details
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: PREVIOUS PUP / NEXT PUP NAVIGATION BAR
           ============================================================ */}
        <nav aria-label="More puppies" className="pdp-prev-next-grid">
          <button
            type="button"
            onClick={() => navigate(`/puppies/${prevPuppy.id}`)}
            className="pdp-pup-nav-card"
          >
            <img
              src={prevPuppy.image}
              alt={prevPuppy.name || prevPuppy.breed}
              className="pdp-pup-nav-avatar"
            />
            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <div className="font-scrawl pdp-pup-nav-label">Previous pup</div>
              <div className="font-plush pdp-pup-nav-name">
                {prevPuppy.name || prevPuppy.breed}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/puppies/${nextPuppy.id}`)}
            className="pdp-pup-nav-card pdp-pup-nav-card--right"
          >
            <div style={{ textAlign: 'right', minWidth: 0 }}>
              <div className="font-scrawl pdp-pup-nav-label">Next pup</div>
              <div className="font-plush pdp-pup-nav-name">
                {nextPuppy.name || nextPuppy.breed}
              </div>
            </div>
            <img
              src={nextPuppy.image}
              alt={nextPuppy.name || nextPuppy.breed}
              className="pdp-pup-nav-avatar"
            />
          </button>
        </nav>
      </div>

      {/* Bottom Wave into Footer */}
      <div aria-hidden="true" style={{ lineHeight: 0, overflow: 'hidden', marginTop: '2.5rem' }}>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: '100%', height: 38, display: 'block' }}>
          <path
            d="M0,26 C260,6 540,42 840,22 C1120,4 1300,34 1440,18 L1440,52 L0,52 Z"
            fill="#2b1409"
          />
        </svg>
      </div>

      {/* Scoped Styles (Desktop + Mobile Responsive) */}
      <style>{`
        .pdp-root {
          background-color: #fbf7ee;
          color: #2a170e;
          padding-top: 1.5rem;
          overflow-x: hidden;
        }
        .pdp-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 var(--gutter);
        }
        .pdp-section-block {
          position: relative;
        }
        .pdp-bookmark {
          position: absolute;
          left: calc(var(--gutter) * -1);
          top: 0;
          width: 14px;
          height: 54px;
          background: #9b4a1e;
          border-radius: 0 4px 4px 0;
        }
        .pdp-bookmark--tall {
          height: 100%;
          width: 12px;
          border-radius: 0;
        }
        .pdp-top-header {
          margin-bottom: 1.25rem;
        }
        .pdp-breadcrumb {
          font-size: 0.82rem;
          color: rgba(42, 23, 14, 0.72);
          margin-bottom: 0.35rem;
        }
        .pdp-breadcrumb a {
          color: rgba(42, 23, 14, 0.75);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .pdp-breadcrumb strong {
          color: #2a170e;
          font-weight: 700;
        }
        .pdp-step-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          color: #9b4a1e;
          font-size: 1.05rem;
        }
        .pdp-num-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.8px solid #2a170e;
          background: #fffdf8;
          color: #2a170e;
          font-family: 'Inter', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Hero 2-Col Grid */
        .pdp-hero-grid {
          display: grid;
          grid-template-columns: 1.32fr 1fr;
          gap: clamp(1.75rem, 3.5vw, 3rem);
          align-items: start;
        }

        /* Left Photo Stack */
        .pdp-photo-stack {
          position: relative;
          padding-right: 10px;
          padding-bottom: 8px;
        }
        .pdp-photo-stack::before,
        .pdp-photo-stack::after {
          content: '';
          position: absolute;
          inset: 5px 5px 4px 8px;
          background: #fffdf8;
          border: 2px solid #2a170e;
          border-radius: 1.15rem;
          z-index: 1;
        }
        .pdp-photo-stack::after {
          inset: 10px 0 0 14px;
          z-index: 0;
        }
        .pdp-photo-frame {
          position: relative;
          z-index: 2;
          border: 2.2px solid #2a170e;
          border-radius: 1.15rem;
          overflow: hidden;
          background: #efe3cf;
          aspect-ratio: 4 / 3.45;
        }
        .pdp-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pdp-nav-arrow {
          position: absolute;
          bottom: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #fffdf8;
          border: 2px solid #2a170e;
          color: #2a170e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(42, 23, 14, 0.16);
          transition: transform 0.18s ease, background 0.18s ease;
        }
        .pdp-nav-arrow:hover {
          background: #fff1d8;
          transform: scale(1.06);
        }
        .pdp-nav-arrow--left { left: 14px; }
        .pdp-nav-arrow--right { right: 14px; }
        .pdp-counter-pill {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(42, 23, 14, 0.78);
          color: #fffdf8;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 999px;
        }

        /* Thumbnails */
        .pdp-thumbs-row {
          display: flex;
          gap: 0.65rem;
          margin-top: 0.85rem;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .pdp-thumb-btn {
          width: 68px;
          height: 68px;
          border-radius: 0.75rem;
          border: 2px solid rgba(42, 23, 14, 0.25);
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          background: #fffdf8;
          opacity: 0.78;
          transition: all 0.18s ease;
        }
        .pdp-thumb-btn.active {
          border: 2.5px solid #9b4a1e;
          opacity: 1;
          transform: translateY(-2px);
        }
        .pdp-thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Right Passport Card */
        .pdp-cards-col {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }
        .pdp-passport-card {
          position: relative;
          background: #fffdf9;
          border: 2.2px solid #2a170e;
          border-radius: 1.45rem;
          padding: 1.9rem 1.85rem 1.75rem;
          box-shadow: 0 5px 0 rgba(42, 23, 14, 0.08);
        }
        .pdp-binder-ring {
          position: absolute;
          top: -12px;
          left: 16px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fbe3b4;
          border: 2px solid #2a170e;
          box-shadow: inset 0 0 0 4px #fffdf9;
        }
        .pdp-peeking-mascot {
          position: absolute;
          top: -36px;
          right: 22px;
          pointer-events: none;
        }
        .pdp-avail-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #f9ead0;
          padding: 0.28rem 0.85rem;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #2a170e;
          margin-bottom: 0.75rem;
        }
        .pdp-title {
          font-size: clamp(2.1rem, 3.6vw, 3rem);
          line-height: 1.02;
          margin: 0 0 1.4rem;
          color: #2a170e;
        }
        .pdp-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.15rem 1.25rem;
          margin-bottom: 1.65rem;
        }
        .pdp-spec-label {
          font-size: 0.96rem;
          color: rgba(42, 23, 14, 0.65);
          margin-bottom: 1px;
        }
        .pdp-spec-val {
          font-size: 0.92rem;
          font-weight: 700;
          color: #2a170e;
        }
        .pdp-cta-stack {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .pdp-btn-wa {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.78rem 1.25rem;
          border-radius: 999px;
          background: #1a7345;
          color: #fffdf8;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          border: 2px solid #135533;
          transition: background 0.18s ease, transform 0.18s ease;
        }
        .pdp-btn-wa:hover {
          background: #15603a;
          transform: translateY(-1px);
        }
        .pdp-btn-secondary {
          width: 100%;
          padding: 0.75rem 1.25rem;
          border-radius: 999px;
          background: #fffdf9;
          color: #2a170e;
          font-weight: 700;
          font-size: 0.88rem;
          border: 2px solid #2a170e;
          cursor: pointer;
          transition: background 0.18s ease;
        }
        .pdp-btn-secondary:hover {
          background: #fff1d8;
        }

        /* Card 2: Health Card */
        .pdp-health-card {
          background-color: #f9f3e6;
          background-image: radial-gradient(rgba(196, 122, 48, 0.11) 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          border: 2.2px solid #2a170e;
          border-radius: 1.25rem;
          padding: 1.5rem 1.75rem;
        }
        .pdp-health-heading {
          font-size: 1.35rem;
          margin: 0 0 0.85rem;
          color: #2a170e;
        }
        .pdp-health-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          font-size: 0.88rem;
          color: rgba(42, 23, 14, 0.86);
        }
        .pdp-health-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          line-height: 1.4;
        }
        .pdp-check-icon {
          color: #9b4a1e;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Section 3: Journey Timeline */
        .pdp-journey-section {
          margin-top: clamp(3rem, 6vw, 4.5rem);
          margin-bottom: clamp(2.5rem, 5vw, 3.75rem);
        }
        .pdp-journey-title {
          font-size: clamp(1.9rem, 3.8vw, 2.75rem);
          margin: 0 0 1.75rem;
          color: #2a170e;
        }
        .pdp-journey-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1.5rem;
        }
        .pdp-journey-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .pdp-journey-num {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 2px solid #2a170e;
          background: #fffdf8;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 800;
          flex-shrink: 0;
        }
        .pdp-paw-trail {
          flex: 1;
          height: 6px;
          background-image: radial-gradient(circle, rgba(196, 122, 48, 0.55) 2px, transparent 2.5px);
          background-size: 14px 6px;
          background-repeat: repeat-x;
        }
        .pdp-journey-step-title {
          font-size: 0.94rem;
          font-weight: 800;
          margin: 0 0 0.35rem;
          color: #2a170e;
        }
        .pdp-journey-step-desc {
          font-size: 0.82rem;
          line-height: 1.5;
          color: rgba(42, 23, 14, 0.75);
          margin: 0;
        }

        /* Section 4: Enquiry Card */
        .pdp-enquiry-card {
          position: relative;
          background: #fffdf9;
          border: 2.2px solid #2a170e;
          border-radius: 1.25rem;
          padding: clamp(1.65rem, 3.5vw, 2.5rem);
          margin-bottom: 1.75rem;
        }
        .pdp-paw-stamp {
          position: absolute;
          top: -14px;
          right: 24px;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background: #f5dfb8;
          border: 2px dashed #9b5a2c;
          transform: rotate(6deg);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pdp-enquiry-grid {
          display: grid;
          grid-template-columns: minmax(240px, 320px) minmax(0, 1fr);
          gap: 2rem 2.75rem;
          align-items: start;
        }
        .pdp-enquiry-title {
          font-size: clamp(1.9rem, 3.4vw, 2.6rem);
          line-height: 1.02;
          margin: 0 0 0.75rem;
        }
        .pdp-enquiry-sub {
          font-size: 0.84rem;
          line-height: 1.55;
          color: rgba(42, 23, 14, 0.75);
          margin: 0;
        }
        .pdp-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .pdp-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .pdp-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .pdp-field label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #2a170e;
        }
        .pdp-field input,
        .pdp-field textarea {
          width: 100%;
          border: 1.8px solid rgba(42, 23, 14, 0.45);
          border-radius: 999px;
          padding: 0.55rem 0.95rem;
          font-family: inherit;
          font-size: 0.86rem;
          background: #fffdf9;
          color: #2a170e;
          outline: none;
          transition: border-color 0.18s ease;
        }
        .pdp-field textarea {
          border-radius: 0.85rem;
          padding: 0.7rem 0.95rem;
          resize: vertical;
        }
        .pdp-field input:focus,
        .pdp-field textarea:focus {
          border-color: #9b4a1e;
        }
        .pdp-hint {
          font-size: 0.7rem;
          color: rgba(42, 23, 14, 0.6);
        }
        .pdp-form-error {
          margin: 0;
          font-size: 0.82rem;
          font-weight: 600;
          color: #b83222;
        }
        .pdp-submit-btn {
          padding: 0.68rem 1.65rem;
          border-radius: 999px;
          background: #8f4c22;
          color: #fffdf8;
          border: 2px solid #2a170e;
          font-weight: 700;
          font-size: 0.86rem;
          cursor: pointer;
          transition: background 0.18s ease;
        }
        .pdp-submit-btn:hover {
          background: #773d19;
        }
        .pdp-sent-box {
          background: #fff1d8;
          border: 2px solid #2a170e;
          border-radius: 1rem;
          padding: 1.5rem;
        }

        /* Section 5: Prev / Next Pup Cards */
        .pdp-prev-next-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .pdp-pup-nav-card {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          background: #fffdf9;
          border: 2.2px solid #2a170e;
          border-radius: 1.1rem;
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: transform 0.18s ease, background 0.18s ease;
        }
        .pdp-pup-nav-card:hover {
          background: #fff1d8;
          transform: translateY(-2px);
        }
        .pdp-pup-nav-card--right {
          justify-content: flex-end;
        }
        .pdp-pup-nav-avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #2a170e;
          flex-shrink: 0;
        }
        .pdp-pup-nav-label {
          font-size: 0.88rem;
          color: rgba(42, 23, 14, 0.7);
        }
        .pdp-pup-nav-name {
          font-size: 1.1rem;
          color: #2a170e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Mobile & Tablet Breakpoints */
        @media (max-width: 960px) {
          .pdp-hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .pdp-journey-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .pdp-paw-trail {
            display: none;
          }
          .pdp-enquiry-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 600px) {
          .pdp-bookmark {
            display: none;
          }
          .pdp-passport-card {
            padding: 1.65rem 1.2rem 1.45rem;
          }
          .pdp-peeking-mascot {
            right: 14px;
            top: -32px;
          }
          .pdp-journey-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .pdp-form-row {
            grid-template-columns: 1fr;
          }
          .pdp-prev-next-grid {
            grid-template-columns: 1fr;
          }
          .pdp-pup-nav-card--right {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}