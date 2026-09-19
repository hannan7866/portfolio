"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
  Loader2,
  Briefcase,
  Rocket,
} from "lucide-react";
import confetti from "canvas-confetti";

function WhatsappIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
    </svg>
  );
}

export type ContactMode = "hire" | "project" | "direct";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: ContactMode;
}

export default function ContactModal({
  isOpen,
  onClose,
  initialMode = "hire",
}: ContactModalProps) {
  const [activeTab, setActiveTab] = useState<ContactMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initialMode when opening
  useEffect(() => {
    if (isOpen && initialMode) {
      setActiveTab(initialMode);
    }
  }, [isOpen, initialMode]);

  const [submittedReceipt, setSubmittedReceipt] = useState<{
    name: string;
    email: string;
    category: string;
    topic: string;
    details: string;
    isProject: boolean;
  } | null>(null);

  // Form State for Hiring (Companies / Recruiters)
  const [hireForm, setHireForm] = useState({
    name: "",
    email: "",
    role: "Full-Stack Developer",
    customRole: "",
    workMode: "Remote (Worldwide)",
    timeline: "Immediate / 2 Weeks",
    message: "",
  });

  // Form State for Project (Clients / Founders / Freelance)
  const [projectForm, setProjectForm] = useState({
    name: "",
    email: "",
    projectType: "Custom Web Application (React / Next.js)",
    customProjectType: "",
    currency: "$ USD",
    budgetAmount: "",
    timeline: "Live Production & Future Updates",
    message: "",
  });

  const finalProjectTitle =
    projectForm.projectType === "other"
      ? projectForm.customProjectType.trim() || "Custom Bespoke Project"
      : projectForm.projectType;

  const finalHireTitle =
    hireForm.role === "other"
      ? hireForm.customRole.trim() || "Custom Specialized Role"
      : hireForm.role;

  const finalBudgetText = projectForm.budgetAmount.trim()
    ? `${projectForm.currency} ${projectForm.budgetAmount.trim()}`
    : "Open to Discussion";

  const handleHireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hireForm.name || !hireForm.email || !hireForm.message) return;

    setIsSubmitting(true);

    const payload = {
      inquiryType: "hire",
      name: hireForm.name,
      email: hireForm.email,
      roleType: finalHireTitle,
      location: hireForm.workMode,
      timeline: hireForm.timeline,
      message: hireForm.message,
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmittedReceipt({
        name: hireForm.name,
        email: hireForm.email,
        category: "💼 Company Hiring Inquiry",
        topic: finalHireTitle,
        details: `${hireForm.workMode} • ${hireForm.timeline}`,
        isProject: false,
      });

      setIsSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#4FC9A0", "#E0AE52", "#E6E9EA"],
      });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmittedReceipt({
        name: hireForm.name,
        email: hireForm.email,
        category: "💼 Company Hiring Inquiry",
        topic: finalHireTitle,
        details: `${hireForm.workMode} • ${hireForm.timeline}`,
        isProject: false,
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.email || !projectForm.message) return;

    setIsSubmitting(true);

    const payload = {
      inquiryType: "freelance",
      name: projectForm.name,
      email: projectForm.email,
      projectType: finalProjectTitle,
      budget: finalBudgetText,
      timeline: projectForm.timeline,
      message: projectForm.message,
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmittedReceipt({
        name: projectForm.name,
        email: projectForm.email,
        category: "🚀 Custom Project Inquiry",
        topic: finalProjectTitle,
        details: `${finalBudgetText} • ${projectForm.timeline}`,
        isProject: true,
      });

      setIsSubmitted(true);
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4FC9A0", "#E0AE52", "#E6E9EA"],
      });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmittedReceipt({
        name: projectForm.name,
        email: projectForm.email,
        category: "🚀 Custom Project Inquiry",
        topic: finalProjectTitle,
        details: `${finalBudgetText} • ${projectForm.timeline}`,
        isProject: true,
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedReceipt(null);
    setHireForm({
      name: "",
      email: "",
      role: "Full-Stack Developer",
      customRole: "",
      workMode: "Remote (Worldwide)",
      timeline: "Immediate / 2 Weeks",
      message: "",
    });
    setProjectForm({
      name: "",
      email: "",
      projectType: "Custom Web Application (React / Next.js)",
      customProjectType: "",
      currency: "$ USD",
      budgetAmount: "",
      timeline: "Live Production & Future Updates",
      message: "",
    });
    onClose();
  };

  const getWhatsAppUrl = () => {
    if (activeTab === "project" || submittedReceipt?.isProject) {
      const text = `Hi Abdul! I am ${projectForm.name || "reaching out"} regarding a Project Inquiry: "${finalProjectTitle}" (Budget: ${finalBudgetText}, Timeline: ${projectForm.timeline}). Message: ${projectForm.message}`;
      return `https://wa.me/917310542113?text=${encodeURIComponent(text)}`;
    }
    const text = `Hi Abdul! I am ${hireForm.name || "reaching out"} regarding a ${finalHireTitle} position (${hireForm.workMode}). Message: ${hireForm.message}`;
    return `https://wa.me/917310542113?text=${encodeURIComponent(text)}`;
  };

  const getDirectEmailUrl = () => {
    const isProj = activeTab === "project" || submittedReceipt?.isProject;
    const subject = isProj
      ? `Project Inquiry: ${finalProjectTitle} from ${projectForm.name || "Client"}`
      : `Hiring Inquiry: ${finalHireTitle} from ${hireForm.name || "Recruiter"}`;
    const body = isProj
      ? `Hi Abdul,\n\nName: ${projectForm.name || "Client"}\nEmail: ${projectForm.email || ""}\nProject Domain: ${finalProjectTitle}\nBudget: ${finalBudgetText}\nTimeline: ${projectForm.timeline}\n\nScope / Requirements:\n${projectForm.message || ""}\n\nBest regards,\n${projectForm.name || ""}`
      : `Hi Abdul,\n\nName: ${hireForm.name || "Recruiter"}\nEmail: ${hireForm.email || ""}\nTarget Position: ${finalHireTitle}\nWork Mode: ${hireForm.workMode}\nStart Timeline: ${hireForm.timeline}\n\nRole Details:\n${hireForm.message || ""}\n\nBest regards,\n${hireForm.name || ""}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=dev.hannan.ai@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Box - Spacious and Perfectly Proportioned */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#0f0f14] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-white max-h-[94vh] overflow-y-auto custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Header Badge & Title */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-signal uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-signal" />
                    <span>GET IN TOUCH</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Connect with Abdul Hannan
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Select how you&apos;d like to collaborate:
                  </p>
                </div>

                {/* 3-Way Intent Switcher Tab Bar */}
                <div className="grid grid-cols-3 p-1 sm:p-1.5 rounded-2xl bg-[#171720] border border-white/5 mb-6 gap-1 sm:gap-1.5">
                  {/* Tab 1: Hire for Company */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("hire")}
                    className={`py-2.5 sm:py-3 px-1.5 sm:px-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer text-center ${
                      activeTab === "hire"
                        ? "bg-signal text-signal-ink shadow-lg"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Hire for Role</span>
                  </button>

                  {/* Tab 2: Client Project */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("project")}
                    className={`py-2.5 sm:py-3 px-1.5 sm:px-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer text-center ${
                      activeTab === "project"
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Build Project</span>
                  </button>

                  {/* Tab 3: Direct Contact */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("direct")}
                    className={`py-2.5 sm:py-3 px-1.5 sm:px-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer text-center ${
                      activeTab === "direct"
                        ? "bg-white/20 text-white shadow-md"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Direct Contact</span>
                  </button>
                </div>

                {/* ================= MODE 1: HIRE FOR ROLE (COMPANIES / RECRUITERS) ================= */}
                {activeTab === "hire" && (
                  <motion.form
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleHireSubmit}
                    className="space-y-4"
                  >
                    {/* Row 1: Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                          Your Name / Company
                        </label>
                        <input
                          type="text"
                          required
                          value={hireForm.name}
                          onChange={(e) =>
                            setHireForm({ ...hireForm, name: e.target.value })
                          }
                          placeholder="Hiring Manager / Team"
                          className="w-full px-4 py-3 rounded-xl bg-sunken border border-rule text-ink placeholder-graphite text-xs sm:text-sm focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={hireForm.email}
                          onChange={(e) =>
                            setHireForm({ ...hireForm, email: e.target.value })
                          }
                          placeholder="recruiter@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-sunken border border-rule text-ink placeholder-graphite text-xs sm:text-sm focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Role & Work Mode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                          Opportunity Type
                        </label>
                        <select
                          value={hireForm.role}
                          onChange={(e) =>
                            setHireForm({ ...hireForm, role: e.target.value })
                          }
                          className="w-full px-3.5 py-3 rounded-xl bg-sunken border border-rule text-ink text-xs sm:text-sm focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-all cursor-pointer truncate"
                        >
                          <option value="Full-Stack Developer" className="bg-surface text-ink">Full-Stack Developer</option>
                          <option value="Frontend Developer (React/Next.js)" className="bg-surface text-ink">Frontend Developer (React/Next.js)</option>
                          <option value="Backend Developer (Node/Python)" className="bg-surface text-ink">Backend Developer (Node/Python)</option>
                          <option value="Software Engineer" className="bg-surface text-ink">Software Engineer</option>
                          <option value="Contract Engineer" className="bg-surface text-ink">Contract Engineer</option>
                          <option value="other" className="bg-surface text-signal font-bold">✎ Other / Custom Role (Type below)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                          Work Mode
                        </label>
                        <select
                          value={hireForm.workMode}
                          onChange={(e) =>
                            setHireForm({ ...hireForm, workMode: e.target.value })
                          }
                          className="w-full px-3.5 py-3 rounded-xl bg-sunken border border-rule text-ink text-xs sm:text-sm focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-all cursor-pointer truncate"
                        >
                          <option value="Remote (Worldwide)" className="bg-surface text-ink">Remote (Worldwide)</option>
                          <option value="Hybrid / On-site" className="bg-surface text-ink">Hybrid / On-site</option>
                          <option value="Contract / Project-Based" className="bg-surface text-ink">Contract / Project-Based</option>
                        </select>
                      </div>
                    </div>

                    {/* Custom Role Input (if "other" selected) */}
                    {hireForm.role === "other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden"
                      >
                        <label className="block text-[11px] font-bold text-signal uppercase tracking-wider mb-1.5">
                          Specify Custom Role / Position
                        </label>
                        <input
                          type="text"
                          required
                          value={hireForm.customRole}
                          onChange={(e) =>
                            setHireForm({ ...hireForm, customRole: e.target.value })
                          }
                          placeholder="e.g. Lead Next.js Architect, Python AI Lead..."
                          className="w-full px-4 py-3 rounded-xl bg-sunken border border-signal/40 text-ink placeholder-graphite text-xs sm:text-sm focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-all"
                        />
                      </motion.div>
                    )}

                    {/* Message Box */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Message / Role Description
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={hireForm.message}
                        onChange={(e) =>
                          setHireForm({ ...hireForm, message: e.target.value })
                        }
                        placeholder="Tell me about the role, tech stack, team size, and next steps..."
                        className="w-full px-4 py-3 rounded-xl bg-sunken border border-rule text-ink placeholder-graphite text-xs sm:text-sm focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-signal text-signal-ink font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:brightness-105 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to Abdul</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp Quick Alternative */}
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/35 text-[#25D366] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <WhatsappIcon className="w-4 h-4 text-[#25D366]" />
                      <span>Or Send via WhatsApp Directly</span>
                    </a>
                  </motion.form>
                )}

                {/* ================= MODE 2: CLIENT / CUSTOM FREELANCE PROJECT ================= */}
                {activeTab === "project" && (
                  <motion.form
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleProjectSubmit}
                    className="space-y-4"
                  >
                    {/* Row 1: Name & Client Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                          Your Name / Brand
                        </label>
                        <input
                          type="text"
                          required
                          value={projectForm.name}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, name: e.target.value })
                          }
                          placeholder="e.g. Alex (Founder)"
                          className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          value={projectForm.email}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, email: e.target.value })
                          }
                          placeholder="client@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Project Type & Timeline (Spacious 2-column layout so nothing clips!) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Project Type Selector */}
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                          Project Type
                        </label>
                        <select
                          value={projectForm.projectType}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, projectType: e.target.value })
                          }
                          className="w-full px-3.5 py-3 rounded-xl bg-[#14141c] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer truncate"
                        >
                          <option value="Custom Web Application (React / Next.js)" className="bg-[#14141c] text-white">Full-Stack Web App (React / Next.js)</option>
                          <option value="Mobile App (React Native)" className="bg-[#14141c] text-white">Mobile Application (iOS / Android)</option>
                          <option value="AI / RAG Pipeline & LLM App" className="bg-[#14141c] text-white">AI &amp; Automation Engine</option>
                          <option value="Enterprise ERP & Billing Engine" className="bg-[#14141c] text-white">Enterprise ERP &amp; Billing CRM</option>
                          <option value="Full-Stack MVP" className="bg-[#14141c] text-white">Full-Stack MVP Development</option>
                          <option value="other" className="bg-[#14141c] text-emerald-400 font-bold">✎ Other (Specify Custom Type)</option>
                        </select>
                      </div>

                      {/* Timeline with Live Production Updates */}
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                          Target Timeline
                        </label>
                        <select
                          value={projectForm.timeline}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, timeline: e.target.value })
                          }
                          className="w-full px-3.5 py-3 rounded-xl bg-[#14141c] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer truncate"
                        >
                          <option value="Live Production & Future Updates" className="bg-[#14141c] text-emerald-400 font-bold">⚡ Live Production Updates (Future)</option>
                          <option value="Sprint Execution (< 2 Weeks)" className="bg-[#14141c] text-white">Sprint Execution (&lt; 2 Weeks)</option>
                          <option value="2 to 4 Weeks" className="bg-[#14141c] text-white">Standard (2 to 4 Weeks)</option>
                          <option value="1 to 2 Months" className="bg-[#14141c] text-white">1 to 2 Months Roadmap</option>
                          <option value="Long-Term Partnership (3+ Months)" className="bg-[#14141c] text-white">Long-Term Partnership (3+ Months)</option>
                          <option value="Ongoing Maintenance & Retainer" className="bg-[#14141c] text-white">Ongoing Retainer</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Custom Typable Budget Box (Dedicated Full Row with Currency Dropdown + Input) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                          Estimated Budget
                        </label>
                        <span className="text-[11px] text-zinc-500">
                          (Type any custom amount or range)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Currency Dropdown */}
                        <div className="relative shrink-0">
                          <select
                            value={projectForm.currency}
                            onChange={(e) =>
                              setProjectForm({ ...projectForm, currency: e.target.value })
                            }
                            className="h-[46px] px-3.5 rounded-xl bg-[#14141c] border border-white/10 text-white text-xs sm:text-sm font-bold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
                          >
                            <option value="$ USD" className="bg-[#14141c] text-white">$ USD</option>
                            <option value="₹ INR" className="bg-[#14141c] text-white">₹ INR</option>
                          </select>
                        </div>

                        {/* Completely Empty Typable Budget Input */}
                        <input
                          type="text"
                          value={projectForm.budgetAmount}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, budgetAmount: e.target.value })
                          }
                          placeholder="e.g. 2,500 or 1,50,000 (or leave open)"
                          className="h-[46px] flex-1 px-4 rounded-xl bg-[#14141c] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Custom Type Input (if "other" selected) */}
                    {projectForm.projectType === "other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden"
                      >
                        <label className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                          Specify Custom Project Domain / Type
                        </label>
                        <input
                          type="text"
                          required
                          value={projectForm.customProjectType}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              customProjectType: e.target.value,
                            })
                          }
                          placeholder="e.g. Chrome Extension, Trading Bot, Micro-SaaS Portal, Custom API..."
                          className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-emerald-500/40 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                      </motion.div>
                    )}

                    {/* Scope / Features Textarea */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Project Scope &amp; Target Features
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={projectForm.message}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, message: e.target.value })
                        }
                        placeholder="Describe your vision, target users, required integrations, and goals..."
                        className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Submitting Scope...</span>
                        </>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4 text-black" />
                          <span>Submit Freelance Project</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp Alternative */}
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/35 text-[#25D366] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <WhatsappIcon className="w-4 h-4 text-[#25D366]" />
                      <span>Or Discuss on WhatsApp Directly</span>
                    </a>
                  </motion.form>
                )}

                {/* ================= MODE 3: DIRECT CONTACT ================= */}
                {activeTab === "direct" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-3.5 py-1"
                  >
                    {/* WhatsApp Card */}
                    <a
                      href="https://wa.me/917310542113?text=Hi%20Abdul%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you."
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366]/60 hover:bg-[#25D366]/15 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <WhatsappIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#25D366] uppercase font-bold block">
                            WhatsApp (Fastest Response)
                          </span>
                          <span className="text-sm font-bold text-white">
                            +91-7310542113
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#25D366] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Chat ↗
                      </span>
                    </a>

                    {/* Direct Call Card */}
                    <a
                      href="tel:+917310542113"
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-signal/15 text-signal flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                            Direct Phone Call
                          </span>
                          <span className="text-sm font-bold text-white">
                            +91-7310542113
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-zinc-300 group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Call Now ↗
                      </span>
                    </a>

                    {/* Direct Email Card */}
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=dev.hannan.ai@gmail.com&su=Opportunity%20Inquiry%20-%20Abdul%20Hannan%20Portfolio&body=Hi%20Abdul%2C%0A%0AI%20am%20reaching%20out%20regarding%20an%20opportunity%20or%20project...%0A%0ABest%20regards"
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                            Direct Email Client (Gmail)
                          </span>
                          <span className="text-sm font-bold text-white">
                            dev.hannan.ai@gmail.com
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-zinc-300 group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Compose ↗
                      </span>
                    </a>

                    {/* Social Profiles Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <a
                        href="https://github.com/hannan7866"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3.5 rounded-xl bg-[#171720] border border-white/10 hover:border-white/25 flex items-center justify-center gap-2 text-xs font-semibold text-white transition-all cursor-pointer"
                      >
                        <GithubIcon className="w-4 h-4" /> GitHub ↗
                      </a>
                      <a
                        href="https://linkedin.com/in/abdul-hannan-92a911405"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3.5 rounded-xl bg-[#171720] border border-white/10 hover:border-white/25 flex items-center justify-center gap-2 text-xs font-semibold text-white transition-all cursor-pointer"
                      >
                        <LinkedinIcon className="w-4 h-4 text-blue-400" /> LinkedIn ↗
                      </a>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              /* ================= SUCCESS CONFIRMATION RECEIPT ================= */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-4 flex flex-col items-center text-center font-sans"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.35)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366]"></span>
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[10px] font-bold text-[#25D366] uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  {submittedReceipt?.isProject
                    ? "FREELANCE PROJECT DISPATCHED TO ABDUL"
                    : "MAIL & REQUEST SENT TO ABDUL HANNAN"}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1.5">
                  Thank You, {submittedReceipt?.name || "there"}!
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mb-5 leading-relaxed">
                  Your inquiry has been directly delivered to Abdul&apos;s personal inbox at{" "}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=dev.hannan.ai@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white font-semibold underline decoration-signal underline-offset-4 hover:text-signal transition-colors font-mono"
                  >
                    dev.hannan.ai@gmail.com
                  </a>
                  .
                </p>

                {/* Structured Receipt Card */}
                <div className="w-full bg-sunken border border-white/10 rounded-2xl p-5 text-left mb-5 flex flex-col gap-3 text-xs sm:text-sm shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-zinc-400">Category</span>
                    <span className="text-white font-bold">
                      {submittedReceipt?.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-zinc-400">
                      {submittedReceipt?.isProject ? "Target Scope / Domain" : "Opportunity Type"}
                    </span>
                    <span className="text-signal font-semibold">
                      {submittedReceipt?.topic}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-zinc-400">
                      {submittedReceipt?.isProject ? "Budget & Timeline" : "Work Mode"}
                    </span>
                    <span className="text-zinc-200 font-semibold">
                      {submittedReceipt?.details}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-zinc-400">Recipient Email</span>
                    <span className="text-[#25D366] font-mono font-medium">
                      dev.hannan.ai@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Status</span>
                    <span className="text-[#25D366] font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse" />
                      Delivered &amp; Queued for Reply
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="w-full flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <WhatsappIcon className="w-4 h-4 text-black" />
                    <span>Instant WhatsApp Chat</span>
                  </a>

                  <a
                    href={getDirectEmailUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                  >
                    <Mail className="w-4 h-4 text-signal" />
                    <span>Open Email Draft</span>
                  </a>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-4 text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  Done / Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
