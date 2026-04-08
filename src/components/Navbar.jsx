import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['Models', 'Experience', 'Virtual Tour', 'Contact'];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__logo">
        <svg className="navbar__prancing-horse" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 5C30 5 18 8 15 18C12 28 20 32 22 38C24 44 20 50 22 58C24 66 30 72 30 72C30 72 36 66 38 58C40 50 36 44 38 38C40 32 48 28 45 18C42 8 30 5 30 5Z" fill="currentColor"/>
          <path d="M20 30C20 30 10 28 8 35C6 42 14 45 18 42" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M40 30C40 30 50 28 52 35C54 42 46 45 42 42" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="24" cy="22" r="2" fill="var(--black-primary)"/>
          <circle cx="36" cy="22" r="2" fill="var(--black-primary)"/>
        </svg>
        <div className="navbar__brand">
          <span className="navbar__ferrari">FERRARI</span>
          <span className="navbar__dubai">NEPAL</span>
        </div>
      </div>

      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {navLinks.map(link => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <a href="#contact" className="navbar__cta">Book a Test Drive</a>
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
