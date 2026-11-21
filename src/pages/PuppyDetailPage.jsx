import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PawIcon from '../components/PawIcon';
import TeddyRunner from '../components/TeddyRunner';
import { puppies, gonePuppies, getWhatsAppLink } from '../data/puppiesData';

export default function PuppyDetailPage() {
  const { id } = useParams();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const allPuppies = [...puppies, ...gonePuppies];
  const puppy = allPuppies.find(p => String(p.id) === String(id)) || puppies[0];
  const isAvailable = !gonePuppies.some(g => g.id === puppy.id);

  return (
    <div className="tp-detail-page">
      {/* White Scalloped Edge Under Header */}
      <div className="tp-detail-scallop" aria-hidden="true">
        <svg width="100%" height="18" preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <pattern id="detail-header-scallop" width="48" height="18" patternUnits="userSpaceOnUse">
              <path d="M0 0 H48 V6 A24 12 0 0 1 0 6 Z" fill="#fffdf8" />
            </pattern>
          </defs>
          <rect width="100%" height="18" fill="url(#detail-header-scallop)" />
        </svg>
      </div>

      {/* Top Breadcrumb + "hello, it's me" */}
      <div className="tp-detail-top gutter">
        <div className="tp-detail-bookmark" aria-hidden="true" />
        <div>
          <nav className="tp-detail-crumb" aria-label="Breadcrumb">
            <Link to="/puppies">Available puppies</Link>
            <span> / </span>
            <strong>{puppy.name || puppy.breed}</strong>
          </nav>

          <div className="tp-detail-hello">
            <span className="tp-detail-num">1</span>
            <span className="font-scrawl">hello, it&apos;s me</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Scrapbook Grid */}
      <div className="tp-detail-grid gutter">
        {/* Left: Stacked Notebook Photo Card */}
        <motion.div
          className="tp-detail-photo-stack"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="tp-detail-photo-card">
            <img
              src={puppy.image}
              alt={`${puppy.name || puppy.breed}`}
              className="tp-detail-photo"
            />
          </div>
        </motion.div>

        {/* Right: Passport Info Card with Ring & Mascot */}
        <motion.div
          className="tp-detail-info-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Top-Left Binder Grommet Ring */}
          <span className="tp-detail-ring" aria-hidden="true" />

          {/* Top-Right Peeking Teddy Mascot */}
          <div className="tp-detail-mascot" aria-hidden="true">
            <TeddyRunner style={{ width: 68, height: 60 }} />
          </div>

          {/* Status Pill */}
          <div className="tp-detail-badge">
            <PawIcon style={{ width: 13, height: 13, color: '#c47a30' }} />
            <span>{isAvailable ? 'Available' : 'Gone home'}</span>
          </div>

          {/* Name & Subtitle */}
          <h1 className="tp-detail-name font-plush">{puppy.name || puppy.breed}</h1>
          <p className="tp-detail-breed">{puppy.breed}</p>

          {/* 2x2 Spec Grid */}
          <div className="tp-detail-specs">
            <div className="tp-detail-spec">
              <span className="tp-detail-spec__label font-scrawl">Breed</span>
              <span className="tp-detail-spec__val">{puppy.breed}</span>
            </div>
            <div className="tp-detail-spec">
              <span className="tp-detail-spec__label font-scrawl">Boy or girl</span>
              <span className="tp-detail-spec__val" style={{ textTransform: 'capitalize' }}>
                {puppy.gender}
              </span>
            </div>
            <div className="tp-detail-spec">
              <span className="tp-detail-spec__label font-scrawl">Age</span>
              <span className="tp-detail-spec__val">{puppy.age}</span>
            </div>
            <div className="tp-detail-spec">
              <span className="tp-detail-spec__label font-scrawl">Where</span>
              <span className="tp-detail-spec__val">
                {puppy.location || 'Imported for you'}
              </span>
            </div>
          </div>

          {/* Full-width Action Pills */}
          <div className="tp-detail-actions">
            <a
              href={getWhatsAppLink(`Hi TeddyPups! I'd love to ask about ${puppy.name || puppy.breed}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp tp-detail-btn"
            >
              Ask about {puppy.name || puppy.breed} on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setEnquiryOpen(!enquiryOpen)}
              className="btn btn-ghost tp-detail-btn"
            >
              Send an enquiry
            </button>
          </div>

          {enquiryOpen && (
            <form
              className="tp-detail-enquiry-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Enquiry sent for ${puppy.name || puppy.breed}!`);
                setEnquiryOpen(false);
              }}
            >
              <input type="text" placeholder="Your name" required />
              <input type="tel" placeholder="WhatsApp / Phone number" required />
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Submit enquiry
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}