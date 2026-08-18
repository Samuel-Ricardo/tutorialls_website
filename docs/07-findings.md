# 07 — Consolidated Findings Register

**Source:** full consolidation of five agent analyses — repository inventory, deep architecture (tiago-dev), DevOps (Atlas-DevOps), QA (carla-qa), Sanity CMS + UX (ai-ml-researcher) — with direct repo spot-checks on every item below.

**Legend:** 🔴 High (security/data-integrity/critical path) · 🟠 Medium (correctness/quality) · 🟡 Low (typos/debt) · 🧠 Future (opportunity)

---

## Security

| ID | Sev | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| F-02 | 🔴 | **JWT secret + encryption key shipped to the browser** — `NEXT_PUBLIC_JWT_SECRET` / `NEXT_PUBLIC_ENCRYPTION_KEY` are inlined into the client bundle by Next.js, with weak fallbacks `'secret'` | `tutorialls/.env.local.example:3,11`; `src/@module/infra/config/env/env.config.ts:10,13` | Anyone can extract signing/encryption material from the JS bundle; keys are public | Move secrets to server-only env consumed by route handlers/middleware/proxy; delete `NEXT_PUBLIC_*` variants; remove `'secret'` fallbacks; rotate existing keys |
| F-03 | 🔴 | **JWT never verified** — `jwt.decode()` is base64 parsing; the injected `secret` is unused; any forged payload (`id/email/password`) "authenticates" | `src/@module/application/use_case/user/security/decode.use_case.ts:20,16-17` | Client-side auth can be trivially forged; no expiry/signature check | `jwt.verify()` server-side (middleware/proxy) or remove client decode entirely; keep only payload parsing for display |
| F-04 | 🔴 | **Stale `Authorization` header** — built once at field-init from `GlobalSession.user?.authToken`; Singletons freeze the header for the app lifetime → `Bearer undefined` on real requests | `src/@module/application/gateway/http/axios/tutorial/tutorial.gateway.ts:27-31` | Tutorial API calls realistically fail after login until a full remount; broken auth state machine | Compute header per-request or use an axios interceptor reading a token provider/token store |
| F-05 | 🔴 | **No server-side protection** — no `middleware.ts`, no API routes, no HttpOnly cookies; `/tutorials` HTML is served to anyone; `AuthWall` is a client redirect; JWT sits in `localStorage` (XSS-exfiltratable); `logout()` wired to no UI | `src/component/wall/auth.wall.tsx:11-16`; `src/store/session.store.ts:20,41-44`; grep: zero `middleware.ts` | Protected content exposed; token theft via XSS; no logout path | Add Next.js middleware/proxy guard with cookie sessions; add logout button; keep localStorage only for display names |
| F-11 | 🟠 | **AuthWall race** — `refresh()` (async decode + network) is fired but not awaited before `isAuthenticated()` checks localStorage → protected UI flashes, data requests fire before bounce; no loading state | `src/component/wall/auth.wall.tsx:11-16` | First-render auth flicker; requests wasted; UX confusion | Await `refresh()` (or gate on a `ready` flag) before rendering children |
| F-12 | 🟠 | **Query params not encoded** — `title`/`author`/`keyword` interpolated raw into URLs | `tutorial.gateway.ts:82,96,114` | Breaks on special characters; parameter injection surface; request-log pollution | `encodeURIComponent()` on all dynamic params |

## Infrastructure / Data / CI

