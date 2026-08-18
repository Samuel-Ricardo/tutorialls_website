# 08 — Prioritized Improvement Roadmap

**How to use:** each theme lists its items in priority order with effort estimates (S = < 1 day · M = 1–3 days · L = 1–2 weeks · XL = 2+ weeks). Items reference findings in [07-findings.md](07-findings.md). **Quick wins** (⚡) are safe, high-leverage, low-risk — do them in a first pass. **Strategic items** (🧭) change how the system works — plan them as epics.

---

## 🔒 Security

| # | Action | Priority | Effort | Findings | Notes |
|---|---|---|---|---|---|
| 1 | Move `JWT_SECRET`/encryption keys out of `NEXT_PUBLIC_*`; remove `'secret'` fallbacks; rotate compromised values | 🔴 P0 | M | F-02, F-30 | Server-only env consumed by route handlers/middleware. Check git history for `.env` dumps first, then rotate |
| 2 | Verify JWTs server-side (`jwt.verify`) or remove client decode; never trust payload-only parsing | 🔴 P0 | M | F-03 | Middleware/proxy verification; client keeps only display claims; drop `password` from `IUserDTO` flow entirely |
| 3 | Per-request Authorization header (axios interceptor or token provider); kill the singleton stale header | 🔴 P0 | S | F-04 | Interceptor reads `localStorage`/session store at call time; add 401 handling → logout redirect |
| 4 | Server-side route protection (Next.js `middleware.ts`/proxy) + HttpOnly cookie sessions; add logout button | 🔴 P0 | L | F-05 | Biggest behavior change — combine with item 2. Keep `AuthWall` as UX-layer complement |
| 5 | `encodeURIComponent` on all query params | ⚡🟠 P1 | S | F-12 | `tutorial.gateway.ts:82,96,114` |
| 6 | Await `refresh()` in AuthWall before rendering; add loading state | ⚡🟠 P1 | S | F-11 | Fixes first-mount flicker + premature data requests |
| 7 | Zod `.max()` limits on all fields | 🟠 P1 | S | — | Unbounded strings → oversized payloads |

---

## 🏗️ Infra / DevOps

| # | Action | Priority | Effort | Findings | Notes |
|---|---|---|---|---|---|
| 1 | Remove committed Postgres data from git; gitignore `.docker/data/db`; consider `git filter-repo` if public | 🔴 P0 | M | F-01 | `git rm -r --cached` + ignore + history review; verify repo size drop |
| 2 | Add `.dockerignore` | ⚡🔴 P0 | S | F-06 | `node_modules`, `.next`, `.docker`, `.env*`, `.git`, `.vercel`, `coverage`, `cypress/` — stops secrets entering images |
| 3 | Multi-stage Dockerfile + `output: 'standalone'`; `npm ci --omit=dev`; `node:22-bookworm-slim`; `HEALTHCHECK`; drop runtime rebuild | 🔴 P0 | M–L | F-22 | deps → builder (ARGs for `NEXT_PUBLIC_*`) → runner `CMD ["node","server.js"]`; expect 600 MB → ~150–250 MB; remove/alias `start:docker` |
| 4 | Fix workflow: real `build-args` + `ARG`s so Sanity vars reach `next build` | 🔴 P0 | S | F-07 | Verify by pulling + starting the published image in CI |
| 5 | Compose cleanup: named PG volume, healthchecks + `service_healthy`, remove `external_links`, parameterized creds, pinned images, `restart` on `site` | 🟠 P1 | M | F-08 | `extra_hosts: ["host.docker.internal:host-gateway"]`; `postgres:17-alpine`, `redis:7-alpine` |
| 6 | Dependabot (npm + Actions + Docker) + trivy/SBOM + secret scanning; `type=sha` tags; `platforms` list; `concurrency` group | 🟠 P1 | M | F-19 | Enable GH secret scanning; cosign `--attest sbom` |
| 7 | Upgrade Next ≥ 14.2.25 (CVE-2025-29927), target 15/16; unify Node via `engines` | 🟠 P1 | L | F-21 | Retest `images.domains` → `remotePatterns` |
| 8 | `next.config.mjs` hardening: security headers, `poweredByHeader: false`, `output: 'standalone'` | 🟡 P2 | S | F-35 | CSP, X-Frame-Options, Referrer-Policy for the Vercel site |
| 9 | Root `.gitignore` beyond `node_modules`; untrack `.eslintcache`, Cypress artifacts | ⚡🟡 P2 | S | — | Add `tutorialls/.eslintcache`, `cypress/screenshots`, `cypress/videos` |

