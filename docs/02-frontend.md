# 02 — Frontend: Routes, Components, State, Forms & UX

**Scope:** `tutorialls/src/app/`, `src/component/`, `src/hook/`, `src/store/`, `src/validation/` — the presentation layer.

---

## 1. Routes Inventory (App Router)

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Server component (thin) — renders `LazyParagraph` (CMS `home_welcome`) + `LazyImage` (CMS `home_img`, pexels fallback) + `NavigateButton` → `/login` |
| `/login` | `src/app/login/page.tsx` → `src/app/pages/login.page.tsx` | Client; auto-redirects to `/tutorials` if authenticated |
| `/tutorials` | `src/app/tutorials/page.tsx` → `src/app/pages/tutorial.page.tsx` | Wrapped in `AuthWall`; search + `DynamicTutorialList` + create/update modals |
| `/studio/[...tool]` | `src/app/studio/[[...tool]]/page.tsx` | Sanity Studio catch-all, `next-sanity/studio`, `dynamic = 'force-static'` |
| *(layout)* | `src/app/layout.tsx` | Roboto via `next/font`, `TanStackQueryProvider`, global `<Toaster>` (bottom-center); **metadata still "Create Next App" boilerplate** |

**`src/app/pages/*.page.tsx`** — legacy "Page component" pattern (login + tutorial pages) sitting *inside* the App Router tree; works but is a structural oddity.

**Missing states (all nonexistent):** `loading.tsx` · `error.tsx` · `not-found.tsx` · `template.tsx` · `middleware.ts` · route handlers (`route.ts`) · Server Actions · `generateStaticParams` · `sitemap.ts`/`robots.ts`. There is **no server-side auth guard** — `/tutorials` is served to anyone; protection is a client redirect.

---

## 2. Component Inventory by Feature

| Feature | Components (`src/component/`) |
|---|---|
| **Buttons** | `button/button.component.tsx` · `button/navigate.componente.tsx` (typo) · `button/card/delete.button.tsx` · `button/modal/card/create.button.tsx` · `button/modal/card/update.button.tsx` · `button/modal/signup.component.tsx` |
| **Cards** | `card/tutorial.card.tsx` + atoms `card/atom/{title,body,footer}.card.tsx` |
| **Forms** | `form/field/field.component.tsx` · `form/field/text_area.component.tsx` · `form/login.form.tsx` · `form/signup.form.tsx` · `form/tutorial/create.format.tsx` (typo) · `form/tutorial/update.format.tsx` (typo) |
| **Lists** | `list/container.component.tsx` · `list/dynamic.component.tsx` · `list/all/tutorials.component.tsx` · `list/all/cache_tutorials.component.tsx` (💀 unused) · `list/filter/{author,keyword,title}.component.tsx` |
| **Lazy/CMS** | `lazy/paragraph.component.tsx` (`LazyParagraph`) · `lazy/image.component.tsx` (`LazyImage`) |
| **Modals** | `modal/modal.component.tsx` (generic backdrop) · `modal/form/signup.modal.tsx` · `modal/form/tutorial/{create,update}.modal.tsx` |
| **Search** | `search/tutorial.component.tsx` |
| **Typography** | `typography/h1.component.tsx` |
| **Guard** | `wall/auth.wall.tsx` (`AuthWall`) |

**Notable component bugs:**

| Bug | Evidence |
|---|---|
| `UpdateTutorialForm` closes the **create** modal store (`useCreateTutorialModalStore`) instead of the update store | `form/tutorial/update.format.tsx:11, 26` |
| Author field renders `errors.title?.message` — author validation errors never surface | `update.format.tsx:83`; same in `create.format.tsx:75` |
| `TutorialCard` renders `{data.autor \|\| data.author}` — contract drift with the typo'd API field | `card/tutorial.card.tsx:22`; DTO exposes **both** `author` and `autor` (`domain/DTO/tutorial/tutorial.dto.ts:5-6`) |
| Delete button + `router.refresh()` may race the mutation | `button/card/delete.button.tsx` |
| Icon-only buttons (edit/delete/modal-close) have no accessible name | `button/card/delete.button.tsx:19-21`; `modal.component.tsx:19-22` |