| ID | Sev | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| F-01 | 🔴 | **Live PostgreSQL data directory committed to git** — 1,285 of 1,515 tracked files (~62 MB) under `.docker/data/db`; committed deliberately | `git ls-files` (1285 hits); commits `df2f45c`, `827b04f` "database dump" | Repo bloat, DB internals baked into history and every Docker image; data-lineage/secret risk | `git rm -r --cached tutorialls/.docker/data/db` + gitignore; if history is public, `git filter-repo`; rotate anything that was in those dumps |
| F-06 | 🔴 | **No `.dockerignore`** — `COPY . .` ships `.env`/`.env.local` (real secrets), `node_modules`, `.docker` (PG data) into build context/layers | `tutorialls/Dockerfile:9`; glob: no `.dockerignore` | Secrets inside local image layers; 62 MB context; broken host `node_modules` overlay | Add `.dockerignore`: `node_modules`, `.next`, `.docker`, `.env*`, `.git`, `.vercel`, `coverage`, `cypress/` |
| F-07 | 🔴 | **CI env never reaches the Docker build** — workflow `env:` blocks set `NEXT_PUBLIC_SANITY_*` but there are no `build-args:`/`ARG`s; published image builds with `'ProjectId'`/`'development'` fallbacks and `src/sanity/env.ts` throws at import | `.github/workflows/docker-publish.yml:18-24,79-81,83-90`; `Dockerfile` (no ARG) | **Published GHCR image is broken** unless runtime env is injected (the runtime-rebuild, F-22, accidentally masks it) | Add `build-args` + matching `ARG`s for `NEXT_PUBLIC_SANITY_*`; verify by pulling and starting the image in CI |
| F-08 | 🟠 | **docker-compose hygiene** — unpinned `postgres:latest`/`redis`; hardcoded creds (`root/root`, `admin/admin`, pgadmin defaults); legacy `external_links: host.docker.internal`; no `healthcheck:` anywhere; `depends_on` start-order only; `site` bind-mounts `.` without a `node_modules`/`.next` anonymous volume; `site` has no `restart:` | `docker-compose.yaml:2-90` | Non-reproducible dev stack; default creds on LAN ports; Windows/JS volume perf pitfall; fragile startup order | Named volume for PG; healthchecks + `depends_on: service_healthy`; `extra_hosts` or delete `external_links`; `${VAR:-...}` creds; pin `postgres:17-alpine`/`redis:7-alpine`; `restart: unless-stopped` on `site` |
| F-22 | 🔴 | **Container anti-patterns** — single-stage image; `npm ci` includes devDeps (Cypress ~200 MB+); **runtime rebuild at every start** (`CMD npm run start:docker` → `npm run build && npm run start`); EOL base `node:20.10.0-slim`; no `output: 'standalone'` → full `node_modules` retained; realistic 600 MB–1 GB image | `Dockerfile:1,7,10,12`; `package.json:10` | Slow cold starts, memory spikes at boot, non-immutable artifacts ("promote by digest" impossible); security surface grows with EOL base | Multi-stage: deps → builder (ARGs) → runner with `output: 'standalone'`, `CMD ["node", "server.js"]`, `npm ci --omit=dev`, `node:22-bookworm-slim`, `HEALTHCHECK`; expect ~150–250 MB |
| F-19 | 🟠 | **CI lacks supply-chain hygiene** — no dependabot config, no image scanning (trivy/grype), no `npm audit`, no secret scanning; rolling `main` tags only (no `sha-` tag → cannot pin/promote); no `platforms:` despite the "multi-platform" comment; no `concurrency:`; commented-out cron | `docker-publish.yml:9-10,52-54,70-90` | Vulnerable deps ship unnoticed; broken builds can overwrite `:main`; amd64-only image despite intent | Dependabot (npm/Actions/Docker); trivy step or build-push `sbom/provenance`; `type=sha` tags; `platforms: linux/amd64,linux/arm64`; `concurrency` group |
| F-21 | 🟠 | **Outdated runtimes, drift unmanaged** — Next `14.2.7` below `14.2.25` (CVE-2025-29927 middleware bypass); three uncoordinated Node versions (Docker `20.10.0`, `@types/node ^20`, Vercel runtime); no `engines` field | `package.json:37,54`; `Dockerfile:1` | Known CVE in dependency tree; silent version drift across dev/CI/Docker/Vercel | Upgrade Next ≥ 14.2.25 realistically 15/16 (retest `images.domains` migration); pin Node once; add `engines` |
| F-35 | 🟡 | **`next.config.mjs` is minimal** — no security headers (CSP/X-Frame-Options/Referrer-Policy), no `output: 'standalone'`, no `poweredByHeader: false`, legacy `images.domains` API (deprecated in Next 15); no `vercel.json` | `next.config.mjs:1-8` | Public site lacks baseline headers; Docker can't use standalone; future upgrade friction | Add `headers()`, `remotePatterns`, `output: 'standalone'`, `poweredByHeader: false` |