---

## 🧪 Testing

| # | Action | Priority | Effort | Findings | Notes |
|---|---|---|---|---|---|
| 1 | `npm ci` to restore the toolchain; verify `npx jest --listTests` runs | 🔴 P0 | S | F-25 | **Prerequisite for everything else** — never ship a broken install |
| 2 | Real gates: `collectCoverageFrom: ['src/**/*.{ts,tsx}']` + `coverageThreshold` (start ~19%, ratchet to 80+); remove `--passWithNoTests` | 🔴 P0 | S | F-18 | Goes together with a CI test job (item 5) |
| 3 | Fix or delete the vacuous Sanity test | ⚡🔴 P0 | S | F-17 | `go = ENV.SANITY.PROJECT.ID !== 'ProjectId'` + assert inside; or mock the client |
| 4 | Unit-test the auth path (0% today): login/signup/decode use cases, `jwt.engine.ts`, `session.store.ts`, `auth.wall.tsx`, 5 zod schemas | 🔴 P0 | M | — | Mock `useRouter`; ~1 day; highest-risk area |
| 5 | CI quality-gate workflow: `npm ci → format:verify → lint → tsc --noEmit → test:coverage → test:integration → cypress run` | 🔴 P0 | M | F-18, F-24 | Never `format:fix` in CI; cache `~/.npm`; run before Docker publish on PRs |
| 6 | Fix lint-staged: drop repo-wide globs; extend Prettier scope (`test/`, `cypress/`, configs); Cypress ESLint plugin | ⚡🟠 P1 | S | F-23 | lint-staged supplies filenames |
| 7 | Hermetic Cypress: `supportFile` + custom commands, `cy.intercept` API/Sanity stubs, `baseUrl`, journeys for update/delete/filters/invalid-login/logout/protected-route/failure-toasts | 🟠 P1 | L | F-26 | Fold the duplicated signup/login preamble into a command |
| 8 | Layer tests: services, controllers, axios/node gateways, hooks (install `@testing-library/react`), stores, forms, modals | 🟠 P1 | XL | — | Use react-hooks-testing-library for hooks |
| 9 | Wire `test/mock/**` into the suite or delete it | 🟡 P2 | S | F-25 | Currently imported by zero tests |
| 10 | Replace live-DB e2e with containerized isolation or document `docker-compose up` prerequisites | 🟡 P2 | M | — | Random users per run + cleanup |

---

## 🏛️ Architecture

| # | Action | Priority | Effort | Findings | Notes |
|---|---|---|---|---|---|
| 1 | Fix DI wiring bugs: `SERVICE` alias, NODE symbol namespace, TUTORIAL getter typing | ⚡🟠 P1 | S | F-33 | `application.factory.ts:84`, `engine.registry.ts:8`, `gateway.factory.ts:18` |
| 2 | Convert reads to `useQuery` with real keys + `invalidateQueries` after mutations; fix CMS key collision | 🟠 P1 | M | F-09, F-10 | Removes the fire-and-forget `useEffect` pattern; makes the README caching claim true |
| 3 | Dead-code sweep: `HttpNodeEngine`, encrypt/decrypt interfaces, `CachedListAllTutorial`, `filter.hook.ts`, dead schemas/types, ghost deps (styled-components, SWR) | 🟠 P1 | M | F-20 | ~−15% LOC; removes architecture-confusing artifacts |
| 4 | Fix `update.format.tsx` wrong-modal bug + `errors.title` on author field + signup modal failure handling | ⚡🟠 P1 | S | F-14 | Small, visible UX correctness fixes |
| 5 | `autor` → `author` coordinated rename (API contract + DTO + entity + UI + e2e) | 🟡 P2 | M | F-33 | Single PR across both repos; delete the `autor \|\| author` fallback |
| 6 | Rename pass: `facotry`, `uce_case`, `format`→`form`, `componente`, `alredy_exists` | 🟡 P2 | S | F-33 | With renames, update imports + tests |
| 7 | ADR: keep DI stack client-side vs server components — clarify the architecture's future shape | 🧭 P2 | M | — | Evidence: the DI graph duplicates effort on a read-heavy UI |

