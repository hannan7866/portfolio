"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Calendar, HelpCircle } from "lucide-react";

interface FAQItem {
  number: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    number: "01",
    question: "How do we get started on a project or role?",
    answer:
      "We start with a quick discovery discussion where you share your project goals, technical requirements, and timeline. From there, I propose the architectural approach, milestone roadmap, and immediate next steps.",
  },
  {
    number: "02",
    question: "What is your primary tech stack & capabilities?",
    answer:
      "My core stack includes React.js, Next.js (App Router, Server Components & SSR), TypeScript/JavaScript, Node.js, Express.js, Python, PostgreSQL, MongoDB, SQLite, and Supabase. I also build Generative AI and RAG pipelines.",
  },
  {
    number: "03",
    question: "Do you have experience building offline-first systems?",
    answer:
      "Yes! I engineered an offline-first desktop ERP and billing system in Python and SQLite for Lala Motors that has processed over 1,000+ real-world transactions with local database persistence and automated PDF invoice generation.",
  },
  {
    number: "04",
    question: "Are you available for full-time roles or contract projects?",
    answer:
      "Yes. I am actively seeking Full-Stack Developer and Software Engineer opportunities (Remote, Hybrid, or On-site in India / Global) as well as selective high-impact freelance/consulting projects.",
  },
  {
    number: "05",
    question: "How do you approach database schema design & APIs?",
    answer:
      "I follow strict normalization and indexing strategies for relational databases (PostgreSQL/SQLite), implement structured RESTful endpoints with input validation, JWT authentication, and automated error telemetry.",
  },
  {
    number: "06",
    question: "How long does a typical project take to complete?",
    answer:
      "Depending on complexity, standalone web applications and API integrations typically take 1–3 weeks, while comprehensive enterprise ERPs and multi-tier platforms take 4–6 weeks with continuous milestone deliverables.",
  },
];

interface FAQProps {
  onOpenContact?: () => void;
}

export default function FAQ({ onOpenContact }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rule overflow-hidden w-full max-w-[100vw]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-signal/[0.08] rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-signal mb-2"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Common Questions
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink u-head"
        >
          FAQs
        </motion.h2>
      </div>

      {/* Two-Column Grid: Left Accordion, Right Signal Callout Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Accordion List */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-surface border-rule shadow-xl"
                    : "bg-surface border-rule hover:border-ink"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono font-bold text-graphite shrink-0">
                      {faq.number}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-ink tracking-tight">
                      {faq.question}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-surface border border-rule flex items-center justify-center text-graphite shrink-0 transition-transform">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Animated Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 pl-12 text-xs sm:text-sm text-graphite leading-relaxed border-t border-rule">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Signal Sticky CTA Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-signal text-signal-ink p-8 sm:p-9 border border-rule flex flex-col justify-between shadow-2xl"
          >
            {/* Top Avatar Thumbnail */}
            <div className="mb-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-sunken border-2 border-rule shadow-lg">
                <Image
                  src="/images/Abdul-Image.jpeg"
                  alt="Abdul Hannan"
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-signal-ink mb-4 leading-tight u-head">
              Still not sure?<br />
              Book a free discovery call.
            </h3>

            {/* Subtext */}
            <div className="text-xs sm:text-sm text-signal-ink/90 leading-relaxed space-y-3 mb-8">
              <p>
                Your software should be reliable, scalable, and engineered to solve real business bottlenecks.
              </p>
              <p className="font-semibold text-signal-ink">
                If that’s what you’re aiming for, we should talk.
              </p>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={onOpenContact}
                className="px-5 py-3 rounded-full bg-sunken text-ink text-xs font-bold hover:bg-paper hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-signal" />
                <span>Schedule Now</span>
              </button>
              <span className="text-xs font-bold text-signal-ink tracking-wide">
                Cal.com
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
