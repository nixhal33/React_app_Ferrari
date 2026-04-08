import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';

const INTERESTS = ['Purchase Enquiry', 'Test Drive', 'Service & Maintenance', 'Trade-In', 'Bespoke Configuration', 'Finance Options'];

export default function Contact() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    model: '', interest: '', message: '', agreed: false,
  });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const models = ['Ferrari GT 990', 'SF90 Stradale', '296 GTB', 'Purosangue', '812 Competizione', 'Portofino M', 'Other / Consultation'];

  return (
    <section
      className={`contact ${visible ? 'contact--visible' : ''}`}
      id="contact"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="contact__bg">
        <div className="contact__bg-lines">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="contact__bg-line" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <div className="contact__bg-glow" />
      </div>

      <div className="contact__inner">
        {/* Left info panel */}
        <div className="contact__info">
          <span className="section-label">Get In Touch</span>
          <h2 className="contact__title">
            Begin Your<br />
            <em>Ferrari Journey</em>
          </h2>
          <p className="contact__subtitle">
            Our team of specialists is dedicated to making your Ferrari ownership 
            experience extraordinary. From consultation to delivery, we are with you 
            every step of the way.
          </p>

          <div className="contact__details">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                ),
                label: 'Showroom',
                value: 'Sheikh Zayed Road, Dubai, UAE',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                ),
                label: 'Phone',
                value: '+971 4 329 7700',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                ),
                label: 'Email',
                value: 'dubai@ferrari.com',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ),
                label: 'Hours',
                value: 'Mon–Sat: 9AM–9PM | Sun: 12PM–6PM',
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="contact__detail">
                <span className="contact__detail-icon">{icon}</span>
                <div>
                  <span className="contact__detail-label">{label}</span>
                  <span className="contact__detail-value">{value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="contact__socials">
            {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="contact__social">{s}</a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="contact__form-wrapper">
          {submitted ? (
            <div className="contact__success">
              <div className="contact__success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="contact__success-title">Thank You</h3>
              <p className="contact__success-msg">
                Your enquiry has been received. A member of our team will contact you 
                within 24 hours to discuss your Ferrari journey.
              </p>
              <div className="contact__success-line" />
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__form-header">
                <h3 className="contact__form-title">Enquiry Form</h3>
                <div className="contact__form-line" />
              </div>

              {/* Name row */}
              <div className="contact__row">
                {['firstName', 'lastName'].map(field => (
                  <div key={field} className={`contact__field ${focused === field ? 'contact__field--focused' : ''} ${formState[field] ? 'contact__field--filled' : ''}`}>
                    <input
                      type="text"
                      name={field}
                      id={field}
                      className="contact__input"
                      value={formState[field]}
                      onChange={handleChange}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      required
                    />
                    <label htmlFor={field} className="contact__label">
                      {field === 'firstName' ? 'First Name' : 'Last Name'}
                    </label>
                    <div className="contact__field-line" />
                  </div>
                ))}
              </div>

              {/* Email & Phone */}
              <div className="contact__row">
                {[
                  { name: 'email', type: 'email', label: 'Email Address' },
                  { name: 'phone', type: 'tel', label: 'Phone Number' },
                ].map(({ name, type, label }) => (
                  <div key={name} className={`contact__field ${focused === name ? 'contact__field--focused' : ''} ${formState[name] ? 'contact__field--filled' : ''}`}>
                    <input
                      type={type}
                      name={name}
                      id={name}
                      className="contact__input"
                      value={formState[name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused(null)}
                      required
                    />
                    <label htmlFor={name} className="contact__label">{label}</label>
                    <div className="contact__field-line" />
                  </div>
                ))}
              </div>

              {/* Model select */}
              <div className={`contact__field contact__field--select ${focused === 'model' ? 'contact__field--focused' : ''} ${formState.model ? 'contact__field--filled' : ''}`}>
                <select
                  name="model"
                  id="model"
                  className="contact__input contact__select"
                  value={formState.model}
                  onChange={handleChange}
                  onFocus={() => setFocused('model')}
                  onBlur={() => setFocused(null)}
                >
                  <option value="" disabled />
                  {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <label htmlFor="model" className="contact__label">Model of Interest</label>
                <div className="contact__field-line" />
                <svg className="contact__select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>

              {/* Interest chips */}
              <div className="contact__interests">
                <span className="contact__interests-label">Enquiry Type</span>
                <div className="contact__chips">
                  {INTERESTS.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      className={`contact__chip ${formState.interest === interest ? 'contact__chip--active' : ''}`}
                      onClick={() => setFormState(prev => ({ ...prev, interest }))}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className={`contact__field contact__field--textarea ${focused === 'message' ? 'contact__field--focused' : ''} ${formState.message ? 'contact__field--filled' : ''}`}>
                <textarea
                  name="message"
                  id="message"
                  className="contact__input contact__textarea"
                  rows="4"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
                <label htmlFor="message" className="contact__label">Your Message</label>
                <div className="contact__field-line" />
              </div>

              {/* Agreement */}
              <label className="contact__agreement">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formState.agreed}
                  onChange={handleChange}
                  className="contact__checkbox-input"
                />
                <span className="contact__checkbox-custom" />
                <span className="contact__agreement-text">
                  I consent to Ferrari Dubai contacting me about their products and services in accordance with the privacy policy.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className={`contact__submit ${loading ? 'contact__submit--loading' : ''}`}
                disabled={loading || !formState.agreed}
              >
                {loading ? (
                  <span className="contact__submit-spinner" />
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
