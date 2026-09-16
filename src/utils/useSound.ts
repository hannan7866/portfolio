"use client";

import { useCallback, useRef } from "react";

/**
 * High-performance Web Audio API mechanical micro-tick generator.
 * Creates a subtle, tactile, low-frequency click without external audio assets.
 */
export const useHoverSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Deep, muffled tactile click: 150Hz rapidly descending to 40Hz in 50ms
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);

      // Micro-gain envelope fading out
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Gracefully handle browser autoplay policy / audio context limitations
    }
  }, []);

  return play;
};
