"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

const CLIENTS = [
  {
    name: "INnUP",
    subtitle: "Inside & Up Print",
    icon: (
      <svg className="w-6 h-6 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "VEDARA",
    subtitle: "Luxury Botanicals",
    icon: (
      <span className="font-serif tracking-widest text-base font-bold text-zinc-300">
        V
      </span>
    ),
  },
  {
    name: "DASMO",
    subtitle: "Fintech Systems",
    icon: (
      <svg className="w-5 h-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    name: "TripLinq",
    subtitle: "Travel Intelligence",
    icon: (
      <svg className="w-5 h-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
      </svg>
    ),
  },
  {
    name: "AURA LABS",
    subtitle: "Spatial Computing",
    icon: (
      <svg className="w-5 h-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 22 22 22" />
      </svg>
    ),
  },
  {
    name: "SYNAPSE",
    subtitle: "Neural Analytics",
    icon: (
      <svg className="w-5 h-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: "KINETIC",
    subtitle: "Autonomous Mobility",
    icon: (
      <svg className="w-5 h-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="8" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" />
      </svg>
    ),
  },
];

export default function Marquee() {
  const duplicatedClients = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const directionFactor = useRef<number>(-1);
  const baseVelocity = -4; // Constant idle speed percentage

  useAnimationFrame((time, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    const currentVelocity = smoothVelocity.get();
    if (currentVelocity < -5) {
      directionFactor.current = 1; // Reverse when scrolling up
    } else if (currentVelocity > 5) {
      directionFactor.current = -1; // Accelerate forward when scrolling down
    }

    if (Math.abs(currentVelocity) > 0) {
      moveBy += directionFactor.current * Math.abs(moveBy) * Math.abs(currentVelocity) * 0.006;
    }

    let nextX = baseX.get() + moveBy;
    // Seamless continuous wrap between -50% and 0%
    if (nextX <= -50) {
      nextX += 50;
    } else if (nextX >= 0) {
      nextX -= 50;
    }

    baseX.set(nextX);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <section className="relative w-full py-12 overflow-hidden border-y border-white/[0.06] bg-[#0b0b0e]/50 backdrop-blur-sm select-none">
      {/* Left and right fade gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#070709] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#070709] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex w-max items-center gap-12 sm:gap-20 will-change-transform"
        style={{ x }}
      >
        {duplicatedClients.map((client, index) => (
          <div
            key={index}
            className="flex items-center gap-3.5 group cursor-default transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-105 shrink-0"
          >
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#ff1867]/40 group-hover:bg-[#ff1867]/10 transition-colors duration-300">
              {client.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider uppercase text-zinc-200 group-hover:text-white font-sans">
                {client.name}
              </span>
              <span className="text-[10px] tracking-tight text-zinc-500 font-medium group-hover:text-zinc-400">
                {client.subtitle}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