## Data Flow / State / Logic

| ID | Sev | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| F-09 | 🔴 | **README's "search caching" claim is false** — all tutorial reads (list + filters) run through `useMutation`; zero query keys, `staleTime`, `gcTime` or `invalidateQueries` anywhere | `src/hook/tutorial/list/all.hook.ts:15`, `filter/by/keyword.hook.ts:16` etc.; old `README.md:124` | Every visit re-fetches; no cache benefit; README overstates | Convert reads to `useQuery` with real keys; invalidate after create/update/delete; refresh README |
| F-10 | 🟠 | **React Query cache-key collision** — `useImage` and `useParagraph` both use `['paragraph_' + id]` | `src/hook/cms/get/image.hook.ts:12`; `paragraph.hook.ts:12` | Image and paragraph with the same id overwrite each other in cache | Distinct key prefixes (`'image_'` vs `'paragraph_'`) |
| F-13 | 🟠 | **Filter switch falls through** — `useEffect` switch has no `break`/`return`: every keystroke fires **all 3** filter API calls | `src/hook/tutorial/filter/filter.hook.ts:27-49` | 3× wasted requests, response races (dead hook today, but pattern replicated in live filter components) | Add `break`/`return`; or delete the dead hook |
| F-14 | 🟠 | **Update form closes the wrong modal** — `UpdateTutorialForm` uses `useCreateTutorialModalStore` | `src/component/form/tutorial/update.format.tsx:11,26` | Update modal stays open / create modal unmounts; confusing UX after update | Use the update store |
| F-20 | 🟠 | **Ghost deps + dead code at large** — `styled-components` and `swr` installed, zero imports; dead: `HttpNodeEngine`, `encrypt`/`decrypt` interfaces (no impls), `CachedListAllTutorial`, `filter.hook.ts`, `updateTutorialFormSchema`, `search/tutorial.schema.ts`, `src/sanity/lib/{client,image}.ts`, `ILoginOutputDTO`, unused prop types | `package.json:46,47`; multiple grep-verified files | Bundle/devDeps weight, confusing architecture story, ~−15% LOC opportunity | Remove or wire up; dead-code sweep with `knip`-style tooling |

## Sanity CMS

| ID | Sev | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| F-15 | 🔴 | **Sanity CDN flag is always on** — `=== 'true' \|\| true`; the env check is meaningless. Live DI client also omits `apiVersion` (dead sibling client sets `'2024-08-28'`) | `env.config.ts:23`; `src/@module/infra/engine/gateway/cms/sanity/sanity.engine.ts` | `USE_CDN=false` impossible; no way to bypass stale CDN during edits; API-version drift | Change to `=== 'true'`; add `apiVersion` to the DI client |
| F-16 | 🟠 | **Client-only CMS fetching + N+1 GROQ** — every snippet is its own round-trip; zero server-side CMS fetching (no RSC/ISR/preview); raw `asset->url` (no image builder, hotspot discarded); "static content / performance" README claim unmet | `sanity.gateway.ts:18,24`; `src/app/page.tsx`; `src/hook/cms/*` | Runtime dependency on Sanity at every visit; full-size images; no batching | Batch GROQ (`*[_type in [...] && identifier in $ids]`), use `urlFor`, decide ISR+webhook strategy (ADR) |

## Testing / Quality Gates

