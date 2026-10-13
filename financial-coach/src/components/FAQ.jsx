import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { siteData } from '../data/content';

export default function FAQ() {
  const { faqs } = siteData;
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="section-wrapper section-wrapper--subtle" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <HelpCircle size={14} />
            Recruiter &amp; Technical Hiring FAQ
          </span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Direct, factual answers regarding production deliverables, YoForex responsibilities, MT5 integration details, and team availability.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(idx)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <div className="faq-icon">
                    <ChevronDown size={18} />
                  </div>
                </div>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
