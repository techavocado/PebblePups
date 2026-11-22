import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, ChevronDown } from 'lucide-react';
import TeddyRunner from '../components/TeddyRunner';
import { getWhatsAppLink, puppies } from '../data/puppiesData';

const SHOWROOM_PREVIEW_IMAGE =
  (puppies && puppies.find((p) => p.image)?.image) ||
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80';

const PUPPY_INTEREST_OPTIONS = [
  'any puppy (not sure yet)',
  'Teacup Toy Poodle',
  'Maltipoo',
  'Teacup Maltese',
  'Pomeranian',
  'Imported Puppy (Korea / Europe)',
];

function MailboxIllustration() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scale: 0.65, y: 14, rotate: -8, opacity: 0 }}
      animate={{ scale: 1, y: [0, -5, 0], rotate: 0, opacity: 1 }}
      transition={{
        scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.25 },
        y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 },
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.85rem',
      }}
    >
      <svg viewBox="0 0 96 74" style={{ width: 88, height: 68, display: 'block', overflow: 'visible' }}>
        <rect
          x="42"
          y="46"
          width="12"
          height="24"
          rx="2"
          fill="#8c4a20"
          stroke="#2a170e"
          strokeWidth="2.6"
        />

        <motion.g
          initial={{ rotate: -25 }}
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          style={{ transformOrigin: '72px 26px' }}
        >
          <rect
            x="70"
            y="12"
            width="10"
            height="15"
            rx="1.5"
            fill="#c45b38"
            stroke="#2a170e"
            strokeWidth="2.2"
          />
          <line x1="70" y1="12" x2="70" y2="29" stroke="#2a170e" strokeWidth="2.4" strokeLinecap="round" />
        </motion.g>

        <path
          d="M 18 46 L 18 28 C 18 15, 30 10, 46 10 C 62 10, 72 16, 72 28 L 72 46 Z"
          fill="#a95626"
          stroke="#2a170e"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        <line x1="22" y1="36" x2="68" y2="36" stroke="#2a170e" strokeWidth="2.4" strokeLinecap="round" />
        <rect x="26" y="21" width="14" height="5" rx="2" fill="#2a170e" />
      </svg>
    </motion.div>
  );
}

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [puppyChoice, setPuppyChoice] = useState(PUPPY_INTEREST_OPTIONS[0]);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const clearFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handlePostLetter = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!phone.trim()) nextErrors.phone = 'Please enter your phone number.';
    if (!location.trim()) nextErrors.location = 'Please enter your location.';
    if (!note.trim()) nextErrors.note = 'Please write a message before posting.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const whatsappSummaryLink = getWhatsAppLink(
    [
      'Hi PebblePups!',
      name.trim() ? `I'm ${name.trim()}.` : null,
      phone.trim() ? `Phone: ${phone.trim()}.` : null,
      email.trim() ? `Email: ${email.trim()}.` : null,
      location.trim() ? `From ${location.trim()}.` : null,
      `Interested in: ${puppyChoice}.`,
      note.trim() ? note.trim() : null,
    ]
      .filter(Boolean)
      .join(' ')
  );

  const getUnderlineBorder = (field) =>
    errors[field]
      ? '2px solid #c43d2b'
      : '1.8px dashed rgba(42, 23, 14, 0.45)';

  return (
    <div style={{ backgroundColor: '#fbf1dc', color: '#2a170e', overflowX: 'hidden' }}>
      <section
        style={{
          padding: 'calc(var(--header-h, 4.5rem) + clamp(1.5rem, 4vw, 3rem)) var(--gutter) 0',
          maxWidth: 1320,
          margin: '0 auto',
        }}
      >
        {/* Top Row: Big Title Left + Intro Paragraph Right */}
        <div className="contact-hero-row">
          <h1
            className="font-plush"
            style={{
              fontSize: 'clamp(2.55rem, 6.6vw, 4.75rem)',
              lineHeight: 0.96,
              margin: 0,
              color: '#2a170e',
            }}
          >
            Get in touch
            <br />
            with us
          </h1>

          <p className="contact-hero-desc">
            Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!
          </p>
        </div>

        {/* Main 2-Column Scrapbook Layout */}
        <div className="contact-main-grid">
          {/* Left Column: WhatsApp Pill + Call/Email + Downtown Dubai Showroom Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0 }}>
            <div>
              <a
                href={getWhatsAppLink("Hi PebblePups! I'd like to get in touch with your team.")}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.62rem 1.35rem',
                  borderRadius: 999,
                  background: '#1f7a4c',
                  color: '#fffdf8',
                  border: '2px solid #154e31',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 0 rgba(21, 78, 49, 0.45)',
                  marginBottom: '1.35rem',
                }}
              >
                WhatsApp +971 50 000 0000
              </a>

              <div className="contact-direct-links">
                <div id="contact-phone">
                  <div
                    className="font-scrawl"
                    style={{ fontSize: '0.95rem', fontWeight: 700, color: '#9b4a1e', marginBottom: 2 }}
                  >
                    call us
                  </div>
                  <a
                    href="tel:+971500000000"
                    style={{
                      color: '#2a170e',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    +971 50 000 0000
                  </a>
                </div>

                <div id="contact-email">
                  <div
                    className="font-scrawl"
                    style={{ fontSize: '0.95rem', fontWeight: 700, color: '#9b4a1e', marginBottom: 2 }}
                  >
                    email
                  </div>
                  <a
                    href="mailto:himanshuswami.work@gmail.com"
                    style={{
                      color: '#2a170e',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      wordBreak: 'break-word',
                    }}
                  >
                    himanshuswami.work@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Downtown Dubai Showroom Card with Awning */}
            <motion.div
              id="contact-location"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              style={{
                background: '#fdf4e3',
                border: '2.5px solid #2a170e',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 6px 0 rgba(42, 23, 14, 0.14)',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  height: 22,
                  borderBottom: '2px solid #2a170e',
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #b85d28 0 18px, #fffdf8 18px 36px)',
                }}
              />

              <div style={{ padding: '1.25rem 1.25rem 1.35rem' }}>
                <h2
                  className="font-plush"
                  style={{ fontSize: '1.5rem', lineHeight: 1.08, margin: '0 0 0.7rem' }}
                >
                  Visit us in
                  <br />
                  Downtown Dubai
                </h2>

                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'rgba(42, 23, 14, 0.76)',
                    lineHeight: 1.55,
                    margin: '0 0 1.2rem',
                  }}
                >
                  Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.35rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#2a170e',
                        marginBottom: '0.85rem',
                        lineHeight: 1.35,
                      }}
                    >
                      <PawPrint size={13} style={{ color: '#9b4a1e', marginTop: 2, flexShrink: 0 }} />
                      <span>Downtown Dubai, United Arab Emirates</span>
                    </div>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Downtown+Dubai+United+Arab+Emirates"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.52rem 1rem',
                        borderRadius: 999,
                        border: '2px solid #2a170e',
                        background: '#fffdf8',
                        color: '#2a170e',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Open in Google Maps
                    </a>
                  </div>

                  <div
                    style={{
                      width: 102,
                      height: 116,
                      borderTopLeftRadius: 52,
                      borderTopRightRadius: 52,
                      border: '2px solid #2a170e',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: '#fbe3b4',
                    }}
                  >
                    <img
                      src={SHOWROOM_PREVIEW_IMAGE}
                      alt="Puppy at Downtown Dubai showroom"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Letter Form OR Animated "Message received!" Card */}
          <div style={{ minWidth: 0, width: '100%' }}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="letter-form"
                  onSubmit={handlePostLetter}
                  className="contact-letter-form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -10 }}
                  transition={{ duration: 0.28 }}
                >
                  {/* Top-Right Stitched Paw Patch */}
                  <span
                    aria-hidden="true"
                    className="contact-paw-stamp"
                  >
                    <PawPrint size={18} style={{ color: '#9b4a1e' }} />
                  </span>

                  <div
                    className="font-scrawl"
                    style={{
                      fontSize: 'clamp(1.35rem, 2.4vw, 1.7rem)',
                      fontWeight: 700,
                      color: '#9b4a1e',
                      marginBottom: '1.25rem',
                    }}
                  >
                    Dear PebblePups,
                  </div>

                  {/* Line 1: Name (Required) */}
                  <div className="letter-line">
                    <span>my name is</span>
                    <input
                      type="text"
                      required
                      aria-label="Your name"
                      aria-invalid={Boolean(errors.name)}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearFieldError('name');
                      }}
                      placeholder="your name *"
                      className="letter-input"
                      style={{
                        borderBottom: getUnderlineBorder('name'),
                        background: errors.name ? 'rgba(196, 61, 43, 0.06)' : 'transparent',
                        color: '#2a170e',
                      }}
                    />
                    <span>, and you can reach me on</span>
                  </div>

                  {/* Line 2: Phone (Required) + Email (Optional) */}
                  <div className="letter-line" style={{ marginBottom: '0.85rem' }}>
                    <input
                      type="tel"
                      required
                      aria-label="Phone number"
                      aria-invalid={Boolean(errors.phone)}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        clearFieldError('phone');
                      }}
                      placeholder="+971 50 123 4567 *"
                      className="letter-input"
                      style={{
                        borderBottom: getUnderlineBorder('phone'),
                        background: errors.phone ? 'rgba(196, 61, 43, 0.06)' : 'transparent',
                        color: '#9b4a1e',
                        fontWeight: 600,
                      }}
                    />
                    <span>or by email at</span>
                    <input
                      type="email"
                      aria-label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="optional"
                      className="letter-input"
                      style={{
                        borderBottom: '1.8px dashed rgba(42, 23, 14, 0.45)',
                        background: 'transparent',
                        color: '#2a170e',
                      }}
                    />
                    <span>.</span>
                  </div>

                  {/* Line 3: Location (Required) + Puppy Interest */}
                  <div className="letter-line" style={{ marginBottom: '1.1rem' }}>
                    <span>I live in</span>
                    <input
                      type="text"
                      required
                      aria-label="Your area or city"
                      aria-invalid={Boolean(errors.location)}
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        clearFieldError('location');
                      }}
                      placeholder="e.g. Dubai Marina *"
                      className="letter-input"
                      style={{
                        borderBottom: getUnderlineBorder('location'),
                        background: errors.location ? 'rgba(196, 61, 43, 0.06)' : 'transparent',
                        color: '#2a170e',
                      }}
                    />
                    <span>, and I&apos;m curious about</span>

                    <span className="letter-select-wrap">
                      <select
                        aria-label="Puppy interest"
                        value={puppyChoice}
                        onChange={(e) => setPuppyChoice(e.target.value)}
                        className="letter-select"
                      >
                        {PUPPY_INTEREST_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} style={{ color: '#2a170e' }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        style={{
                          position: 'absolute',
                          right: 4,
                          pointerEvents: 'none',
                          color: '#2a170e',
                        }}
                      />
                    </span>
                    <span>.</span>
                  </div>

                  {/* Lined Note Area (Required) */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <textarea
                      rows={4}
                      required
                      aria-label="Additional message"
                      aria-invalid={Boolean(errors.note)}
                      value={note}
                      onChange={(e) => {
                        setNote(e.target.value);
                        clearFieldError('note');
                      }}
                      placeholder="Anything else you'd like to tell us... *"
                      style={{
                        width: '100%',
                        resize: 'none',
                        border: errors.note ? '1.5px solid #c43d2b' : 'none',
                        borderRadius: errors.note ? 6 : 0,
                        outline: 'none',
                        backgroundColor: errors.note ? 'rgba(196, 61, 43, 0.05)' : 'transparent',
                        backgroundImage:
                          'repeating-linear-gradient(180deg, transparent 0 33px, rgba(42, 23, 14, 0.22) 33px 34.5px)',
                        lineHeight: '34.5px',
                        fontSize: '0.94rem',
                        color: '#2a170e',
                        padding: errors.note ? '2px 8px' : '2px 0',
                      }}
                    />
                  </div>

                  {/* Validation Errors Summary */}
                  {Object.keys(errors).length > 0 && (
                    <div
                      role="alert"
                      style={{
                        marginBottom: '1.15rem',
                        padding: '0.65rem 0.9rem',
                        borderRadius: 8,
                        background: 'rgba(196, 61, 43, 0.09)',
                        border: '1.5px solid #c43d2b',
                        color: '#9f2818',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                      }}
                    >
                      {Object.values(errors).join(' ')}
                    </div>
                  )}

                  {/* Bottom Signature + Post My Letter Button */}
                  <div className="letter-footer">
                    <span
                      className="font-scrawl"
                      style={{ fontSize: '1.08rem', fontWeight: 700, color: '#9b4a1e' }}
                    >
                      with love, a future puppy parent
                    </span>

                    <button
                      type="submit"
                      id="post-letter-btn"
                      className="letter-submit-btn"
                    >
                      Post my letter
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="message-received-card"
                  id="message-received-card"
                  initial={{ opacity: 0, scale: 0.95, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: '#ecc379',
                    border: '2.5px solid #2a170e',
                    borderRadius: '1.25rem',
                    minHeight: 330,
                    padding: 'clamp(2.25rem, 5vw, 3.75rem) clamp(1.25rem, 4vw, 2.5rem)',
                    boxShadow: '0 7px 0 rgba(42, 23, 14, 0.16)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <MailboxIllustration />

                  <motion.h2
                    className="font-plush"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14, duration: 0.3 }}
                    style={{
                      fontSize: 'clamp(1.55rem, 3vw, 2.15rem)',
                      fontWeight: 800,
                      color: '#2a170e',
                      margin: '0 0 0.5rem',
                    }}
                  >
                    Message received!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.3 }}
                    style={{
                      fontSize: '0.88rem',
                      color: 'rgba(42, 23, 14, 0.8)',
                      lineHeight: 1.55,
                      maxWidth: 420,
                      margin: '0 0 1.45rem',
                    }}
                  >
                    Thank you — our team will get back to you promptly. For the quickest reply, message us on WhatsApp.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.65rem' }}
                  >
                    <a
                      href={whatsappSummaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.62rem 1.45rem',
                        borderRadius: 999,
                        background: '#1f7a4c',
                        color: '#fffdf8',
                        border: '2px solid #12482c',
                        fontWeight: 700,
                        fontSize: '0.86rem',
                        textDecoration: 'none',
                        boxShadow: '0 4px 0 rgba(18, 72, 44, 0.45)',
                      }}
                    >
                      WhatsApp us
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(42, 23, 14, 0.72)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Write another letter
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom-Right Teddy Mascot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '1.25rem',
          }}
        >
          <TeddyRunner style={{ width: 92, height: 76 }} />
        </div>
      </section>

      {/* Organic Wave Transition into Dark Chocolate Footer */}
      <div aria-hidden="true" style={{ lineHeight: 0, overflow: 'hidden' }}>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: '100%', height: 38, display: 'block' }}>
          <path
            d="M0,26 C260,6 540,42 840,22 C1120,4 1300,34 1440,18 L1440,52 L0,52 Z"
            fill="#2b1409"
          />
        </svg>
      </div>

      {/* Responsive Rules */}
      <style>{`
        .contact-hero-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem 2rem;
          align-items: center;
          margin-bottom: 2.25rem;
        }
        .contact-hero-desc {
          font-size: 0.95rem;
          color: rgba(42, 23, 14, 0.78);
          line-height: 1.62;
          margin: 0;
          max-width: 430px;
          justify-self: end;
        }
        .contact-main-grid {
          display: grid;
          grid-template-columns: minmax(270px, 340px) minmax(0, 1fr);
          gap: 2.25rem;
          align-items: start;
        }
        .contact-direct-links {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .contact-letter-form {
          position: relative;
          background: #fffdf9;
          border: 2.5px solid #2a170e;
          border-radius: 1.25rem;
          padding: clamp(1.75rem, 3.8vw, 2.75rem) clamp(1.25rem, 4vw, 3rem);
          box-shadow: 0 7px 0 rgba(42, 23, 14, 0.14);
        }
        .contact-paw-stamp {
          position: absolute;
          top: -14px;
          right: 24px;
          width: 52px;
          height: 52px;
          border-radius: 10px;
          background: #f5dfb8;
          border: 2px dashed #9b5a2c;
          transform: rotate(5deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(42, 23, 14, 0.12);
        }
        .letter-line {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.45rem;
          font-size: 0.96rem;
          line-height: 2;
          margin-bottom: 0.35rem;
        }
        .letter-input {
          border: none;
          outline: none;
          font-size: 0.93rem;
          min-width: 145px;
          max-width: 100%;
          padding: 0 6px;
        }
        .letter-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          max-width: 100%;
        }
        .letter-select {
          appearance: none;
          border: none;
          border-bottom: 1.8px dashed rgba(42, 23, 14, 0.5);
          background: transparent;
          outline: none;
          color: #9b4a1e;
          font-weight: 600;
          font-size: 0.92rem;
          padding: 0 22px 0 6px;
          cursor: pointer;
          max-width: 100%;
        }
        .letter-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .letter-submit-btn {
          padding: 0.68rem 1.5rem;
          border-radius: 999,
          border-radius: 999px;
          background: #8f4c22;
          color: #fffdf8;
          border: 2px solid #2a170e;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 0 4px 0 rgba(42, 23, 14, 0.22);
        }

        @media (max-width: 900px) {
          .contact-hero-row {
            grid-template-columns: 1fr;
            gap: 0.9rem;
            margin-bottom: 1.75rem;
          }
          .contact-hero-desc {
            justify-self: start;
            max-width: 100%;
          }
          .contact-main-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
          .contact-direct-links {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1.25rem 2rem;
          }
          .contact-letter-form {
            padding: 1.65rem 1.15rem 1.5rem;
          }
          .contact-paw-stamp {
            width: 44px;
            height: 44px;
            top: -12px;
            right: 16px;
          }
          .letter-input {
            min-width: 120px;
            flex: 1 1 135px;
          }
          .letter-select-wrap {
            flex: 1 1 190px;
          }
          .letter-select {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .letter-footer {
            flex-direction: column;
            align-items: stretch;
          }
          .letter-submit-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}