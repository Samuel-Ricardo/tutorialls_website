# 04 — Infrastructure: Docker, Compose, CI/CD, Vercel & Env

**Scope:** `Dockerfile` (14 lines), `docker-compose.yaml` (6 services), `.github/workflows/docker-publish.yml` (the only workflow), Vercel deployment, env configuration.
**Verdict:** Solid *foundations* (non-root user, lockfile installs, GH Actions cache, keyless cosign signing, gitignored env files) held together by **accidental behaviors** — plus two genuinely dangerous items: **tracked database files** and **browser-exposed secrets**.

---

## 1. Dockerfile Critique (`tutorialls/Dockerfile`)

| Line | Content | Assessment |
|---|---|---|
| 1 | `FROM node:20.10.0-slim` | ⚠️ Non-root `USER node` ✅. **Single-stage** ❌. Base pinned to an exact Oct-2023 tag — Node 20 is **EOL (April 2026)**; pin `node:22-bookworm-slim` or a current 20/22 patch |
| 6 | `COPY --chown=node:node package*json ./` | ✅ Correct order for `npm ci` layer caching |
| 7 | `RUN npm ci` | ❌ Installs **devDependencies** (Cypress ~200 MB+, Jest, ESLint) — no `--omit=dev` |
| 9 | `COPY --chown=node:node . .` | ❌ **No `.dockerignore`** — ships `.env`/`.env.local` (real local secrets), `node_modules` if present, and `.docker/` (62 MB Postgres data) into build context/layers |
| 10 | `RUN npm run build:clean` | ⚠️ `build:clean` = `code:ci && build` → `format:fix` (**mutates sources during image build — non-hermetic**), `lint`, `test:coverage` (**`--passWithNoTests`** — passes with zero tests), then `next build` |
| 12 | `CMD ["npm", "run", "start:docker"]` | ❌ `start:docker` = `npm run build && npm run start` (`package.json:10`) — **rebuilds the entire app at container start**: double build time, memory spikes at boot, non-immutable artifact. `output: 'standalone'` not used → image retains full `node_modules` |

**Image size reality:** base ~180 MB + full `node_modules` + `.next` + `.docker` (62 MB) + env files → realistic **600 MB–1 GB** image carrying source, dev tools and (locally) secrets.

---

## 2. docker-compose Services (`tutorialls/docker-compose.yaml`)

| Service | Image / Build | Ports | Volumes | Issues |
|---|---|---|---|---|
| `site` (2–16) | `build: .` | `3000:3000` | **bind mount `.:/home/node/app`** | ❌ Masks image `node_modules`/`.next` with host dirs (Windows/JS perf pitfall; no anonymous volume); no `restart:` (all others have it); `depends_on: api` is start-order only |
| `api` (18–30) | `ghcr.io/samuel-ricardo/tutorialls_api:main` | `3001:3000` | — | Rolling `main` tag (fine for dev); env from `.env` |
| `redis` (32–40) | `image: redis` | `6379:6379` | — | ❌ **Unpinned `latest`**; no healthcheck |
| `rabbitmq` (42–57) | `rabbitmq:3-management-alpine` | `5672`, `15672` | host dirs `~/.docker-conf/...` | ❌ Hardcoded `admin`/`admin` creds; fixed `container_name` → collisions |
| `postgres` (59–73) | `postgres:latest` | `5432:5432` | **`./.docker/data/db` — inside repo, tracked by git!** | ❌ Unpinned `latest`; hardcoded `root`/`root`; 1,285 committed files |
| `pgadmin` (75–90) | `dpage/pgadmin4` | `5050:80` | `./.docker/data/pgadmin` | ⚠️ Default `admin@example.com`/`admin` on a LAN-accessible port |

**All services:** `external_links: ['host.docker.internal']` — legacy Compose v1 syntax; `host.docker.internal` is natively provided by Docker Desktop. Replace with `extra_hosts: ["host.docker.internal:host-gateway"]` or delete. **No `healthcheck:` anywhere**, no `depends_on: condition: service_healthy`.

