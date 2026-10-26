import { NextResponse } from 'next/server';
import { findFaqMatch, retrieveRelevantFaqs } from '@/lib/satria/faq-matcher';
import { generateSatriaFallback, getSatriaProviderConfig, type SatriaHistoryMessage } from '@/lib/satria/provider-adapter';
import type { SatriaLanguage } from '@/data/satria-faq';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 12_000;
const MAX_MESSAGE_CHARS = 700;
const MAX_HISTORY = 6;
const RATE_LIMIT = 18;
const RATE_WINDOW_MS = 5 * 60_000;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const ALLOWED_PATHS = new Set([
  '/', '/shop', '/collections/silat-series', '/products/keris-tuah', '/lookbook',
  '/our-story', '/custom', '/size-guide', '/support',
]);

function response(message: string, mode: string, status = 200, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ message, mode, ...extra }, { status, headers: { 'Cache-Control': 'no-store' } });
}

function requestKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  return forwarded || realIp || 'unknown';
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  for (const [bucketKey, bucket] of rateBuckets) {
    if (bucket.resetAt <= now) rateBuckets.delete(bucketKey);
  }
  if (rateBuckets.size > 5_000) rateBuckets.clear();
  const current = rateBuckets.get(key);
  if (current && current.resetAt > now && current.count >= RATE_LIMIT) return true;
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
  } else {
    current.count += 1;
  }
  return false;
}

function validHistory(value: unknown): SatriaHistoryMessage[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > MAX_HISTORY) return null;
  const result: SatriaHistoryMessage[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const message = item as Record<string, unknown>;
    if ((message.role !== 'user' && message.role !== 'assistant') || typeof message.content !== 'string' || message.content.length > MAX_MESSAGE_CHARS) return null;
    result.push({ role: message.role, content: message.content.trim() });
  }
  return result;
}

async function readBoundedBody(request: Request): Promise<string | null> {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let byteCount = 0;
  let text = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteCount += value.byteLength;
      if (byteCount > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) return response('Request is too large.', 'invalid', 413);
  const networkKey = requestKey(request);
  // Local development may not have proxy IP headers; do not rate-limit every
  // developer/test visitor under one shared `unknown` bucket.
  if (networkKey !== 'unknown' && isRateLimited(networkKey)) return response('Too many messages. Please wait a moment and try again.', 'rate-limited', 429);

  const rawBody = await readBoundedBody(request);
  if (rawBody === null) return response('Request is too large.', 'invalid', 413);

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return response('Invalid request format.', 'invalid', 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return response('Invalid request format.', 'invalid', 400);

  const payload = body as Record<string, unknown>;
  const language = payload.language;
  const message = payload.message;
  const pathname = payload.pathname;
  const history = validHistory(payload.history);
  if ((language !== 'en' && language !== 'bm') || typeof message !== 'string' || !message.trim() || message.trim().length > MAX_MESSAGE_CHARS || typeof pathname !== 'string' || !history) {
    return response('Check the message and try again.', 'invalid', 400);
  }

  const safePath = ALLOWED_PATHS.has(pathname) ? pathname : '/';
  const safeMessage = message.trim();
  const match = findFaqMatch(safeMessage, language as SatriaLanguage);
  if (match) {
    return response(match.faq.answer[language as SatriaLanguage], 'faq', 200, {
      faqId: match.faq.id,
      href: match.faq.href,
      verification: match.faq.verification,
    });
  }

  if (!getSatriaProviderConfig()) {
    return response(
      language === 'bm'
        ? 'Maklumat itu belum dapat disahkan dan AI belum disambungkan. Semak halaman Sokongan atau FAQ di bawah untuk jawapan yang tersedia.'
        : 'I can’t verify that information, and the AI provider is not connected yet. Check Support or the FAQs below for available answers.',
      'unavailable', 503, { href: '/support' },
    );
  }

  try {
    const answer = await generateSatriaFallback({
      message: safeMessage,
      language: language as SatriaLanguage,
      pathname: safePath,
      history,
      knowledge: retrieveRelevantFaqs(safeMessage, language as SatriaLanguage),
    });
    if (!answer || answer.length > 1_500) throw new Error('SATRIA_EMPTY_OR_OVERSIZED_RESPONSE');
    return response(answer, 'llm', 200, { href: '/support' });
  } catch {
    return response(
      language === 'bm'
        ? 'Satria tak dapat menyemak jawapan sekarang. Polisi atau butiran yang belum disahkan perlu dirujuk kepada pasukan melalui halaman Sokongan.'
        : 'Satria can’t verify an answer right now. Please check with the team through Support for unconfirmed policies or details.',
      'unavailable', 503, { href: '/support' },
    );
  }
}
