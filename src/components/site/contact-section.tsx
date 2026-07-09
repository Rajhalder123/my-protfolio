'use client';

import { FormEvent, useState } from 'react';
import { Clock3, Mail, MapPin, Send, Globe2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { profile, socialLinks } from '@/data/portfolio';
import { Reveal } from './motion-primitives';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'visitor'}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
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
                />
              </label>

              <Button type="submit" size="lg" className="justify-self-start">
                Send Message
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
