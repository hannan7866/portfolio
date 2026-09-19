"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Preloader from "@/components/Preloader";
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

  // Chromatic Ambient Color Engine on Scroll
  const { scrollYProgress } = useScroll();

  const ambientColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#4FC9A0", "#E0AE52", "#4FC9A0", "#E0AE52", "#4FC9A0"]
  );

  const handleOpenContact = (mode: ContactMode = "hire") => {
    setContactMode(mode);
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <>
      <Preloader />

      {/* Chromatic Ambient Color Shift Engine - Floating Fixed Blur Orb */}
      <motion.div
        style={{ backgroundColor: ambientColor }}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-[140px] sm:blur-[200px] pointer-events-none z-0 opacity-20 will-change-transform"
      />

      <Navbar onOpenContact={() => handleOpenContact("hire")} />

      <SmoothScroll>
        {/* Main Content Sections */}
        <motion.div className="relative z-10 bg-paper shadow-[0_40px_100px_rgba(0,0,0,0.85)]">
          <Hero onOpenContact={() => handleOpenContact("hire")} />
          <Projects />
          <TestimonialQuote />
          <Services />
          <AboutSticky onOpenContact={() => handleOpenContact("hire")} />
          <FAQ onOpenContact={() => handleOpenContact("project")} />
        </motion.div>

        {/* Cinematic Curtain Reveal Sticky Footer */}
        <Footer onOpenContact={() => handleOpenContact("hire")} />
      </SmoothScroll>

      <FloatingDock onOpenContact={() => handleOpenContact("direct")} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
        initialMode={contactMode}
      />
    </>
  );
}
