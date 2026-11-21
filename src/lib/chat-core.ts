// Pure chat logic (no Next.js imports) so it can be tested on its own.
import { CORE } from "./abdul-kb";
import { retrieve } from "./retrieve";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export const LIMITS = {
  maxMessages: 20,
  maxChars: 600,
  maxTokens: 350,
  timeoutMs: 20_000,
  windowMs: 10 * 60_000,
  maxPerWindow: 25,
};

export type ErrorCode =
  | "bad_request"
  | "rate_limited"
  | "missing_key"
  | "auth"
  | "billing"
  | "model"
  | "upstream"
  | "empty";

// Safe, visitor-facing text. Raw upstream errors are only logged on the server.
const USER_MESSAGES: Record<ErrorCode, string> = {
  bad_request: "I couldn't read that. Keep it under 600 characters and try again.",
  rate_limited: "That's quite a few questions at once! Give it a minute and try again.",
  missing_key: "The AI assistant isn't fully configured yet. Feel free to contact Abdul directly via WhatsApp or email above!",
  auth: "Temporarily having trouble connecting to AI services. You can reach Abdul directly via WhatsApp or email above!",
  billing: "Temporarily having trouble connecting to AI services. You can reach Abdul directly via WhatsApp or email above!",
  model: "I got a bit overwhelmed for a moment! Please try asking again, or reach Abdul directly above.",
  upstream: "Abdul's AI is experiencing high demand right now. Please try asking again in a few seconds, or reach Abdul directly above!",
  empty: "I didn't get a complete answer that time. Try asking again!",
};

export const STATUS: Record<ErrorCode, number> = {
  bad_request: 400,
  rate_limited: 429,
  missing_key: 503,
  auth: 502,
  billing: 502,
  model: 502,
  upstream: 502,
  empty: 502,
};

export function userMessage(code: ErrorCode) {
  return USER_MESSAGES[code];
}

export function validateMessages(
  raw: unknown,
): { ok: true; messages: ChatMessage[] } | { ok: false } {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > LIMITS.maxMessages) return { ok: false };
  const messages: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return { ok: false };
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return { ok: false };
    const text = content.trim();
    if (!text || text.length > LIMITS.maxChars) return { ok: false };
    messages.push({ role, content: text });
  }
  // The API needs the conversation to start with, and end on, a user turn.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") return { ok: false };
  return { ok: true, messages };
}

// Best-effort limit per server instance. Serverless instances do not share memory,
// so this stops casual abuse; the real spending cap is the one set in the Anthropic console.
const hits = new Map<string, number[]>();
export function allowRequest(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < LIMITS.windowMs);
  if (recent.length >= LIMITS.maxPerWindow) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.length || now - v[v.length - 1] > LIMITS.windowMs) hits.delete(k);
  return true;
}

export function modelList(env: Record<string, string | undefined> = process.env): string[] {
  const list = [env.ANTHROPIC_MODEL, "claude-haiku-5-5", "claude-haiku-4-5-20251001", "claude-haiku-4-5"];
  return list.filter((m, i): m is string => Boolean(m) && list.indexOf(m) === i);
}

export type Provider = "gemini" | "anthropic";

// GEMINI_API_KEY (free from Google AI Studio) wins if both are set.
export function pickProvider(env: Record<string, string | undefined> = process.env): { provider: Provider; apiKey: string } | null {
  if (env.GEMINI_API_KEY) return { provider: "gemini", apiKey: env.GEMINI_API_KEY };
  if (env.ANTHROPIC_API_KEY) return { provider: "anthropic", apiKey: env.ANTHROPIC_API_KEY };
  return null;
}

export function geminiModelList(env: Record<string, string | undefined> = process.env): string[] {
  const list = [
    env.GEMINI_MODEL,
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.1-flash-lite",
  ];
  return list.filter((m, i): m is string => Boolean(m) && list.indexOf(m) === i);
}

const LLM_NAME: Record<Provider, string> = {
  gemini: "Google's Gemini API",
  anthropic: "Anthropic's Claude API",
};

export function buildSystem(messages: ChatMessage[], provider: Provider = "anthropic") {
  const userTurns = messages.filter((m) => m.role === "user").map((m) => m.content);
  const { chunks, matched } = retrieve(userTurns);
  const context = chunks
    .map((c) => `[${c.title}]\n${c.text.replaceAll("{{LLM}}", LLM_NAME[provider])}`)
    .join("\n\n");
  return {
    system: `${CORE}\n\nCONTEXT (the only facts you may use):\n${context}`,
    sources: matched ? chunks.filter((c) => c.id !== "profile").map((c) => c.title) : [],
  };
}

