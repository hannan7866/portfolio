"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Magnetic from "@/components/Magnetic";

const WORDS = ["design", "build", "create", "engineer", "ship"];

function WhatsappIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface FooterProps {
  onOpenContact?: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  void onOpenContact;
  const [index, setIndex] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  // Scroll-linked animation for the Curtain Reveal and Giant Typography
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const textLetterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.1em", "0em"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["50px", "0px"]);
  const textScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="sticky bottom-0 h-screen w-full flex flex-col justify-between pt-16 sm:pt-20 pb-0 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto bg-paper z-0 overflow-hidden"
    >
      {/* Top Heading: "Lets [word] / incredible work together." */}
      <div className="relative mb-10 select-none">
        <div className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-ink font-sans leading-normal">
          {/* First Line: Lets + Swapped Word */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span>Lets</span>

            {/* Dynamic Swapped Word Container */}
            <div className="relative inline-flex items-center justify-start min-w-[140px] sm:min-w-[300px] md:min-w-[360px] h-12 sm:h-20 md:h-24 overflow-hidden sm:overflow-visible">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[index]}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-signal text-4xl sm:text-7xl md:text-8xl font-bold lowercase tracking-normal whitespace-nowrap leading-none py-1 sm:py-2 u-display"
                >
                  {WORDS[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Second Line: incredible work together. */}
          <div className="mt-1 sm:mt-2">
            <span>incredible work together.</span>
          </div>
        </div>

        {/* Small floating signal accent dot under the text */}
        <div className="flex justify-start mt-3 sm:mt-4">
          <div className="w-2.5 h-2.5 rounded-full bg-signal" />
        </div>
      </div>

      {/* Meta Bar: Email, Call Me, Social Icons (with Magnetic pull) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-t border-rule">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-graphite font-medium tracking-wide">
            Email
          </span>
          <div>
            <Magnetic strength={0.2}>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dev.hannan.ai@gmail.com&su=Project%20Inquiry%20-%20Abdul%20Hannan%20Portfolio&body=Hi%20Abdul%2C%0A%0AI%20am%20interested%20in%20discussing%20a%20project%20or%20role%20with%20you."
                target="_blank"
                rel="noreferrer"
                className="text-sm sm:text-base font-bold text-ink hover:text-signal transition-colors cursor-pointer inline-block"
              >
                dev.hannan.ai@gmail.com
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Call Me */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-graphite font-medium tracking-wide">
            Call Me
          </span>
          <div>
            <Magnetic strength={0.2}>
              <a
                href="tel:+917310542113"
                className="text-sm sm:text-base font-bold text-ink hover:text-signal transition-colors inline-block"
              >
                +91-7310542113
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="flex flex-col gap-2 sm:items-end">
          <span className="text-xs text-graphite font-medium tracking-wide">
            Follow &amp; Connect
          </span>
          <div className="flex items-center gap-3">
            <Magnetic strength={0.2}>
              <a
                href="https://wa.me/917310542113"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-surface border border-rule flex items-center justify-center text-graphite hover:text-signal-ink hover:bg-signal hover:border-signal transition-all cursor-pointer"
              >
                <WhatsappIcon className="w-3.5 h-3.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="https://github.com/hannan7866"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-surface border border-rule flex items-center justify-center text-graphite hover:text-signal-ink hover:bg-signal hover:border-signal transition-all cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="https://linkedin.com/in/abdul-hannan-92a911405"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-surface border border-rule flex items-center justify-center text-graphite hover:text-signal-ink hover:bg-signal hover:border-signal transition-all cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-surface border border-rule flex items-center justify-center text-graphite hover:text-signal-ink hover:bg-signal hover:border-signal transition-all cursor-pointer"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-rule text-xs text-graphite font-medium">
        <div>
          © {new Date().getFullYear()} Abdul Hannan. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <Link href="#hero" className="hover:text-ink transition-colors">
            Home
          </Link>
          <Link href="#projects" className="hover:text-ink transition-colors">
            Projects
          </Link>
          <Link href="#skills" className="hover:text-ink transition-colors">
            Skills
          </Link>
          <Link href="#about" className="hover:text-ink transition-colors">
            About
          </Link>
          <Link href="#faq" className="hover:text-ink transition-colors">
            FAQ
          </Link>
        </div>
      </div>

      {/* Giant Bottom Signature Typography - Scroll-Linked Dynamic Expansion */}
      <div className="w-full pt-4 pb-0 flex justify-center items-end select-none overflow-hidden leading-none">
        <motion.h1
          style={{
            letterSpacing: textLetterSpacing,
            y: textY,
            scale: textScale,
          }}
          className="text-[20vw] sm:text-[18vw] md:text-[17vw] lg:text-[195px] font-black uppercase leading-none text-signal text-center u-display whitespace-nowrap m-0 p-0 transform will-change-transform"
        >
          MR. ABDUL
        </motion.h1>
      </div>
    </footer>
  );
}
