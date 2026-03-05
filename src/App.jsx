import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProjectDetails from './components/ProjectDetails';
import StarField from './components/StarField';
import IntroStory from './components/IntroStory';
import RealmPortal from './components/RealmPortal';
import SectionReveal from './components/SectionReveal';
import { ThemeProvider } from './content/ThemeContext';

const GlobalScrollHandler = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 0);
      }
    }
  }, [pathname, hash]);
  return null;
};

const MainLayout = ({ showStory, onEnterPortfolio }) => (
  <>
    {/* Fixed full-screen 3D starfield — scroll-reactive warp */}
    <StarField />

    {/* Cinematic intro story overlay */}
    {showStory && <IntroStory onEnter={onEnterPortfolio} />}

    {/* Portfolio — fades in after story */}
    <div style={{
      position: 'relative',
      zIndex: 1,
      opacity: showStory ? 0 : 1,
      transition: 'opacity 1s ease 0.3s',
      pointerEvents: showStory ? 'none' : 'auto',
      overflowX: 'hidden',
      maxWidth: '100vw',
    }}>
      <Navbar />

      {/* HOME — entry realm */}
      <Home />

      {/* ↓ Transition: entering Projects realm */}
      <RealmPortal realm="projects" />
      <SectionReveal delay={0}>
        <Projects />
      </SectionReveal>

      {/* ↓ Transition: entering Skills realm */}
      <RealmPortal realm="skills" />
      <SectionReveal delay={0}>
        <Skills />
      </SectionReveal>

      {/* ↓ Transition: entering Experience realm */}
      <RealmPortal realm="experience" />
      <SectionReveal delay={0}>
        <Experience />
      </SectionReveal>

      {/* ↓ Transition: entering Contact realm */}
      <RealmPortal realm="contact" />
      <SectionReveal delay={0}>
        <Contact />
      </SectionReveal>

      <Footer />
      <ScrollToTop />
    </div>
  </>
);

const App = () => {
  const [showStory, setShowStory] = useState(() => {
    return !sessionStorage.getItem('story_seen');
  });

  const handleEnterPortfolio = () => {
    sessionStorage.setItem('story_seen', '1');
    setShowStory(false);
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <ThemeProvider>
      <Router>
        <GlobalScrollHandler />
        <Routes>
          <Route
            path="/"
            element={<MainLayout showStory={showStory} onEnterPortfolio={handleEnterPortfolio} />}
          />
          <Route path="/project/:slug" element={<ProjectDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
