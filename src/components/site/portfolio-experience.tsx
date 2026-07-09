'use client';

import { useEffect, useState } from 'react';

import { AboutSection } from './about-section';
import { ContactSection } from './contact-section';
import { CustomCursor } from './custom-cursor';
import { ExperienceSection } from './experience-section';
import { ExtrasSection } from './extras-section';
import { GsapEffects } from './gsap-effects';
import { HeroSection } from './hero-section';
import { IntroLoader } from './intro-loader';
import { Navigation } from './navigation';
import { ProjectsSection } from './projects-section';
import { SiteFooter } from './site-footer';
import { SkillsSection } from './skills-section';
import { SmoothScroll } from './smooth-scroll';

export function PortfolioExperience() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-theme');
    const nextTheme = saved === 'light' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('light', nextTheme === 'light');
      window.localStorage.setItem('portfolio-theme', nextTheme);
      return nextTheme;
    });
  };

  return (
    <>
      <IntroLoader />
      <SmoothScroll />
      <GsapEffects />
      <CustomCursor />
      <div className="noise" />
      <Navigation theme={theme} onThemeToggle={toggleTheme} />
      <main data-analytics-ready="true">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ExtrasSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
