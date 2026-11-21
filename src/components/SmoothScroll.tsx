"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ultra-smooth butter-scroll engine with balanced momentum and responsive inertia
    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // High performance RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth Anchor Link Interceptor for flawless navigation glide
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target) {
        const href = target.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el as HTMLElement, {
              offset: -40,
              duration: 1.25,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
