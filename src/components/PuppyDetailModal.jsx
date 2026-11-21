import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Video } from 'lucide-react';
import { getPuppyWhatsAppLink } from '../data/puppiesData';

function SpecBadge({ children }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: 9999,
      border: '1.5px solid #e4a352',
      background: '#fff1d8',
      fontSize: '0.8rem',
      fontWeight: 600,
      color: '#2a170e',
      gap: 4,
    }}>
      {children}
    </span>
  );
}

function HealthBadge({ children }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: 9999,
      background: '#e8f5ee',
      border: '1.5px solid #4caf50',
      fontSize: '0.78rem',
      fontWeight: 600,
      color: '#2a6e35',
      gap: 4,
    }}>
      ✓ {children}
    </span>
  );
}

export default function PuppyDetailModal({ puppy, onClose }) {
  if (!puppy) return null;

  const waLink = getPuppyWhatsAppLink(puppy);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        id={`modal-${puppy.id}`}
      >
        <motion.div
          className="modal-panel"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Close btn */}
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>

          {/* Photo */}
          <div style={{
            width: '100%',
            aspectRatio: '4/3',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '3px solid #2a170e',
            marginBottom: '1.5rem',
            position: 'relative',
            background: puppy.bgColor || '#8b5e3c',
          }}>
            <img
              src={puppy.image}
              alt={`${puppy.name || puppy.breed} puppy`}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: puppy.objectPosition || '50% 40%',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {puppy.hasVideo && (
              <div style={{
                position: 'absolute', bottom: 12, left: 12,
                background: 'rgba(42,23,14,0.85)',
                color: 'white', borderRadius: 9999,
                padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <Video size={12} /> video
              </div>
            )}
            {puppy.status === 'available' && (
              <div style={{
                position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
                background: 'white', border: '2px solid #2a170e',
                borderRadius: 9999, padding: '3px 12px',
                fontSize: '0.78rem', fontWeight: 700,
              }}>
                Available
              </div>
            )}
          </div>

          {/* Info */}
          <h2 className="font-plush" style={{ fontSize: '1.8rem', margin: '0 0 0.3rem' }}>
            {puppy.name || puppy.breed}
          </h2>

          {/* Key specs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0 1.25rem' }}>
            <SpecBadge>🐾 {puppy.breed}</SpecBadge>
            <SpecBadge>{puppy.gender === 'boy' ? '♂' : '♀'} {puppy.gender}</SpecBadge>
            <SpecBadge>📅 {puppy.age}</SpecBadge>
            {puppy.type === 'korean-teacup' && <SpecBadge>🇰🇷 Korean Teacup</SpecBadge>}
            {puppy.hasVideo && <SpecBadge><Video size={12} /> With video</SpecBadge>}
          </div>

          {/* Health guarantees */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem' }}>Health & Care</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              <HealthBadge>Vaccinated</HealthBadge>
              <HealthBadge>Dewormed</HealthBadge>
              <HealthBadge>Health certificate</HealthBadge>
              <HealthBadge>Vet checked</HealthBadge>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(42,23,14,0.7)',
            lineHeight: 1.65,
            marginBottom: '1.5rem',
          }}>
            {puppy.name ? `Meet ${puppy.name}, a beautiful ${puppy.breed}` : `A beautiful ${puppy.breed}`} looking for a loving forever home in Dubai. 
            Every puppy at PebblePups U.A.E. comes with verified health guarantees and full support from our team.
          </p>

          {/* CTA */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            id={`modal-wa-btn-${puppy.id}`}
            style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.9rem' }}
          >
            💬 Reserve {puppy.name || 'this puppy'} on WhatsApp
          </a>

          <p style={{
            textAlign: 'center', fontSize: '0.78rem',
            color: 'rgba(42,23,14,0.5)', marginTop: '0.75rem',
          }}>
            We'll reply within minutes during business hours
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
