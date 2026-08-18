# 03 — Sanity CMS Integration

**Scope:** `tutorialls/src/sanity/`, `src/@module/.../sanity.*`, `src/hook/cms/*`, `src/component/lazy/*`.
**Verdict:** ⚠️ Working end-to-end (parameterized GROQ, graceful fallbacks, good DI plumbing) — but it's a **minimal key-value store**, not a real CMS model, and it bypasses Next.js's server-side CMS tooling entirely.

---

## 1. Content Schemas — only two document types

Registered in `src/sanity/schemaTypes/index.ts`:

| Document | File | Fields | Validation |
|---|---|---|---|
| `paragraphs` | `src/sanity/schemaTypes/schemas/typography/paragraph.schema.ts` | `identifier: string`, `body: string` | **None** — `identifier` not even required |
| `images` | `src/sanity/schemaTypes/schemas/images.schema.ts` | `identifier: string` (required), `imageD: image` (hotspot: true) | `identifier` required; **`imageD` typo'd field name** |

**Assessment — content-modeling quality: 3/10.**

- Flat `identifier → value` registry; no portable text/rich text, references, arrays, localization (`loc`), categories/tags, SEO fields, or ordering.
- Inconsistent validation: `paragraphs.identifier` unvalidated vs `images.identifier` required — an empty identifier silently returns nothing and the app falls back to hardcoded defaults.
- `imageD` (`images.schema.ts:8`) propagates into GROQ (`imageD.asset->url`) — invisible to future maintainers.
- Studio structure is default (`src/sanity/structure.ts` → `S.documentTypeListItems()`); Vision tool enabled (`sanity.config.ts:23-27`).

---

## 2. Two Sanity Clients — one dead, one live

| Client | File | Status |
|---|---|---|
| `createClient({ apiVersion: '2024-08-28', useCdn: true })` | `src/sanity/lib/client.ts` | 💀 **Dead code** — zero imports in `src/` |
| `createImageUrlBuilder` → `urlFor` | `src/sanity/lib/image.ts` | 💀 **Dead code** — never imported |
| DI factory `createClient({projectId, dataset, useCdn})` (***no `apiVersion`***) | `src/@module/infra/engine/gateway/cms/sanity/sanity.engine.ts` | ✅ **Live** — injected via Inversify into `SanityCMSGateway` |

### 🔴 The CDN flag bug

```ts
// src/@module/infra/config/env/env.config.ts:23
CDN: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true' || true,
```

`|| true` makes the flag **always truthy**. Setting `NEXT_PUBLIC_SANITY_USE_CDN="false"` changes nothing — the CDN is permanently on. The live engine also omits `apiVersion` (the dead client sets it explicitly — contradictory conventions; the fallback '2024-08-28' lives in `src/sanity/env.ts`).

**Config plumbing otherwise works:** `config.module.ts:30-37` → `config.factory.ts:24-35` → engine factory.

---

## 3. GROQ Queries — exactly two in the codebase

```groq
// src/@module/application/gateway/cms/sanity/sanity.gateway.ts:18
*[_type == "paragraphs" && identifier == $identifier][0]{ body }

// sanity.gateway.ts:24
*[_type == "images" && identifier == $identifier][0]{ "imageUrl": imageD.asset->url }
```

- ✅ **Parameterized** (`$identifier`) — no injection surface.
- ❌ **N+1 pattern** — every CMS snippet is its own HTTP round-trip. The welcome page fires 2 queries (title + image); the tutorials page 1 (H1). No batching (`*[_type in [...]]`).
- ❌ **Raw `asset->url`** — the `@sanity/image-url` builder (`src/sanity/lib/image.ts`, `urlFor`) is never used, so no resizing/cropping/hotspot-aware URLs. `next/image` receives a full-size original with hardcoded `width={600} height={300}` (`app/page.tsx:12-19`). Hotspot data (enabled in the `images` schema) is discarded.
- ✅ `next.config.mjs` allowlists `cdn.sanity.io` (+ `images.pexels.com`) for the image optimizer.

---

## 4. Fetch Strategy — 100% Client-Side

