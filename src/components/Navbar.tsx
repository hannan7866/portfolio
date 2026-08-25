"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Mail } from "lucide-react";

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-5 pointer-events-none transition-all duration-300">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between gap-8 px-4 py-2 rounded-full transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/90"
            : "bg-black/60 backdrop-blur-lg border border-white/10"
        }`}
      >
        {/* Brand / Avatar */}
        <Link href="#hero" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-black/50 border border-white/15 group-hover:border-[#FF1E56] transition-colors">
            <Image
              src="/images/avatar_3d.jpg.png"
              alt="Abdul Hannan"
              fill
              className="object-contain p-0.5 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="text-xs font-bold text-white tracking-tight group-hover:text-white/90">
            Abdul Hannan
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-300">
          <Link
            href="#projects"
            className="hover:text-white transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            href="#skills"
            className="hover:text-white transition-colors duration-200"
          >
            Skills
          </Link>
          <Link
            href="#about"
            className="hover:text-white transition-colors duration-200"
          >
            Experience
          </Link>
          <Link
            href="#faq"
            className="hover:text-white transition-colors duration-200"
          >
            FAQs
          </Link>
        </div>

        {/* Contact Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenContact}
            className="relative rounded-full bg-[#FF1E56] hover:bg-[#e11255] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_18px_rgba(255,30,86,0.45)] hover:shadow-[0_0_25px_rgba(255,30,86,0.65)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
        </button>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 bg-black/90 border border-white/15 rounded-2xl p-6 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 z-50 md:hidden"
          >
            <div className="flex flex-col gap-3 font-medium text-sm text-zinc-200">
              <Link
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                Projects
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                Skills
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                Experience &amp; About
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                FAQs
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </Link>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact?.();
              }}
              className="w-full py-2.5 rounded-full bg-[#FF1E56] text-sm font-semibold text-white shadow-lg shadow-[#FF1E56]/35 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> Get in touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
