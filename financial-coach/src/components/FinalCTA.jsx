import React from 'react';
import { ArrowRight, Sparkles, Calendar, MessageSquareCode } from 'lucide-react';

export default function FinalCTA({ onOpenCheckout, onOpenBooking }) {
  return (
    <section className="section-wrapper section-wrapper--white" style={{ paddingTop: '50px', paddingBottom: '90px' }} id="contact">
      <div className="container">
        <div className="final-cta-card">
          <span className="section-tag section-tag--white">
            <Sparkles size={14} />
            Direct Engineering Engagement
          </span>

          <h2>Building Something Complex? Let's Talk Engineering.</h2>

          <p>
            I'm open to opportunities in <strong>full-stack engineering, CRM development, FinTech, and trading infrastructure</strong>.
            Whether you need hands-on feature delivery or technical coordination across distributed services, let's connect.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button
              onClick={onOpenBooking}
              className="btn btn-brand btn-lg"
            >
              <Calendar size={18} />
              Schedule Technical Chat
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onOpenCheckout}
              className="btn btn-white btn-lg"
            >
              <MessageSquareCode size={18} />
              Send Direct Inquiry
            </button>
          </div>

          <div style={{ fontSize: '0.86rem', color: '#94a3b8' }}>
            Open to remote international and domestic roles · Typically responding within 24 hours.
          </div>
        </div>
      </div>
    </section>
  );
}
