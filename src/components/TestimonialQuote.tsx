"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonialQuote() {
  return (
    <section id="reviews" className="relative py-20 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Glow backdrop */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-signal/10 rounded-full blur-3xl pointer-events-none" />

        {/* Ambient quote icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-surface border border-rule flex items-center justify-center text-signal shadow-md">
            <Quote className="w-5 h-5" />
          </div>
        </div>

        {/* Quote text */}
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-ink leading-relaxed max-w-3xl mx-auto">
          “Abdul transformed our entire business operations from manual paperwork into a{" "}
          <span className="text-ink font-semibold">lightning-fast, offline-first ERP</span> and customer
          web platform that seamlessly handles thousands of transactions.”
        </blockquote>

        {/* Author info */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-rule shadow-md">
            <div className="w-full h-full bg-surface flex items-center justify-center text-ink font-bold text-sm">
              LM
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-ink tracking-wide">
              Lala Motors Management
            </span>
            <span className="text-xs text-graphite font-medium">
              Automotive Operations &amp; Dealership
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
