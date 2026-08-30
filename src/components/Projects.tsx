"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  X,
  Code2,
  Globe,
  Info,
  Layers,
  Terminal,
  Cpu,
  CheckCircle2,
  Building2,
  Wrench,
  Palette,
  ShoppingCart,
} from "lucide-react";

type ProjectCategory = "all" | "production" | "engineering" | "client";

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  categoryType: "production" | "engineering" | "client";
  categoryLabel: string;
  badge: string;
  image: string;
  tags: string[];
  shortDescription: string;
  architectureStory: string;
  evolutionStages?: { stage: string; desc: string }[];
  keyModules?: { title: string; desc: string }[];
  technicalHighlights: string[];
  recruiterTakeaway: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  isDesktopApp?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "lala-motors-erp",
    number: "01",
    title: "Lala Motors ERP & Billing System",
    subtitle: "Offline-First Enterprise Operations Platform",
    categoryType: "production",
    categoryLabel: "Production / Real-World",
    badge: "1,000+ Real Transactions",
    image: "/images/lalamotors erp.png",
    tags: ["Python", "SQLite", "Tkinter", "ReportLab", "pywin32", "PyInstaller", "JSON"],
    shortDescription:
      "A production-tested, offline-first Windows operations platform that transformed manual workshop workflows into a digital ecosystem with SQLite transactions, branded PDF generation, and automated customer reminders.",
    architectureStory:
      "Started as an offline billing tool and evolved into an end-to-end shop floor operations platform. Features local SQLite transactional storage with migration-safe schema handling, unique bill numbering (`LM + date + sequence`), ReportLab programmatic PDF generation (`D:\\BILLS`), CRM-style service reminders, vehicle delivery-letter compliance records, and PyInstaller desktop distribution with Windows printing integration (`pywin32`).",
    evolutionStages: [
      { stage: "01. Core Offline Engine", desc: "Python + Tkinter interface built for rapid billing without internet dependency." },
      { stage: "02. Structured Inventory", desc: "Predefined bike models, categorized part lists, and rates.json rate persistence." },
      { stage: "03. Local SQLite Database", desc: "bills and bill_items relational tables with auto-migration column support." },
      { stage: "04. Bill Retrieval & ID", desc: "LM+date+seq formatted numbering with instant customer history search." },
      { stage: "05. ReportLab PDF Engine", desc: "Branded PDF bills with percentage/fixed discounts and local file archiving." },
      { stage: "06. Multi-Channel Sharing", desc: "Direct WhatsApp share, SMTP email dispatcher, and SMS intent integration." },
      { stage: "07. CRM Service Reminders", desc: "reminders.json follow-up tracking for customer retention and repeat visits." },
      { stage: "08. Delivery Letters", desc: "Vehicle purchase documentation subsystem with chassis/engine data and dedicated PDFs." },
      { stage: "09. Windows Distribution", desc: "PyInstaller .spec packaging with pywin32 Windows print driver integration." },
    ],
    technicalHighlights: [
      "Offline-first architecture operating independently of cloud connectivity with zero downtime.",
      "1,000+ real-world commercial transactions processed in active daily shop operations.",
      "Relational SQLite schema with backward-compatible migrations and automated data integrity checks.",
      "Programmatic ReportLab PDF engine with custom branding, itemized tables, and discount handling.",
      "PyInstaller standalone Windows executable packaging for non-technical workshop staff.",
    ],
    recruiterTakeaway:
      "Demonstrates real-world software engineering, practical requirements gathering, database persistence, edge-case debugging, and delivering software that actively runs commercial operations.",
    year: "2025",
    isDesktopApp: true,
    liveUrl: "https://github.com/hannan7866/Lala-Motors-ERP",
    githubUrl: "https://github.com/hannan7866/Lala-Motors-ERP",
  },
  {
    id: "lala-motors-web",
    number: "02",
    title: "Lala Motors — Full-Stack Automotive Platform",
    subtitle: "Automotive Service, Spare-Parts Commerce & Marketplace Ecosystem",
    categoryType: "production",
    categoryLabel: "Production / Real-World",
    badge: "Live Automotive Platform",
    image: "/images/lalamotors website.png",
    tags: [
      "Node.js",
      "Express.js",
      "PostgreSQL (Supabase)",
      "Vanilla JS / ES6+",
      "Vercel Serverless",
      "Row-Level Security",
      "Google Apps Script",
      "Nodemailer",
    ],
    shortDescription:
      "A production-oriented full-stack platform combining workshop bookings, spare-parts commerce, inventory management, customer accounts, service history, automated notifications, and a pre-owned two-wheeler marketplace.",
    architectureStory:
      "Developed for Lala Motors to bring its workshop, spare-parts business, doorstep services, customer management, and pre-owned two-wheeler marketplace into a unified online ecosystem. The inventory architecture uses UUID primary keys, normalized brand/model/category schemas, real-time stock state validation, and database triggers for automatic SKU generation. The booking pipeline routes customer requests through `/api/booking` → Google Apps Script CRM spreadsheet → dual notification pipeline (customer confirmation + operational alert to business owner).",
    keyModules: [
      {
        title: "Workshop & Doorstep Booking",
        desc: "Servicing, repair, washing, modification, painting, restoration & emergency assistance workflows.",
      },
      {
        title: "Spare-Parts Catalog & Commerce",
        desc: "Brand → model → category tree navigation, live SKU filtering, persistent cart with localStorage, and real-time inventory verification.",
      },
      {
        title: "Two-Wheeler Marketplace",
        desc: "Pre-owned bike marketplace with customer bike submission and back-office verification/approval workflows.",
      },
      {
        title: "Auth & Customer Portals",
        desc: "Supabase JWT sessions, customer profiles, saved addresses, service history, and live order tracking.",
      },
      {
        title: "Automated Multi-Channel Pipeline",
        desc: "Google Apps Script CRM synchronization, Nodemailer automated transactional emails, and WhatsApp operational notifications.",
      },
      {
        title: "Data Migrations & Tooling",
        desc: "PostgreSQL Row-Level Security (RLS) policies, database triggers, CSV import pipelines, and legacy data normalization scripts.",
      },
    ],
    technicalHighlights: [
      "Production full-stack commerce and service platform deployed on Vercel Serverless.",
      "Relational PostgreSQL database on Supabase with Row-Level Security (RLS) and automated SKU triggers.",
      "Multi-stage booking pipeline: Customer Form → Express API → Google Apps Script CRM → Nodemailer / WhatsApp alerts.",
      "Dynamic spare-parts catalog with brand/model navigation, SKU search, and persistent shopping cart.",
      "Administrative back-office for inventory control, stock verification, and used-bike approval management.",
    ],
    recruiterTakeaway:
      "Proves end-to-end full-stack web engineering mastery: relational database design with triggers, serverless API architecture, e-commerce cart & inventory state, third-party CRM pipelines, and multi-channel automation.",
    year: "2025",
    liveUrl: "https://lalamotors.vercel.app/",
    githubUrl: "https://github.com/hannan7866/lalamotors-website-main",
  },
  {
    id: "apple-vision-pro",
    number: "03",
    title: "Apple Vision Pro Experience",
    subtitle: "Advanced Frontend & Scroll Animation Engineering",
    categoryType: "engineering",
    categoryLabel: "Engineering / Technical",
    badge: "60fps Dual Canvas Engine",
    image: "/images/apple vision pro.png",
    tags: ["JavaScript", "GSAP ScrollTrigger", "Lenis", "HTML5 Canvas", "Retina HiDPI", "CSS"],
    shortDescription:
      "A high-performance interactive marketing experience mapping discrete scroll positions to dual HiDPI canvas rendering engines, synchronized GSAP timelines, and 60fps Lenis inertia.",
    architectureStory:
      "Features a static single-page architecture where scroll position acts as the primary animation timeline. Lenis inertia scrolling (`lerp: 0.08`) is bound to GSAP ScrollTrigger and the GSAP ticker (`lagSmoothing(0)`). Employs two HiDPI 2D canvas engines: Canvas A scrubs a 200-frame 360° orbit with cross-fading copy cards, while Canvas B renders a 25-frame hardware internals sequence at device pixel ratio with custom preloading.",
    technicalHighlights: [
      "Scroll-synchronized timeline mapping scroll position directly to discrete image frame rendering.",
      "Dual 2D Canvas engines scaled to Device Pixel Ratio (Retina HiDPI) with letterboxed/cover drawing.",
      "60fps native inertia scroll synchronized with GSAP ScrollTrigger and the browser render loop.",
      "200-frame 360° orbit sequence paired with 6 cross-fading feature highlight cards.",
      "Custom Promise.all preloader calculating frame load progress before layout unlock.",
    ],
    recruiterTakeaway:
      "Demonstrates high-level mastery of browser graphics, canvas rendering, discrete frame animation architectures, and sub-pixel motion physics.",
    year: "2025",
    liveUrl: "https://apple-vision-pro-experience.vercel.app/",
    githubUrl: "https://github.com/hannan7866/apple-vision-pro-experience",
  },
  {
    id: "stayscape",
    number: "04",
    title: "StayScape Vacation Rentals (Wonderlust)",
    subtitle: "Server-Rendered MVC Vacation Rental Platform",
    categoryType: "engineering",
    categoryLabel: "Engineering / Technical",
    badge: "Full-Stack MVC Architecture",
    image: "/images/Stayscape.png",
    tags: ["Node.js", "Express 5", "MongoDB", "Mongoose", "EJS Layouts", "Joi Validation", "Bootstrap"],
    shortDescription:
      "A server-rendered Airbnb-style listing application built on Express 5, MongoDB, and EJS, implementing complete CRUD workflows, dual-layer validation, and centralized error handling.",
    architectureStory:
      "Structured using the classic Model-View-Controller (MVC) architectural pattern. Demonstrates deep understanding of HTTP request lifecycles: Express urlencoded body parsing (`extended: true`), Joi server-side schema validation before database writes, Mongoose document models with setters and default fallbacks, method-override for RESTful PUT/DELETE, and centralized error propagation with `wrapAsync` and `ExpressError`.",
    technicalHighlights: [
      "Complete CRUD architecture across listings (Create, Read, Update, Delete) using Express 5.",
      "Dual-layer validation: client-side Bootstrap form checks + server-side Joi schema enforcement.",
      "MongoDB database integration via Mongoose with data normalization, setters, and seed automation.",
      "Centralized asynchronous error handling pipeline utilizing wrapAsync and custom ExpressError classes.",
    ],
    recruiterTakeaway:
      "Evidence of robust backend fundamentals: HTTP protocols, request parsing, database modeling, schema validation, and defensive error propagation.",
    year: "2025",
    liveUrl: "https://github.com/hannan7866/StayScape",
    githubUrl: "https://github.com/hannan7866/StayScape",
  },
  {
    id: "skillswap",
    number: "05",
    title: "SkillSwap Platform",
    subtitle: "Peer-to-Peer Skill-Sharing Web Application",
    categoryType: "engineering",
    categoryLabel: "Engineering / Technical",
    badge: "TypeScript Application",
    image: "/images/skillswap.png",
    tags: ["TypeScript", "React", "Node.js", "Dashboard Workflows", "State Management"],
    shortDescription:
      "A product-oriented web platform connecting individuals through peer-to-peer skills exchange with interactive dashboard matching workflows and strict TypeScript type safety.",
    architectureStory:
      "Engineered with strict TypeScript type safety across data schemas, matching algorithms, and UI components. Features an interactive dashboard for skill discovery, peer connections, and structured exchange sessions.",
    technicalHighlights: [
      "Interactive dashboard for peer-to-peer skills exchange and knowledge matching.",
      "Strict TypeScript type definitions across frontend components and data structures.",
      "Structured peer-matching workflows with state-driven UI responsiveness.",
    ],
    recruiterTakeaway:
      "Shows end-to-end product thinking, structured dashboard workflows, and TypeScript-driven software design.",
    year: "2025",
    liveUrl: "https://skillswap-main-one.vercel.app/",
    githubUrl: "https://github.com/hannan7866/skillswap-main",
  },
  {
    id: "tuba-portfolio",
    number: "06",
    title: "Tuba Khan Portfolio",
    subtitle: "Cinematic Content Strategist Client Website",
    categoryType: "client",
    categoryLabel: "Client / Creative Work",
    badge: "Client Web Experience",
    image: "/images/Tuba portfolio.png",
    tags: ["Next.js 16", "React 19", "Framer Motion", "Tailwind CSS v4", "TypeScript"],
    shortDescription:
      "A cinematic personal marketing website built for a content strategist, designed around strategic editorial presentation, split-screen entrance motion, and conversion-focused UX.",
    architectureStory:
      "Developed on Next.js 16 (App Router) with React 19 and React Compiler. Features a centralized content architecture (`typed as const`) cleanly separating copy from presentation, split gate entrance animations in Framer Motion, editorial typography, and multi-channel lead intake layouts.",
    technicalHighlights: [
      "Cinematic gate loader animation with split screen transition in Framer Motion.",
      "Centralized content architecture (typed as const) enabling rapid copy iteration.",
      "Editorial design system combining Playfair Display typography with modern layout structure.",
      "Multi-channel client conversion touchpoints (WhatsApp, email, phone, and lead intake forms).",
    ],
    recruiterTakeaway:
      "Proves ability to build polished, client-facing branded experiences with modern typography, smooth motion, and responsive aesthetics.",
    year: "2025",
    liveUrl: "https://tubaportfolio.vercel.app/",
    githubUrl: "https://github.com/hannan7866/tuba-portfolio",
  },
  {
    id: "duotech-portfolio",
    number: "07",
    title: "DuoTech — Engineering Matrix & Duo Platform",
    subtitle: "Collaborative Full-Stack & Frontend Synergy Web Platform",
    categoryType: "production",
    categoryLabel: "Production / Collaborative",
    badge: "Live Collaborative Platform",
    image: "/images/duo.png",
    tags: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Canvas API",
      "Vercel",
    ],
    shortDescription:
      "A high-performance, dark-themed engineering duo matrix showcasing the combined synergy of backend system architectures, offline ERP engines, and pixel-perfect interactive frontend animations.",
    architectureStory:
      "Engineered as a synchronized collaborative platform presenting dual engineering specializations. Features an interactive terminal system probe with live JSON/telemetry state toggling, custom canvas particle animations, magnetic micro-interactions, responsive case study modals, and multi-channel client conversion touchpoints.",
    keyModules: [
      {
        title: "System Telemetry & Interactive Terminal",
        desc: "Live simulated terminal console with real-time JSON, overview metrics, and system probe diagnostics.",
      },
      {
        title: "Dual Engineering Matrix",
        desc: "Comparative skill matrix bridging heavy backend/AI systems (Abdul) with high-performance frontend UI/UX (Arslaan).",
      },
      {
        title: "Curated Showcase & Case Studies",
        desc: "Dynamic modal workflows, animated performance benchmarks, and real-world client testimonials.",
      },
      {
        title: "Conversion & Instant Booking",
        desc: "Multi-channel intake pipeline routing inquiries via direct email, WhatsApp, phone, and social platforms.",
      },
    ],
    technicalHighlights: [
      "Dynamic interactive terminal console with real-time JSON and telemetry state switching.",
      "High-performance micro-interactions, magnetic buttons, and custom Framer Motion spring physics.",
      "Interactive 2D canvas background particle engine synchronized with responsive viewport rendering.",
      "Futuristic dark-mode UI with custom glassmorphism, blur glow accents, and responsive typography.",
    ],
    recruiterTakeaway:
      "Demonstrates high-level collaborative engineering, interactive UI component architecture, modern Next.js/Tailwind development, and delivering engaging web platforms.",
    year: "2025",
    liveUrl: "https://duotech-portfolio.vercel.app/",
    githubUrl: "https://github.com/hannan7866",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categoryType === activeCategory);

  const handleOpenLive = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden w-full max-w-[100vw]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FF1E56] mb-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Curated Software &amp; Systems
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display"
          >
            Featured <span className="text-[#FF1E56]">Projects</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed"
        >
          Production software processing real transactions, advanced frontend graphics engines, backend architectures, and client platforms.
        </motion.p>
      </div>

      {/* 3-Tier Recruiter Category Filter Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
        {[
          { id: "all", label: "All Projects", count: PROJECTS.length },
          {
            id: "production",
            label: "🌟 Production / Real-World",
            count: PROJECTS.filter((p) => p.categoryType === "production").length,
          },
          {
            id: "engineering",
            label: "⚡ Engineering & Technical",
            count: PROJECTS.filter((p) => p.categoryType === "engineering").length,
          },
          {
            id: "client",
            label: "🎨 Client / Creative Work",
            count: PROJECTS.filter((p) => p.categoryType === "client").length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as ProjectCategory)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeCategory === tab.id
                ? "bg-[#FF1E56] text-white shadow-lg shadow-[#FF1E56]/30 scale-105"
                : "bg-[#141418] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === tab.id ? "bg-white/20 text-white" : "bg-white/5 text-zinc-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Level 1: Projects 3-Column Grid on Desktop */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => handleOpenLive(e, project.liveUrl || project.githubUrl)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Card Visual Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#131316] border border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#FF1E56]/50 group-hover:shadow-[0_0_40px_rgba(255,30,86,0.25)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />

                {/* Dark subtle overlay fade */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white truncate">
                    {project.number} — {project.categoryLabel}
                  </span>
                  {project.badge && (
                    <span className="px-3 py-1 rounded-full bg-[#FF1E56] backdrop-blur-md text-[11px] font-bold text-white shadow-lg shrink-0">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Hover Center Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-2xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                    <span>{project.isDesktopApp ? "Open GitHub Repo" : "Open Live Website"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF1E56]" />
                  </div>
                </div>
              </div>

              {/* Project Meta Details */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF1E56] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack tags preview */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Live Link + Case Study Details Modal */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    title="View Technical Case Study & Architecture"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <a
                    href={project.liveUrl || project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 group-hover:text-white bg-white/5 group-hover:bg-[#FF1E56] px-3.5 py-2 rounded-full border border-white/10 group-hover:border-[#FF1E56] transition-all duration-400 ease-out shadow-sm cursor-pointer"
                  >
                    <span>{project.isDesktopApp ? "GitHub" : "Live Link"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Level 2: Individual Technical Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#131318] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#FF1E56] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-white/10">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Badges & Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#FF1E56]/20 border border-[#FF1E56]/40 text-xs font-bold text-[#FF1E56]">
                  {selectedProject.badge}
                </span>
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {selectedProject.title}
              </h2>
              <p className="text-sm font-medium text-[#FF1E56] mb-4">
                {selectedProject.subtitle}
              </p>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                {selectedProject.shortDescription}
              </p>

              {/* Architectural Story & Technical Decisions */}
              {selectedProject.architectureStory && (
                <div className="mb-6 bg-black/40 rounded-2xl p-4 sm:p-5 border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF1E56] mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    Architecture &amp; Technical Decisions:
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {selectedProject.architectureStory}
                  </p>
                </div>
              )}

              {/* Key Platform Modules if available (Lala Motors Web) */}
              {selectedProject.keyModules && (
                <div className="mb-6 bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#FF1E56]" />
                    Core Platform Modules &amp; Subsystems:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.keyModules.map((mod, i) => (
                      <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col">
                        <span className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E56]" />
                          {mod.title}
                        </span>
                        <p className="text-[11px] text-zinc-400 leading-snug">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evolution Timeline if available (Lala Motors ERP) */}
              {selectedProject.evolutionStages && (
                <div className="mb-6 bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#FF1E56]" />
                    Project Evolution Story (From Tool to Operations System):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.evolutionStages.map((st, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-[11px] font-mono font-bold text-[#FF1E56] block mb-0.5">
                          {st.stage}
                        </span>
                        <p className="text-[11px] text-zinc-400 leading-snug">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Implementation Highlights */}
              <div className="mb-6 bg-black/40 rounded-2xl p-4 sm:p-5 border border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Technical Highlights &amp; Engineering Decisions:
                </h4>
                <ul className="flex flex-col gap-2">
                  {selectedProject.technicalHighlights.map((h, i) => (
                    <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2">
                      <span className="text-[#FF1E56] font-bold mt-0.5">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recruiter Takeaway */}
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Recruiter &amp; Engineering Takeaway:
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedProject.recruiterTakeaway}
                </p>
              </div>

              {/* Live Links & GitHub Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#FF1E56] text-white text-xs font-bold hover:bg-[#e11255] transition-all flex items-center gap-1.5 shadow-lg shadow-[#FF1E56]/30 cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{selectedProject.isDesktopApp ? "GitHub Repository ↗" : "Live Website ↗"}</span>
                    </a>
                  )}

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Source Code ↗</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
