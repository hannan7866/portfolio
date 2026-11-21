"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal, Phone, Mail, X } from "lucide-react";

type Msg = {
  role: "user" | "assistant";
  content: string;
  sources?: string[]; // knowledge sections the answer was grounded on
  isError?: boolean; // shown to the visitor but never sent back to the model
};

const MAX_CHARS = 600;

const STARTERS = [
  "What do you build?",
  "Tell me about Lala Motors",
  "I want to hire you",
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
  const bodyRef = useRef<HTMLDivElement>(null);
  const MAX_TURNS = 12;

  useEffect(() => {
    if (open && !booted) {
      const t = setTimeout(() => setBooted(true), 600);
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
      // Only role and content go to the server; error bubbles are not part of the conversation.
      const history = next
        .filter((m) => !m.isError)
        .map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.timeout(25_000),
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
            content: data.message || "Something went wrong on my side. Try again, or use the contact button.",
          },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        { role: "assistant", isError: true, content: "I couldn't reach the server. Check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-3 z-40 sm:bottom-5 sm:right-5">
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Abdul.exe"
          className="absolute bottom-16 right-0 flex h-[460px] w-[320px] sm:w-[350px] flex-col overflow-hidden rounded-2xl border border-rule bg-surface shadow-2xl backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rule bg-void px-3.5 py-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#27C93F] shadow-sm animate-pulse" />
                <b className="font-mono text-[13px] text-arc tracking-wide">Abdul.exe</b>
              </div>
              <span className="block font-mono text-[10px] text-graphite">
                {booted ? "status: online & ready" : "booting..."}
              </span>
            </div>

            {/* Header Contact Actions (preserved from FloatingDock) */}
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
                className="rounded-full p-1.5 hover:bg-void text-graphite hover:text-ink transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div ref={bodyRef} aria-live="polite" className="flex-1 space-y-2.5 overflow-y-auto p-3.5">
            {!booted ? (
              <p className="font-mono text-[11px] text-graphite">
                &gt; initializing Abdul.exe...<br />&gt; loading knowledge base...
              </p>
            ) : messages.length === 0 ? (
              <>
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-rule bg-void px-3 py-2 text-[13px] text-ink leading-relaxed">
                  Hey — it&apos;s Abdul. Ask me anything about what I build, or what I&apos;m looking for.
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-rule bg-void/50 px-2.5 py-1 font-mono text-[10px] text-graphite hover:border-arc hover:text-ink transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto rounded-br-sm bg-arc text-arc-ink font-medium"
                      : "rounded-bl-sm border border-rule bg-void text-ink"
                  }`}
                >
                  <span className="whitespace-pre-wrap">{m.content}</span>
                  {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                    <span className="mt-1.5 block font-mono text-[9.5px] leading-snug text-graphite">
                      sources: {m.sources.join(" · ")}
                    </span>
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className="max-w-[60%] rounded-2xl rounded-bl-sm border border-rule bg-void px-3 py-2 text-[13px] text-graphite font-mono animate-pulse">
                &gt; thinking...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-rule bg-void/70 p-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={limitReached ? "Chat limit reached — use the contact buttons above" : "Ask me something..."}
              maxLength={MAX_CHARS}
              disabled={loading || limitReached}
              className="flex-1 rounded-full border border-rule bg-void px-3 py-1.5 text-[12.5px] text-ink outline-none focus:border-arc placeholder:text-graphite/60"
            />
            <button
              type="submit"
              disabled={loading || limitReached || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-arc text-arc-ink font-bold disabled:opacity-40 transition-opacity cursor-pointer hover:opacity-90"
            >
              ↑
            </button>
          </form>
        </div>
      )}

      {/* Terminal-Style Trigger Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Abdul.exe" : "Open Abdul.exe"}
        className="flex items-center gap-2.5 rounded-full border border-rule bg-void/90 px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-2xl backdrop-blur-xl transition-all hover:border-arc hover:bg-surface active:scale-95 group cursor-pointer"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-arc opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-arc" />
        </span>
        <span className="font-mono text-xs font-bold text-ink group-hover:text-arc transition-colors flex items-center gap-1">
          <span className="text-arc font-semibold">&gt;</span> Abdul.exe
        </span>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface border border-rule text-arc group-hover:border-arc transition-colors">
          {open ? <X className="h-3.5 w-3.5" /> : <Terminal className="h-3.5 w-3.5" />}
        </div>
      </button>
    </div>
  );
}
