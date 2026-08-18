# 05 — Testing & QA Analysis

**Verdict:** ⛔ The test suite is **not comprehensive**, and the quality gates are **decorative** — they exist on paper but cannot even execute in the current environment (`node_modules/jest-cli` is broken: `npx jest --listTests` crashes). The architecture story is strong; the test story is not.

---

## 1. Test Suite Inventory

### 1.1 Jest — 3 files, 21 test cases

| File | Tests | Covers | Honest assessment |
|---|---|---|---|
| `test/modules/application/use_case/tutorial/use_case.spec.ts` | **14** | All 7 tutorial use cases (create, update, delete, listAll, filterByAuthor, filterByKeyword, filterByTitle) — happy + failure path each | ✅ **The only real unit test file.** Mock gateway injected via `(uc as any).gateway = mockGateway` (works because of property injection). Weaknesses: bypasses DI wiring, no edge cases (empty payloads, malformed DTOs); test DTOs don't match real interfaces (`filter: 'some-filter'`, missing `limit`/`page`) |
| `test/modules/application/gateway/cms/integration/sanity.gateway.spec.ts` | **1** | Claims Sanity `getString` against real Sanity | ❌ **VACUOUS — always passes** (see §2) |
| `test/modules/application/controller/E2E/tutorial.e2e-spec.ts` | **6** | Full CRUD + filter-by-title + filter-by-keyword against the **real live API** (localhost) via `MODULES` DI factory with real JWT login | ⚠️ **Not hermetic.** Needs docker-compose API + DB + Redis. `jest.setTimeout(100000)` = **100 s** (the comment claims "10 seconds"). `beforeEach` swallows signup errors (`catch (e) {}`), uses fixed `admin@admin.com`, pollutes shared DB state, asserts `result.autor` (the typo'd field — passes only because the domain model has the same typo). Only runs under `jest-e2e.config.mjs` (`npm run test:integration`) |

### 1.2 The vacuous Sanity test — why it always passes

```ts
// test/modules/application/gateway/cms/integration/sanity.gateway.spec.ts:13-27
let go: boolean;                                // undefined — never initialized

beforeAll(() => {
  if (ENV.SANITY.PROJECT.ID == 'ProjectId') go = false;   // sets false ONLY for placeholder config

  if (go) {                                     // undefined → skipped, ALWAYS
    gateway = MODULES.APPLICATION.GATEWAY.CMS.SANITY();
    expect(gateway).toBeDefined();              // never runs
  }
});

test('should return a string', async () => {
  if (!go) return;                              // exits before any assertion
  ...
});
```

**The logic is inverted too:** when the env placeholder *is* present (`go = false`) it skips (intended), but when a **real** project id is configured (`go` stays `undefined`) it *also* skips. The gateway is never instantiated and no assertion ever executes — a **false green** in the "integration" bucket.

### 1.3 Cypress E2E — 2 specs, 2 journeys

| Spec | Journey | Assessment |
|---|---|---|
| `cypress/E2E/auth.cy.tsx` | Home → login → signup (random email) → login → redirect → token in localStorage | ⚠️ Duplicated 100% with `turorials.cy.tsx` (same 23-line preamble). **Hardcoded `http://localhost:3000`** (ignores `baseUrl`), requires real API. No logout, no invalid credentials, no protected-route test |
| `cypress/E2E/turorials.cy.tsx` (typo) | Duplicate preamble + create tutorial via modal + search by title + assert visibility | ⚠️ Only **create + title search**. No update, no delete, no author/keyword filters, no error states, no API failure paths |

**Cypress setup gaps:** `supportFile: false` (no custom commands, no `cy.intercept` defaults), no `cypress/fixtures/`, component-testing config declared but **zero component specs**.

**Committed failure artifacts:** `cypress/screenshots/login.cy.tsx/Exemplo de Teste -- [E2E] [LOGIN] = [USER] (failed).png` and `cypress/videos/login.cy.tsx.mp4` — from a `login.cy.tsx` spec that **no longer exists** (renamed rather than fixed). No `.gitignore` rule for these.

---

## 2. Jest Config Assessment

| File | ✅ | ❌ |
|---|---|---|
| `jest.config.mjs` | next/jest wrapper, ts-jest preset, jsdom, path mappers `@/ → src/`, `@test/ → test/` | No `setupFilesAfterEnv` (the `jest.setup.js` reference is commented out and the file doesn't exist); **no `coverageThreshold`**; **no `collectCoverageFrom`** (only files *loaded by tests* get counted — 126 files silently omitted); no `clearMocks` (mock gateway shared across 7 use cases — inter-test state leakage risk); no `testPathIgnorePatterns` |
| `jest-e2e.config.mjs` | Correctly scoped via `testMatch: ['**/?(*.)+(e2e-spec).[jt]s?(x)']` | Duplicated base config; same missing thresholds/setup |

**What `npm test` actually runs today:** exactly 2 files — the 14 use-case tests + the 1 vacuous sanity test (default Jest `testMatch` never picks up `e2e-spec`). The 6 live-API tests only run via `test:integration`.

---

## 3. Dead Test Infrastructure

`tutorialls/test/mock/**` — **13 files** (mock gateway module/registry/factory, mock engine module/registry/factory, mock app registry, simulated gateway, DeepMockProxies…): a **full mock-DI tree that is imported by ZERO test files** (grep-verified). `test/@types/**` likewise unused. `test/data/sanity.data.ts` is used by exactly one vacuous test.

**Either wire these into the suite (server-double DI) or delete them.**

---

## 4. Quality Gates — Status (Husky / lint-staged / scripts)

| Gate | Config | Verdict |
|---|---|---|
| Husky | `.husky/pre-commit` → `cd ./tutorialls/ && npx lint-staged` | ⚠️ Works (routes to subproject) |
| lint-staged | `tutorialls/.lintstagedrc.json` | ❌ **Broken by design**: `format:fix` and `lint:staged` contain **their own repo-wide globs** (`./src/**/*` and `**/*.{js,jsx,ts,tsx}`) — lint-staged passes the staged list *as extra args*, so **every commit runs prettier+eslint on ALL files**, not just staged. Slow; can modify non-staged files mid-commit. (`test:staged` with `--findRelatedTests` is correct) |
| Scripts | `test*` use `--passWithNoTests` (`package.json:16-19`) | ❌ **An empty suite is a green build** |
| `code:ci` | `format:fix → lint → test:coverage` | ❌ **Self-mutating** (`format:fix` rewrites files in CI), no `format:verify`, no build, no integration, no Cypress, no thresholds |
| GitHub Actions | `docker-publish.yml` | ❌ No test job — tests only run incidentally inside the Dockerfile's `build:clean`, with `--passWithNoTests` and no thresholds |
| Prettier scope | `./src/**` only | ⚠️ `test/`, `cypress/`, configs, `sanity.*.ts` never checked/formatted |
| ESLint | `next/core-web-vitals` + prettier | ⚠️ No custom rules, no type-aware linting, no Cypress plugin (specs use `cy` global), `.eslintcache` tracked |

---

## 5. Coverage — Real Math

**Source inventory: 176 `.ts/.tsx` files in `src/`.**

| Layer | Files | Covered by unit tests |
|---|---|---|
| `src/@module` (core: controllers, use cases, services, gateways, engines, DTOs, DI) | 88 | ~50 "touched" (many at 0% functions) |
| `src/component` + `src/hook` + `src/app` + `src/store` + `src/validation` + `src/sanity` + `src/internal` + `src/pagination` + `src/provider` + `src/output` + `src/@type` | 87 | **0** |
| `src/global` | 1 | 1 (via DI graph import) |
| **Total** | **176** | **~50 (28.4%)** |

- **Stale report** (`tutorialls/coverage/lcov-report/index.html`, generated **2024-09-02**, ~2 years old): Statements 67.38% · Branches 54.54% · Functions 8.04% · Lines 65.97% — over the **51 files loaded by tests** only (lcov.info: LF=338, LH=223).
- **Effective whole-`src` line coverage ≈ 28.4% × 66% ≈ 19%.** The UI layer — every form, modal, hook, store, validation schema, page — is at **0%**.
- The coverage folder is **not reproducible today**: broken `node_modules/jest-cli` means `npm test` cannot execute.

---

## 6. README Claims vs Reality

| Claim | Reality |
|---|---|
| "Best programming practices and clean code" | ❌ 19% effective coverage; 0% UI coverage; vacuous test; dead mock infra; committed failed-test artifacts; tests cannot run |
| Jest in tech list | ✅ Configs exist — but unenforced (no thresholds, `--passWithNoTests`) |
| Cypress in tech list | ⚠️ 2 non-hermetic specs, never executed in CI, no support/fixtures |
| Clean/Hexagonal Architecture | ✅ Structure is real (`@module` layering); **its verification is not** — DI wiring and engines/gateways have ~0 assertions |

---

## 7. Prioritized Gaps (untested critical paths)

**P0 — Security/Auth (all untested):**
- `component/wall/auth.wall.tsx` — the ONLY gate on `/tutorials` (redirect logic)
- `store/session.store.ts` — `isAuthenticated`/`refresh`/`logout`/expiry path
- `hook/auth/{login,signup}.hook.ts` — mutations + `toast.promise` error handling
- `component/form/{login,signup}.form.tsx` — zod validation, submit, token persistence
- `@module/application/use_case/user/*` — login/signup/decode use cases (0 unit tests)
- `@module/infra/engine/auth/jwt/jwt.engine.ts` — 0% coverage

**P0 — API failure handling (all untested):**
- `axios.gateway.ts`, `node.gateway.ts` — error mapping, network failures
- All 12 hooks — no rejection-path assertions
- No toast/loading/401-state tests anywhere

**P1 — Core business flows:**
- Update + delete tutorial (missing at every layer) · author/keyword filters (E2E) · search store · pagination · 5 zod schemas · 5 error classes

---

## 8. Recommendations (Prioritized)

**P0 — unblock & gate**
1. `npm ci` to restore a working toolchain; verify `npx jest --listTests` **before anything else**.
2. `jest.config.mjs`: add `collectCoverageFrom: ['src/**/*.{ts,tsx}']` + `coverageThreshold` (start near the true ~19% and ratchet to 80+), remove `--passWithNoTests`.
3. **Fix or delete the vacuous sanity test** — mock the Sanity client, or gate with `go = ENV.SANITY.PROJECT.ID !== 'ProjectId'` (fix the inverted logic) and assert *inside* the test.
4. **Unit-test the auth path first** — highest risk, 0% coverage: login/signup/decode use cases, `jwt.engine.ts`, `session.store.ts`, `auth.wall.tsx` (mock `useRouter`), 5 zod schemas (~1 hour).
5. **Wire a real CI test job** — `npm ci → format:verify → lint → test:coverage → test:integration (with services) → cypress run`. Never `format:fix` in CI.

**P1 — gate mechanics**
6. Fix lint-staged globs (let lint-staged supply filenames); extend Prettier scope to `test/`, `cypress/`, configs; add Cypress ESLint plugin.
7. Add `.dockerignore` (removes secret-leak + broken-`node_modules` overlay bug in images).
8. `git rm --cached .eslintcache`; ignore `cypress/screenshots/**`, `cypress/videos/**`.

**P2 — grow the suite**
9. Layer unit tests: services, controllers, axios/node gateways, 12 hooks (note: `@testing-library/react` **is not installed**), 5 stores, forms, modals.
10. Make Cypress hermetic: `supportFile` + custom commands, `cy.intercept` stubs for API + Sanity, `baseUrl` not hardcoded URLs; add update/delete/filters/invalid-login/logout/protected-route/failure-toast journeys.
11. Wire `test/mock/**` into the suite or delete it.
12. Replace the 100 s live-DB e2e with containerized isolation (or document that `test:integration` requires `docker-compose up` — currently undocumented).

---

**Bottom line:** 2 of 3 Jest files have real value, 1 is fake-green, coverage is 2 years stale, the UI is 0% covered, Cypress never runs in CI, and `npm test` cannot execute today. The path to green is short: fix gate mechanics first, then grow coverage with the auth path.