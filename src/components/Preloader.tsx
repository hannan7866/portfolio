"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hold greeting and trigger the slide-up exit after 2.5s
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1], // cinematic cubic-bezier curve
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0d0f] overflow-hidden select-none"
        >
          {/* Subtle central ambient glow */}
          <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#FF1E56]/15 rounded-full blur-[140px] pointer-events-none" />

          {/* Glowing Animated 'Hello' */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: [0.8, 1.08, 1],
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -30,
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontFamily: "var(--font-handwritten)",
              textShadow:
                "0 0 20px rgba(255, 30, 86, 0.85), 0 0 50px rgba(255, 30, 86, 0.5), 0 0 80px rgba(255, 30, 86, 0.3)",
            }}
            className="text-6xl sm:text-8xl md:text-9xl font-bold text-[#FF1E56] tracking-wide relative z-10 lowercase flex items-center gap-1"
          >
            <span>Hello</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white text-5xl sm:text-7xl md:text-8xl"
            >
              .
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
