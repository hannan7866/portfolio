"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useHoverSound } from "@/utils/useSound";
import {
  ArrowUpRight,
  Sparkles,
  X,
  Code2,
  Globe,
  Info,
  Layers,
  Terminal,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
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

/* ─────────────────────────────────────────────────────────────
   Tilt Card: 3D mouse-tilt + glass-glare — NO scroll parallax
───────────────────────────────────────────────────────────── */
function FlipProjectCard({
  project,
  onOpenLive,
  onSelectProject,
}: {
  project: Project;
  onOpenLive: (e: React.MouseEvent, url?: string) => void;
  onSelectProject: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const playHover = useHoverSound();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovered = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const glassGlare = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.13), transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(-(y / rect.height - 0.5) * 10);
    rotateY.set((x / rect.width - 0.5) * 10);
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    isHovered.set(0);
  };

  return (
    <div className="[perspective:1200px] w-full h-full">
      <motion.article
        ref={cardRef}
        data-cursor-text="EXPLORE"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => playHover()}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => onOpenLive(e, project.liveUrl || project.githubUrl)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group cursor-pointer w-full h-full flex flex-col rounded-3xl bg-[#131318] border border-white/10 p-4 sm:p-6 shadow-2xl hover:border-[#FF1E56]/50 hover:shadow-[0_0_45px_rgba(255,30,86,0.25)] select-none will-change-transform overflow-hidden relative transition-shadow duration-500"
      >
        {/* Image area */}
        <div
          className="relative w-full flex-1 min-h-0 overflow-hidden rounded-2xl bg-black border border-white/10 mb-4 sm:mb-5"
          style={{ WebkitTransform: "translateZ(0)" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 90vw, 52vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            style={{ WebkitTransform: "translateZ(0)" }}
          />

          {/* Glass glare */}
          <motion.div
            style={{ background: glassGlare, opacity: isHovered }}
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          />

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none gap-2 z-10">
            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white truncate">
              {project.number} — {project.categoryLabel}
            </span>
            {project.badge && (
              <span className="px-3 py-1 rounded-full bg-[#FF1E56] backdrop-blur-md text-[11px] font-bold text-white shadow-lg shrink-0">
                {project.badge}
              </span>
            )}
          </div>

          {/* Hover center CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <div className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-2xl flex items-center gap-1.5">
              <span>{project.isDesktopApp ? "Open GitHub Repo" : "Open Live Website"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF1E56]" />
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-start justify-between gap-4 shrink-0 relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-[#FF1E56] transition-colors duration-300 truncate">
                {project.title}
              </h3>
              <span className="text-xs font-mono text-zinc-500 shrink-0">{project.year}</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-center">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onSelectProject(project); }}
              title="View Technical Case Study"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
            <a
              href={project.liveUrl || project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs font-semibold text-zinc-300 group-hover:text-white bg-white/5 group-hover:bg-[#FF1E56] px-3.5 py-2 rounded-full border border-white/10 group-hover:border-[#FF1E56] transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>{project.isDesktopApp ? "GitHub" : "Live Link"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Single deck page wrapper — driven entirely by scroll
───────────────────────────────────────────────────────────── */
function DeckPage({
  scrollYProgress,
  index,
  total,
  children,
}: {
  scrollYProgress: any;
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  // Each page occupies 1/total of the scroll range
  const start = index / total;
  const end = (index + 1) / total;

  // This page flips away (rotateX 0→-90) during its own window
  const rotateX = useTransform(scrollYProgress, [start, end], [0, -90]);
  const opacity = useTransform(scrollYProgress, [start, end * 0.85, end], [1, 1, 0]);
  // Scale very subtly down as it flips off
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.96]);

  // Incoming: this page starts below (rotateX 90) and arrives at 0 when the previous page leaves
  const incomingStart = Math.max(0, (index - 1) / total);
  const incomingEnd = index / total;
  const rotateXIn = useTransform(scrollYProgress, [incomingStart, incomingEnd], [90, 0]);
  const opacityIn = useTransform(scrollYProgress, [incomingStart, incomingStart + 0.01, incomingEnd], [0, 1, 1]);

  // The first page starts fully visible, subsequent ones arrive from behind
  const isFirst = index === 0;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center backface-hidden transform-gpu"
      style={{
        rotateX: isFirst ? rotateX : rotateXIn,
        opacity: isFirst ? opacity : opacityIn,
        scale,
        zIndex: isFirst ? total - index : index,
        transformOrigin: "center top",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      {/* Apply the flip-away transform only when we're past this page */}
      {!isFirst && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center backface-hidden transform-gpu"
          style={{
            rotateX,
            opacity,
            transformOrigin: "center top",
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
        >
          {children}
        </motion.div>
      )}
      {isFirst && children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Projects component
───────────────────────────────────────────────────────────── */
export default function Projects() {
  const scrollRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const handleOpenLive = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // 9 pages: 1 cover + 7 projects + 1 back cover
  const TOTAL_PAGES = 9;

  // Active page tracking for a11y announcement & pagination controls
  const [activePageIndex, setActivePageIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(TOTAL_PAGES - 1, Math.floor(latest * TOTAL_PAGES));
      setActivePageIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, TOTAL_PAGES]);

  const handlePrevPage = () => {
    if (!scrollRef.current) return;
    const targetIdx = Math.max(0, activePageIndex - 1);
    const top = scrollRef.current.offsetTop;
    const height = scrollRef.current.offsetHeight;
    const step = height / TOTAL_PAGES;
    window.scrollTo({ top: top + targetIdx * step + 10, behavior: "smooth" });
  };

  const handleNextPage = () => {
    if (!scrollRef.current) return;
    const targetIdx = Math.min(TOTAL_PAGES - 1, activePageIndex + 1);
    const top = scrollRef.current.offsetTop;
    const height = scrollRef.current.offsetHeight;
    const step = height / TOTAL_PAGES;
    window.scrollTo({ top: top + targetIdx * step + 10, behavior: "smooth" });
  };

  // Progress bar for the deck
  const progressBarScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="projects"
      ref={scrollRef as React.RefObject<HTMLElement>}
      className="relative bg-[#0d0d0f]"
      style={{ height: `${TOTAL_PAGES * 100}vh` }}
    >
      {/* ── Sticky Viewport ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden [perspective:2000px]">

        {/* Header */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-3 shrink-0 z-30 relative">
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FF1E56] mb-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Curated Software &amp; Systems
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display"
              >
                Featured <span className="text-[#FF1E56]">Projects</span>
              </motion.h2>
            </div>

            {/* Mini progress bar */}
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Scroll Progress</span>
              <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: progressBarScale }}
                  className="h-full bg-[#FF1E56] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Deck Stage ── */}
        <div className="relative flex-1 w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 pb-6">
          <div className="relative w-full max-w-3xl h-[58vh] sm:h-[62vh]">

            {/* ── PAGE 0: COVER ── */}
            <FlipPageSimple scrollYProgress={scrollYProgress} index={0} total={TOTAL_PAGES}>
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#1a1a22] via-[#131318] to-[#0d0d0f] border border-white/10 flex flex-col items-center justify-center text-center p-8 shadow-2xl select-none relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-[#FF1E56]/5 rounded-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF1E56]/10 rounded-full blur-[40px] sm:blur-[80px] pointer-events-none" />

                <span className="relative z-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FF1E56] mb-6 block">
                  Portfolio · 2025
                </span>
                <h3 className="relative z-10 text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                  My<br /><span className="text-[#FF1E56]">Projects</span>
                </h3>
                <p className="relative z-10 text-sm sm:text-base text-zinc-400 max-w-xs leading-relaxed mb-8">
                  7 production-grade systems & creative builds — each one a solved engineering problem.
                </p>
                <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-zinc-500 animate-bounce">
                  <span>↓</span>
                  <span>Scroll to open</span>
                  <span>↓</span>
                </div>

                <span aria-live="polite" className="absolute bottom-5 right-6 text-[10px] font-mono text-white/20 select-none">
                  01 / {TOTAL_PAGES}
                </span>
              </div>
            </FlipPageSimple>

            {/* ── PAGES 1–7: PROJECT CARDS ── */}
            {PROJECTS.map((project, i) => (
              <FlipPageSimple
                key={project.id}
                scrollYProgress={scrollYProgress}
                index={i + 1}
                total={TOTAL_PAGES}
              >
                <div className="w-full h-full relative">
                  <FlipProjectCard
                    project={project}
                    onOpenLive={handleOpenLive}
                    onSelectProject={(p) => setSelectedProject(p)}
                  />
                  {/* Page counter */}
                  <span aria-live="polite" className="absolute bottom-3 right-5 text-[10px] font-mono text-white/20 select-none pointer-events-none">
                    {String(i + 2).padStart(2, "0")} / {TOTAL_PAGES}
                  </span>
                </div>
              </FlipPageSimple>
            ))}

            {/* ── PAGE 8: BACK COVER ── */}
            <FlipPageSimple scrollYProgress={scrollYProgress} index={8} total={TOTAL_PAGES}>
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#1a1020] via-[#131318] to-[#0d0d0f] border border-[#FF1E56]/20 flex flex-col items-center justify-center text-center p-8 shadow-2xl select-none relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FF1E56]/8 rounded-full blur-[50px] sm:blur-[100px] pointer-events-none" />

                <span className="relative z-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FF1E56] mb-5">
                  That&apos;s a wrap · 2025
                </span>
                <h3 className="relative z-10 text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
                  More Coming<br /><span className="text-[#FF1E56]">Soon...</span>
                </h3>
                <p className="relative z-10 text-sm text-zinc-400 max-w-sm leading-relaxed mb-8">
                  New projects are always in the works. Got a problem worth solving? Let&apos;s build together.
                </p>
                <a
                  href="#contact"
                  className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF1E56] text-white text-sm font-bold hover:bg-[#e11255] transition-all shadow-lg shadow-[#FF1E56]/30 hover:shadow-[#FF1E56]/50 hover:scale-105 active:scale-95"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <span aria-live="polite" className="absolute bottom-5 right-6 text-[10px] font-mono text-white/20 select-none">
                  09 / {TOTAL_PAGES}
                </span>
              </div>
            </FlipPageSimple>

          </div>
        </div>

        {/* Footer hint & Pagination Navigation */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pb-4 shrink-0 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span className="hidden sm:inline">↓ Scroll down or navigate through projects</span>
          
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrevPage}
              aria-label="Previous Project"
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span aria-live="polite" className="text-zinc-400 font-mono text-xs px-1">
              {String(activePageIndex + 1).padStart(2, "0")} / {String(TOTAL_PAGES).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              aria-label="Next Project"
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <span>{PROJECTS.length} Projects</span>
        </div>
      </div>

      {/* ── Technical Case Study Modal ── */}
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
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

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
              <p className="text-sm font-medium text-[#FF1E56] mb-4">{selectedProject.subtitle}</p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                {selectedProject.shortDescription}
              </p>

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

              {selectedProject.evolutionStages && (
                <div className="mb-6 bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#FF1E56]" />
                    Project Evolution Story:
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

              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Recruiter &amp; Engineering Takeaway:
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedProject.recruiterTakeaway}
                </p>
              </div>

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

/* ─────────────────────────────────────────────────────────────
   FlipPageSimple: cleaner scroll-driven flip (no double wrapping)
   Each page:
     • arrives  → rotateX: 90 → 0
     • departs  → rotateX: 0 → -90
   All driven purely by useTransform on scrollYProgress.
───────────────────────────────────────────────────────────── */
function FlipPageSimple({
  scrollYProgress,
  index,
  total,
  children,
}: {
  scrollYProgress: any;
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const step = 1 / total;

  // Arrive window: page before us departs
  const arriveStart = Math.max(0, (index - 1) * step);
  const arriveEnd = index * step;

  // Depart window: we leave
  const departStart = index * step;
  const departEnd = Math.min(1, (index + 1) * step);

  // Combined rotateX: 90 (below) → 0 (flat) → -90 (above)
  const rotateX = useTransform(
    scrollYProgress,
    [arriveStart, arriveEnd, departStart, departEnd],
    [index === 0 ? 0 : 90, 0, 0, -90]
  );

  // Opacity: fully visible in the flat zone, fade at edges
  const opacity = useTransform(
    scrollYProgress,
    [arriveStart, arriveEnd * 0.5 + arriveStart * 0.5, departStart * 0.5 + departEnd * 0.5, departEnd],
    [index === 0 ? 1 : 0, 1, 1, 0]
  );

  const zIndex = total - index;

  return (
    <motion.div
      className="absolute inset-0 backface-hidden transform-gpu"
      style={{
        rotateX,
        opacity,
        zIndex,
        transformOrigin: "50% 0%",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        className="w-full h-full backface-hidden transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
