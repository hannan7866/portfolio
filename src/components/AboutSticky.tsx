"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, ShieldCheck, MapPin, GraduationCap, Briefcase, ArrowRight, Mail, Phone, Terminal } from "lucide-react";

interface AboutStickyProps {
  onOpenContact?: () => void;
}

export default function AboutSticky({ onOpenContact }: AboutStickyProps) {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Background glow accent */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FF1E56]/[0.08] rounded-full blur-[160px] pointer-events-none" />

      {/* Two-Column Grid: Left Column Sticky Profile, Right Column Rich Experience Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column (Sticky Top Profile Card) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden bg-[#131318] border border-white/10 p-6 shadow-2xl group"
          >
            {/* Portrait Image Container */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
              <Image
                src="/images/avatar_3d.jpg.png"
                alt="Abdul Hannan — Full-Stack Developer"
                fill
                className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Status Pill Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-[#FF1E56]" />
                  <span>Open for Opportunities</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-300 font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-[#FF1E56]" />
                  <span>India</span>
                </div>
              </div>
            </div>

            {/* Quick Profile Summary */}
            <div className="mt-5 flex flex-col gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-between">
                Abdul Hannan
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#FF1E56]/20 text-[#FF1E56] font-semibold border border-[#FF1E56]/30">
                  Full-Stack Engineer
                </span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                B.Tech CS graduate with 1.5+ years hands-on experience building production web apps, offline ERP systems, and AI-powered solutions.
              </p>

              {/* Direct Quick Contacts */}
              <div className="mt-2 flex flex-col gap-1.5 text-xs text-zinc-400">
                <a
                  href="mailto:dev.hannan.ai@gmail.com"
                  className="hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF1E56]" />
                  dev.hannan.ai@gmail.com
                </a>
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#FF1E56]" />
                  +91-7310542113
                </span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
              <div>
                <span className="text-lg font-extrabold text-white block">1.5+</span>
                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Years Exp</span>
              </div>
              <div>
                <span className="text-lg font-extrabold text-[#FF1E56] block">1,000+</span>
                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Transactions</span>
              </div>
              <div>
                <span className="text-lg font-extrabold text-white block">B.Tech</span>
                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">CS (DBRAU)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Experience, Philosophy, and Education) */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          {/* Main About Me Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FF1E56]">
              <User className="w-3.5 h-3.5" />
              About Me
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
              Building software that solves{" "}
              <span className="text-[#FF1E56]">real-world problems</span>.
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              I am Abdul Hannan, a Computer Science graduate and Full-Stack Developer. I work across the full development lifecycle — understanding requirements, designing system architectures, building frontend interfaces and backend logic, designing databases, integrating APIs, debugging, and continuous deployment.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              My strongest experience comes from building custom software for <strong>Lala Motors</strong>, where I transformed traditional paper-based workflows into a digital software ecosystem. The offline-first ERP and billing system has supported more than <strong>1,000+ real-world transactions</strong> in active daily operations.
            </p>
          </motion.div>

          {/* Engineering Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FF1E56]" />
              Engineering Philosophy: Build Real Things
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#131318] border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-[#FF1E56]">01.</span>
                <h4 className="text-base font-bold text-white">Understand First</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Understand the business process, the users, and data constraints before writing code.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#131318] border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-[#FF1E56]">02.</span>
                <h4 className="text-base font-bold text-white">Real-World Testing</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Test solutions against actual commercial workloads, edge cases, and network drops.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#131318] border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-[#FF1E56]">03.</span>
                <h4 className="text-base font-bold text-white">Iterate &amp; Scale</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Fix what breaks, continuously improve what works, and integrate emerging AI capabilities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Professional Experience & Education Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-xl font-bold text-white tracking-tight">
              Experience &amp; Education
            </h3>

            <div className="flex flex-col gap-4">
              {/* Lala Motors Experience */}
              <div className="p-6 rounded-2xl bg-[#131318]/90 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#FF1E56]" />
                    Full-Stack Developer — Lala Motors
                  </h4>
                  <span className="text-xs font-mono text-[#FF1E56]">Jan 2025 — Present</span>
                </div>
                <span className="text-xs text-zinc-400 font-medium block mb-3">Agra, India</span>
                <ul className="flex flex-col gap-2 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1E56] mt-0.5">▹</span>
                    <span>Built custom software replacing manual paper workflows across daily workshop and billing operations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1E56] mt-0.5">▹</span>
                    <span>Developed offline-first ERP &amp; billing system with Python, SQLite, Tkinter, and ReportLab.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1E56] mt-0.5">▹</span>
                    <span>Developed customer-facing web platform with React.js, Next.js, and automated WhatsApp/email notifications.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1E56] mt-0.5">▹</span>
                    <span>Designed relational database structures supporting 1,000+ live transactions.</span>
                  </li>
                </ul>
              </div>

              {/* Education */}
              <div className="p-6 rounded-2xl bg-[#131318]/90 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#FF1E56]" />
                    B.Tech in Computer Science
                  </h4>
                  <span className="text-xs font-mono text-[#FF1E56]">July 2021 — June 2025</span>
                </div>
                <span className="text-xs text-zinc-400 font-medium block mb-1">
                  Dr. Bhim Rao Ambedkar University (DBRAU), Agra
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Bachelor of Technology in Computer Science. Strong foundations in DSA, DBMS, Web Technologies, Computer Networks, and Software Engineering.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Callout Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-gradient-to-r from-[#181822] to-[#131318] border border-[#FF1E56]/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div>
              <h4 className="text-lg font-bold text-white">Looking for a dedicated Full-Stack Engineer?</h4>
              <p className="text-xs text-zinc-400 mt-1">Available for Software Engineer, Full-Stack, Python, and AI roles.</p>
            </div>
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-full bg-[#FF1E56] text-white font-semibold text-xs tracking-wide shadow-lg shadow-[#FF1E56]/30 hover:shadow-[#FF1E56]/50 hover:scale-105 transition-all shrink-0 flex items-center gap-2"
            >
              Get in touch <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
