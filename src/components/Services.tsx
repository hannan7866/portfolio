"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useInView,
} from "framer-motion";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Mouse,
  MouseConstraint,
  Composite,
  Events,
  Body,
} from "matter-js";
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
  JavaScriptIcon,
  ExpressIcon,
  VercelIcon,
  FramerMotionIcon,
  HtmlIcon,
  CssIcon,
  CppIcon,
  ApiIcon,
  WorkflowIcon,
  BrainIcon,
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
  { name: "JavaScript", icon: <JavaScriptIcon className="w-6 h-6" /> },
  { name: "Python", icon: <PythonIcon className="w-6 h-6" /> },
  { name: "Node.js", icon: <NodeIcon className="w-6 h-6" /> },
  { name: "Express.js", icon: <ExpressIcon className="w-6 h-6" /> },
  { name: "PostgreSQL", icon: <PostgresIcon className="w-6 h-6" /> },
  { name: "MongoDB", icon: <MongoIcon className="w-6 h-6" /> },
  { name: "Supabase", icon: <SupabaseIcon className="w-6 h-6" /> },
  { name: "SQLite", icon: <SqliteIcon className="w-6 h-6" /> },
  { name: "HTML5", icon: <HtmlIcon className="w-6 h-6" /> },
  { name: "CSS3", icon: <CssIcon className="w-6 h-6" /> },
  { name: "Tailwind CSS", icon: <TailwindIcon className="w-6 h-6" /> },
  { name: "C++", icon: <CppIcon className="w-6 h-6" /> },
  { name: "Vercel", icon: <VercelIcon className="w-6 h-6" /> },
  { name: "Framer Motion", icon: <FramerMotionIcon className="w-6 h-6" /> },
  { name: "Git & GitHub", icon: <GitIcon className="w-6 h-6" /> },
  { name: "Docker", icon: <DockerIcon className="w-6 h-6" /> },
  { name: "Postman", icon: <PostmanIcon className="w-6 h-6" /> },
  { name: "REST APIs", icon: <ApiIcon className="w-6 h-6" /> },
  { name: "CI / CD", icon: <WorkflowIcon className="w-6 h-6" /> },
  { name: "Redux", icon: <ReduxIcon className="w-6 h-6" /> },
  { name: "OpenAI / LLMs", icon: <OpenAIIcon className="w-6 h-6" /> },
  { name: "RAG & Agents", icon: <BrainIcon className="w-6 h-6" /> },
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

