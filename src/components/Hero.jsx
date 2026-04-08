import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero">
      {/* Video Background */}
      <div className="hero__video-container">
        <video
          className="hero__video"
          autoPlay
          loop
          muted
          playsInline
          style={{ transform: `scale(1.05) translateY(${scrollY * 0.3}px)` }}
        >
          {/* Fallback: uses a stunning Ferrari-themed gradient animation */}
        </video>
        {/* Cinematic gradient overlay */}
        <div className="hero__video-fallback" />
        <div className="hero__overlay" />
        <div className="hero__overlay-bottom" />
        <div className="hero__overlay-left" />
      </div>

      {/* Animated Grid */}
      <div className="hero__grid-lines">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="hero__grid-line" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>

      {/* Content */}
      <div className={`hero__content ${loaded ? 'hero__content--visible' : ''}`}>
        <div className="hero__eyebrow">
          <span className="section-label">Since 1947</span>
          <span className="gold-line" />
          <span className="section-label">Dubai Showroom</span>
        </div>

        <h1 className="hero__headline">
          <span className="hero__headline-line hero__headline-line--1">Where</span>
          <span className="hero__headline-line hero__headline-line--2">
            <em>Passion</em>
          </span>
          <span className="hero__headline-line hero__headline-line--3">Meets Desert</span>
        </h1>

        <p className="hero__subtext">
          Experience the pinnacle of Italian craftsmanship in the heart of Dubai.<br />
          Every Ferrari is a masterpiece. Yours awaits.
        </p>

        <div className="hero__actions">
          <a href="#models" className="hero__btn hero__btn--primary">
            <span>Explore Models</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#virtual-tour" className="hero__btn hero__btn--secondary">
            <span className="hero__play-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            </span>
            <span>Virtual Tour</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>

      {/* Stats */}
      <div className={`hero__stats ${loaded ? 'hero__stats--visible' : ''}`}>
        {[
          { value: '75+', label: 'Years of Excellence' },
          { value: '14', label: 'Models Available' },
          { value: '∞', label: 'Bespoke Configurations' },
        ].map(({ value, label }) => (
          <div key={label} className="hero__stat">
            <span className="hero__stat-value">{value}</span>
            <span className="hero__stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
