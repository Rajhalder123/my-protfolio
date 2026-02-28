import React, { useState } from "react";
import emailjs from '@emailjs/browser';

emailjs.init('yM3x3-6_tI_iQoOKC');

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(0,212,255,0.05)',
  border: '1px solid rgba(0,212,255,0.2)',
  borderRadius: '10px',
  color: '#e8f4ff',
  fontSize: '0.9rem',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'all 0.3s',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  color: '#7bb3d4',
  textTransform: 'uppercase',
};

const EmailSender = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#00d4ff';
    e.target.style.boxShadow = '0 0 15px rgba(0,212,255,0.2)';
    e.target.style.background = 'rgba(0,212,255,0.08)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(0,212,255,0.2)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'rgba(0,212,255,0.05)';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("Transmitting...");

    setTimeout(() => {
      setStatus("✅ Message transmitted successfully!");
      setFormData({ name: "", email: "", message: "" });
      setIsSending(false);
    }, 1500);

    emailjs.send('service_macaww3', 'template_aqgvqmq', formData, 'qJFwvqwQMWU1_cny1')
      .then(r => console.log("EmailJS:", r.text))
      .catch(err => console.error("EmailJS:", err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label htmlFor="name" style={labelStyle}>Your Name</label>
        <input
          type="text" id="name" name="name"
          value={formData.name} onChange={handleChange}
          onFocus={handleFocus} onBlur={handleBlur}
          required placeholder="John Doe"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="email" style={labelStyle}>Email Address</label>
        <input
          type="email" id="email" name="email"
          value={formData.email} onChange={handleChange}
          onFocus={handleFocus} onBlur={handleBlur}
          required placeholder="you@example.com"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message" name="message" rows={5}
          value={formData.message} onChange={handleChange}
          onFocus={handleFocus} onBlur={handleBlur}
          required placeholder="Tell me about your project..."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="btn-cosmic btn-primary-cosmic"
        style={{ width: '100%', opacity: isSending ? 0.7 : 1 }}
      >
        {isSending ? '⏳ TRANSMITTING...' : '📡 SEND MESSAGE'}
      </button>

      {status && (
        <p style={{
          textAlign: 'center',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.8rem',
          color: status.includes('✅') ? '#10ffa0' : '#00d4ff',
          marginTop: '4px',
        }}>
          {status}
        </p>
      )}
    </form>
  );
};

export default EmailSender;
