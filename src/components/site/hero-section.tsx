'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { heroMetrics, profile, socialLinks } from '@/data/portfolio';
import { Magnetic, Reveal } from './motion-primitives';

const HeroCanvas = dynamic(() => import('./hero-canvas').then((mod) => mod.HeroCanvas), {
  ssr: false,
});

const typedRoles = ['AI products', 'realtime systems', 'premium interfaces', 'full-stack platforms'];

function useTyping(words: string[]) {
  const [index, setIndex] = useState(0);
  const [character, setCharacter] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const doneTyping = !deleting && character === current.length;
    const doneDeleting = deleting && character === 0;
    const timeout = window.setTimeout(
      () => {
        if (doneTyping) {
          setDeleting(true);
          return;
        }
        if (doneDeleting) {
          setDeleting(false);
          setIndex((value) => value + 1);
          return;
        }
        setCharacter((value) => value + (deleting ? -1 : 1));
      },
      doneTyping ? 1200 : deleting ? 36 : 72,
    );

    return () => window.clearTimeout(timeout);
  }, [character, deleting, index, words]);

  return words[index % words.length].slice(0, character);
}

function Status() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-mist shadow-hairline backdrop-blur-xl">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-green opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal-green" />
      </span>
      <span>{profile.availability}</span>
      <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
      <span className="hidden sm:inline">{time} IST</span>
    </div>
  );
}

export function HeroSection() {
  const typed = useTyping(useMemo(() => typedRoles, []));

  return (
    <section id="home" className="relative isolate overflow-hidden pt-24 sm:pt-28">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(94,231,255,0.10),transparent_34%,rgba(248,197,107,0.08)_72%,transparent)]" />
      <div className="grid-mask absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 top-12 -z-10 h-[70svh] opacity-80">
        <HeroCanvas />
      </div>

      <div className="container grid min-h-[68svh] items-center gap-10 pb-12 lg:min-h-[70svh] lg:grid-cols-[1.08fr_0.92fr] lg:pb-16">
        <div className="relative z-10 max-w-5xl">
          <Reveal>
            <Status />
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-5xl text-balance text-4xl font-semibold leading-[0.92] tracking-normal text-pearl sm:mt-8 sm:text-6xl lg:text-7xl xl:text-[6rem] 2xl:text-[6.7rem]">
              {profile.name}
              <span className="block text-gradient animate-shimmer">builds exceptional web products.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-6 flex min-h-8 items-center gap-3 font-mono text-sm text-cyan-brand sm:text-base">
              <Radio className="h-4 w-4" />
              <span>Currently designing {typed}</span>
              <span className="h-5 w-px animate-pulse bg-cyan-brand" />
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-mist sm:mt-7 sm:text-xl">
              {profile.summary}
              <span className="hidden sm:inline"> I care about the details users feel immediately: speed, clarity, motion, accessibility, and systems that do not collapse under real product pressure.</span>
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-7 flex flex-row flex-wrap gap-3 sm:mt-9">
              <Magnetic>
                <Button asChild size="lg">
                  <a href="#projects">
                    Explore Work
                    <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="premium" size="lg">
                  <a href={profile.resume} download>
                    Resume
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <div className="mt-9 hidden flex-wrap items-center gap-3 sm:flex">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    aria-label={item.label}
                    className="grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/[0.055] text-mist shadow-hairline transition hover:-translate-y-0.5 hover:border-cyan-brand/40 hover:text-pearl"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div
          className="relative z-10 mx-auto hidden w-full max-w-md lg:block lg:max-w-lg"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-2 shadow-premium backdrop-blur-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image
                src={profile.portrait}
                alt={`${profile.name} portrait`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,6,8,0.78))]" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-brand">Personal brand</p>
                  <p className="mt-1 text-lg font-semibold text-pearl">{profile.role}</p>
                </div>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-md bg-pearl text-ink-950 transition hover:-translate-y-0.5"
                  aria-label="Open GitHub"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-white/10 bg-white/[0.055] p-4 shadow-hairline backdrop-blur-xl">
                <div className="text-xl font-semibold text-pearl">{metric.value}</div>
                <div className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-mist">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
