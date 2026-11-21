import { Link } from 'react-router-dom';
import { footerLinks, getWhatsAppLink } from '../data/puppiesData';
import TeddyRunner from './TeddyRunner';

export default function Footer() {
  return (
    <>
      {/* Dark night footer */}
      <footer className="tp-footer">
        <div className="tp-footer__grid">
          {/* Brand column */}
          <div>
            <h2 className="tp-footer__brand-title font-plush">Home, at last.</h2>
            <p className="tp-footer__brand-desc">
              PebblePups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
            </p>
            <TeddyRunner style={{ width: 140, height: 110, opacity: 0.9 }} />
          </div>

          {/* Explore column */}
          <div>
            <h3 className="tp-footer__col-title">Explore</h3>
            <ul className="tp-footer__links">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="tp-footer__col-title">Say hello</h3>
            <p className="tp-footer__contact-item">WhatsApp +971 50 000 0000</p>
            <p className="tp-footer__contact-item">himanshuswami.work@gmail.com</p>
            <p className="tp-footer__contact-item">Downtown Dubai, United Arab Emirates</p>
            <div className="tp-footer__social">
              {['Instagram', 'TikTok', 'Facebook'].map(soc => (
                <a key={soc} href="#" className="tp-footer__social-btn">
                  {soc}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="tp-footer__bottom">
          <p>© {new Date().getFullYear()} PebblePups U.A.E. — Premium teacup puppies in Dubai</p>
        </div>
      </footer>
    </>
  );
}
