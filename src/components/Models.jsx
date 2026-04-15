import React, { useState, useEffect, useRef } from 'react';
import './Models.css';

const MODELS = [
  {
    id: 1,
    name: 'Ferrari GT 900',
    category: 'GT',
    tagline: 'La Nuova Dolce Vita',
    price: 'From AED 1,200,000',
    specs: { power: '620 CV', torque: '760 Nm', acceleration: '3.4s', topSpeed: '320 km/h' },
    color: '#654d4d',
    gradient: 'linear-gradient(135deg, #1a0303 0%, #2d0505 50%, #1a0303 100%)',
    badge: 'NEW',
    image: null,
  },
  {
    id: 2,
    name: 'SF90 Stradale',
    category: 'Sports',
    tagline: 'The Pinnacle of F1 Technology',
    price: 'From AED 2,100,000',
    specs: { power: '1000 CV', torque: '800 Nm', acceleration: '2.5s', topSpeed: '340 km/h' },
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #0d0d00 0%, #1a1a00 50%, #0d0d00 100%)',
    badge: 'FLAGSHIP',
    image: null,
  },
  {
    id: 3,
    name: '296 GTB',
    category: 'Berlinetta',
    tagline: 'Pure Driving Emotion',
    price: 'From AED 1,400,000',
    specs: { power: '830 CV', torque: '740 Nm', acceleration: '2.9s', topSpeed: '330 km/h' },
    color: '#00A3FF',
    gradient: 'linear-gradient(135deg, #000d1a 0%, #001a2d 50%, #000d1a 100%)',
    badge: null,
    image: null,
  },
  {
    id: 4,
    name: 'Purosangue',
    category: 'FUV',
    tagline: 'The Ferrari of All Ferraris',
    price: 'From AED 2,800,000',
    specs: { power: '725 CV', torque: '716 Nm', acceleration: '3.3s', topSpeed: '310 km/h' },
    color: '#C8A96E',
    gradient: 'linear-gradient(135deg, #0d0a00 0%, #1a1400 50%, #0d0a00 100%)',
    badge: 'EXCLUSIVE',
    image: null,
  },
  {
    id: 5,
    name: '812 Competizione',
    category: 'Berlinetta',
    tagline: 'The Ultimate V12',
    price: 'From AED 3,200,000',
    specs: { power: '830 CV', torque: '692 Nm', acceleration: '2.9s', topSpeed: '340 km/h' },
    color: '#CC0000',
    gradient: 'linear-gradient(135deg, #1a0303 0%, #2d0505 50%, #1a0303 100%)',
    badge: 'LIMITED',
    image: null,
  },
  {
    id: 6,
    name: 'Portofino M',
    category: 'GT Convertible',
    tagline: 'Italian Riviera Spirit',
    price: 'From AED 920,000',
    specs: { power: '620 CV', torque: '760 Nm', acceleration: '3.45s', topSpeed: '320 km/h' },
    color: '#C8A96E',
    gradient: 'linear-gradient(135deg, #0d0a05 0%, #1a1408 50%, #0d0a05 100%)',
    badge: null,
    image: null,
  },
];

