"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Voronoi fracture field.
 * PERF CONTRACT — do not violate:
 *  - The edge mask is computed ONCE and never recomputed per frame.
 *  - The only animated property is `transform` on the gradient layer.
 *  - No filters, no box-shadows, no canvas redraw in the animation loop.
 *  - There is no rAF loop at all: the rotation is a CSS animation.
 */
export default function VoltageField() {
  const [mask, setMask] = useState<string | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (weak) return; // low-end device: CSS gradient fallback only

    const W = coarse ? 400 : 640;
    const H = coarse ? 225 : 360;
    const N = coarse ? 18 : 26;

    const build = () => {
      const cv = document.createElement("canvas");
      cv.width = W;
      cv.height = H;
      const ctx = cv.getContext("2d");
      if (!ctx) return;

      // deterministic sites so the field is stable across reloads
      let s = 20260920;
      const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
      const px: number[] = [];
      const py: number[] = [];
      for (let i = 0; i < N; i++) {
        px.push(rnd() * W);
        py.push(rnd() * H);
      }

      const img = ctx.createImageData(W, H);
      const d = img.data;
      const K = coarse ? 5 : 7; // edge falloff in px

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          let d1 = Infinity;
          let d2 = Infinity;
          for (let i = 0; i < N; i++) {
            const dx = x - px[i];
            const dy = y - py[i];
            const dd = dx * dx + dy * dy;
            if (dd < d1) {
              d2 = d1;
              d1 = dd;
            } else if (dd < d2) {
              d2 = dd;
            }
          }
          // distance to the bisector between the two nearest sites
          const e = Math.sqrt(d2) - Math.sqrt(d1);
          let v = e < K ? 1 - e / K : 0;
          v = v * v * v; // sharpen the line, soften the falloff
          const o = (y * W + x) * 4;
          d[o] = 255;
          d[o + 1] = 255;
          d[o + 2] = 255;
          d[o + 3] = (v * 255) | 0;
        }
      }
      ctx.putImageData(img, 0, 0);
      setMask(cv.toDataURL("image/png"));
    };

    // never block first paint with the bake
    const ric = (window as any).requestIdleCallback as
      | ((cb: () => void, o?: { timeout: number }) => number)
      | undefined;
    const id = ric ? ric(build, { timeout: 1800 }) : window.setTimeout(build, 240);

    return () => {
      if (ric && (window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);

  // pause the rotation whenever the field is off-screen or the tab is hidden
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const setRunning = (on: boolean) => {
      el.style.setProperty("--vf-play", on ? "running" : "paused");
    };
    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting && !document.hidden),
      { threshold: 0 }
    );
    io.observe(el);
    const onVis = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="vf pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="vf-field absolute inset-0"
        style={
          mask
            ? {
                WebkitMaskImage: `url(${mask})`,
                maskImage: `url(${mask})`,
              }
            : undefined
        }
      >
        <div className="vf-grad absolute inset-[-55%]" />
      </div>
      <div className="vf-vignette absolute inset-0" />
    </div>
  );
}
