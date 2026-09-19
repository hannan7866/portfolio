"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");
  const [cursorText, setCursorText] = useState<string>("");

  // Exact mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics for the outer ring
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable if device supports fine pointer (mouse/trackpad)
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Bulletproof element detection using exact screen coordinates
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target) {
        setCursorType("default");
        setCursorText("");
        return;
      }

      // 1. Check for data-cursor-text first (Highest priority: Text Badge)
      const textElement = target.closest("[data-cursor-text]") as HTMLElement | null;
      if (textElement) {
        const text = textElement.getAttribute("data-cursor-text") || "";
        setCursorType("text");
        setCursorText(text);
        return;
      }

      // 2. Check for data-cursor="pointer" or interactive elements (Enlarge ring)
      const pointerElement = target.closest(
        '[data-cursor="pointer"], a, button, input[type="submit"], input[type="button"], select, [role="button"]'
      ) as HTMLElement | null;

      if (pointerElement) {
        setCursorType("pointer");
        setCursorText("");
        return;
      }

      // 3. Fallback to default state
      setCursorType("default");
      setCursorText("");
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Dimension & Style variants for outer ring
  const isTextMode = cursorType === "text";
  const isPointerMode = cursorType === "pointer";

  return (
    <div className="hidden [@media(pointer:fine)]:block pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* 1. Small Dot (Strict Follow) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && !isTextMode ? 1 : 0,
          scale: isVisible && !isTextMode ? (isPointerMode ? 0.6 : 1) : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-ink mix-blend-difference pointer-events-none"
      />

      {/* 2. Intelligent Morphing Trailing Ring / Badge */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isTextMode ? 75 : isPointerMode ? 52 : 36,
          height: isTextMode ? 75 : isPointerMode ? 52 : 36,
          scale: isVisible ? 1 : 0.5,
          backgroundColor: isTextMode
            ? "var(--signal)"
            : isPointerMode
            ? "color-mix(in oklab, var(--signal) 20%, transparent)"
            : "color-mix(in oklab, var(--signal) 10%, transparent)",
          borderColor: isTextMode
            ? "var(--rule)"
            : "var(--signal)",
          boxShadow: "none",
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 240,
          mass: 0.6,
        }}
        className="fixed top-0 left-0 rounded-full border flex items-center justify-center pointer-events-none overflow-hidden backdrop-blur-[2px]"
      >
        {/* Animated Badge Text */}
        <AnimatePresence mode="wait">
          {isTextMode && cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.5, y: 3 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -3 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] font-black tracking-widest text-signal-ink uppercase text-center select-none font-sans px-1"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
