import React, { useRef, useEffect, useState } from 'react';
import './VirtualTour.css';

export default function VirtualTour() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      className={`virtual-tour ${visible ? 'virtual-tour--visible' : ''}`}
      id="virtual-tour"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="vt__background">
        <div
          className="vt__spotlight"
          style={{ background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(204,0,0,0.12) 0%, transparent 60%)` }}
        />
        <div className="vt__grid" />
        <div className="vt__panels">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="vt__panel" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="vt__content">
        <div className="vt__left">
          <span className="section-label vt__label">Immersive Experience</span>
          <h2 className="vt__title">
            Step Inside<br />
            <em>Our Showroom</em>
          </h2>
          <p className="vt__description">
            Experience our Dubai showroom from anywhere in the world. Navigate through 
            our curated collection, explore each Ferrari in 360° detail, and consult 
            with our specialists — all from the comfort of your home.
          </p>

          <ul className="vt__features">
            {[
              { icon: '◈', text: '360° Panoramic Views' },
              { icon: '◎', text: 'Interactive Model Exploration' },
              { icon: '◉', text: 'Live Specialist Consultation' },
              { icon: '◆', text: 'Bespoke Configuration Tool' },
            ].map(({ icon, text }) => (
              <li key={text} className="vt__feature">
                <span className="vt__feature-icon">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="vt__actions">
            <a href="#" className="vt__btn vt__btn--primary">
              <span className="vt__btn-ripple" />
              <span>Enter Virtual Showroom</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </a>
            <a href="#contact" className="vt__btn vt__btn--secondary">
              Schedule Private Viewing
            </a>
          </div>
        </div>

        <div className="vt__right">
          <div className="vt__showcase">
            {/* Showroom Floor Preview */}
            <div className="vt__floor-preview">
              <div className="vt__floor-grid" />
              <div className="vt__floor-reflection" />

              {/* Floating stat cards */}
              {[
                { top: '10%', left: '5%', value: '4,200m²', label: 'Showroom Area' },
                { top: '70%', right: '5%', value: '24/7', label: 'Virtual Access' },
                { top: '15%', right: '10%', value: '4K', label: 'Resolution' },
              ].map(({ value, label, ...pos }) => (
                <div key={label} className="vt__float-card" style={pos}>
                  <span className="vt__float-value">{value}</span>
                  <span className="vt__float-label">{label}</span>
                </div>
              ))}

              {/* Central play button */}
              <div className="vt__play-center">
                <div className="vt__play-ring vt__play-ring--outer" />
                <div className="vt__play-ring vt__play-ring--inner" />
                <button className="vt__play-btn" aria-label="Start virtual tour">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                </button>
              </div>

              {/* Ferrari emblem watermark */}
              <div className="vt__emblem">
                <svg viewBox="0 0 80 100" fill="none">
                  <rect x="2" y="2" width="76" height="96" rx="4" stroke="rgba(204,0,0,0.4)" strokeWidth="1"/>
                  <rect x="8" y="8" width="64" height="84" rx="2" stroke="rgba(204,0,0,0.2)" strokeWidth="0.5"/>
                  <path d="M40 15 C40 15 25 20 22 32 C19 44 28 48 30 56 C32 64 28 72 30 82 C32 92 40 98 40 98 C40 98 48 92 50 82 C52 72 48 64 50 56 C52 48 61 44 58 32 C55 20 40 15 40 15Z" fill="rgba(204,0,0,0.6)"/>
                  <path d="M28 42C28 42 16 40 14 48C12 56 22 60 26 57" stroke="rgba(204,0,0,0.4)" strokeWidth="1.5" fill="none"/>
                  <path d="M52 42C52 42 64 40 66 48C68 56 58 60 54 57" stroke="rgba(204,0,0,0.4)" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
