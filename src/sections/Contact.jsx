import { useRef, useState } from 'react';
import { mailto, profile, resumeUrl, RESUME_FILENAME } from '../lib/content';
import Icon from '../components/ui/Icon';
import { SectionHeader } from '../components/ui/primitives';

// Verified, active EmailJS credentials
const EMAILJS = {
  service: 'service_macaww3',
  template: 'template_aqgvqmq',
  publicKey: 'qJFwvqwQMWU1_cny1',
};

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = mailto;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-ghost btn-sm text-xs text-dim hover:text-signal"
      aria-live="polite"
    >
      <Icon name={copied ? 'check' : 'copy'} className="h-3.5 w-3.5" />
      {copied ? 'Copied to clipboard' : 'Copy email address'}
    </button>
  );
}

const inputCls =
  'mt-2 w-full rounded-lg border border-rule-strong bg-ink px-3.5 py-3 text-[0.95rem] text-paper placeholder:text-dim transition-colors focus:border-signal focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-signal/25';

export default function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState('idle');

  const send = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(form.current);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const message = formData.get('message') || '';

    try {
      const { default: emailjs } = await import('@emailjs/browser');
      const templateParams = {
        name,
        from_name: name,
        user_name: name,
        email,
        from_email: email,
        user_email: email,
        reply_to: email,
        message,
      };

      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        templateParams,
        EMAILJS.publicKey
      );

      setStatus('sent');
      form.current.reset();
    } catch (err) {
      console.warn('EmailJS direct send issue, triggering Gmail compose fallback:', err);
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
      const directUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${subject}&body=${body}`;
      window.open(directUrl, '_blank', 'noopener,noreferrer');
      setStatus('sent_fallback');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: CTAs, direct contact, links */}
          <div className="lg:col-span-5">
            <SectionHeader
              id="contact-title"
              eyebrow="Get In Touch"
              title="Let's build something useful."
              lede="Open to software engineering opportunities, product teams, and interesting technical challenges."
            />

            {/* Email Box */}
            <div className="reveal mt-8 rounded-2xl border border-rule bg-graphite/90 p-5 shadow-lg">
              <p className="label">Direct Email</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-wide text-lg font-semibold text-paper transition-colors hover:text-signal sm:text-xl"
                  title="Click to compose directly in Gmail"
                >
                  {profile.email}
                </a>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <CopyEmail />
                <a
                  href={mailto}
                  className="btn btn-ghost btn-sm text-xs text-dim hover:text-signal"
                  title="Open in system mail client"
                >
                  Open in mail client
                </a>
              </div>
            </div>

            {/* Primary Action Buttons (Section 15) */}
            <div className="reveal mt-5 flex flex-wrap gap-2.5">
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Icon name="mail" />
                Email Me (Gmail)
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Icon name="linkedin" />
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Icon name="github" />
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={resumeUrl}
                download={RESUME_FILENAME}
                className="btn btn-secondary"
              >
                <Icon name="download" className="nudge-down h-4 w-4" />
                Download Resume
              </a>
            </div>

            {/* Location & Availability Note */}
            <p className="reveal mt-6 flex items-center gap-2 text-xs text-fog sm:text-sm">
              <Icon name="mapPin" className="h-4 w-4 text-signal shrink-0" />
              <span>
                Based in {profile.locationShort} · Available with {profile.availability.noticePeriod} notice
              </span>
            </p>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="reveal lg:col-span-6 lg:col-start-7">
            <form
              ref={form}
              onSubmit={send}
              className="card p-6 sm:p-8"
              aria-describedby="form-status"
            >
              <h3 className="h-card text-lg sm:text-xl">Send a Message</h3>
              <p className="mt-1 text-xs text-fog">
                Reach out regarding engineering openings, technical consulting, or project collaborations. Delivered straight to my Gmail.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-fog">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-fog">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    spellCheck="false"
                    placeholder="jane@company.com"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-fog">
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about the role, team stack, or engineering project."
                  className={`${inputCls} min-h-[130px] resize-y`}
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary disabled:opacity-60"
                >
                  <Icon name="send" />
                  <span>{status === 'sending' ? 'Sending Message…' : 'Send Message'}</span>
                </button>

                <p id="form-status" role="status" aria-live="polite" className="text-xs sm:text-sm">
                  {status === 'sent' && (
                    <span className="text-go font-medium">✓ Message sent successfully to Raj's Gmail!</span>
                  )}
                  {status === 'sent_fallback' && (
                    <span className="text-signal font-medium">Opened in Gmail compose with your message pre-filled.</span>
                  )}
                  {status === 'error' && (
                    <span className="text-[#F28B82]">
                      Direct send issue. Please{' '}
                      <a
                        className="underline"
                        href={GMAIL_COMPOSE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        open in Gmail
                      </a>{' '}
                      instead.
                    </span>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
