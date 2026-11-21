"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, Phone, Mail, X, Send, MessageSquare } from "lucide-react";

type Msg = {
  role: "user" | "assistant";
  content: string;
  sources?: string[]; // knowledge sections the answer was grounded on
  isError?: boolean; // shown to the visitor but never sent back to the model
};

const MAX_CHARS = 600;

const STARTERS = [
  { icon: "⚡", label: "What do you build?", q: "What do you build?" },
  { icon: "🏍️", label: "Lala Motors ERP", q: "Tell me about the Lala Motors ERP" },
  { icon: "💼", label: "Why looking for roles?", q: "Why are you looking for roles now?" },
  { icon: "📬", label: "How to contact you?", q: "How can I contact Abdul?" },
];

function WhatsappIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface AbdulExeProps {
  onOpenContact?: () => void;
}

export default function AbdulExe({ onOpenContact }: AbdulExeProps) {
  const [open, setOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const MAX_TURNS = 12;

  // Gentle greeting tooltip delay on initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && !booted) {
      const t = setTimeout(() => setBooted(true), 400);
      return () => clearTimeout(t);
    }
  }, [open, booted]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const limitReached = messages.length >= MAX_TURNS * 2;

  async function send(raw: string) {
    const text = raw.trim().slice(0, MAX_CHARS);
    if (!text || loading || limitReached) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const history = next
        .filter((m) => !m.isError)
        .map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.timeout(20_000),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.text) {
        setMessages([...next, { role: "assistant", content: data.text, sources: data.sources }]);
      } else {
        setMessages([
          ...next,
          {
            role: "assistant",
            isError: true,
            content: data.message || "I experienced a brief pause. Please try asking again or reach Abdul via WhatsApp/Email!",
          },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          isError: true,
          content: "I couldn't reach the server right now. Check your connection or message Abdul directly above!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-3 z-40 sm:bottom-6 sm:right-6">
      {/* Floating Greeting Speech Bubble (Shown when chat is closed and not dismissed) */}
      {!open && showGreeting && !bubbleDismissed && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setOpen(true);
            setBubbleDismissed(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(true);
              setBubbleDismissed(true);
            }
          }}
          className="group absolute bottom-16 right-0 mb-2 flex w-[290px] sm:w-[320px] cursor-pointer items-start gap-3 rounded-2xl border border-arc/40 bg-surface/95 p-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(56,232,255,0.2)] backdrop-blur-xl transition-all duration-300 hover:border-arc hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(56,232,255,0.35)] animate-gentle-float text-left"
          aria-label="Open chat with Abdul"
        >
          {/* Avatar with Waving Hand Badge */}
          <div className="relative flex-shrink-0">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-arc/60 bg-void shadow-md group-hover:border-arc transition-colors">
              <Image
                src="/images/avatar_3d_v2.png"
                alt="Abdul Hannan Avatar"
                fill
                sizes="44px"
                className="object-cover object-top scale-110"
              />
            </div>
            {/* Animated Waving Hand */}
            <span
              className="absolute -top-1 -right-1 text-base select-none animate-wave-hand filter drop-shadow"
              title="Waving hand"
            >
              👋
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-[#27C93F] shadow-sm animate-pulse" />
          </div>

          {/* Bubble Text Content */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-arc tracking-wide">
                Talk to Abdul
              </span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-arc/80" />
              <span className="font-mono text-[10px] text-graphite">AI Assistant</span>
            </div>
            <p className="mt-1 text-[12px] leading-snug text-ink/90 font-medium">
              Hey there! 👋 Have questions about my projects or looking to hire? Let&apos;s talk!
            </p>
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-arc group-hover:text-ink transition-colors">
              <span>Start chatting</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </div>

          {/* Close / Dismiss Greeting Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setBubbleDismissed(true);
            }}
            aria-label="Dismiss greeting"
            title="Dismiss greeting"
            className="absolute top-2.5 right-2.5 rounded-full p-1 text-graphite hover:bg-void hover:text-ink transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main Chat Dialog Window */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Abdul Hannan"
          className="absolute bottom-16 right-0 flex h-[480px] w-[330px] sm:w-[370px] flex-col overflow-hidden rounded-2xl border border-arc/40 bg-surface/95 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(56,232,255,0.25)] backdrop-blur-2xl transition-all"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rule bg-void/90 px-3.5 py-3">
            <div className="flex items-center gap-2.5">
              {/* Avatar in Header */}
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-arc/50 bg-void flex-shrink-0">
                <Image
                  src="/images/avatar_3d_v2.png"
                  alt="Abdul Hannan"
                  fill
                  sizes="32px"
                  className="object-cover object-top scale-110"
                />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-void bg-[#27C93F] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <b className="text-[13.5px] font-semibold text-ink tracking-tight">Talk to Abdul</b>
                  <span className="rounded-full bg-arc/15 px-1.5 py-0.2 font-mono text-[9px] font-medium text-arc">
                    AI
                  </span>
                </div>
                <span className="block font-mono text-[10px] text-graphite">
                  {booted ? "status: online & ready" : "connecting..."}
                </span>
              </div>
            </div>

            {/* Header Contact Quick Actions */}
            <div className="flex items-center gap-1.5">
              <a
                href="https://wa.me/917310542113?text=Hi%20Abdul%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%2Frole%20with%20you."
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                className="rounded-full bg-[#25D366]/15 p-1.5 text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
              >
                <WhatsappIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="tel:+917310542113"
                aria-label="Call Abdul"
                title="Call +91-7310542113"
                className="rounded-full bg-surface hover:bg-rule p-1.5 text-ink transition-colors border border-rule"
              >
                <Phone className="h-3.5 w-3.5" />
              </a>
              {onOpenContact ? (
                <button
                  type="button"
                  onClick={onOpenContact}
                  aria-label="Send Message"
                  title="Send Message"
                  className="rounded-full bg-arc/15 p-1.5 text-arc hover:bg-arc/25 transition-colors cursor-pointer"
                >
                  <Mail className="h-3.5 w-3.5" />
                </button>
              ) : (
                <a
                  href="mailto:dev.hannan.ai@gmail.com"
                  aria-label="Send Email"
                  title="Email dev.hannan.ai@gmail.com"
                  className="rounded-full bg-arc/15 p-1.5 text-arc hover:bg-arc/25 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 hover:bg-void text-graphite hover:text-ink transition-colors cursor-pointer ml-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div ref={bodyRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-3.5">
            {!booted ? (
              <div className="flex items-center gap-2 font-mono text-[11px] text-graphite">
                <span className="inline-block h-2 w-2 rounded-full bg-arc animate-ping" />
                <span>Initializing assistant...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="space-y-3.5 pt-1">
                {/* Friendly Greeting Card inside chat */}
                <div className="rounded-2xl rounded-bl-sm border border-rule bg-void/80 p-3.5 text-ink shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg select-none animate-wave-hand">👋</span>
                    <span className="font-semibold text-[13px] text-arc">Welcome to my portfolio!</span>
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-ink/90">
                    I&apos;m Abdul&apos;s AI assistant. Ask me anything about his production projects (like the Lala Motors ERP), full-stack tech stack, or engineering background.
                  </p>
                </div>

                {/* Suggested Quick Starters */}
                <div>
                  <span className="block font-mono text-[10px] text-graphite uppercase tracking-wider mb-2">
                    Suggested Questions
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {STARTERS.map((s) => (
                      <button
                        key={s.q}
                        onClick={() => send(s.q)}
                        className="flex items-center gap-2 rounded-xl border border-rule bg-void/60 px-3 py-2 text-left text-[12px] text-ink hover:border-arc hover:bg-void hover:text-arc transition-all cursor-pointer group"
                      >
                        <span className="text-sm select-none">{s.icon}</span>
                        <span className="flex-1 font-medium">{s.label}</span>
                        <span className="text-graphite group-hover:text-arc transition-colors">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto rounded-br-sm bg-arc text-arc-ink font-medium shadow-md"
                      : "rounded-bl-sm border border-rule bg-void/90 text-ink shadow-sm"
                  }`}
                >
                  <span className="whitespace-pre-wrap">{m.content}</span>
                  {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                    <span className="mt-2 block border-t border-rule/60 pt-1.5 font-mono text-[9.5px] leading-snug text-graphite">
                      sources: {m.sources.join(" · ")}
                    </span>
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className="flex items-center gap-2 max-w-[65%] rounded-2xl rounded-bl-sm border border-rule bg-void/90 px-3.5 py-2.5 text-[12.5px] text-graphite font-mono">
                <span className="text-xs text-arc">Abdul is typing</span>
                <span className="inline-flex gap-1 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-arc animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-arc animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-arc animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-rule bg-void/80 p-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={limitReached ? "Chat limit reached — contact Abdul above!" : "Ask anything about Abdul's work..."}
              maxLength={MAX_CHARS}
              disabled={loading || limitReached}
              className="flex-1 rounded-full border border-rule bg-surface/80 px-3.5 py-2 text-[12.5px] text-ink outline-none focus:border-arc placeholder:text-graphite/60 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || limitReached || !input.trim()}
              aria-label="Send message"
              title="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-arc text-arc-ink font-bold disabled:opacity-40 transition-all cursor-pointer hover:opacity-90 hover:scale-105 active:scale-95 shadow-md flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Main Trigger Capsule Button ("Talk to Abdul") */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          setBubbleDismissed(true);
        }}
        aria-label={open ? "Close chat" : "Talk to Abdul"}
        className="group relative flex items-center gap-2.5 rounded-full border border-arc/50 bg-surface/90 px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_0_20px_rgba(56,232,255,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-arc hover:shadow-[0_0_30px_rgba(56,232,255,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Avatar Thumbnail with Pulse Dot */}
        <div className="relative h-6 w-6 overflow-hidden rounded-full border border-arc/70 bg-void flex-shrink-0">
          <Image
            src="/images/avatar_3d_v2.png"
            alt="Abdul"
            fill
            sizes="24px"
            className="object-cover object-top scale-110"
          />
          <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-[#27C93F] animate-pulse" />
        </div>

        {/* Text */}
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-semibold text-ink group-hover:text-arc transition-colors">
            {open ? "Close Chat" : "Talk to Abdul"}
          </span>
          {!open && (
            <span className="hidden sm:inline-block rounded-full bg-arc/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-arc">
              AI
            </span>
          )}
        </div>

        {/* Right Icon */}
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-void/80 border border-rule text-arc group-hover:border-arc transition-colors">
          {open ? <X className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5 animate-pulse" />}
        </div>
      </button>
    </div>
  );
}
