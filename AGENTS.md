# AGENTS.md

Pharmix admin panel: React 19 + TypeScript + Vite (rolldown-vite) SPA talking to the Laravel API in the sibling `../backend` directory. UI text and code comments are Spanish; identifiers are English.

## Commands

- `npm run dev` — Vite dev server on 5173. The backend must be running at `http://localhost:8000` (see Architecture).
- `npm run build` — runs `tsc -b && vite build`; this is the only type-check step (no separate `typecheck` script). A clean `tsc -b` is the expected verification; the previous baseline errors (unused pagination `event` params, unused `response` in `plugins/axios.ts`, optional `page` in `useHandleFormsPages.tsx`) are fixed.
- `npm run lint` — **currently broken**. Installed `eslint@9.39.5` with `typescript-eslint@8.14.0` crashes at load on `@typescript-eslint/no-unused-expressions`. Do not debug this unless asked; it fails on every file.
- There is no test runner, no test files, and no test script. Do not add or invent one without being asked.

## Architecture

- Entry chain: `src/main.tsx` → `providers/AuthProvider` → MUI `ThemeProvider` → `BrowserRouter` → `MyApp` → `routes/AppRoutes`.
- Routes (`src/routes/AppRoutes.tsx`): `/login` is public; everything under `/dashboard` is wrapped in `components/protectedRoute.tsx`, which redirects to `/login` when `AuthContext.user` is null. New dashboard pages need a child route in `AppRoutes` **and** a `<Link>` in `Dashboard/Components/SideMenu/SideMenu.tsx` (links are relative, e.g. `to='roles_page'`).
- `AuthProvider` only renders children after the initial auth check finishes; pages can assume `user` is settled, not that it is non-null.
- API access always goes through the `api` singleton in `src/plugins/axios.ts` (axios, `withCredentials` + `withXSRFToken` for Laravel Sanctum cookies). Do not create other axios instances.
- `baseURL` (`http://localhost:8000/api`) and the CSRF endpoint are **hardcoded**; there is no `.env`, no `VITE_*` variable, and no Vite proxy. Changing environments requires editing `plugins/axios.ts`.

## Code conventions

- Layering for CRUD features: `services/<entity>.service.ts` (named exports `index`, `show`, `storeOrUpdate`, sometimes `edit`) → `hooks/useHandleFormsPages.tsx` (`handleIndex`/`handleShow`/`handleSave`/`handleEdit` plus loading/alert state) → page + form.
- Pages own the MUI `Table`, `Pagination`, and `Dialog`; forms are separate components receiving `FormsProps` (`id?`, `handleClose`, `handleSuccess`) and are rendered inside the `Dialog`.
- Validation: one zod schema per entity in `src/schemas/`, used with `react-hook-form` + `zodResolver`. Messages come from `MESSAGES()` in `src/constants/messages.ts`.
- API response types (`DefaultResponse`, `PaginationResponse`) live in `src/interfaces/ResponseInterface.ts`; Laravel paginators are unwrapped as `response.data.data` plus `total`/`per_page`/`page`.
- Styling is CSS Modules per component/folder (including odd existing names such as `pages..style.module.css`). Global design tokens are in `src/index.css`; global button variants are the custom `button-type="primary|ghost|icon"` attribute defined in `src/App.css` — not Bootstrap classes. Bootstrap CSS is imported globally but used sparingly for layout utilities. The MUI theme is `src/utils/themes.tsx`; MUI is used for tables, dialogs, pagination, and icons.
- TypeScript is strict with `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`, and `noUnusedParameters`. Type-only imports must use `import type`, and any unused parameter fails `tsc -b`.
- React 19 idioms are in use: `use(AuthContext)` instead of `useContext`, and `<AuthContext value={...}>` instead of `<AuthContext.Provider>`.

## Git

- Active development branch is `dev`; history merges feature work via PRs from `dev`. Keep commits descriptive and in Spanish to match existing history.
