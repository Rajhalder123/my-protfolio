import { useReveal, usePageMeta } from '../lib/hooks';
import Hero from '../sections/Hero';
import Work from '../sections/Work';
import Experience from '../sections/Experience';
import Capabilities from '../sections/Capabilities';
import Now from '../sections/Now';
import About from '../sections/About';
import Contact from '../sections/Contact';

export default function Home() {
  usePageMeta({
    description:
      'Raj Halder is a Full Stack Engineer in Kolkata building AI-powered products and production systems with React, Next.js, TypeScript, Node.js and Python.',
  });
  useReveal('home');

  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Capabilities />
      <Now />
      <About />
      <Contact />
    </>
  );
}