### ⚠️ README port claim — wrong (must fix)

> README says: `POSTGRESQL: http://localhost:27017 | [DATABASE]`
> **Reality:** the only DB service is `postgres` on **`5432:5432`** (`docker-compose.yaml:62-63`), connection string `postgresql://root:root@postgres:5432/tutorialls_database` (`.env.example:8`).
> `27017` is **MongoDB's default port** — a stale copy-paste. The README also lists "MongoDB" in its tech list; no Mongo service or client exists. **The stack runs PostgreSQL.**

---

## 3. CI/CD — `.github/workflows/docker-publish.yml` (only workflow)

| Aspect | Evidence | Assessment |
|---|---|---|
| Triggers | push `main` + tags `v*.*.*`; PRs to `main` (11–16); commented-out cron (9–10) | ✅ Sensible; cron disabled |
| Jobs | Single `build` job (30) | ❌ **No lint/test/typecheck job**, no Cypress (config exists, never runs in CI), no Vercel workflow |
| Permissions | `contents: read`, `packages: write`, `id-token: write` | ✅ Least-privilege, correct for keyless signing |
| Caching | `cache-from/to: type=gha, mode=max` | ✅ Good BuildKit cache |
| Signing | cosign keyless (non-PR), Fulcio identity | ✅✅ Good practice |
| **Env → build** | `env:` blocks (18–24, 79–81) set `NEXT_PUBLIC_SANITY_*` | ❌ **Never reach the Docker build.** `docker/build-push-action` only passes values via `build-args:` + `ARG`s in the Dockerfile — neither exists. The published image builds with fallback `'ProjectId'`/`'development'` (`env.config.ts:19,21`) and `src/sanity/env.ts:9-12` **throws at import** — the runtime rebuild (start:docker) is what accidentally "saves" it |
| Multi-arch | Comment promises "multi-platform" (52–54); **no `platforms:` input** (83–90) | ❌ Builds only `linux/amd64` |
| Tags | metadata-action defaults → rolling `main`/`latest`/`v*` | ⚠️ No `sha-` tag → can't pinpoint/promote exact artifacts; `main` can be overwritten by a broken build |
| Security scanning | none | ❌ No trivy/grype, no `npm audit`, no dependabot, no secret scanning |
| Concurrency | none | ⚠️ Two pushes race on the same `:main` tag |

**Missing workflows:** no PR quality-gate CI (lint/typecheck/jest with thresholds), no Vercel deploy/preview (out-of-band via git integration), no dependabot config.

---

## 4. Vercel Deployment Notes

- Frontend is deployed via Vercel git integration → **https://tutorialls-website.vercel.app/** (out-of-band; no workflow file).
- No `vercel.json` — headers/regions/cron are all Vercel defaults.
- **Next.js `14.2.7` is below `14.2.25`, which fixed CVE-2025-29927** (middleware authorization bypass). No `middleware.ts` exists here, so the direct surface is limited — but the package is nonetheless flagged; plan 15/16 upgrade.
- **Three uncoordinated Node versions**: Docker `20.10.0`, `@types/node ^20` locally, Vercel's runtime. No `engines` field anywhere → silent drift.

---

## 5. Environment Variables

### `.env.local.example` (frontend) — all `NEXT_PUBLIC_*` ⇒ **all inlined into the browser bundle**

