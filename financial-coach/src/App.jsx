import React, { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import TargetAudience from './components/TargetAudience';
import SpecialOffer from './components/SpecialOffer';
import TrustStats from './components/TrustStats';
import CoachBio from './components/CoachBio';
import CourseProgram from './components/CourseProgram';
import FintechToolsHub from './components/FintechToolsHub';
import Testimonials from './components/Testimonials';
import WhatYouGet from './components/WhatYouGet';
import Roadmap from './components/Roadmap';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="financial-coach-app">
      {/* Top Sticky Announcement */}
      <AnnouncementBar onOpenCheckout={openCheckout} />

      {/* Main Navigation Header */}
      <Header onOpenCheckout={openCheckout} onOpenBooking={openBooking} />

      {/* Main Landing Page Content */}
      <main id="main-content">
        <Hero onOpenCheckout={openCheckout} />
        <TargetAudience />
        <SpecialOffer onOpenCheckout={openCheckout} />
        <TrustStats />
        <CoachBio onOpenBooking={openBooking} />
        <CourseProgram onOpenCheckout={openCheckout} />
        <FintechToolsHub onOpenCheckout={openCheckout} />
        <Testimonials />
        <WhatYouGet />
        <Roadmap />
        <FAQ />
        <FinalCTA onOpenCheckout={openCheckout} onOpenBooking={openBooking} />
      </main>

      {/* Footer */}
      <Footer onOpenCheckout={openCheckout} onOpenBooking={openBooking} />

      {/* Interactive Modals */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
    </div>
  );
}
