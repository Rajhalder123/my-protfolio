/**
 * Calls the portfolio's AI endpoint (netlify/functions/ask.mjs, routed as /api/ask).
 * Throws on any failure so callers can fall back to the local answer engine.
 */
export async function askAI(question, history = [], timeoutMs = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history }),
      signal: controller.signal,
    });
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.includes('application/json')) throw new Error(`AI request failed (${res.status})`);
    const data = await res.json();
    if (typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('Empty AI answer');
    return data.answer.trim();
  } finally {
    clearTimeout(timer);
  }
}

/** Splits an answer into paragraphs and "- " bullet lines for rendering. */
export function toLines(answer) {
  return answer
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}