/* -------------------------------------------------------------
   1. The Live Typewriter Terminal Window Component
------------------------------------------------------------- */
function TerminalWindow() {
  const [textLines, setTextLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");

  useEffect(() => {
    const lines = [
      "> _system boot...",
      "> loading architecture modules...",
      "> mapping [React, Next.js, Python, PostgreSQL]...",
      "> systems operational.",
    ];

    let currentL = 0;
    let currentC = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentL < lines.length) {
        const fullLine = lines[currentL];
        if (currentC < fullLine.length) {
          setCurrentLine(fullLine.slice(0, currentC + 1));
          currentC++;
          timeoutId = setTimeout(typeNextChar, 24);
        } else {
          setTextLines((prev) => [...prev, fullLine]);
          setCurrentLine("");
          currentL++;
          currentC = 0;
          timeoutId = setTimeout(typeNextChar, 220);
        }
      }
    };

    timeoutId = setTimeout(typeNextChar, 400);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="mt-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 sm:p-5 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* macOS Style Window Dots Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-sm" />
        </div>
        <span className="text-[11px] text-zinc-500 font-mono select-none">hannan@sys-core:~</span>
      </div>

      {/* Monospace Typewriter Stream */}
      <div className="space-y-1.5 min-h-[96px] text-zinc-300">
        {textLines.map((line, i) => (
          <p
            key={i}
            className={
              line.includes("operational")
                ? "text-emerald-400 font-semibold"
                : line.includes("mapping")
                ? "text-cyan-300"
                : "text-zinc-300"
            }
          >
            {line}
          </p>
        ))}
        {currentLine && (
          <p className="text-zinc-300">
            {currentLine}
            <span className="inline-block w-2 h-4 bg-[#FF1E56] ml-1 animate-pulse align-middle" />
          </p>
        )}
        {textLines.length === 4 && !currentLine && (
          <p className="text-emerald-400 font-semibold flex items-center">
            <span>&gt; status: online &amp; ready</span>
            <span className="inline-block w-2 h-4 bg-emerald-400 ml-1.5 animate-pulse align-middle" />
          </p>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   2. 3D Tilt Physics & Localized Cursor Glow Card Wrapper
------------------------------------------------------------- */
function TiltCard({
  children,
  className = "",
  isHighlighted = false,
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovered = useMotionValue(0);

  // Smooth springs for 3D rotation
  const springX = useSpring(0, { damping: 20, stiffness: 220 });
  const springY = useSpring(0, { damping: 20, stiffness: 220 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  // Flashlight radial glow gradient locked to cursor
  const glow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${
    isHighlighted ? "rgba(255,255,255,0.22)" : "rgba(255,30,86,0.18)"
  }, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Normalized coordinates (-0.5 to 0.5)
    springX.set(x / rect.width - 0.5);
    springY.set(y / rect.height - 0.5);
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
    isHovered.set(0);
  };

  return (
    <div className="[perspective:1000px] w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative overflow-hidden ${className}`}
      >
        {/* Localized Cursor Glow / Flashlight Overlay */}
        <motion.div
          style={{
            background: glow,
            opacity: isHovered,
          }}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        />
        {children}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------
   3. Interactive 2D Matter.js Physics Tech Stack Playground
------------------------------------------------------------- */
function TechPhysicsPlayground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { once: true, margin: "-100px" });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (!sceneRef.current) return;
    if (!isInView) return;

    const container = sceneRef.current;
    const width = container.clientWidth || 360;
    const height = 300;

    // Create Engine with natural downward gravity
    const engine = Engine.create({
      gravity: { x: 0, y: 1.5, scale: 0.001 }, // Increased Y gravity for a stronger pull
    });

    // Create Renderer with transparent backdrop
    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      },
    });

    // Solid invisible walls to keep physics bodies contained
    const ground = Bodies.rectangle(width / 2, height + 25, width * 2, 50, {
      isStatic: true,
      render: { visible: false },
    });
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, {
      isStatic: true,
      render: { visible: false },
    });
    const topCeiling = Bodies.rectangle(width / 2, -450, width * 2, 50, {
      isStatic: true,
      render: { visible: false },
    });

    // Tech color signatures
    const toolColors: Record<string, string> = {
      "React.js": "#00D8FF",
      "Next.js": "#FFFFFF",
      "TypeScript": "#3178C6",
      "JavaScript": "#F7DF1E",
      "Python": "#3776AB",
      "Node.js": "#68A063",
      "Express.js": "#FFFFFF",
      "PostgreSQL": "#336791",
      "MongoDB": "#47A248",
      "Supabase": "#3ECF8E",
      "SQLite": "#003B57",
      "HTML5": "#E34F26",
      "CSS3": "#1572B6",
      "Tailwind CSS": "#38BDF8",
      "C++": "#00599C",
      "Vercel": "#FFFFFF",
      "Framer Motion": "#0055FF",
      "Git & GitHub": "#F05032",
      "Docker": "#2496ED",
      "Postman": "#FF6C37",
      "REST APIs": "#00D8FF",
      "CI / CD": "#2088FF",
      "Redux": "#764ABC",
      "OpenAI / LLMs": "#10A37F",
      "RAG & Agents": "#8B5CF6",
      "Figma": "#F24E1E",
    };

    // Spawn physics bodies high above the viewport for a dramatic cascade drop
    const radius = 21;
    const bodies = TOOLS.map((tool, i) => {
      const col = i % 6;
      const row = Math.floor(i / 6);
      const startX = (width / 7) * (col + 1) + (Math.random() * 20 - 10);
      const startY = -150 - row * 55 - Math.random() * 50;

      const body = Bodies.circle(startX, startY, radius, {
        restitution: 0.6, // Reduced from 0.95 so they stop bouncing forever
        friction: 0.1,
        frictionAir: 0.005, // Reduced air friction so they drop faster
        density: 0.002, // Slightly heavier
        render: {
          fillStyle: "#131318",
          strokeStyle: "rgba(255, 255, 255, 0.12)",
          lineWidth: 1.5,
        },
      });

      (body as any).toolName = tool.name;
      (body as any).toolColor = toolColors[tool.name] || "#FF1E56";
      return body;
    });

    // High-DPI Canvas overlay rendering for labels & icons
    Events.on(render, "afterRender", () => {
      const ctx = render.context;
      if (!ctx) return;

      const allBodies = Composite.allBodies(engine.world);
      allBodies.forEach((b) => {
        const name = (b as any).toolName;
        const color = (b as any).toolColor;
        if (!name) return;

        ctx.save();
        ctx.translate(b.position.x, b.position.y);
        ctx.rotate(b.angle);

        // Dark glass bubble interior
        ctx.beginPath();
        ctx.arc(0, 0, radius - 1, 0, Math.PI * 2);
        ctx.fillStyle = "#181820";
        ctx.fill();

        // Accent rim stroke
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = color;
        ctx.stroke();

        // Tiny accent indicator dot
        ctx.beginPath();
        ctx.arc(0, -8, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // High-contrast clean sans-serif typography
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px 'Plus Jakarta Sans', system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const shortName = name
          .replace(".js", "")
          .replace(" & GitHub", "")
          .replace(" / LLMs", "")
          .replace(" CSS", "")
          .replace(" & Agents", "")
          .replace(" / CD", "");

        ctx.fillText(shortName, 0, 3);

        ctx.restore();
      });
    });

    // Mouse drag & toss constraints
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    // Prevent page scroll capture on canvas mousewheel
    mouseConstraint.mouse.element.removeEventListener(
      "wheel",
      (mouseConstraint.mouse as any).mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      (mouseConstraint.mouse as any).mousewheel
    );

    // Assemble World
    Composite.add(engine.world, [
      ground,
      leftWall,
      rightWall,
      topCeiling,
      ...bodies,
      mouseConstraint,
    ]);

    render.mouse = mouse;

    // Start Engine & Runner
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Tactile Cursor Repulsion Forcefield
    let mousePos = { x: -1000, y: -1000 };

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = render.canvas.getBoundingClientRect();
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleCanvasMouseLeave = () => {
      mousePos = { x: -1000, y: -1000 };
    };

    const handleCanvasMouseDown = (e: MouseEvent) => {
      const rect = render.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      bodies.forEach((body) => {
        const dx = body.position.x - clickX;
        const dy = body.position.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300 && dist > 0.1) {
          Body.applyForce(body, body.position, {
            x: (dx / dist) * 0.15,
            y: (dy / dist) * 0.15, // Pure directional push, no upward anti-gravity
          });
        }
      });
    };

    render.canvas.addEventListener("mousemove", handleCanvasMouseMove);
    render.canvas.addEventListener("mouseleave", handleCanvasMouseLeave);
    render.canvas.addEventListener("mousedown", handleCanvasMouseDown);

    const handleBeforeUpdate = () => {
      if (mousePos.x < 0 || mousePos.y < 0) return;

      const hitRadius = 150;
      bodies.forEach((body) => {
        const dx = body.position.x - mousePos.x;
        const dy = body.position.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hitRadius && dist > 0.1) {
          const nx = dx / dist;
          const ny = dy / dist;
          // Force scales smoothly: closer cursor = massive kick
          const strength = (1 - dist / hitRadius) * 0.05;

          Body.applyForce(body, body.position, {
            x: nx * strength,
            y: ny * strength, // Pure directional push
          });
        }
      });
    };

    Events.on(engine, "beforeUpdate", handleBeforeUpdate);

    // Clean teardown on unmount
    return () => {
      render.canvas.removeEventListener("mousemove", handleCanvasMouseMove);
      render.canvas.removeEventListener("mouseleave", handleCanvasMouseLeave);
      render.canvas.removeEventListener("mousedown", handleCanvasMouseDown);
      Events.off(engine, "beforeUpdate", handleBeforeUpdate);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
    };
  }, [isInView, isMobile]);

  if (isMobile) {
    return (
      <div className="mt-8 select-none">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">Core Tech Stack</span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 rounded-full">Optimized View</span>
        </div>
        <div className="w-full rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-5 shadow-2xl flex flex-wrap justify-center gap-4">
          {TOOLS.map((tool) => (
            <div key={tool.name} className="flex flex-col items-center gap-1.5 w-[60px]">
              <div className="w-11 h-11 rounded-full bg-[#181820] border border-white/10 flex items-center justify-center shadow-lg">
                {tool.icon}
              </div>
              <span className="text-[8px] text-zinc-300 font-bold text-center leading-tight">{tool.name.replace('.js', '').replace(' / LLMs', '')}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 select-none">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
          Interactive Physics Sandbox
        </span>
        <span className="text-[10px] font-mono text-[#FF1E56] bg-[#FF1E56]/10 border border-[#FF1E56]/30 px-2 py-0.5 rounded-full">
          Click &amp; Toss
        </span>
      </div>

      <div
        ref={sceneRef}
        className="w-full h-[300px] rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden relative cursor-grab active:cursor-grabbing shadow-2xl"
      />
    </div>
  );
}

export default function Services() {
  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-[100vw] pb-44">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FF1E56]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Title, Live Terminal & Interactive Physics Playground */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start flex flex-col">
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

          {/* Live Terminal Typewriter Window */}
          <TerminalWindow />

          {/* Interactive Matter.js Physics Tech Stack Playground */}
          <TechPhysicsPlayground />
        </div>

        {/* Right Column: Sticky Stacking Capabilities Cards */}
        <div className="lg:col-span-7 flex flex-col gap-8 pb-12 relative">
          {CAPABILITIES.map((cap, index) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 85,
                damping: 18,
                mass: 0.95,
                delay: index * 0.05,
              }}
              style={{
                top: `calc(6rem + ${index * 28}px)`,
                zIndex: index + 1,
              }}
              className="sticky w-full mb-6"
            >
              <TiltCard
                isHighlighted={cap.isHighlighted}
                className={`rounded-3xl p-7 sm:p-9 transition-all duration-500 shadow-[0_-12px_45px_rgba(0,0,0,0.85)] md:backdrop-blur-xl backdrop-blur-md ${
                  cap.isHighlighted
                    ? "bg-gradient-to-br from-[#FF1E56] via-[#e11255] to-[#c70b47] text-white shadow-[0_20px_50px_rgba(255,30,86,0.45)] border border-[#ff4785]"
                    : "bg-[#131318] border border-white/10 hover:border-white/20 text-zinc-200"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center gap-3.5 mb-4 relative z-20">
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
                  className={`text-sm sm:text-base leading-relaxed mb-6 font-normal relative z-20 ${
                    cap.isHighlighted ? "text-white/95" : "text-zinc-400"
                  }`}
                >
                  {cap.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative z-20">
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
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