---

## 3. State Management

### Zustand stores (5, all `create` from zustand v4)

| Store | State / actions |
|---|---|
| `store/session.store.ts` | `user: IUserDTO`, `isAuthenticated()` (localStorage presence check — no expiry), `refresh()` (decodes JWT → sets user + `GlobalSession.user` + toast), `logout()` (**no UI calls it**) |
| `store/search/search.store.ts` | `query`, `filterBy` (`'title' \| 'keyword' \| 'author'`) |
| `store/modal/signup.store.ts` | `isOpen` / open / close / toggle |
| `store/modal/card/create.store.ts` | `isOpen` / open / close / toggle |
| `store/modal/card/update.store.ts` | `data: ITutorialDTO`, `isOpen` / open / close / toggle |

### Observations

- **Two sources of truth:** `GlobalSession` (`src/global/session.global.ts`) is a static mutable class mirroring `session.store` — manually synced, divergence risk.
- **Modal store boilerplate ×3**: identical `isOpen/open/close/toggle` copy-paste; no factory/hook to generate them.
- **No selectors**: consumers do `const { isOpen, closeModal } = useStore()` → re-render on unrelated changes (minor).
- **TanStack Query vs SWR:** SWR `^2.2.5` is installed **but has zero imports** in `src/` — dead dependency. All data fetching is TanStack (`@tanstack/react-query ^5.52.2`).

### React-query hooks (`src/hook/`, 12 files)

| Group | Hooks | Pattern |
|---|---|---|
| Auth | `auth/login.hook.ts` (`useAuth`), `auth/signup.hook.ts` (`useRegister`) | `useMutation` + `toast.promise` ✅ |
| CMS | `cms/get/paragraph.hook.ts`, `cms/get/image.hook.ts` | `useQuery` ✅ (but **colliding keys**: both `['paragraph_' + id]`) |
| Tutorial | `create/update/delete/list/all/` + `filter/by/{author,keyword,title}` | `useMutation` ❌ even for **reads**; no invalidation — UI refreshes via `router.refresh()` |

**Race-condition bug:** `hook/tutorial/filter/filter.hook.ts:27-49` — the `useEffect` switch **falls through** (no `break`): every keystroke fires **all 3** filter API calls. (This hook is never imported today — dead — but the pattern is replicated in the live filter components.)

---

## 4. Forms & Validation

**Pattern:** every form uses `zodResolver` + `useForm` (`login.form.tsx:23-25`, `signup.form.tsx:118-120`, `create.format.tsx:28-30`). Inline `<p>` errors under fields + `toast.promise` async feedback.

| Schema | File | Notes |
|---|---|---|
| Login | `validation/zod/form/login.schema.ts` | email + password `min(8)` |
| Signup | `validation/zod/form/signup.schema.ts` | email + password `min(8)` |
| Create tutorial | `validation/zod/form/card/create.schema.ts` | title/content/author |
| Update tutorial | `validation/zod/form/card/update.schema.ts` | 💀 **dead code** — update form reuses `createTutorialFormSchema` (`update.format.tsx:17`) |
| Search | `validation/zod/search/tutorial.schema.ts` | 💀 **never used** — search flows send raw query strings |

**Form issues:**

- `onSubmit={submit()}` — `handleSubmit()` is *invoked during render* (works, but anti-pattern) — `login.form.tsx:44`, `create.format.tsx:45`, etc.
- Signup closes the modal **even on failure** (no `if (!error)` guard) — `signup.form.tsx:122-127`; create/update close only via stale `error` closure.
- No `.max()` limits on any field — unbounded strings → oversized API payloads (minor DoS surface).
- "Filter by" is a **free-text input**, not a `<select>`; the zod enum error ("Type your filter") is supposed to police it (`search/tutorial.component.tsx:52-61`) — the biggest interaction-design flaw.

---

## 5. UX / Responsiveness / Accessibility Findings

### 📱 Responsiveness — claim vs code

