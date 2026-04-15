import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <svg viewBox="0 0 60 80" fill="none" className="footer__horse">
              <path d="M30 5C30 5 18 8 15 18C12 28 20 32 22 38C24 44 20 50 22 58C24 66 30 72 30 72C30 72 36 66 38 58C40 50 36 44 38 38C40 32 48 28 45 18C42 8 30 5 30 5Z" fill="currentColor"/>
            </svg>
            <div>
              <span className="footer__ferrari">HIMALAYAN</span>
              <span className="footer__dubai">FERRARI NEPAL</span>
            </div>
          </div>
          <p className="footer__tagline">
            Authorized Ferrari Dealer<br />
            Sheikh Zayed Road, Dubai, UAE
          </p>
        </div>

        <div className="footer__links-grid">
          {[
            {
              title: 'Models',
              links: ['Roma Spider', 'SF90 Stradale', '296 GTB', 'Purosangue', '812 Competizione', 'Portofino M'],
            },
            {
              title: 'Experience',
              links: ['Test Drive', 'Virtual Showroom', 'Bespoke Program', 'Financial Services'],
            },
            {
              title: 'Services',
              links: ['Maintenance', 'Warranty', 'Genuine Parts', 'Classic Ferrari'],
            },
            {
              title: 'Contact',
              links: ['+971 4 329 7700', 'dubai@ferrari.com', 'Book Appointment', 'Directions'],
            },
          ].map(({ title, links }) => (
            <div key={title} className="footer__col">
              <h4 className="footer__col-title">{title}</h4>
              <ul className="footer__col-links">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">
          © {new Date().getFullYear()} Ferrari N.V. All Rights Reserved. Ferrari Dubai — Authorized Dealer.
        </span>
        <div className="footer__legal">
          <a href="#" className="footer__legal-link">Privacy Policy</a>
          <a href="#" className="footer__legal-link">Cookie Policy</a>
          <a href="#" className="footer__legal-link">Legal Notices</a>
        </div>
      </div>
    </footer>
  );
}
