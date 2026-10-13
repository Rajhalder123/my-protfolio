import React from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';
import { siteData } from '../data/content';

export default function Testimonials() {
  const { testimonials } = siteData;

  return (
    <section className="section-wrapper section-wrapper--white" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <ShieldCheck size={14} />
            Engineering Credibility
          </span>
          <h2 className="section-title">Production Delivery &amp; Stakeholder Feedback</h2>
          <p className="section-subtitle">
            Feedback from platform stakeholders, technical team members, and recruiters on delivered CRM &amp; trading infrastructure.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, idx) => (
            <div key={idx} className="testimonial-card">
              <div>
                {/* Star rating */}
                <div className="stars-rating">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      size={18}
                      fill={sIdx < item.rating ? '#f59e0b' : 'none'}
                      stroke={sIdx < item.rating ? '#f59e0b' : '#cbd5e1'}
                    />
                  ))}
                </div>

                <p className="testimonial-quote">
                  "{item.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="testimonial-author">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="author-avatar"
                  />
                  <div>
                    <h4 className="author-name">{item.name}</h4>
                    <span className="author-role">{item.role}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--brand)', fontWeight: 700 }}>
                    Metric:
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--ink)' }}>
                    {item.debtPaid}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
