// Keyword retrieval (BM25) over the knowledge chunks. No vector database, no
// embeddings: for ~15 short chunks this is simple, fast and easy to explain.
import { CHUNKS, type KbChunk } from "./abdul-kb";

const STOP = new Set(
  "a an the and or but if of to in on at for with about from by is are was were be been am i you your my me we our it its this that these those do does did have has had can could would should will what which who whom how why when where tell please give show let know like want any some more also just really very go went going get got there their".split(
    " ",
  ),
);

// Light stemming so "projects"/"project", "building"/"build" and "worked"/"work" match.
function stem(w: string): string {
  const base = w.length > 4 ? w.replace(/(ing|ed|es|s)$/, "") : w;
  return base.length > 4 ? base.replace(/e$/, "") : base; // relocate, relocating -> relocat
}

export function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9+#.]+/g) ?? [])
    .map((t) => t.replace(/^\.+|\.+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);
}

type Doc = { chunk: KbChunk; tf: Map<string, number>; len: number };

function buildIndex(chunks: KbChunk[]) {
  const docs: Doc[] = chunks.map((chunk) => {
    // Title and tags count three times so they outweigh incidental words in the body.
    const tokens = tokenize(`${chunk.title} ${chunk.tags} `.repeat(3) + chunk.text);
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { chunk, tf, len: tokens.length };
  });
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  const avgLen = docs.reduce((s, d) => s + d.len, 0) / Math.max(docs.length, 1);
  return { docs, df, avgLen, n: docs.length };
}

const INDEX = buildIndex(CHUNKS);
const K1 = 1.4;
const B = 0.4; // low length penalty: chunks are short and uneven

export type Retrieval = {
  chunks: KbChunk[];
  matched: boolean; // false means nothing matched, so every chunk was returned
};

/**
 * `queries` is the visitor's recent messages, newest last. The newest counts double
 * so follow-ups like "tell me more" still carry the earlier topic.
 */
export function retrieve(queries: string[], topK = 4, index = INDEX): Retrieval {
  const weights = new Map<string, number>();
  queries.slice(-2).forEach((q, i, arr) => {
    const w = i === arr.length - 1 ? 2 : 1;
    for (const t of tokenize(q)) weights.set(t, (weights.get(t) ?? 0) + w);
  });

  const scored = index.docs.map((d) => {
    let score = 0;
    for (const [term, qw] of weights) {
      const f = d.tf.get(term);
      if (!f) continue;
      const df = index.df.get(term) ?? 0;
      const idf = Math.log(1 + (index.n - df + 0.5) / (df + 0.5));
      score += qw * idf * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * d.len) / index.avgLen)));
    }
    return { chunk: d.chunk, score };
  });

  const hits = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  if (hits.length === 0) return { chunks: index.docs.map((d) => d.chunk), matched: false };

  const picked = hits.slice(0, topK).map((h) => h.chunk);
  // The short intro is always included so the model never answers without basic context.
  const intro = index.docs.find((d) => d.chunk.id === "profile")?.chunk;
  if (intro && !picked.includes(intro)) picked.unshift(intro);
  return { chunks: picked, matched: true };
}
