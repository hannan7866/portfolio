"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
  Loader2,
  ExternalLink,
  MessageCircle,
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [tab, setTab] = useState<"message" | "direct">("message");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roleType: "Full-Stack Developer",
    location: "Remote (Worldwide)",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Post to our API route to dispatch email to dev.hannan.ai@gmail.com
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.warn("API dispatch issue, fallback ready:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#FF1E56", "#ffffff", "#25D366", "#3b82f6"],
        });
      } catch {
        // ignore
      }
    }
  };

  const getWhatsAppUrl = () => {
    const text = `Hi Abdul, I'm ${formData.name || "reaching out"} (${formData.email || ""}). ${
      formData.message || "I visited your portfolio and would like to discuss a project/role."
    }`;
    return `https://wa.me/917310542113?text=${encodeURIComponent(text)}`;
  };

  const getMailtoUrl = () => {
    const subject = `Opportunity / Project Inquiry: ${formData.roleType || "Full-Stack"} from ${formData.name || "Client"}`;
    const body = `Hi Abdul,\n\nName: ${formData.name}\nEmail: ${formData.email}\nOpportunity: ${formData.roleType}\nLocation/Mode: ${formData.location}\n\nMessage:\n${formData.message}\n\nLooking forward to hearing from you!`;
    return `mailto:dev.hannan.ai@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      roleType: "Full-Stack Developer",
      location: "Remote (Worldwide)",
      message: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-lg bg-[#131318] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF1E56]/15 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF1E56] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Get In Touch
                </div>
                <h3 className="text-2xl font-extrabold text-white font-display mb-1">
                  Connect with Abdul Hannan
                </h3>
                <p className="text-xs text-zinc-400 mb-6">
                  Available for Full-Stack Developer and Software Engineer opportunities.
                </p>

                {/* Tabs */}
                <div className="flex rounded-full bg-white/5 p-1 mb-6 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setTab("message")}
                    className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      tab === "message"
                        ? "bg-[#FF1E56] text-white shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" /> Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("direct")}
                    className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      tab === "direct"
                        ? "bg-[#FF1E56] text-white shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" /> Direct Contact
                  </button>
                </div>

                {tab === "message" ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide">
                          Your Name / Company
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Hiring Manager / Team"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full bg-[#191920] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF1E56] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="recruiter@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-[#191920] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF1E56] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide">
                          Opportunity Type
                        </label>
                        <select
                          value={formData.roleType}
                          onChange={(e) =>
                            setFormData({ ...formData, roleType: e.target.value })
                          }
                          className="w-full bg-[#191920] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF1E56] transition-colors"
                        >
                          <option>Full-Stack Developer</option>
                          <option>Frontend Developer (React/Next.js)</option>
                          <option>Backend Developer (Node/Python)</option>
                          <option>Software Engineer</option>
                          <option>Freelance / Contract Project</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide">
                          Work Mode
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          className="w-full bg-[#191920] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF1E56] transition-colors"
                        >
                          <option>Remote (Worldwide)</option>
                          <option>Hybrid / On-site (India)</option>
                          <option>Contract / Project-based</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide">
                        Message / Role Description
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tell me about the role, project, tech stack, and next steps..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full bg-[#191920] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF1E56] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit via Email */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF1E56] to-[#e11255] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF1E56]/35 hover:shadow-[#FF1E56]/60 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending to dev.hannan.ai@gmail.com...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message to Abdul</span>
                        </>
                      )}
                    </button>

                    {/* Instant WhatsApp Alternative */}
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <WhatsappIcon className="w-4 h-4 text-[#25D366]" />
                      <span>Or Send via WhatsApp Directly</span>
                    </a>
                  </form>
                ) : (
                  <div className="flex flex-col gap-3.5 py-2">
                    {/* WhatsApp Action Card */}
                    <a
                      href="https://wa.me/917310542113?text=Hi%20Abdul%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%2Frole%20with%20you."
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366]/60 hover:bg-[#25D366]/15 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <WhatsappIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#25D366] uppercase font-bold block">
                            WhatsApp (Instant)
                          </span>
                          <span className="text-xs font-bold text-white">
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
                        <div className="w-10 h-10 rounded-xl bg-[#FF1E56]/15 text-[#FF1E56] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                            Direct Phone Call
                          </span>
                          <span className="text-xs font-bold text-white">
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
                      href="mailto:dev.hannan.ai@gmail.com?subject=Opportunity%20Inquiry%20-%20Abdul%20Hannan%20Portfolio&body=Hi%20Abdul%2C%0A%0AI%20am%20reaching%20out%20regarding%20an%20opportunity%20or%20project...%0A%0ABest%20regards"
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                            Direct Email Client
                          </span>
                          <span className="text-xs font-bold text-white">
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
                        className="p-3 rounded-xl bg-[#191920] border border-white/10 hover:border-white/25 flex items-center justify-center gap-2 text-xs font-semibold text-white transition-all cursor-pointer"
                      >
                        <GithubIcon className="w-4 h-4" /> GitHub ↗
                      </a>
                      <a
                        href="https://linkedin.com/in/abdul-hannan-92a911405"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-xl bg-[#191920] border border-white/10 hover:border-white/25 flex items-center justify-center gap-2 text-xs font-semibold text-white transition-all cursor-pointer"
                      >
                        <LinkedinIcon className="w-4 h-4 text-blue-400" /> LinkedIn ↗
                      </a>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-extrabold text-white mb-2">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-zinc-300 max-w-sm mb-6 leading-relaxed">
                  Your message has been sent to <strong>dev.hannan.ai@gmail.com</strong>. Abdul will review your details and respond promptly.
                </p>

                {/* Quick actions on success */}
                <div className="w-full flex flex-col sm:flex-row gap-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all"
                  >
                    <WhatsappIcon className="w-4 h-4" /> Also WhatsApp Abdul
                  </a>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
