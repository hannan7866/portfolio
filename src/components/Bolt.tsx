"use client";
import React from "react";

export default function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path className="bolt-glow" d="M60 40 L210 180 L150 210 L330 330 L268 358 L430 520"
        fill="none" stroke="var(--arc)" strokeWidth="9"
        strokeLinecap="round" strokeLinejoin="round" />
      <path className="bolt-glow" d="M330 330 L300 250 M210 180 L280 150"
        fill="none" stroke="var(--arc)" strokeWidth="5" strokeLinecap="round" />
      <path className="bolt-core" d="M60 40 L210 180 L150 210 L330 330 L268 358 L430 520"
        fill="none" stroke="#EAFBFF" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
