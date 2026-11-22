import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PawIcon from './PawIcon';
import { navLinks, getWhatsAppLink } from '../data/puppiesData';

// Downward scalloped hem under header (no color overflow below)
function HeaderHem() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        height: 14,
        lineHeight: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <svg
        width="100%"
        height="14"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 14 }}
      >
        <defs>
          <pattern
            id="tp-hem"
            width="44"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 0 H 44 V 2 C 33 13, 11 13, 0 2 Z"
              fill="#fffdf8"
            />
            <path
              d="M 0 2 C 11 13, 33 13, 44 2"
              fill="none"
              stroke="#2a170e"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="14" fill="url(#tp-hem)" />
      </svg>
    </div>
  );
}

// Circular logo placeholder
function BrandLogo() {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: '2.5px solid #2a170e',
        background: '#fff1d8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <PawIcon style={{ width: 26, height: 26, color: '#a24a1a' }} />
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`tp-header${scrolled ? ' scrolled' : ''}`}
        id="site-header"
        style={{ background: 'transparent' }}
      >
        <div
          className="tp-header__bar"
          style={{
            background: '#fffdf8',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {/* Brand */}
          <Link
            className="tp-header__brand"
            to="/"
            aria-label="PebblePups U.A.E. — home"
            style={{ justifySelf: 'start', flexShrink: 0 }}
          >
            <BrandLogo />
            <span className="font-plush tp-header__name">PebblePups</span>
          </Link>

          {/* Desktop nav (Centered + Vertically Balanced) */}
          <nav
            aria-label="Main"
            className="tp-header__nav"
            style={{ justifySelf: 'center', alignSelf: 'center' }}
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) => `tp-nav-link${isActive ? ' active' : ''}`}
                  >
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA + Mobile menu btn */}
          <div
            className="tp-header__end"
            style={{
              justifySelf: 'end',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexShrink: 0,
            }}
          >
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp tp-header__wa"
              id="header-whatsapp-cta"
            >
              WhatsApp us
            </a>
            <button
              type="button"
              id="mobile-menu-btn"
              onClick={() => setMenuOpen(true)}
              style={{
                display: 'none',
                alignItems: 'center',
                gap: 8,
                height: 40,
                borderRadius: 9999,
                border: '2px solid #2a170e',
                background: '#fffdf8',
                padding: '0 1rem',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
              className="lg:hidden"
              aria-haspopup="dialog"
            >
              <PawIcon style={{ width: 16, height: 16, color: '#2a170e' }} />
              Menu
            </button>
          </div>
        </div>
        <HeaderHem />
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-label="Site menu"
            id="mobile-menu-dialog"
          >
            <div className="mobile-menu__header">
              <span className="font-scrawl" style={{ fontSize: '1.1rem', color: '#a24a1a' }}>
                where to, friend?
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                style={{
                  height: 44,
                  borderRadius: 9999,
                  background: '#2a170e',
                  color: 'white',
                  border: 'none',
                  padding: '0 1.25rem',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
            <nav aria-label="Mobile" className="mobile-menu__nav">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => `mobile-menu__link${isActive ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={getWhatsAppLink()}
                className="btn btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                WhatsApp us
              </a>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>
                +971 50 000 0000
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center lock & balanced vertical alignment */}
      <style>{`
        .tp-header__nav {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: 100%;
        }
        .tp-header__nav ul {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.4rem;
          margin: 0 !important;
          padding: 0 !important;
          list-style: none;
        }
        .tp-header__nav .tp-nav-link {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0.35rem 0.65rem !important;
          line-height: 1.2 !important;
        }
        @media (max-width: 1024px) {
          .tp-header__bar {
            display: flex !important;
            justify-content: space-between !important;
          }
          .tp-header__nav {
            display: none !important;
          }
          #mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}