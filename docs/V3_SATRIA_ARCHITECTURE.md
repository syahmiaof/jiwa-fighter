# SATRIA Architecture

## Flow

1. The client sends one question, current approved route, locale and at most six recent text messages to `POST /api/satria/chat`.
2. The server validates language, route, history, message and request size. Inputs are not logged.
3. `findFaqMatch` searches all 30 bilingual FAQ entries, including aliases in either language. A confident match returns the reviewed local answer without calling a model.
4. An unmatched question uses `retrieveRelevantFaqs` to provide up to three knowledge entries to the optional AI SDK adapter.
5. `generateSatriaFallback` calls the Vercel AI Gateway through AI SDK `generateText` only when both `AI_GATEWAY_API_KEY` and `SATRIA_MODEL` exist. Credentials remain server-side. The adapter has no tools and a 12-second abort timeout.
6. Missing configuration or provider failures return a localized, honest unavailable message with a Support link.

## Guardrails

- The model is instructed to make business claims only from retrieved entries; `pending-confirmation` entries must not be presented as definite policies.
- Replies do not generate clickable links. The client accepts only a fixed internal route allowlist; the server selects a known FAQ URL or `/support`.
- Order, payment, fulfillment, form-submission and messaging integrations are not present. SATRIA must never claim to have performed them.
- Request constraints: 700 characters per user/history message, at most six history items, 12 KB JSON body, and an in-process best-effort limit of 18 requests per key per five minutes.
- The in-process rate limit is prototype protection only. It is not shared across serverless instances and is not a production cost-abuse boundary. Add an edge/provider-level limiter and budget before exposing a configured model publicly.
- Model output is capped at 180 tokens, a 12-second abort signal, and a 1,500-character response limit.

## Configuration

Copy `.env.example` to a local environment file and provide a server-side AI Gateway key plus a model identifier supported by that account. Do not use `NEXT_PUBLIC_` for credentials. With either variable absent, deterministic FAQ answers still work and no LLM call is attempted.

## UI and overlay behavior

`SatriaConcierge` is mounted beside the shared cart/search/demo overlays. Its native dialog is keyboard-contained by the existing `useDialog` hook. The hook emits `jiwa:modal-open`; SATRIA closes synchronously when another native modal is requested. The launcher never opens the chat automatically and stays anchored to the bottom-right viewport inset on every route and section. This intentionally keeps one predictable location; page controls near that corner may sit behind the launcher. The launcher and chat header use the transparent `public/assets/brand/satria-robot-head.png` mascot; paired CSS overlays animate its eyes. Reduced-motion disables entrance/message and eye-blink animations.

## Known limits

- Business policies, current stock, shipping coverage/fees/dates, return eligibility, production lead time and teamwear MOQ are unconfirmed. The knowledge base explicitly says so.
- The FAQ content is based on currently visible site copy and catalog data; entries are marked by verification status. It is not a source of real order or account data.
- No configured provider key or model was found during this audit, so live LLM response quality and live provider timeout behavior cannot be claimed as exercised.