| ID | Sev | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| F-17 | 🔴 | **Vacuous Sanity "integration" test** — `let go: boolean` is `undefined`; `if (go)` never runs; logic inverted (`go=false` only for placeholder config); the single test always passes by skipping | `test/modules/application/gateway/cms/integration/sanity.gateway.spec.ts:13-27` | False green in the integration bucket — zero Sanity coverage in practice | Fix the guard (`go = ENV.SANITY.PROJECT.ID !== 'ProjectId'`), assert inside the test, or mock the Sanity client |
| F-18 | 🔴 | **Decorative quality gates** — `--passWithNoTests` on all Jest scripts (empty suite = green); no `coverageThreshold`, no `collectCoverageFrom` in jest configs; no lint/test/typecheck job in CI (tests only run incidentally in `Dockerfile`'s `build:clean`) | `package.json:16-19`; `jest.config.mjs`; `docker-publish.yml` | 0 tests would pass CI today; UI at 0% coverage forever | Real thresholds + `collectCoverageFrom: ['src/**/*.{ts,tsx}']`, drop `--passWithNoTests`, add CI quality-gate workflow |
| F-23 | 🟠 | **lint-staged runs repo-wide** — scripts contain their own globs; lint-staged passes staged files as extra args → every commit formats/lints ALL files (slow, mutates non-staged files) | `.lintstagedrc.json:2-6`; `package.json:12-13` | Pre-commit cost grows; un-staged modifications mid-commit | Use lint-staged-supplied filenames only (`eslint --fix` / `prettier --write` without globs) |
| F-24 | 🟠 | **CI chain self-mutates** — `code:ci` = `format:fix` (rewrites files) → lint → coverage; no `format:verify`, no typecheck, test:integration/Cypress not in chain | `package.json:8,23`; `Dockerfile:10` | Image builds are non-hermetic; source modified during build | `format:verify` in CI; add `tsc --noEmit`; extend chain |
| F-25 | 🟠 | **Dead test infra + stale status** — 13 mock/`@types` files imported by zero tests; coverage report 2 years old (2024-09-02: 65.98% over 51 touched files → **~19% effective whole-`src`**, UI 0%); `node_modules/jest-cli` broken → **`npm test` cannot run** | `test/mock/**` (13 files); `coverage/lcov.info` (LF=338/LH=223); `npx jest --listTests` crash | Suite not executable locally; coverage story misleading | `npm ci` first; wire or delete mock tree; re-baseline coverage from truth |
| F-26 | 🟠 | **Cypress gaps** — 2 non-hermetic specs (real API, no mocks), duplicated preamble, hardcoded `http://localhost:3000` (ignores `baseUrl`), no `supportFile`/fixtures, **never runs in CI**, committed failed-run screenshot+video (from a deleted spec), typo dir `turorials` | `cypress/E2E/*.tsx`; `cypress.config.ts:20-21`; `package.json:21` | E2E claims unverifiable; artifacts pollute history | Hermetic Cypress (cy.intercept), custom commands, CI job, ignore artifacts |
| F-30 | 🟠 | **Env-key mismatches** — `env.config.ts` reads `NEXT_PUBLIC_ENCRYPTION_*` but examples define `NEXT_PUBLIC_ENCRYPT_*` → encryption config **always falls back to `'secret'`**; `NEXT_PUBLIC_SANITY_API_VERSION` missing from both examples; `.env.example` is Prisma boilerplate with `db:sync` running a **non-installed CLI** (vestigial, belongs to API repo) | `env.config.ts:13-15`; `.env.local.example:3-5`; `.env.example:1-8`; `package.json:24` | Silent weak defaults; dead config confusing onboarding | Align variable names; document/organize env files; remove vestigial Prisma script |

## Docs / Claims

| ID | Sev | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| F-31 | 🟡 | **README lists MongoDB** — the stack runs **PostgreSQL** (API + compose); no Mongo service or client exists anywhere | old `README.md:77` | Misleading tech story; readers set up wrong expectations | Correct the tech list |
| F-32 | 🟡 | **README port claim `27017`** — actual Postgres mapping is `5432:5432` (`27017` is MongoDB's default port; copy-paste) | old `README.md:207` vs `docker-compose.yaml:62-63` | Users can't find the DB; looks broken | Fix to `localhost:5432` |

## Architecture / Code Health

| ID | Sev | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| F-33 | 🟡 | **DI wiring bugs + purity violations + typos** — `SERVICE` key aliases use-case factory; NODE symbol occupies parent namespace; TUTORIAL getter typed as Auth gateway; application gateway reads `GlobalSession` (presentation state); typo field `autor` (DTO + entity + e2e assert + UI fallback); filenames `facotry`, `uce_case`, `format`↔`form`, `componente`, `alredy_exists` | `application.factory.ts:84`; `engine.registry.ts:8`; `gateway.factory.ts:18`; `tutorial.gateway.ts:15`; `domain/entity/tutorial.entity.ts`; `domain/DTO/tutorial/tutorial.dto.ts:5-6` | Silent mis-wiring risk; contract drift between frontend and API; maintainability debt | Fix the three wiring bugs; coordinated `autor`→`author` rename across API+frontend; rename pass |

## UX / Accessibility

| ID | Sev | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| F-27 | 🟠 | **Accessibility absent project-wide** — zero `aria-*`/`role`/`htmlFor` attributes in `src/`; labels not associated; errors not announced (no `role="alert"`); `outline-none` kills focus visibility; modal has no dialog semantics/focus trap/Escape; icon-only buttons unnamed | `form/field/field.component.tsx:14-29`; `modal.component.tsx:15-25`; grep: zero `aria-` hits | Screen-reader users cannot operate forms/modals; keyboard-only users lose focus | Label/input association, `aria-invalid`/alert, `focus-visible`, dialog role + focus trap, aria-labels on icon buttons |
| F-28 | 🟠 | **Toast noise + silent failures** — passive data loads toast ("Listing tutorials... 🌌"); keystroke filters spam; CMS lazy components swallow pending/error silently | `hook/tutorial/list/all.hook.ts:23-28`; `list/filter/title.component.tsx:10-13`; `lazy/paragraph.component.tsx:6-8` | Annoying UX; failures invisible | Toast only mutations; loading/error states for lazy components |
| F-29 | 🟠 | **"Filter by" is a free-text input** — search zod schema exists but is never used; users must guess 'title'/'author'/'keyword' | `search/tutorial.component.tsx:52-61`; `validation/zod/search/tutorial.schema.ts` | Most confusing interaction in the app | Replace with `<select>`; wire the schema |
| F-34 | 🟡 | **Zero responsive breakpoints** — no `sm:/md:/lg:/xl:` or media queries in `src/`; fixed image size `600×300` + `text-5xl` + `min-w-screen` overflow small viewports; README "Responsividade" claim unverified by code | grep: zero breakpoint hits; `app/page.tsx:14-17`; `typography/h1.component.tsx:3` | Mobile experience degrades on <360 px devices | Add breakpoints for cards/forms/modals; or temper the README claim |

## Future / AI-Adjacent

| ID | Sev | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| F-36 | 🧠 | **Schema blocks RAG/CV paths** — `body` is a plain string (no portable text/chunking); hotspot data discarded via raw `asset->url`; no engagement tracking. Redis already in compose → **embeddings + vector search** is the natural upgrade for the brittle keyword filtering; identifier-keyed copy primitive is i18n/AI-copy-ready | `paragraph.schema.ts:18-20`; `images.schema.ts:11-14`; `docker-compose.yaml` redis | Missed opportunity for semantic search, recommendations, RAG | Consider pgvector/Redis embeddings over tutorial content; migrate tutorials to structured Sanity docs when RAG matters |

---

## Summary

| Severity | Count | Areas |
|---|---|---|
| 🔴 High | 12 | Security (5), Infra/CI (4), Data (1), CMS (1), Testing (1) |
| 🟠 Medium | 17 | Infra, CI, Data, Logic, CMS, Testing, Config, UX/A11y |
| 🟡 Low | 6 | Docs (2), Architecture/typos (1), UX (1), Infra (1), + Next version (1) |
| 🧠 Future | 1 | AI-path |

**Top 5 by blast radius:** F-01 (DB committed) · F-02 (secrets in bundle) · F-07 (broken published image) · F-22 (image anti-patterns) · F-17 vacuous test + F-18 decorative gates (test integrity).