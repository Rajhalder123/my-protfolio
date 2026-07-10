'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Clock3, Loader2, Mail, MapPin, Send, Globe2, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { profile, socialLinks } from '@/data/portfolio';
import { Reveal } from './motion-primitives';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

// Get your free access key from https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = '070c826f-a817-4b7e-85f3-5d2f6446aeea';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio inquiry from ${form.name}`,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" className="premium-section border-t border-white/10">
      <div className="container">
        <Reveal>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="section-kicker justify-center">Contact</span>
            <h2 className="section-title mx-auto">Have a serious product idea or role?</h2>
            <p className="section-copy mx-auto mt-6">
              Send the context, the constraints, and the outcome you want. I will respond with the fastest useful next step.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <aside className="premium-panel h-full p-5 sm:p-6">
              <div className="mb-8 inline-flex items-center gap-3 rounded-md border border-signal-green/25 bg-signal-green/10 px-3 py-2 text-sm text-signal-green">
                <span className="h-2 w-2 rounded-full bg-signal-green" />
                Available for hire
              </div>

              <div className="grid gap-4">
                {[
                  { label: 'Email', value: profile.email, icon: Mail, href: `mailto:${profile.email}` },
                  { label: 'LinkedIn', value: 'Raj Halder', icon: Globe2, href: profile.linkedin },
                  { label: 'Location', value: profile.location, icon: MapPin },
                  { label: 'Response', value: 'Usually within 24 hours', icon: Clock3 },
                ].map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-cyan-brand/10 text-cyan-brand transition-colors group-hover:bg-cyan-brand/20">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-mist">{item.label}</p>
                        <p className="mt-1 break-words text-sm font-medium text-pearl transition-colors group-hover:text-cyan-brand">{item.value}</p>
                      </div>
                    </>
                  );
                  const baseClasses = "flex gap-4 rounded-md border border-white/10 bg-white/[0.045] p-4 transition-all";

                  if (item.href) {
                    return (
                      <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className={`${baseClasses} group hover:border-cyan-brand/30 hover:bg-white/[0.06]`}>
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div key={item.label} className={baseClasses}>
                      {content}
                    </div>
                  );
                })}
              </div>

            </aside>
          </Reveal>

          <Reveal delay={0.08}>
            {status === 'success' ? (
              <div className="premium-panel grid place-items-center gap-4 p-8 text-center sm:p-12">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-signal-green/30 bg-signal-green/10">
                  <CheckCircle2 className="h-8 w-8 text-signal-green" />
                </div>
                <h3 className="text-2xl font-semibold text-pearl">Message sent!</h3>
                <p className="max-w-sm text-sm leading-7 text-mist">
                  Thanks for reaching out. I&apos;ll review your message and get back within 24 hours.
                </p>
                <Button type="button" variant="premium" onClick={resetForm} className="mt-2">
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="premium-panel grid gap-4 p-5 sm:p-6" data-analytics-event="contact-form">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-mist">
                    Name
                    <input
                      required
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      className="h-12 rounded-md border border-white/10 bg-ink-950/60 px-4 text-pearl outline-none transition placeholder:text-mist focus:border-cyan-brand/55"
                      placeholder="Your name"
                      disabled={status === 'sending'}
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-mist">
                    Email
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      className="h-12 rounded-md border border-white/10 bg-ink-950/60 px-4 text-pearl outline-none transition placeholder:text-mist focus:border-cyan-brand/55"
                      placeholder="you@example.com"
                      disabled={status === 'sending'}
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm text-mist">
                  Message
                  <textarea
                    required
                    rows={8}
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    className="resize-none rounded-md border border-white/10 bg-ink-950/60 px-4 py-3 text-pearl outline-none transition placeholder:text-mist focus:border-cyan-brand/55"
                    placeholder="Tell me about the product, team, timeline, and what excellence looks like."
                    disabled={status === 'sending'}
                  />
                </label>

                {status === 'error' && (
                  <div className="flex items-center gap-3 rounded-md border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button type="submit" size="lg" className="justify-self-start" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      Sending...
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
