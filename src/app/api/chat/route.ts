import { NextRequest, NextResponse } from "next/server";
import {
  STATUS,
  allowRequest,
  askClaude,
  askGemini,
  buildSystem,
  geminiModelList,
  modelList,
  pickProvider,
  userMessage,
  validateMessages,
  type ErrorCode,
} from "@/lib/chat-core";

export const runtime = "nodejs";
export const maxDuration = 30;

function fail(code: ErrorCode) {
  return NextResponse.json(
    { error: code, message: userMessage(code) },
    { status: STATUS[code], headers: { "cache-control": "no-store" } },
  );
}

// Open /api/chat in a browser to check the deployed setup. It never returns the key.
export async function GET() {
  const picked = pickProvider();
  return NextResponse.json(
    {
      ok: true,
      keyPresent: Boolean(picked),
      provider: picked?.provider ?? null,
      models: picked?.provider === "gemini" ? geminiModelList() : modelList(),
    },
    { headers: { "cache-control": "no-store" } },
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("bad_request");
  }

  const parsed = validateMessages((body as { messages?: unknown })?.messages);
  if (!parsed.ok) return fail("bad_request");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowRequest(ip)) return fail("rate_limited");

  const picked = pickProvider();
  if (!picked) {
    console.error("[abdul.exe] neither GEMINI_API_KEY nor ANTHROPIC_API_KEY is set in this environment");
    return fail("missing_key");
  }

  const { system, sources } = buildSystem(parsed.messages, picked.provider);
  const result =
    picked.provider === "gemini"
      ? await askGemini({ apiKey: picked.apiKey, system, messages: parsed.messages, models: geminiModelList() })
      : await askClaude({ apiKey: picked.apiKey, system, messages: parsed.messages, models: modelList() });

  if (!result.ok) {
    // Full detail goes to the server log (Vercel > Logs), never to the visitor.
    console.error(`[abdul.exe] ${result.code} status=${result.status} ${result.detail}`);
    return fail(result.code);
  }

  return NextResponse.json({ text: result.text, sources }, { headers: { "cache-control": "no-store" } });
}
