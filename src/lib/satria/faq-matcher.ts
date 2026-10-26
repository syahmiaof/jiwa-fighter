import { SATRIA_FAQ, type SatriaFaq, type SatriaLanguage } from '@/data/satria-faq';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'at', 'can', 'do', 'does', 'for', 'how', 'i', 'in', 'is', 'it', 'my', 'of', 'on', 'the', 'to', 'what', 'where', 'which', 'with',
  'ada', 'apa', 'adakah', 'bagaimana', 'boleh', 'dan', 'di', 'dengan', 'ke', 'macam', 'mana', 'saya', 'untuk', 'yang', 'nak', 'ini', 'itu', 'berapa',
]);

export function normalizeSatriaText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value: string): string[] {
  return normalizeSatriaText(value).split(' ').filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function scoreAgainst(query: string, candidate: string): number {
  const normalizedQuery = normalizeSatriaText(query);
  const normalizedCandidate = normalizeSatriaText(candidate);
  if (normalizedQuery === normalizedCandidate) return 1;
  if (normalizedQuery.length >= 7 && normalizedCandidate.includes(normalizedQuery)) return 0.92;
  if (normalizedQuery.length >= 7 && normalizedQuery.includes(normalizedCandidate)) return 0.86;

  const queryTokens = tokens(query);
  const candidateTokens = tokens(candidate);
  if (queryTokens.length === 0 || candidateTokens.length === 0) return 0;
  const intersection = queryTokens.filter((token) => candidateTokens.includes(token)).length;
  const coverage = intersection / queryTokens.length;
  const jaccard = intersection / new Set([...queryTokens, ...candidateTokens]).size;
  return (coverage * 0.68) + (jaccard * 0.32);
}

function scoreEntry(query: string, faq: SatriaFaq, language: SatriaLanguage): number {
  const phrases = [faq.question[language], ...faq.aliases[language]];
  return Math.max(...phrases.map((phrase) => scoreAgainst(query, phrase)));
}

export interface FaqMatch {
  faq: SatriaFaq;
  score: number;
}

export function findFaqMatch(query: string, language: SatriaLanguage): FaqMatch | null {
  const ranked = SATRIA_FAQ
    .map((faq) => ({ faq, score: Math.max(scoreEntry(query, faq, language), scoreEntry(query, faq, language === 'en' ? 'bm' : 'en') * 0.88) }))
    .sort((a, b) => b.score - a.score);
  const best = ranked[0];
  const runnerUp = ranked[1];
  if (!best || best.score < 0.48 || (runnerUp && best.score - runnerUp.score < 0.045)) return null;
  return best;
}

export function retrieveRelevantFaqs(query: string, language: SatriaLanguage, limit = 3): FaqMatch[] {
  return SATRIA_FAQ
    .map((faq) => ({ faq, score: Math.max(scoreEntry(query, faq, language), scoreEntry(query, faq, language === 'en' ? 'bm' : 'en') * 0.88) }))
    .filter((item) => item.score >= 0.12)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