type Fetch = typeof fetch;

export async function askClaude(opts: {
  apiKey: string;
  system: string;
  messages: ChatMessage[];
  models: string[];
  fetchImpl?: Fetch;
}): Promise<{ ok: true; text: string; model: string } | { ok: false; code: ErrorCode; status: number; detail: string }> {
  const f = opts.fetchImpl ?? fetch;
  let last: { code: ErrorCode; status: number; detail: string } = { code: "upstream", status: 0, detail: "no model tried" };

  for (const model of opts.models) {
    let res: Response;
    try {
      res = await f("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": opts.apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: LIMITS.maxTokens,
          temperature: 0.4,
          system: opts.system,
          messages: opts.messages,
        }),
        signal: AbortSignal.timeout(LIMITS.timeoutMs),
      });
    } catch (err) {
      last = { code: "upstream", status: 0, detail: `${model}: ${String(err)}` };
      continue; // network or timeout: try the next model once
    }

    if (res.ok) {
      const data = (await res.json()) as { content?: { type: string; text?: string }[] };
      const text = (data.content ?? []).map((b) => (b.type === "text" ? (b.text ?? "") : "")).join("").trim();
      if (!text) return { ok: false, code: "empty", status: 200, detail: `${model}: empty content` };
      return { ok: true, text, model };
    }

    const body = (await res.text()).slice(0, 300);
    const detail = `${model}: HTTP ${res.status} ${body}`;
    if (res.status === 401 || res.status === 403) return { ok: false, code: "auth", status: res.status, detail };
    if (res.status === 400 && /credit balance|billing/i.test(body)) return { ok: false, code: "billing", status: res.status, detail };
    if (res.status === 429) return { ok: false, code: "upstream", status: res.status, detail };
    if (res.status === 404 || (res.status === 400 && /model/i.test(body))) {
      last = { code: "model", status: res.status, detail };
      continue; // unknown model for this key: try the next one
    }
    last = { code: "upstream", status: res.status, detail };
    if (res.status >= 500) continue;
    return { ok: false, ...last };
  }
  return { ok: false, ...last };
}

// ---------- Gemini (Google AI Studio) ----------

// Gemini wants "model" instead of "assistant" and is happiest with alternating turns.
function toGeminiContents(messages: ChatMessage[]) {
  const out: { role: "user" | "model"; parts: { text: string }[] }[] = [];
  for (const m of messages) {
    const role = m.role === "assistant" ? "model" : "user";
    const last = out[out.length - 1];
    if (last && last.role === role) last.parts[0].text += `\n${m.content}`;
    else out.push({ role, parts: [{ text: m.content }] });
  }
  return out;
}

export async function askGemini(opts: {
  apiKey: string;
  system: string;
  messages: ChatMessage[];
  models: string[];
  fetchImpl?: Fetch;
}): Promise<{ ok: true; text: string; model: string } | { ok: false; code: ErrorCode; status: number; detail: string }> {
  const f = opts.fetchImpl ?? fetch;
  let last: { code: ErrorCode; status: number; detail: string } = { code: "upstream", status: 0, detail: "no model tried" };

  for (const model of opts.models) {
    let res: Response;
    try {
      res = await f(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": opts.apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: opts.system }] },
          contents: toGeminiContents(opts.messages),
          // Newer Gemini models may spend part of this budget on internal reasoning, so it is generous.
          generationConfig: { maxOutputTokens: 2048, temperature: 0.4 },
        }),
        signal: AbortSignal.timeout(6_000),
      });
    } catch (err) {
      last = { code: "upstream", status: 0, detail: `${model}: ${String(err)}` };
      continue;
    }

    if (res.ok) {
      const data = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = (data.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
      if (!text) return { ok: false, code: "empty", status: 200, detail: `${model}: empty content` };
      return { ok: true, text, model };
    }

    const body = (await res.text()).slice(0, 300);
    const detail = `${model}: HTTP ${res.status} ${body}`;
    if (res.status === 401 || res.status === 403 || (res.status === 400 && /API key not valid|API_KEY_INVALID/i.test(body)))
      return { ok: false, code: "auth", status: res.status, detail };
    if (res.status === 404) {
      last = { code: "model", status: res.status, detail };
      continue;
    }
    // Free-tier quotas are per model, so on 429 or a server error the next model may still have room.
    last = { code: "upstream", status: res.status, detail };
    if (res.status === 429 || res.status >= 500) continue;
    return { ok: false, ...last };
  }
  return { ok: false, ...last };
}
