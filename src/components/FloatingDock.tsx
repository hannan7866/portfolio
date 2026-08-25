"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

function WhatsappIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface FloatingDockProps {
  onOpenContact: () => void;
}

export default function FloatingDock({ onOpenContact }: FloatingDockProps) {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 pointer-events-none">
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/85 backdrop-blur-2xl border border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.8)] hover:border-white/30 transition-all group"
      >
        <button
          onClick={onOpenContact}
          className="flex flex-col text-left pr-1 sm:pr-2 cursor-pointer"
        >
          <span className="text-xs font-bold text-white tracking-tight group-hover:text-white/90">
            Speak to Abdul
          </span>
          <span className="text-[10px] text-zinc-400 font-medium hidden sm:inline-block">
            WhatsApp, Call or Email
          </span>
        </button>

        {/* Action button pills */}
        <div className="flex items-center gap-1.5">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/917310542113?text=Hi%20Abdul%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%2Frole%20with%20you."
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className="w-8 h-8 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <WhatsappIcon className="w-4 h-4" />
          </a>

          {/* Direct Call */}
          <a
            href="tel:+917310542113"
            aria-label="Call Abdul"
            title="Call +91-7310542113"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/15 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          {/* Open Contact Modal / Compose */}
          <button
            onClick={onOpenContact}
            aria-label="Send Message"
            title="Send Message to dev.hannan.ai@gmail.com"
            className="w-8 h-8 rounded-full bg-[#FF1E56] hover:bg-[#e11255] text-white flex items-center justify-center shadow-lg shadow-[#FF1E56]/30 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
