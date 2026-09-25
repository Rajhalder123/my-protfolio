import { useRef, useState } from 'react';
import { mailto, profile, resumeUrl, RESUME_FILENAME } from '../lib/content';
import Icon from '../components/ui/Icon';
import { SectionHeader } from '../components/ui/primitives';

const EMAILJS = {
  service: 'service_7lxt595',
  template: 'template_82cskrb',
  publicKey: 'nXYxK9c4Z_Z-Jv87m',
};

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
    <button type="button" onClick={copy} className="btn btn-ghost btn-sm" aria-live="polite">
      <Icon name={copied ? 'check' : 'copy'} />
      {copied ? 'Copied' : 'Copy email'}
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
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form.current, EMAILJS.publicKey);
      setStatus('sent');
      form.current.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              id="contact-title"
              eyebrow="Contact"
              title="Let's talk about your team"
              lede="Hiring for a full stack, frontend or AI-focused engineering role? Email me directly or send a message here."
            />

            <div className="reveal mt-8 rounded-2xl border border-rule bg-graphite p-5">
              <p className="label">Email</p>
              <a href={mailto} className="mt-2 block break-all font-wide text-lg font-semibold text-paper hover:text-signal sm:text-xl">
                {profile.email}
              </a>
              <div className="mt-3 -ml-3">
                <CopyEmail />
              </div>
            </div>

            <div className="reveal mt-4 flex flex-wrap gap-2">
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Icon name="linkedin" />
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Icon name="github" />
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={resumeUrl} download={RESUME_FILENAME} className="btn btn-secondary">
                <Icon name="download" className="nudge-down h-4 w-4" />
                Resume
              </a>
            </div>

            <p className="reveal mt-6 flex items-center gap-2 text-sm text-fog">
              <Icon name="mapPin" className="h-4 w-4 text-dim" />
              {profile.locationShort} · open to {profile.workPreference}
            </p>
          </div>

          <div className="reveal lg:col-span-6 lg:col-start-7">
            <form ref={form} onSubmit={send} className="card p-5 sm:p-7" aria-describedby="form-status">
              <h3 className="h-card text-lg">Send a message</h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="user_name" className="text-sm font-medium text-paper">
                    Name
                  </label>
                  <input id="user_name" name="user_name" type="text" required autoComplete="name" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="user_email" className="text-sm font-medium text-paper">
                    Email
                  </label>
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    required
                    autoComplete="email"
                    spellCheck="false"
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="text-sm font-medium text-paper">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="The role, the team, and how to reach you."
                  className={`${inputCls} min-h-[140px] resize-y`}
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
                  <Icon name="send" />
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                <p id="form-status" role="status" aria-live="polite" className="text-sm">
                  {status === 'sent' && <span className="text-go">Message sent. Raj will reply by email.</span>}
                  {status === 'error' && (
                    <span className="text-[#F28B82]">
                      The message didn't send. Email{' '}
                      <a className="underline" href={mailto}>
                        {profile.email}
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