const CarSilhouette = ({ category, color }) => {
  const paths = {
    'GT': "M 60 130 L 80 100 L 120 75 L 200 65 L 280 68 L 340 85 L 380 110 L 400 130 L 380 140 L 60 140 Z",
    'Sports': "M 50 135 L 75 95 L 120 70 L 210 60 L 290 62 L 350 78 L 390 110 L 410 135 L 390 143 L 50 143 Z",
    'Berlinetta': "M 55 132 L 85 92 L 130 68 L 220 58 L 300 60 L 360 78 L 395 112 L 415 132 L 395 142 L 55 142 Z",
    'FUV': "M 50 125 L 70 88 L 110 70 L 200 62 L 300 64 L 360 80 L 395 108 L 415 125 L 395 145 L 50 145 Z",
    'GT Convertible': "M 65 130 L 90 98 L 130 76 L 210 65 L 285 67 L 345 83 L 385 112 L 400 130 L 380 142 L 65 142 Z",
  };

  const path = paths[category] || paths['Sports'];

  return (
    <svg className="model-card__silhouette" viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`carGrad-${category}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="50%" stopColor={color} stopOpacity="0.7" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
        <filter id="carGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id={`groundGrad-${category}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ground reflection */}
      <ellipse cx="230" cy="158" rx="160" ry="20"
        fill={`url(#groundGrad-${category})`} />

      {/* Car body */}
      <path d={path}
        fill={`url(#carGrad-${category})`}
        filter="url(#carGlow)"
        stroke={color}
        strokeWidth="0.5"
        strokeOpacity="0.8"
      />

      {/* Window highlights */}
      <path d="M 130 95 L 160 72 L 250 68 L 290 80 L 290 95 Z"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />

      {/* Wheels */}
      <circle cx="130" cy="143" r="25" fill="#111" stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
      <circle cx="130" cy="143" r="14" fill="#1a1a1a" stroke={color} strokeWidth="0.8" strokeOpacity="0.4"/>
      <circle cx="330" cy="143" r="25" fill="#111" stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
      <circle cx="330" cy="143" r="14" fill="#1a1a1a" stroke={color} strokeWidth="0.8" strokeOpacity="0.4"/>

      {/* Headlight */}
      <ellipse cx="390" cy="115" rx="8" ry="4" fill="rgba(255,255,200,0.6)" />
      <line x1="393" y1="115" x2="430" y2="112" stroke="rgba(255,255,200,0.15)" strokeWidth="3"/>
    </svg>
  );
};

function ModelCard({ model, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeSpec, setActiveSpec] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`model-card ${visible ? 'model-card--visible' : ''} ${hovered ? 'model-card--hovered' : ''}`}
      style={{ animationDelay: `${index * 0.1}s`, background: model.gradient }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActiveSpec(null); }}
    >
      {/* Badge */}
      {model.badge && (
        <span className="model-card__badge" style={{ borderColor: model.color, color: model.color }}>
          {model.badge}
        </span>
      )}

      {/* Category */}
      <div className="model-card__category">
        <span className="section-label">{model.category}</span>
      </div>

      {/* Car Visual */}
      <div className="model-card__visual">
        <div className="model-card__glow" style={{ background: `radial-gradient(ellipse at center, ${model.color}25 0%, transparent 70%)` }} />
        <CarSilhouette category={model.category} color={model.color} />
      </div>

      {/* Info */}
      <div className="model-card__info">
        <h3 className="model-card__name">{model.name}</h3>
        <p className="model-card__tagline">{model.tagline}</p>

        {/* Specs */}
        <div className="model-card__specs">
          {Object.entries(model.specs).map(([key, value]) => (
            <div
              key={key}
              className={`model-card__spec ${activeSpec === key ? 'model-card__spec--active' : ''}`}
              onMouseEnter={() => setActiveSpec(key)}
              style={{ '--spec-color': model.color }}
            >
              <span className="model-card__spec-value">{value}</span>
              <span className="model-card__spec-key">{key.replace(/([A-Z])/g, ' $1')}</span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="model-card__footer">
          <span className="model-card__price">{model.price}</span>
          <a href="#contact" className="model-card__cta" style={{ '--btn-color': model.color }}>
            Configure
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Models() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'GT', 'Sports', 'Berlinetta', 'FUV'];
  const filtered = filter === 'All' ? MODELS : MODELS.filter(m => m.category === filter);

  return (
    <section className="models" id="models">
      <div className="models__header">
        <span className="section-label">Our Collection</span>
        <h2 className="models__title">
          The Ferrari <em>Legacy</em>
        </h2>
        <p className="models__subtitle">
          Each model a testament to over seven decades of racing heritage,<br />
          now available at our Dubai showroom.
        </p>

        {/* Filter */}
        <div className="models__filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`models__filter ${filter === cat ? 'models__filter--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="models__grid">
        {filtered.map((model, i) => (
          <ModelCard key={model.id} model={model} index={i} />
        ))}
      </div>

      <div className="models__footer-cta">
        <a href="#contact" className="models__view-all">
          <span>Request Full Catalogue</span>
          <div className="models__view-all-line" />
        </a>
      </div>
    </section>
  );
}
