# Abdul.exe fix: setup in 10 minutes

## 1. Copy the files
Unzip this folder over your project root. The paths match your repo:

- `src/app/api/chat/route.ts` (replaces the old one)
- `src/components/AbdulExe.tsx` (replaces the old one)
- `src/lib/abdul-kb.ts` (new: your knowledge, split into sections)
- `src/lib/retrieve.ts` (new: finds the sections relevant to each question)
- `src/lib/chat-core.ts` (new: validation, rate limit, calling Gemini or Claude, error codes)
- `scripts/eval-abdul.mjs` (new: 12-question check)

Then delete `src/lib/abdul-knowledge.ts`. It is no longer used and still says
"RAG pipelines" and "freelance", which you do not want a bot to repeat.

## 2. Get a free Gemini key and set it (the usual reason it shows "Connection hiccup")
- Go to https://aistudio.google.com, sign in with your Google account, click **Get API key**, create a key. No card needed. This is separate from your Gemini Pro subscription.
- Open https://aistudio.google.com/rate-limit to see your current free limits.
- Local: in `.env.local` add `GEMINI_API_KEY=AIza...` (no quotes, no spaces). Restart `npm run dev`.
- Vercel: Project > Settings > Environment Variables > add `GEMINI_API_KEY`
  for Production (and Preview). **Then redeploy.** A variable added after the last
  deploy does nothing until you redeploy.
- Never name it `NEXT_PUBLIC_...` and never commit it. `.env*` is already in `.gitignore`.
- If the key was ever pasted into a chat or screenshot, create a new one in AI Studio and delete the old one.
- Optional: `GEMINI_MODEL=<name>` forces a model. Copy the exact name from AI Studio's model list. Default order tried: `gemini-3.8-flash`, `gemini-3.6-flash`, `gemini-3.5-flash-lite`.
- Free tier note: Google may use free-tier prompts and responses to improve its products. Your knowledge file contains personal details (including your father's story), so keep it to what you are happy to share publicly. Visitors' messages go to Google too.
- Free tier has daily and per-minute caps. If many people chat at once you may see "busy". That is fine for a demo.
- (Optional) If you later get an Anthropic key, set `ANTHROPIC_API_KEY` instead and the same code uses Claude. If both are set, Gemini wins.

## 3. Check it works
1. Open `https://YOUR-SITE/api/chat` in a browser. You should see
   `{"ok":true,"keyPresent":true,"provider":"gemini","models":[...]}`. If `keyPresent` is false, step 2 is not done.
2. Open the chat and ask: "Tell me about the Lala Motors ERP". The answer should
   show a small `sources: ...` line under it.
3. Run `node scripts/eval-abdul.mjs https://YOUR-SITE` and read every answer.

## 4. If it still fails
Vercel > your project > Logs, search `[abdul.exe]`. The code tells you the cause:

| Code | Meaning | Fix |
|---|---|---|
| missing_key | key not set in this environment | step 2, then redeploy |
| auth | key rejected (400 invalid key, 401 or 403) | make a new key in AI Studio, update Vercel, redeploy |
| billing | (Claude only) no credit on the account | add credit in the console |
| model | none of the model names worked | set `GEMINI_MODEL` to a name from AI Studio's model list |
| upstream | Gemini busy, free quota hit, timed out or network error | wait a minute and retry; it tries the next model itself |
| rate_limited | 25+ messages in 10 minutes from one visitor | wait; normal limit |

## 5. What to edit later
Only `src/lib/abdul-kb.ts`. Add a new chunk (`id`, `title`, `tags`, `text`) for any
new fact. Put the words people will type into `tags`. Keep every line true.

## 6. Be able to explain it in an interview
- The browser sends the chat to my own route, `/api/chat`. The key stays on the server.
- The route validates the messages (roles, length, max 20), applies a per-visitor
  rate limit, then retrieves the most relevant sections of my notes with BM25
  keyword scoring (no vector database, no embeddings) and adds them to the prompt.
- It calls Google's Gemini API (`generateContent`) with my notes as the system instruction. If a model is missing or its free quota is used up, it tries the next one.
- Visitors only see safe error messages; the details go to the server logs.
- Weaknesses: the rate limit is per server instance (the real cap is the free-tier quota); keyword search can miss unusual wording; there is no streaming.
