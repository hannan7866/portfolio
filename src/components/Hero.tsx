"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  Variants,
} from "framer-motion";
import { Star } from "lucide-react";
import confetti from "canvas-confetti";
import Magnetic from "@/components/Magnetic";
import { useHoverSound } from "@/utils/useSound";

interface HeroProps {
  onOpenContact?: () => void;
}

// Refined glitch/scramble hover effect for personal positioning subtext
const GLYPHS = "!<>-_\\/[]{}—=+*^?#_0101";

function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration) return text[idx];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, 25);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-colors duration-200 ${className} ${
        isHovered ? "text-white" : ""
      }`}
    >
      {displayText}
    </span>
  );
}

// Kinetic letter stagger animation variants
const staggerContainer: Variants = {
  hidden: {},
  visible: (i: number = 0) => ({
    transition: {
      staggerChildren: 0.06,
      delayChildren: 2.6 + i * 0.15,
    },
  }),
};

const letterVariant: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 140,
    rotateY: 20,
    z: -400,
    y: 80,
    scale: 0.6,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    z: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 110,
      damping: 12,
      mass: 1.5,
      bounce: 0.4,
    },
  },
};

export default function Hero({ onOpenContact }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const playHover = useHoverSound();

  const handleAvatarClick = () => {
    playHover();
    setIsGlitching(true);
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#FF1E56", "#00E5FF", "#8B5CF6"],
      shapes: ["square"],
      gravity: 1.2,
      scalar: 1.2,
      ticks: 200,
    });
    setTimeout(() => {
      setIsGlitching(false);
    }, 300);
  };

  // Normalized -1 to 1 for 3D Avatar Tilt
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring physics with deliberate inertia/drag for 3D Head
  const springConfig = { damping: 30, stiffness: 70, mass: 1.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // 3D Rotations & Translations - reduced by 70% on mobile (<768px)
  const rotateX = useTransform(
    smoothY,
    [-1, 1],
    isMobile ? [4.2, -4.2] : [14, -14]
  );
  const rotateY = useTransform(
    smoothX,
    [-1, 1],
    isMobile ? [-5.4, 5.4] : [-18, 18]
  );
  const translateX = useTransform(
    smoothX,
    [-1, 1],
    isMobile ? [-6.5, 6.5] : [-22, 22]
  );
  const translateY = useTransform(
    smoothY,
    [-1, 1],
    isMobile ? [-4.5, 4.5] : [-15, 15]
  );

  // Scroll Parallax for the Giant Typography
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const textParallaxY = useTransform(scrollYProgress, [0, 1], ["0px", "-160px"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleWindowPointerMove = (e: PointerEvent) => {
      // If pointer is touch on mobile, skip
      if (e.pointerType === "touch" && window.innerWidth < 768) return;

      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        rawX.set(Math.max(-1, Math.min(1, nx)));
        rawY.set(Math.max(-1, Math.min(1, ny)));
      }
    };

    const handlePointerLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [rawX, rawY]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-between pt-16 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-10 lg:px-16 overflow-hidden select-none bg-[#0d0d0f] w-full max-w-[100vw]"
    >
      {/* Subtle ambient central warmth behind typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[260px] sm:h-[350px] bg-[#FF1E56]/[0.08] rounded-full blur-[60px] sm:blur-[160px] pointer-events-none" />

      {/* Main Center Typography & Overlapping 3D Head with Scroll Parallax */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center my-auto">
        <motion.div
          style={{ y: textParallaxY }}
          className="relative w-full flex flex-col items-center justify-center py-2 sm:py-4"
        >
          {/* Floating Pink Dot Accent */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute left-[4%] sm:left-[12%] md:left-[16%] top-[42%] w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#FF1E56] shadow-[0_0_12px_#FF1E56] z-30"
          />

          {/* =========================================================================
              LAYER 1: Interactive Bubble Text — hollow outline that ignites on hover
             ========================================================================= */}
          <div
            className="w-full flex flex-col items-center justify-center select-none pointer-events-auto z-10"
            role="heading"
            aria-level={1}
            aria-label="THINK CREATIVELY"
          >
            {/* Bubble THINK */}
            <motion.h1
              aria-hidden="true"
              custom={0}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-[28vw] sm:text-[22vw] md:text-[20vw] lg:text-[260px] xl:text-[290px] font-black tracking-tighter uppercase leading-[0.85] text-center font-display whitespace-nowrap flex justify-center -mx-4 sm:mx-0 [perspective:1000px]"
            >
              {"THINK".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariant}
                  whileHover={{
                    scale: 1.3,
                    y: -15,
                    color: "#ffffff",
                    textShadow: "0 20px 40px rgba(255, 255, 255, 0.4)",
                  }}
                  style={{
                    WebkitTextStroke: "2.5px rgba(255, 255, 255, 0.5)",
                    color: "rgba(255, 255, 255, 0)",
                    transformOrigin: "bottom",
                    position: "relative",
                    WebkitTransform: "translateZ(0)",
                  }}
                  className="inline-block cursor-default transition-colors duration-200 will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Bubble CREATIVELY */}
            <motion.h2
              aria-hidden="true"
              custom={1}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-[20.5vw] sm:text-[18vw] md:text-[16vw] lg:text-[210px] xl:text-[240px] font-black tracking-tighter uppercase leading-[0.85] text-center font-display whitespace-nowrap -mt-2 sm:-mt-6 md:-mt-10 lg:-mt-16 xl:-mt-20 flex justify-center -mx-4 sm:mx-0 [perspective:1000px]"
            >
              {"CREATIVELY".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariant}
                  whileHover={{
                    scale: 1.3,
                    y: -15,
                    color: "#FF1E56",
                    textShadow: "0 20px 40px rgba(255, 30, 86, 0.6)",
                  }}
                  style={{
                    WebkitTextStroke: "2.5px rgba(255, 30, 86, 0.8)",
                    color: "rgba(255, 30, 86, 0)",
                    transformOrigin: "bottom",
                    position: "relative",
                    WebkitTransform: "translateZ(0)",
                  }}
                  className="inline-block cursor-default transition-colors duration-200 will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>



          {/* 3D Transparent Avatar Head - Big & Bold Centerpiece with Interactive Cyber Easter Egg */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
              WebkitTransform: "translate3d(0,0,0)",
            }}
            initial={{ scale: 0.75, opacity: 0, filter: "blur(8px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[66%] sm:top-[62%] md:top-[65%] lg:top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] z-20 pointer-events-none will-change-transform flex items-center justify-center"
          >
            <motion.div
              onClick={handleAvatarClick}
              animate={
                isGlitching
                  ? {
                      x: [-10, 10, -10, 10, -5, 5, 0],
                      y: [-5, 5, -5, 5, -2, 2, 0],
                      filter: [
                        "hue-rotate(90deg) contrast(150%)",
                        "hue-rotate(-90deg) contrast(150%)",
                        "hue-rotate(0deg) contrast(100%)",
                      ],
                    }
                  : {
                      x: 0,
                      y: 0,
                      filter: "hue-rotate(0deg) contrast(100%)",
                    }
              }
              transition={
                isGlitching
                  ? { duration: 0.3, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              className="relative w-full h-full flex items-center justify-center pointer-events-none transition-transform active:scale-95 select-none"
            >
              <Image
                src="/images/avatar_3d_v2.png"
                alt="3D Avatar of Abdul Hannan"
                fill
                priority
                sizes="(max-width: 768px) 256px, 480px"
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] pointer-events-none"
              />

              {/* Dedicated Clickable Hitbox — covers just the face area */}
              <div
                className="absolute top-[25%] w-[45%] h-[50%] pointer-events-auto cursor-pointer rounded-full"
                data-cursor-text="SURPRISE"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hero Bottom Row: Left Subtext & Right Button on Same Line */}
        <div className="w-full mt-8 sm:mt-8 pt-2 sm:pt-0 flex items-end justify-between gap-3 z-30">
          {/* Left: Refined Personal Positioning Subtext with Glitch/Scramble Effect on Hover */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-300 text-[11px] sm:text-sm md:text-base font-normal leading-tight sm:leading-relaxed text-left max-w-[170px] sm:max-w-md cursor-default"
          >
            <strong className="text-white font-semibold block sm:inline">
              <ScrambleText text="Full-Stack Developer & Software Engineer" />
            </strong>{" "}
            <span className="hidden sm:inline">building real-world products, business systems, and interactive web experiences.</span>
            <span className="inline sm:hidden text-zinc-400">building real-world products &amp; systems.</span>
          </motion.p>

          {/* Right: Magnetic Pill CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic strength={0.4}>
              <button
                onClick={onOpenContact}
                onMouseEnter={playHover}
                className="px-4 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#FF1E56] hover:bg-[#e11255] text-white text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(255,30,86,0.5)] hover:shadow-[0_0_35px_rgba(255,30,86,0.75)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap block"
              >
                Book a call with me
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Hero Social Proof & Tech Marquee Row */}
      <div className="w-full max-w-7xl mx-auto pt-4 sm:pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 z-30 overflow-hidden">
        {/* Social Proof Stack */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Avatar stack */}
          <div className="flex -space-x-2 overflow-hidden">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0d0d0f] bg-rose-950 flex items-center justify-center text-xs font-bold text-rose-300">
              AH
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0d0d0f] bg-indigo-950 flex items-center justify-center text-xs font-bold text-indigo-300">
              LM
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0d0d0f] bg-emerald-950 flex items-center justify-center text-xs font-bold text-emerald-300">
              CS
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0d0d0f] bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">
              AI
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5 text-[#FF1E56]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-[#FF1E56]" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-zinc-200 mt-1">
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