| Variable | Consumed by | Public? | Flag |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | `env.config.ts:7` | ✅ genuinely public | OK |
| `NEXT_PUBLIC_JWT_SECRET` | `env.config.ts:10` (fallback `'secret'`) | ❌ **secret** | 🔴 **Shipped to browser** |
| `NEXT_PUBLIC_ENCRYPT_KEY` | `env.config.ts:13` reads `NEXT_PUBLIC_ENCRYPTION_KEY` | ❌ **secret** | 🔴 **Shipped to browser** + ⚠️ **name mismatch** → always falls back to `'secret'` |
| `NEXT_PUBLIC_ENCRYPT_ALGORITHM` / `_BREAKPOINT` | `env.config.ts:14-15` (reads `ENCRYPTION_*`) | ⚠️ | Same mismatch — fallbacks used |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` | `env.config.ts:19,21`; `src/sanity/env.ts` | ✅ public | OK |
| `NEXT_PUBLIC_SANITY_USE_CDN` | `env.config.ts:23` | ✅ public | ⚠️ `\|\| true` bug — see docs/03 |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `src/sanity/env.ts` | ✅ public | ⚠️ **missing from both example files** |
| `NEXT_PUBLIC_RABBITMQ_*` | — | — | 💀 unused in frontend code |

### `.env.example` (API-side boilerplate in the frontend repo)

- Header literally says *"This was inserted by `prisma init`"* — **Prisma is not installed in this repo** (grep lockfile) and `db:sync` (`package.json:24`) runs a nonexistent CLI. **Vestigial config** belonging to the companion API.
- Contains dev-placeholder creds (`root/root`, `admin/admin`, `JWT_SECRET="secret"`) — fine only as dev defaults.

### Git hygiene

- ✅ `.env` / `.env.local` are gitignored (`tutorialls/.gitignore:7-8,40`) and untracked; only `.env*.example` tracked.
- ❌ **Root `.gitignore` contains only `node_modules`** — env files at repo root would not be ignored.
- ❌ `.eslintcache` is tracked; Cypress screenshots/videos (incl. **a failed-run screenshot/video**) are tracked.

---

## 6. Prioritized DevOps Recommendations

**P0 — security/data integrity**
1. **Remove `tutorialls/.docker/data/db` from git** — `git rm -r --cached` + ignore; verify history (commits `df2f45c`, `827b04f` "database dump"), consider `git filter-repo` if the repo is public. (F-01)
2. **Add `.dockerignore`** (in `tutorialls/`): `node_modules`, `.next`, `.docker`, `.env*`, `.git`, `.vercel`, `coverage`, `cypress/`. (F-06)
3. **Move `JWT_SECRET`/encryption keys out of `NEXT_PUBLIC_`** into server-only env; remove `'secret'` fallbacks. (F-02)

**P1 — image/container correctness**
4. **Multi-stage Dockerfile** — deps → builder (ARGs for `NEXT_PUBLIC_*`) → runner with `output: 'standalone'`; `CMD ["node", "server.js"]`; `HEALTHCHECK`; `node:22-bookworm-slim`; `npm ci --omit=dev` in runner. Expect ~600 MB → ~150–250 MB. (F-22)
5. **Fix workflow**: real `build-args` + `ARG`s; `platforms: linux/amd64, linux/arm64`; `type=sha` tags; `concurrency:` group. (F-07)
6. **Compose cleanup**: named volume for Postgres; healthchecks + `depends_on: service_healthy`; `restart: unless-stopped` on `site`; drop `external_links`; parameterize creds; pin `postgres:17-alpine` / `redis:7-alpine`. (F-08)

**P2 — CI/CD gates**
7. **PR workflow** `ci.yml`: `npm ci → lint → tsc --noEmit → jest --coverage` with **real thresholds**, no `--passWithNoTests`; optional Cypress smoke. (F-18)
8. **Dependabot** (npm + Actions + Docker), GHCR scanning, trivy/SBOM, secret scanning. (F-19)
9. **Promotion by digest** — cosign `--attest sbom`; never rely on rolling `:main`.

**P3 — runtime hardening**
10. `next.config.mjs`: security headers (CSP, X-Frame-Options, Referrer-Policy), `output: 'standalone'`, `remotePatterns`, `poweredByHeader: false`. (F-35)
11. Upgrade Next ≥ 14.2.25 (CVE-2025-29927) → realistic target 15/16. (F-21)
12. Fix README port/tech claims (F-31, F-32); add `engines`; document local-without-Docker dev.