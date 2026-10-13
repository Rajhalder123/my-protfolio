import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Phone, MessageSquare } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'Debt Payoff & Budgeting',
    date: '2027-05-25',
    timeSlot: '11:00 AM EST'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={20} style={{ color: 'var(--brand)' }} />
            <h3>Book 1-on-1 Strategy Consultation</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
                Schedule a technical consultation directly with Raj Halder to discuss your CRM architecture, MT5 trading integrations, or engineering roles.
              </p>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amanda Peterson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Primary Financial Focus Area</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="form-select"
                >
                  <option value="Debt Payoff & Budgeting">Accelerated Debt Payoff & Cashflow</option>
                  <option value="Automated Wealth & Investing">Automated Investing & Portfolio Building</option>
                  <option value="Entrepreneur Finances">Founder / Small Business Financial Architecture</option>
                  <option value="Retirement & Protection">Retirement Roadmap & Asset Protection</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Time Window</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="form-select"
                  >
                    <option value="09:00 AM EST">09:00 AM EST</option>
                    <option value="11:00 AM EST">11:00 AM EST</option>
                    <option value="02:00 PM EST">02:00 PM EST</option>
                    <option value="04:30 PM EST">04:30 PM EST</option>
                    <option value="07:00 PM EST">07:00 PM EST</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-brand btn-lg"
                style={{ width: '100%', marginTop: '10px' }}
              >
                Confirm 1-on-1 Consultation
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--brand-light)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px auto' }}>
                <CheckCircle2 size={38} />
              </div>

              <h3 style={{ fontSize: '1.45rem', color: 'var(--ink)', marginBottom: '8px' }}>
                Consultation Reserved!
              </h3>

              <p style={{ color: 'var(--text-body)', fontSize: '0.94rem', marginBottom: '22px' }}>
                Thank you, <strong>{formData.name}</strong>. A calendar invite and pre-session preparation checklist have been sent to <strong>{formData.email}</strong>.
              </p>

              <div style={{ background: 'var(--light-accent)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '24px', fontSize: '0.88rem' }}>
                <div style={{ marginBottom: '6px' }}><strong>Engineer:</strong> Raj Halder (CRM &amp; FinTech Engineer)</div>
                <div style={{ marginBottom: '6px' }}><strong>Topic:</strong> {formData.goal}</div>
                <div style={{ marginBottom: '6px' }}><strong>Session Time:</strong> {formData.date} at {formData.timeSlot}</div>
                <div><strong>Location:</strong> Private Zoom Video Room (Encrypted)</div>
              </div>

              <button
                onClick={handleReset}
                className="btn btn-navy"
                style={{ width: '100%' }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