```
Browser (React Query useQuery)
   └─ useParagraph / useImage  →  ['paragraph_' + id]  ←⚠️ collision
        └─ SanityCMSGateway (DI)
             └─ createClient (CDN always on)
                  └─ GROQ single-doc lookup (N+1)
```

| Dimension | Verdict |
|---|---|
| **Server-side fetching** | ❌ Zero — no RSC data load, no `generateStaticParams`, no ISR `revalidate`, no draft/preview. The only SSR caching target is the tutorial API (`next: { tags: [url] }` in `HttpNodeEngine` — itself never used) |
| **Cache hygiene** | ❌ `image.hook.ts:12` and `paragraph.hook.ts:12` share `queryKey: ['paragraph_' + id]` — image/paragraph caches overwrite each other |
| **Staleness** | ❌ No `staleTime` (default 0 → refetch on every mount) |
| **Resilience** | ✅ `defaultValue` fallbacks everywhere (`paragraph.component.tsx`, `image.component.tsx`) — but failures are silent (no error state surfaces) |

**The "static content / performance" README claim is aspirational:** content is fetched in the browser on **every visit**; the CMS adds a runtime dependency to the welcome screen rather than the SSG/ISR win claimed. The one genuine win is the **identifier-keyed copy primitive** — it cleanly enables i18n variants and A/B copy experiments (currently only 2 document instances use it).

---

## 5. Studio Route

| Piece | File |
|---|---|
| Studio config | `tutorialls/sanity.config.ts` — `basePath: '/studio'`, projectId/dataset from `src/sanity/env`, `structureTool({structure})` + `visionTool` |
| CLI config | `tutorialls/sanity.cli.ts` — from `NEXT_PUBLIC_SANITY_PROJECT_ID`/`DATASET` |
| Mount | `src/app/studio/[[...tool]]/page.tsx` — catch-all, `force-static`, exports metadata/viewport from `next-sanity/studio` |

- ⚠️ `src/sanity/env.ts` reads `NEXT_PUBLIC_SANITY_API_VERSION` — **present in neither `.env.example` nor `.env.local.example`** (the fallback `'2024-08-28'` silently applies).

---

## 6. Data-Pipeline Scorecard

| Dimension | Score | Evidence |
|---|---|---|
| Schema quality | 3/10 | 2 flat key-value docs; no portable text/localization/SEO/references |
| Query efficiency | 4/10 | N+1; no batching; no projection reuse |
| Runtime strategy | 4/10 | client-only fetch; CDN flag bug; no revalidation on publish |
| Resilience | 6/10 | default fallbacks; silent failure when Sanity is down |
| Reproducibility | 5/10 | documented env vars + `assertValue` good; dead-code paths confuse |

---

## 7. Recommendations

| Priority | Item | Notes |
|---|---|---|
| 🔴 High | Fix CDN flag → `=== 'true'` (no `\|\| true`) and add `apiVersion` to the DI client | `env.config.ts:23`; `sanity.engine.ts` |
| 🔴 High | Eliminate the query-key collision | `image.hook.ts:12` → `'image_' + id` |
| 🟠 Medium | Add `staleTime`/`gcTime` for CMS queries | Currently refetch on every mount |
| 🟠 Medium | Upgrade schemas: make `identifier` required on `paragraphs`; rename `imageD` → `image`; consider `portable text` + references for real editorial content | `images.schema.ts:8`, `paragraph.schema.ts` |
| 🟠 Medium | Use `urlFor`/image builder for resized, hotspot-aware URLs | `src/sanity/lib/image.ts` is already written — wire it in |
| 🟡 Low | Batch GROQ (`*[_type in ['paragraphs','images'] && identifier in $ids]`) for pages with several snippets | kills the N+1 pattern |
| 🟡 Low | Server-side strategy decision (ADR): ISR + `revalidateTag` on a Sanity webhook vs keeping `LazyParagraph` client-side; add preview mode | recommended escalation: @wilson-architect |
| 🧠 Future | Sanity as structured tutorial content enables RAG/chunking; embeddings + Redis (already in compose) is the shortest path to semantic search | see findings F-36 |

**Recommended escalation:** @tiago-dev for the CDN/env fix, label association and search `<select>`; @wilson-architect for the server-side CMS ADR.