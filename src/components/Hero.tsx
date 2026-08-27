"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star } from "lucide-react";

interface HeroProps {
  onOpenContact?: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Heavier spring physics with deliberate inertia/drag
  const springConfig = { damping: 30, stiffness: 70, mass: 1.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // 3D Rotations & Translations
  const rotateX = useTransform(smoothY, [-1, 1], [14, -14]);
  const rotateY = useTransform(smoothX, [-1, 1], [-18, 18]);
  const translateX = useTransform(smoothX, [-1, 1], [-22, 22]);
  const translateY = useTransform(smoothY, [-1, 1], [-15, 15]);

  useEffect(() => {
    const handleWindowPointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      rawX.set(Math.max(-1, Math.min(1, x)));
      rawY.set(Math.max(-1, Math.min(1, y)));
    };

    const handlePointerLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [rawX, rawY]);

  return (
    <section
      id="hero"
      className="relative min-h-[82vh] sm:min-h-[92vh] flex flex-col justify-between pt-16 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-10 lg:px-16 overflow-hidden select-none bg-[#0d0d0f] w-full max-w-[100vw]"
    >
      {/* Subtle ambient central warmth behind typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[260px] sm:h-[350px] bg-[#FF1E56]/[0.08] rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      {/* Main Center Typography & Overlapping 3D Head */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center my-auto">
        <div className="relative w-full flex flex-col items-center justify-center py-2 sm:py-4">
          
          {/* Floating Pink Dot Accent */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute left-[8%] sm:left-[16%] md:left-[20%] top-[42%] w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#FF1E56] shadow-[0_0_12px_#FF1E56] z-10"
          />

          {/* Top Big Text: THINK */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[21vw] sm:text-[17vw] md:text-[15vw] lg:text-[170px] font-black tracking-[-0.05em] uppercase leading-[0.82] text-white text-center font-display drop-shadow-md"
          >
            THINK
          </motion.h1>

          {/* Bottom Big Text: CREATIVELY */}
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-[20vw] sm:text-[16vw] md:text-[14vw] lg:text-[160px] font-black tracking-[-0.05em] uppercase leading-[0.82] text-[#FF1E56] text-center font-display -mt-2 sm:-mt-4 md:-mt-6"
          >
            CREATIVELY
          </motion.h2>

          {/* 3D Transparent Avatar Head - Big & Bold */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformPerspective: 1200,
            }}
            initial={{ scale: 0.75, opacity: 0, filter: "blur(8px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] z-20 pointer-events-none will-change-transform flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/avatar_3d.jpg.png"
                alt="3D Avatar of Abdul Hannan"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Hero Bottom Row: Left Subtext & Right Button on Same Line */}
        <div className="w-full mt-8 sm:mt-8 pt-2 sm:pt-0 flex items-end justify-between gap-3 z-30">
          {/* Left: Refined Personal Positioning Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-300 text-[11px] sm:text-sm md:text-base font-normal leading-tight sm:leading-relaxed text-left max-w-[170px] sm:max-w-md"
          >
            <strong className="text-white font-semibold block sm:inline">Full-Stack Developer &amp; Software Engineer</strong>{" "}
            <span className="hidden sm:inline">building real-world products, business systems, and interactive web experiences.</span>
            <span className="inline sm:hidden text-zinc-400">building real-world products &amp; systems.</span>
          </motion.p>

          {/* Right: Pill CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onOpenContact}
              className="px-4 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#FF1E56] hover:bg-[#e11255] text-white text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(255,30,86,0.5)] hover:shadow-[0_0_35px_rgba(255,30,86,0.75)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Book a call with me
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero Social Proof & Tech Marquee Row */}
      <div className="w-full max-w-7xl mx-auto pt-4 sm:pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 z-30 overflow-hidden">
        {/* Social Proof Stack */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Avatar stack */}
          <div className="flex -space-x-2 overflow-hidden">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0d0d0f] bg-rose-950 flex items-center justify-center text-[10px] font-bold text-rose-300">
              AH
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0d0d0f] bg-indigo-950 flex items-center justify-center text-[10px] font-bold text-indigo-300">
              LM
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0d0d0f] bg-emerald-950 flex items-center justify-center text-[10px] font-bold text-emerald-300">
              CS
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0d0d0f] bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300">
              AI
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5 text-[#FF1E56]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-[#FF1E56]" />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-200 mt-0.5">
              1.5+ Years Exp · 1,000+ Transactions
            </span>
          </div>
        </div>

        {/* Tech Stack Marquee Strip */}
        <div className="w-full flex-1 overflow-hidden relative max-w-2xl">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#0d0d0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#0d0d0f] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex w-max items-center gap-8 sm:gap-14 will-change-transform opacity-75"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 24,
              ease: "linear",
            }}
          >
            {[...TECH_STACK, ...TECH_STACK].map((tech, idx) => (
              <div key={idx} className="flex items-center gap-2 hover:opacity-100 transition-opacity">
                {tech.icon}
                <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const TECH_STACK = [
  {
    name: "Lala Motors Desktop ERP",
    icon: (
      <span className="text-[10px] font-bold tracking-widest text-[#FF1E56]">
        1,000+ TRANSACTIONS
      </span>
    ),
  },
  {
    name: "Python & SQLite",
    icon: (
      <span className="w-4 h-4 rounded bg-amber-500/20 border border-amber-500/40 text-[9px] font-bold flex items-center justify-center text-amber-400">
        Py
      </span>
    ),
  },
  {
    name: "React & Next.js (SSR)",
    icon: (
      <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Node.js & Express 5",
    icon: (
      <span className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/40 text-[9px] font-bold flex items-center justify-center text-emerald-400">
        JS
      </span>
    ),
  },
  {
    name: "PostgreSQL & MongoDB",
    icon: (
      <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: "Generative AI & RAG",
    icon: (
      <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
  },
];
