"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TestimonialQuote from "@/components/TestimonialQuote";
import Services from "@/components/Services";
import AboutSticky from "@/components/AboutSticky";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#0d0d0f] text-white selection:bg-[#f41761] selection:text-white">
        {/* Floating Header / Navbar */}
        <Navbar onOpenContact={handleOpenContact} />

        {/* Hero Section with 1:1 Layout, Typography & 3D Cursor Tracking Avatar */}
        <Hero onOpenContact={handleOpenContact} />

        {/* Latest Projects Showcase (Hover scale-110, dark overlay, case study modal) */}
        <Projects />

        {/* Testimonial Quote Banner */}
        <TestimonialQuote />

        {/* Core Skills & Capabilities with Tilted Scroll Reveal */}
        <Services />

        {/* About & Experience Section with Sticky Scroll Profile Layout */}
        <AboutSticky onOpenContact={handleOpenContact} />

        {/* FAQs Section with Accordion and Magenta Booking Card */}
        <FAQ onOpenContact={handleOpenContact} />

        {/* Footer with Dynamic Word Swap & Links */}
        <Footer onOpenContact={handleOpenContact} />

        {/* Floating Bottom Quick Contact Bar */}
        <FloatingDock onOpenContact={handleOpenContact} />

        {/* Interactive Contact & Booking Modal */}
        <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
      </main>
    </SmoothScroll>
  );
}
