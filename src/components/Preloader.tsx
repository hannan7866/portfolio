"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

const HELLO_CHARS = "hello.".split("");

/* Stagger parent: orchestrates children letter-by-letter */
const helloContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1, // reverse — last letter fades first
    },
  },
};

const helloCharVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  // sequence: 0 = show 'hello', 1 = fade out 'hello', 2 = show 'Welcome'
  const [sequence, setSequence] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setSequence(1), 1200); // start fading hello
    const t2 = setTimeout(() => setSequence(2), 1800); // show welcome text
    const t3 = setTimeout(() => setIsVisible(false), 3500); // trigger split exit

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="preloader-root"
          className="fixed inset-0 z-[200] pointer-events-none select-none"
        >
          {/* ── Top half — slides up on exit ── */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-paper z-[100]"
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
            }}
          />

          {/* ── Bottom half — slides down on exit ── */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-paper z-[100]"
            initial={{ y: 0 }}
            exit={{
              y: "100%",
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
            }}
          />

          {/* ── Ambient glow orb (always behind text) ── */}
          <div className="absolute inset-0 z-[101] flex items-center justify-center pointer-events-none">
            <div className="w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-signal/12 rounded-full blur-[160px]" />
          </div>

          {/* ── Text content layer — fades on exit ── */}
          <motion.div
            className="absolute inset-0 z-[102] flex flex-col items-center justify-center gap-6"
            exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }}
          >
            {/* Staggered 'hello.' typewriter */}
            <AnimatePresence mode="wait">
              {sequence < 2 && (
                <motion.div
                  key="hello"
                  variants={helloContainerVariants}
                  initial="hidden"
                  animate={sequence === 0 ? "visible" : "exit"}
                  exit="exit"
                  className="flex items-end gap-[0.05em] leading-none u-display"
                >
                  {HELLO_CHARS.map((char, i) => (
                    <motion.span
                      key={i}
                      variants={helloCharVariants}
                      className={`text-7xl sm:text-9xl md:text-[10rem] font-bold tracking-tight leading-none ${
                        char === "." ? "text-ink" : "text-signal"
                      }`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 'Welcome' blur-to-sharp reveal */}
            <AnimatePresence>
              {sequence >= 2 && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, filter: "blur(14px)", scale: 0.92 }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                  }}
                  exit={{ opacity: 0, filter: "blur(8px)", scale: 0.96 }}
                  className="flex flex-col items-center gap-3 text-center px-6"
                >
                  <p className="text-2xl sm:text-4xl text-ink u-display font-bold tracking-widest uppercase">
                    Welcome to my portfolio
                  </p>

                  {/* Thin animated progress line */}
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-signal to-transparent"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: "180px",
                      opacity: 1,
                      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
                    }}
                  />

                  {/* Subtle sub-label */}
                  <motion.span
                    className="text-[11px] font-mono tracking-[0.35em] text-graphite uppercase"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.4, duration: 0.5 },
                    }}
                  >
                    Hannan · Full-Stack Engineer
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
