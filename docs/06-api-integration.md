# 06 — API Integration: the Companion NestJS Backend

**Scope:** the separate repository [Tutorialls_API](https://github.com/Samuel-Ricardo/Tutorialls_API) and its contract with this frontend. Facts below are from the API repo's README plus direct evidence in this frontend's gateway layer.

---

## 1. Companion API — Stack

| Aspect | Detail |
|---|---|
| Framework | NestJS · Node.js · Express · TypeScript |
| Persistence | **PostgreSQL** (hosted on Render) via **Prisma** ORM |
| Cache | **Redis** (hosted on Render) |
| Messaging | **RabbitMQ** (hosted on **CloudAMQP**) |
| Auth | **JWT** + Cryptography (encryption modules) |
| Validation | **Zod** |
| DI | **InversifyJS** (same pattern as this frontend) |
| Docs | **Swagger** — https://tutorialls-api-sha256.onrender.com/api/docs |
| Testing | Jest · ESLint · Prettier · Husky · lint-staged |
| Hosting | **Render** — https://tutorialls-api-sha256.onrender.com/ |
| Docker image | `ghcr.io/samuel-ricardo/tutorialls_api:main` (used by this repo's compose) |

> Both repos share the same author and the same Clean-Architecture + Inversify philosophy — the frontend's DI stack is a structural mirror of the API's.

---

## 2. Frontend ↔ API Contract (verified from gateway code)

Base URL: `NEXT_PUBLIC_API_URL` (default `http://api:3000` in code; `http://api:3001` in `.env.local.example` — the compose `site` service reaches the API container at `api:3001` → `3000`).

### Auth endpoints (`src/@module/application/gateway/http/axios/user/auth.gateway.ts`)

| Method & path | Request | Response | Frontend consumer |
|---|---|---|---|
| `POST {API}/user/signup` | `{ email, password }` | 201 → `true` | `useRegister` → `SignupForm` |
| `POST {API}/user/login` | `{ email, password }` | `{ token }` (JWT) | `useAuth` → `LoginForm` → `localStorage['AUTH_TOKEN']` |

### Tutorial endpoints (`src/@module/application/gateway/http/axios/tutorial/tutorial.gateway.ts`)

| Method & path | Query/body | Frontend consumer |
|---|---|---|
| `POST {API}/tutorial` | body `{ title, content, author }` | `create` use case → `CreateTutorialForm` |
| `PATCH {API}/tutorial/{id}` | body `{ id, title, content, author }` | `update` use case → `UpdateTutorialForm` |
| `DELETE {API}/tutorial/{id}` | — | `delete` use case → `DeleteCardButton` (200 → `true`) |
| `GET {API}/tutorial?page&limit` | pagination | `listAll` use case → `ListAllTutorial` |
| `GET {API}/tutorial/title?title&page&limit` | title filter | `filterByTitle` → title filter UI |
| `GET {API}/tutorial/author?author&page&limit` | author filter | `filterByAuthor` → author filter UI |
| `GET {API}/tutorial/content?keyword&page&limit` | keyword-in-content filter | `filterByKeyword` → keyword filter UI |

**Auth on tutorial endpoints:** `Authorization: Bearer <GlobalSession.user.authToken>` — see the **stale-header bug** (F-04): the header is computed once at singleton construction, so a token stored after gateway creation is never attached → `Bearer undefined`.

**Tutorial entity shape:** the API returns `autor` (typo'd Portuguese field); the domain entity maps `autor || author` (`entity/tutorial.entity.ts`), and the DTO defines both (`domain/DTO/tutorial/tutorial.dto.ts:5-6`).

---

## 3. Pagination Contract

| File | Shape |
|---|---|
| `src/pagination/pagination.dto.ts` | `{ page, limit }` (request) |
| `src/pagination/output.dto.ts` | `IPaginationOutputDTO<T> { items, total, page, limit }` (response) |

All filter DTOs extend pagination (`domain/DTO/tutorial/filter/by/*.dto.ts`); the frontend currently hardcodes `{ limit: 20, page: 1 }` in the filter hook.

---

## 4. Frontend↔Sanity (separate channel)

The CMS path does **not** go through the NestJS API — `LazyParagraph`/`LazyImage` query **Sanity directly** (CDN) via the DI client. Sanity is the source of copy/images on the welcome page; tutorials data lives entirely in the API/PostgreSQL. See [03-cms-sanity.md](03-cms-sanity.md).

---

## 5. Integration Quality Notes

| Issue | Evidence / impact |
|---|---|
| **e2e depends on the live API** | `test/.../tutorial.e2e-spec.ts` requires `docker-compose` API + DB + Redis running; there is no test double — the suite is non-hermetic and undocumented in the README |
| **Fixed test user** | e2e signs up/logs in `admin@admin.com` / `123456789` in every `beforeEach` (signup errors swallowed) — pollutes shared DB state; fails if `HASH_ROUNDS`/password policy differs |
| **`autor` typo in the contract** | The e2e asserts `result.autor` — it only passes because both sides carry the same typo. A future API fix (`author`) silently breaks the frontend's tests |
| **Comment/timeout mismatch** | `jest.setTimeout(100000)` with comment "Define o tempo limite como 10 segundos" — actual 100 s |
| **Test DTO drift** | Unit-test DTOs (`filter: 'some-filter'`, missing `page/limit`) don't match the real interfaces — tests can pass against a shape the app never produces |
| **Local stack coupling** | compose runs the **published** API image (`ghcr.io/...:main`) — local API changes require publishing first |
| **No contract-tests / client generation** | No OpenAPI-generated client, no schema-shared package (Zod → OpenAPI sync) — the "contract" is hand-maintained on both sides |

---

## 6. Recommendations

1. **Eliminate the stale-token bug** (per-request header or axios interceptor) — currently the main integration breakage risk (F-04).
2. **Make the e2e suite hermetic**: containerized API (testcontainers-style) or documented `test:integration` prerequisites; random per-run users; cleanup after suite.
3. **Fix the `autor` contract** end-to-end (API → DTO → entity → e2e assertion) in one coordinated change.
4. **Generate the client from Swagger** (or at least share Zod schemas) to stop hand-maintained drift.
5. **Encode query params** (`encodeURIComponent`) in the gateway — special characters in titles currently break filters (F-12).
6. Align `NEXT_PUBLIC_API_URL` semantics: code default `http://api:3000` vs example value `http://api:3001` is confusing; document the mapping clearly.