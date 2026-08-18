# 📚 Tutorialls Website — Documentation Suite

> **Source of truth:** This suite consolidates a deep, multi-agent analysis of the `tutorialls_website` repository (Next.js 14 frontend) — repository inventory, architecture, DevOps/infrastructure, QA/testing and Sanity CMS/UX reviews. Every claim is grounded in repo evidence with real file paths; discrepancies between README claims and code reality are called out explicitly.

The app lives in `./tutorialls/`. This is the **frontend** repo; the backend is the separate [Tutorialls_API](https://github.com/Samuel-Ricardo/Tutorialls_API) (NestJS) repo.

---

## 🧭 Reading Order

| Step | Doc | Why first? |
|---|---|---|
| 1 | [01-architecture.md](01-architecture.md) | Understand the (unusual) NestJS-style Inversify DI architecture inside Next.js — everything else builds on this |
| 2 | [02-frontend.md](02-frontend.md) | Pages, components, state, forms — what the user actually sees |
| 3 | [03-cms-sanity.md](03-cms-sanity.md) | The Sanity CMS integration powering static content |
| 4 | [04-infrastructure.md](04-infrastructure.md) | Docker, compose, CI/CD, Vercel, env vars |
| 5 | [05-testing-qa.md](05-testing-qa.md) | What is (and isn't) tested, quality gates, coverage math |
| 6 | [06-api-integration.md](06-api-integration.md) | The companion NestJS API and the frontend↔API contract |
| 7 | [07-findings.md](07-findings.md) | The consolidated findings register — read this before planning work |
| 8 | [08-roadmap.md](08-roadmap.md) | Prioritized action plan grouped by theme |

**Short on time?** Read `07-findings.md` (35 items, each with evidence + recommendation), then `08-roadmap.md`.

---

## 🔍 Severity Legend (used in findings)

| Severity | Meaning |
|---|---|
| 🔴 **High** | Security exposure, data-integrity risk, or broken critical path. Fix first. |
| 🟠 **Medium** | Correctness/quality defect, dead functionality, or misleading claim that degrades the product or engineering health. |
| 🟡 **Low** | Typos, naming debt, cosmetic/process friction. Fix opportunistically. |

---

## 📑 Index

| Doc | Lines* | One-line summary |
|---|---|---|
| [01-architecture.md](01-architecture.md) | ~330 | Layer map, DI module-triads, data/auth flows (mermaid), caching strategy, registry inventory, 3 purity violations with `file:line` evidence, strengths & recommendations |
| [02-frontend.md](02-frontend.md) | ~240 | Route inventory (App Router + legacy `pages/`), component catalog, zustand stores, TanStack Query vs SWR dual-use, forms + Zod schemas, UX/responsiveness/a11y findings, UI cohesion verdict |
| [03-cms-sanity.md](03-cms-sanity.md) | ~190 | Sanity schemas (`paragraphs`, `images` — `imageD` typo), dead vs live clients, CDN `\|\| true` bug, GROQ queries + N+1 pattern, Studio route, recommendations |
| [04-infrastructure.md](04-infrastructure.md) | ~250 | Dockerfile critique per line, compose services table, CI/CD analysis (`docker-publish.yml`), Vercel notes, env-var table (public vs private), prioritized recommendations |
| [05-testing-qa.md](05-testing-qa.md) | ~230 | Test suite inventory (14 unit + 1 vacuous + 6 non-hermetic e2e + 2 Cypress), coverage math (65.98% reported → ~19% effective), dead mock infra, decorative quality gates, prioritized gaps |
| [06-api-integration.md](06-api-integration.md) | ~120 | Companion NestJS stack, verified endpoint contract (9 endpoints), auth + CRUD + filter semantics, integration quality notes (`admin@admin.com`, `autor` typo) |
| [07-findings.md](07-findings.md) | ~220 | Consolidated register: 35 findings with ID, severity, area, evidence, impact, recommendation |
| [08-roadmap.md](08-roadmap.md) | ~180 | Prioritized roadmap by theme (Security, Infra/DevOps, Testing, Architecture, CMS, UX/Perf) with effort estimates; quick wins vs strategic items |

\* approximate

---

## ⚠️ Top 5 Things You Should Know

1. **A live PostgreSQL data directory is committed to git** — `tutorialls/.docker/data/db/` (1,285 of 1,515 tracked files, ~62 MB). (F-01)
2. **Secrets are shipped to the browser** — `NEXT_PUBLIC_JWT_SECRET` / `NEXT_PUBLIC_ENCRYPTION_KEY` get inlined into the client bundle. (F-02)
3. **The sanity CDN flag is always on** — `process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true' || true` in `env.config.ts:23`. (F-15)
4. **The only Sanity "integration" test is vacuous** — its guard variable is never initialized, so it always passes by skipping. (F-17)
5. **README claims don't match code reality** — PostgreSQL vs "MongoDB" (F-31), `:27017` vs `:5432` (F-32), and "search caching" that doesn't exist (F-09).

---

## 🗂️ Document Conventions

- **Evidence format:** `path:line` — e.g. `tutorialls/src/.../sanity.gateway.ts:18` — citations are verifiable in this checkout.
- **Mermaid diagrams** are used for architecture, data flow and auth sequences; rendered by GitHub.
- **README-vs-reality** discrepancies are explicitly marked: *"README says X; code shows Y"*.
- **Nothing in these docs modifies the repo** — they are analysis-only deliverables.

---

*Suite generated by Paige (Technical Writer) from five full agent analysis reports — repository inventory, deep architecture (tiago-dev), DevOps (Atlas-DevOps), QA (carla-qa), Sanity CMS + UX (ai-ml-researcher) — with direct repo spot-checks for every cited fact. Date: 2026-08-17.*