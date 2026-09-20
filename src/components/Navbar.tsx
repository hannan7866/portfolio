"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight, Mail, FileText } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 py-4 sm:py-5 pointer-events-none transition-all duration-300 w-full max-w-[100vw]">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{
          y: isHidden ? "-150%" : 0,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-3.5 sm:px-4 py-2 rounded-full transition-all duration-300 max-w-[calc(100vw-1.5rem)] ${
          isScrolled
            ? "bg-sunken/90 backdrop-blur-xl border border-rule shadow-2xl"
            : "bg-sunken/90 backdrop-blur-lg border border-rule"
        }`}
      >
        {/* Brand / Avatar */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-sunken border border-rule group-hover:border-arc transition-colors">
            <Image
              src="/images/Abdul-Image.jpeg"
              alt="Abdul Hannan"
              fill
              sizes="28px"
              className="object-cover object-top group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="text-xs font-bold text-ink tracking-tight group-hover:text-ink/90">
            Abdul Hannan
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-graphite">
          <Link
            href="#projects"
            className="hover:text-ink transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            href="#skills"
            className="hover:text-ink transition-colors duration-200"
          >
            Skills
          </Link>
          <Link
            href="#about"
            className="hover:text-ink transition-colors duration-200"
          >
            Experience
          </Link>
          <Link
            href="#faq"
            className="hover:text-ink transition-colors duration-200"
          >
            FAQs
          </Link>
        </div>

        {/* Action Buttons: View CV & Contact on Desktop */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {/* View CV Button */}
          <a
            href="/Hannan_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 rounded-full bg-surface hover:bg-rule border border-rule px-3.5 py-1.5 text-xs font-semibold text-ink transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-arc" />
            <span>View CV</span>
          </a>

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="hidden md:inline-flex relative rounded-full bg-arc hover:bg-arc/90 px-4 py-1.5 text-xs font-semibold text-arc-ink hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Contact
          </button>

          {/* Mobile Hamburger Button (Strictly hidden on desktop screens) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-surface border border-rule text-graphite hover:text-ink cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </motion.nav>

      {/* Restored Simple Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 bg-sunken/90 border border-rule rounded-2xl p-6 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 z-50 md:hidden"
          >
            <div className="flex flex-col gap-3 font-medium text-sm text-ink">
              <Link
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors flex items-center justify-between"
              >
                Projects
                <ArrowUpRight className="w-4 h-4 text-graphite" />
              </Link>
              <Link
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors flex items-center justify-between"
              >
                Skills
                <ArrowUpRight className="w-4 h-4 text-graphite" />
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors flex items-center justify-between"
              >
                Experience &amp; About
                <ArrowUpRight className="w-4 h-4 text-graphite" />
              </Link>
              <Link
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors flex items-center justify-between"
              >
                FAQs
                <ArrowUpRight className="w-4 h-4 text-graphite" />
              </Link>
              <a
                href="/Hannan_CV.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors flex items-center justify-between text-ink font-semibold"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-arc" />
                  View CV / Resume
                </span>
                <ArrowUpRight className="w-4 h-4 text-graphite" />
              </a>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="u-micro">Theme</span>
              <ThemeToggle />
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact?.();
              }}
              className="w-full py-2.5 rounded-full bg-arc hover:bg-arc/90 text-sm font-semibold text-arc-ink flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Get in touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
