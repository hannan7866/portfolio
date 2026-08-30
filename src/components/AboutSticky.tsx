"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  User,
  ShieldCheck,
  MapPin,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Mail,
  Phone,
  Terminal,
  Award,
  Zap,
} from "lucide-react";

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

interface AboutStickyProps {
  onOpenContact?: () => void;
}

export default function AboutSticky({ onOpenContact }: AboutStickyProps) {
  return (
    <section id="about" className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column (Sticky Identity Profile Card) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#131318] border border-white/10 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
          >
            {/* Ambient Red Glow Halo */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FF1E56]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Portrait Image Container */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
              <Image
                src="/images/Abdul-Image.jpeg"
                alt="Abdul Hannan — Full-Stack Developer"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                priority
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Status Pill Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-[#FF1E56]" />
                  <span>Open for Roles</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-300 font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-[#FF1E56]" />
                  <span>Agra &amp; NCR / Remote</span>
                </div>
              </div>
            </div>

            {/* Quick Profile Summary */}
            <div className="mt-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Abdul Hannan
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  <Zap className="w-2.5 h-2.5" /> &le; 15 Days Notice
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                B.Tech CS graduate with 1.5+ years hands-on production experience building production web apps, offline ERP systems, and AI-powered solutions.
              </p>

              {/* Action Buttons: Mail, Phone, LinkedIn */}
              <div className="mt-3 flex items-center gap-2">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=dev.hannan.ai@gmail.com&su=Inquiry%20from%20Portfolio%20-%20Abdul%20Hannan&body=Hi%20Abdul%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20regarding..."
                  target="_blank"
                  rel="noreferrer"
                  title="Email Abdul Hannan directly via Gmail"
                  className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] hover:bg-[#FF1E56]/15 border border-white/10 hover:border-[#FF1E56]/40 text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-all group/btn shadow-sm cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF1E56] group-hover/btn:scale-110 transition-transform shrink-0" />
                  <span className="truncate">Mail</span>
                </a>
                <a
                  href="tel:+917310542113"
                  title="Call +91-7310542113"
                  className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] hover:bg-[#FF1E56]/15 border border-white/10 hover:border-[#FF1E56]/40 text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-all group/btn shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF1E56] group-hover/btn:scale-110 transition-transform shrink-0" />
                  <span className="truncate">Phone</span>
                </a>
                <a
                  href="https://linkedin.com/in/abdul-hannan-92a911405"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn Profile"
                  className="flex-1 py-2 px-2.5 rounded-xl bg-white/[0.04] hover:bg-[#FF1E56]/15 border border-white/10 hover:border-[#FF1E56]/40 text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-all group/btn shadow-sm"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#FF1E56] group-hover/btn:scale-110 transition-transform shrink-0" />
                  <span className="truncate">LinkedIn</span>
                </a>
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

        {/* Right Column (Experience, Certifications, and Education) */}
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
              I am Abdul Hannan, a Full-Stack Developer and Software Engineer with 1.5+ years of hands-on commercial experience. I work across the full engineering lifecycle: understanding domain constraints, architecting performant database schemas, developing responsive interfaces, building reliable REST APIs, and automating operational workflows.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              My foundational production work includes modernizing <strong>Lala Motors</strong>, where I developed an offline-first ERP and billing system in Python, Tkinter, SQLite, and ReportLab that has successfully processed <strong>1,000+ real-world repair and spare parts transactions</strong>, along with a full-stack automotive customer platform in JavaScript, Node.js, Express, PostgreSQL, and Supabase.
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
              Engineering Philosophy
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#131318] border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-[#FF1E56]">01.</span>
                <h4 className="text-base font-bold text-white">Domain First</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Deeply understand user workflows, edge cases, and data integrity before writing code.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#131318] border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-[#FF1E56]">02.</span>
                <h4 className="text-base font-bold text-white">Resilience &amp; Speed</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Design offline-first fallbacks, snappy UI rendering, and crash-resilient transactional logic.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#131318] border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-[#FF1E56]">03.</span>
                <h4 className="text-base font-bold text-white">AI &amp; Evolution</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Continuously integrate practical LLM tools, RAG architectures, and modern web frameworks.
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
              Experience, Education &amp; Certifications
            </h3>

            <div className="flex flex-col gap-4">
              {/* Lala Motors Experience */}
              <div className="p-6 rounded-2xl bg-[#131318]/90 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#FF1E56]" />
                    Full-Stack Developer — Lala Motors
                  </h4>
                  <span className="text-xs font-mono text-[#FF1E56]">Jan 2025 — Present (1 yr 8 mos)</span>
                </div>
                <span className="text-xs text-zinc-400 font-medium block mb-3">Agra, India • Hybrid / On-site</span>
                <ul className="flex flex-col gap-2 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1E56] mt-0.5">▹</span>
                    <span>Built an offline-first ERP &amp; billing application using Python, Tkinter, SQLite, and ReportLab for customer records, inventory, service tracking, and automated PDF invoice generation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1E56] mt-0.5">▹</span>
                    <span>Supported 1,000+ real-world repair and spare parts transactions with automated WhatsApp/email service reminders and Windows printing integration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1E56] mt-0.5">▹</span>
                    <span>Developed customer-facing platform with JavaScript, Node.js, Express.js, PostgreSQL, Supabase, and REST APIs for online bookings and spare parts commerce.</span>
                  </li>
                </ul>
              </div>

              {/* Verified Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#131318]/90 border border-white/10 flex flex-col justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">Full Stack Developer</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block">OneRoadmap • 100% Score on Comprehensive Technical Assessment</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Credential ID: CERT-2EF7A6E6</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#131318]/90 border border-white/10 flex flex-col justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">Data Analyst (Big 4 Ready)</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block">OneRoadmap • Advanced SQL, Data Analysis &amp; Optimization</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Credential ID: CERT-6C8587BC</span>
                </div>
              </div>

              {/* Education */}
              <div className="p-6 rounded-2xl bg-[#131318]/90 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#FF1E56]" />
                    B.Tech in Computer Science and Engineering
                  </h4>
                  <span className="text-xs font-mono text-[#FF1E56]">July 2021 — June 2025</span>
                </div>
                <span className="text-xs text-zinc-400 font-medium block mb-1">
                  Dr. Bhimrao Ambedkar University (DBRAU) / IET Agra
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Comprehensive academic foundation in Data Structures &amp; Algorithms (C++), Relational Database Management Systems, Web Architectures, and Computer Networks.
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
              <p className="text-xs text-zinc-400 mt-1">Available for Software Engineer, Full-Stack, Python, and AI roles (15 Days Notice).</p>
            </div>
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-full bg-[#FF1E56] text-white font-semibold text-xs tracking-wide shadow-lg shadow-[#FF1E56]/30 hover:shadow-[#FF1E56]/50 hover:scale-105 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
            >
              Get in touch <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