---

## 🗂️ Sanity CMS

| # | Action | Priority | Effort | Findings | Notes |
|---|---|---|---|---|---|
| 1 | Fix CDN flag (`=== 'true'`, no `\|\| true`) + `apiVersion` on the DI client | 🔴 P0 | S | F-15 | One-line fix with outsized effect |
| 2 | Distinct query keys + `staleTime` on CMS hooks | ⚡🟠 P1 | S | F-10 | `'image_' + id`; `staleTime: 60_000` |
| 3 | Batch GROQ for multi-snippet pages; wire `urlFor` image builder (hotspot-aware, resized URLs) | 🟠 P1 | M | F-16 | `*[_type in ['paragraphs','images'] && identifier in $ids]` |
| 4 | Schema upgrades: require `identifier` on `paragraphs`; rename `imageD`; add portable text/references when editorial content grows | 🟠 P1 | M | — | Migration for existing docs; keep `identifier` mapping |
| 5 | Server-side CMS strategy: ISR + `revalidateTag` on Sanity webhook + preview mode (ADR with architecture) | 🧭 P2 | L | F-16 | Makes the "static content" README claim true |
| 6 | Add `NEXT_PUBLIC_SANITY_API_VERSION` to env examples | ⚡🟡 P2 | S | F-30 | One-line onboarding fix |

---

## 🎨 UX / Performance

| # | Action | Priority | Effort | Findings | Notes |
|---|---|---|---|---|---|
| 1 | A11y pass: label `htmlFor`/input `id`, `aria-invalid` + `role="alert"`, focus-visible, dialog semantics (role/focus-trap/Escape), aria-labels on icon buttons | 🟠 P1 | M–L | F-27 | Highest-impact a11y work; pair with ESLint `jsx-a11y` |
| 2 | Replace "Filter by" free-text input with `<select>`; wire the search zod schema | ⚡🟠 P1 | S | F-29 | Biggest interaction-design win per LOC |
| 3 | Toast discipline: toast mutations only; loading/error states for CMS lazy components | 🟠 P1 | S | F-28 | Silent CMS failure becomes visible |
| 4 | Responsive pass: breakpoints for cards/forms/modals; scale home image; `max-w` on modal card | 🟡 P2 | M | F-34 | Then the "Responsividade" claim becomes true |
| 5 | Design tokens: move the 3 greens into the Tailwind theme; unify button hover styles | 🟡 P2 | S | — | `#111101` / `#73eb12` / `#76ff02` + shadow twin |
| 6 | Fix page metadata boilerplate ("Create Next App") + add `loading/error/not-found` states | 🟡 P2 | S | — | `layout.tsx` metadata; `Suspense` around list |
| 7 | Semantic search via embeddings (pgvector/Redis — already in compose) | 🧭 Strategic | XL | F-36 | Hybrid BM25 + vector over tutorial content; replaces brittle filter UX |

---

## ⚡ Quick Wins (first sprint — all small, independent)

1. `.dockerignore` (F-06) · 2. `git rm --cached` PG data + ignore (F-01) · 3. `encodingURIComponent` (F-12) · 4. CDN `=== 'true'` (F-15) · 5. query-key fix (F-10) · 6. fix update-modal store (F-14) · 7. `errors.title` → `errors.author` (F-33 related) · 8. vacuous test guard fix (F-17) · 9. jest thresholds + drop `--passWithNoTests` (F-18) · 10. lint-staged globs (F-23) · 11. filter `<select>` (F-29) · 12. env example alignment (F-30) · 13. root `.gitignore` + untrack `.eslintcache`/Cypress artifacts (F-25/26) · 14. metadata boilerplate

## 🧭 Strategic Epics (plan as features)

- **A. Real auth** — server-side verify + middleware + HttpOnly cookie sessions + logout (Security items 2–4)
- **B. Immutable containers** — multi-stage + standalone + build-args + digest promotion (Infra items 3–4)
- **C. Green test suite** — CI gates + threshold ratchet + hermetic e2e (Testing items 2,5,7)
- **D. Truthful product** — convert reads to `useQuery` caching, real responsive/a11y pass, fix README claims (Architecture 2, UX 3–4)
- **E. CMS maturity** — ISR+webhook, batching, richer schemas, preview mode (CMS 3–5)
- **F. Semantic search** — embeddings over tutorials content (UX 7 / F-36)