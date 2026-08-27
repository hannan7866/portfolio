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
import ContactModal, { ContactMode } from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactMode, setContactMode] = useState<ContactMode>("hire");

  const handleOpenContact = (mode: ContactMode = "hire") => {
    setContactMode(mode);
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#0d0d0f] text-white selection:bg-[#f41761] selection:text-white">
        {/* Floating Header / Navbar */}
        <Navbar onOpenContact={() => handleOpenContact("hire")} />

        {/* Hero Section with 1:1 Layout, Typography & 3D Cursor Tracking Avatar */}
        <Hero onOpenContact={() => handleOpenContact("hire")} />

        {/* Latest Projects Showcase */}
        <Projects />

        {/* Testimonial Quote Banner */}
        <TestimonialQuote />

        {/* Core Skills & Capabilities */}
        <Services />

        {/* About & Experience Section */}
        <AboutSticky onOpenContact={() => handleOpenContact("hire")} />

        {/* FAQs Section */}
        <FAQ onOpenContact={() => handleOpenContact("project")} />

        {/* Footer */}
        <Footer onOpenContact={() => handleOpenContact("hire")} />

        {/* Floating Bottom Quick Contact Bar */}
        <FloatingDock onOpenContact={() => handleOpenContact("direct")} />

        {/* Interactive Dual-Intent Contact & Booking Modal */}
        <ContactModal
          isOpen={isContactOpen}
          onClose={handleCloseContact}
          initialMode={contactMode}
        />
      </main>
    </SmoothScroll>
  );
}
