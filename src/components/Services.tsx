"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database, BrainCircuit, Terminal } from "lucide-react";
import {
  ReactIcon,
  NextjsIcon,
  NodeIcon,
  PythonIcon,
  TypeScriptIcon,
  PostgresIcon,
  MongoIcon,
  SqliteIcon,
  SupabaseIcon,
  GitIcon,
  PostmanIcon,
  TailwindIcon,
  DockerIcon,
  ReduxIcon,
  OpenAIIcon,
  FigmaIcon,
} from "./ToolIcons";

interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  isHighlighted?: boolean;
}

const TOOLS = [
  { name: "React.js", icon: <ReactIcon className="w-6 h-6" /> },
  { name: "Next.js", icon: <NextjsIcon className="w-6 h-6" /> },
  { name: "TypeScript", icon: <TypeScriptIcon className="w-6 h-6" /> },
  { name: "Python", icon: <PythonIcon className="w-6 h-6" /> },
  { name: "Node.js", icon: <NodeIcon className="w-6 h-6" /> },
  { name: "PostgreSQL", icon: <PostgresIcon className="w-6 h-6" /> },
  { name: "MongoDB", icon: <MongoIcon className="w-6 h-6" /> },
  { name: "Supabase", icon: <SupabaseIcon className="w-6 h-6" /> },
  { name: "SQLite", icon: <SqliteIcon className="w-6 h-6" /> },
  { name: "Tailwind CSS", icon: <TailwindIcon className="w-6 h-6" /> },
  { name: "Git & GitHub", icon: <GitIcon className="w-6 h-6" /> },
  { name: "Docker", icon: <DockerIcon className="w-6 h-6" /> },
  { name: "Postman", icon: <PostmanIcon className="w-6 h-6" /> },
  { name: "Redux", icon: <ReduxIcon className="w-6 h-6" /> },
  { name: "OpenAI / LLMs", icon: <OpenAIIcon className="w-6 h-6" /> },
  { name: "Figma", icon: <FigmaIcon className="w-6 h-6" /> },
];

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description:
      "Crafting performant, pixel-perfect user interfaces with React.js, Next.js (App Router & SSR), Tailwind CSS, and state management via Redux & React Hooks.",
    tags: ["React.js", "Next.js (SSR)", "JavaScript", "Tailwind CSS", "HTML5/CSS3", "Responsive UI"],
    icon: <Code2 className="w-5 h-5 text-[#FF1E56]" />,
  },
  {
    id: "backend-apis",
    title: "Backend APIs & Systems",
    description:
      "Designing resilient RESTful microservices, business automation logic, and high-throughput server backends using Node.js, Express.js, and Python.",
    tags: ["Node.js", "Express.js", "Python", "REST APIs", "API Integration", "Business Logic"],
    icon: <Server className="w-5 h-5 text-white" />,
    isHighlighted: true, // Vivid hot magenta card
  },
  {
    id: "databases",
    title: "Database Architecture",
    description:
      "Architecting relational and document databases with normalized schemas, index optimization, and offline-first persistence supporting 1,000+ live transactions.",
    tags: ["PostgreSQL", "MongoDB", "SQLite", "SQL", "Supabase", "Schema Design"],
    icon: <Database className="w-5 h-5 text-[#FF1E56]" />,
  },
  {
    id: "ai-automation",
    title: "Generative AI & Automation",
    description:
      "Developing LLM-powered applications, Retrieval-Augmented Generation (RAG) pipelines, and custom business automation tools that eliminate manual workflows.",
    tags: ["Generative AI", "LLMs", "RAG Pipelines", "Git / GitHub", "Postman", "ERP Automation"],
    icon: <BrainCircuit className="w-5 h-5 text-[#FF1E56]" />,
  },
];

export default function Services() {
  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FF1E56]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Stack & Tools Matrix */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FF1E56] mb-3"
          >
            <Terminal className="w-3.5 h-3.5" />
            Core Stack &amp; Skills
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1]"
          >
            What I build &amp; <span className="text-[#FF1E56]">Engineer...</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-400 text-base sm:text-lg mt-6 leading-relaxed"
          >
            Full-stack engineering expertise across the complete software development lifecycle —
            from responsive frontends and backend REST APIs to database design and automated workflows.
          </motion.p>

          {/* Tools Matrix: Strict Uniform Grid of Dark Square Icons (Requirement 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-4">
              Technologies &amp; Tools
            </span>
            
            {/* Grid 4 columns uniform dark square icon boxes */}
            <div className="grid grid-cols-4 gap-3">
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  title={tool.name}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/20 hover:scale-105 transition-all duration-300 group cursor-default shadow-sm"
                >
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {tool.icon}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Tilted Scroll Reveal Capabilities Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {CAPABILITIES.map((cap, index) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 80, rotate: 8, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 85,
                damping: 18,
                mass: 0.95,
                delay: index * 0.06,
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              className={`relative rounded-3xl p-7 sm:p-9 transition-all duration-500 shadow-2xl ${
                cap.isHighlighted
                  ? "bg-gradient-to-br from-[#FF1E56] via-[#e11255] to-[#c70b47] text-white shadow-[0_20px_50px_rgba(255,30,86,0.45)] border border-[#ff4785]"
                  : "bg-[#131318] border border-white/10 hover:border-white/20 text-zinc-200"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className={`p-2.5 rounded-xl ${
                    cap.isHighlighted
                      ? "bg-black/20 text-white"
                      : "bg-white/5 border border-white/10 text-[#FF1E56]"
                  }`}
                >
                  {cap.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {cap.title}
                </h3>
              </div>

              {/* Description */}
              <p
                className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${
                  cap.isHighlighted ? "text-white/95" : "text-zinc-400"
                }`}
              >
                {cap.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-300 ${
                      cap.isHighlighted
                        ? "bg-black/25 text-white border border-white/30 backdrop-blur-sm"
                        : "bg-white/5 border border-white/10 text-zinc-300 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
