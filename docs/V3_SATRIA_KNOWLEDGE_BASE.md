# SATRIA Knowledge Base

`src/data/satria-faq.ts` contains 30 structured entries: six categories with five entries each. Every entry includes a unique ID, bilingual question and answer, bilingual aliases, an internal route, and a verification status.

| Category | IDs | Evidence basis |
|---|---|---|
| Brand & Heritage | `brand-01`–`brand-05` | Existing site brand copy; no unsourced company-history facts |
| Collections & Products | `product-01`–`product-05` | Current local catalog and product routes; displayed catalog prices are labelled demo values |
| Size & Fit | `size-01`–`size-05` | Current size guide and visible selector; no guaranteed fit claim |
| Preorder & Purchasing | `buy-01`–`buy-05` | Current mock cart/checkout behavior; no real payment, order or live inventory |
| Shipping & Returns | `ship-01`–`ship-05` | Explicitly unconfirmed policies, with Support handoff |
| Custom Teamwear | `team-01`–`team-05` | Current demo form; price, MOQ and lead time are not promised |

## Verification status meaning

- `site-copy`: describes wording or demo behavior that is visibly present in the site.
- `catalog-derived`: derived from local demo product records or route content; not a live availability feed.
- `pending-confirmation`: business details are not confirmed and must not be turned into a definite promise by the assistant.

The bilingual matcher normalizes case, punctuation and accents, checks direct question/alias phrases, and scores token overlap across both languages. It returns a deterministic answer only above its confidence threshold and minimum separation from the next candidate. Otherwise it invokes the optional LLM fallback or, without configuration, returns an unavailable answer.