> README shows a "Responsividade" screenshot; the code tells a different story.

- **Zero responsive breakpoints** in all of `src/` — no `sm:/md:/lg:/xl:`, no media queries, no container queries (grep-verified).
- Layouts are fluid-flex only (`flex flex-col justify-center items-center`) — **responsive-*capable*, not responsive-*designed***.
- Fixed sizes that overflow small viewports: home image `width={600} height={300}` (`app/page.tsx:14-17`), H1 `text-5xl`, `min-w-screen` mains.
- Modal is `fixed h-screen w-screen` with inner card `w-fit` (no max-width/scroll) — overflow risk at 360 px.

### ♿ Accessibility — absent project-wide

| Finding | Evidence |
|---|---|
| Labels not associated: `<label>` has no `htmlFor`; inputs no `id` | `form/field/field.component.tsx:14-29`, `text_area.component.tsx:14-30` |
| Errors not announced: no `role="alert"`, `aria-live`, or `aria-invalid`; empty `<p>` rendered always | same files `:190` |
| **Zero `aria-*` / `role` / `tabIndex` / `htmlFor` attributes in the entire `src/`** (grep) | project-wide |
| `outline-none` on all inputs → invisible keyboard focus | `field.component.tsx:24` |
| Modal: no `role="dialog"`, no focus trap, no `Escape`, no focus move; background click closes (mid-form data loss risk) | `modal.component.tsx:15-25` |
| Icon-only buttons (edit/delete/close) unnamed | `button/card/*`, `modal.component.tsx:19-22` |

### 🔔 Toast feedback

- ✅ `Toaster` global at `layout.tsx:26`; `toast.promise` in auth flows is good UX.
- ❌ **Noise:** passive data loads toast too — "Listing tutorials... 🌌" fires on every page entry (`hook/tutorial/list/all.hook.ts:23-28`); keystroke-triggered filters spam toasts.
- ❌ CMS primitives swallow `isPending`/`error` — Sanity outage silently shows defaults (`paragraph.component.tsx:6-8`, `image.component.tsx:6-8`).
- ❌ `AuthWall` redirect after children render — content flash before bounce; no spinner.

---

## 6. UI Cohesion — styled-components + Tailwind "coexistence"

**Verdict: there is no coexistence — styled-components is a ghost dependency.**

- `styled-components@^6.1.12` declared (`package.json:46`) but **zero imports** in `src/` (grep verified, including `styled.` / `` css` `` patterns). No SSR registry, no compiler config.
- 100% of styling is Tailwind utilities; `globals.css` = 3 Tailwind directives; `tailwind.config.ts` extends nothing.
- **Consistency debt:**
  - `FormField` vs `FormTextArea` — near-duplicate implementations.
  - `button.component.tsx` vs `navigate.componente.tsx` — same primary style `bg-[#76ff02] ... rounded-lg p-2` with divergent hover colors (`hover:bg-emerald-200` vs `hover:bg-emerald-400 hover:text-white`).
  - **Three greens doing the work of one token** (raw hex, no Tailwind theme): background `#111101` (pages), headings `#73eb12` (h1), accents `#76ff02` (~12 files), card shadow `#76ff00`/`#76ff02` in one line.
  - Mixed case conventions: `label="signup"` vs `"SIGN UP"` vs `"Login"`.
  - Typos: `navigate.componente.tsx`, `create.format.tsx` / `update.format.tsx`, `id="btn_create_tutorial_subtmit"`.

---

## 7. Frontend Priorities

1. **A11y pass** — label/input association, error announcements, focus-visible, dialog semantics. (See [07-findings.md](07-findings.md) F-27.)
2. **Fix modal-store mix-up** (F-14) and **filter fall-through** (F-13).
3. **Query-key discipline** — `useQuery` for reads, distinct CMS keys (F-10).
4. **Responsive breakpoints** or temper the README claim (F-34).
5. **Design tokens** — move the 3 green hexes into the Tailwind theme.
6. **Remove ghost deps** (styled-components, SWR) or actually adopt one (F-20).