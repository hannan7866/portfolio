"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TestimonialQuote from "@/components/TestimonialQuote";
import AboutSticky from "@/components/AboutSticky";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import ContactModal, { ContactMode } from "@/components/ContactModal";

const Services = dynamic(() => import("@/components/Services"), {
  ssr: false,
  loading: () => <div className="min-h-[600px]" />,
});

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
    <>
      <Preloader />

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
