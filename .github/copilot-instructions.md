## Purpose

This file gives brief, actionable guidance for AI coding agents working on this repository so they can be productive immediately.

**Project Overview**

- **Type**: React single-page app built with `Vite` and `React 18`.
- **Entry**: `src/main.jsx` → `src/App.jsx` (routing + providers).
- **Routing**: `react-router-dom` is used; pages live under `src/pages/*`. Admin routes are under `src/pages/admin/*` and mounted on `/admin/*` in `src/App.jsx`.
- **Styling**: Tailwind + PostCSS. See `tailwind.config.js` and `src/index.css`.

**Key Integrations**

- **Backend API**: Client communicates with a backend via `import.meta.env.VITE_BACKEND_URL`. Examples:
  - `src/pages/verifyEmail/verifyEmail.jsx` calls `${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP` and `/api/users/verifyEmail`.
  - `src/pages/admin/addItemPage.jsx` posts new products to `${import.meta.env.VITE_BACKEND_URL}/api/products`.
- **Supabase Storage**: Image uploads use the helper `src/utils/mediaUpload.jsx`. It constructs a Supabase client (hardcoded `supabase_url`/`anon_key`) and uploads to the `images` bucket, returning a public URL.
- **Auth Convention**: JWT is kept in `localStorage` as `token` and passed as `Authorization: Bearer <token>` in axios calls (see `addItemPage.jsx`, `verifyEmail.jsx`).

**Developer Workflows & Commands**

- **Start dev server**: `npm install` then `npm run dev` (runs `vite --host`).
- **Build for production**: `npm run build` (Vite build → `dist/`).
- **Preview production build**: `npm run preview`.
- **Lint**: `npm run lint` (ESLint configured at repo root).
- **Env vars**: Add Vite envs in a `.env` or `.env.local` file at the repo root; e.g.:
  ```
  VITE_BACKEND_URL=https://your-backend.example
  ```
  Restart the dev server after editing env files.

**Project-specific Patterns & Conventions**

- **Pages vs Components**: Large views are under `src/pages/*` (grouped by feature: `admin`, `home`, `login`, `register`, `verifyEmail`). Reusable UI pieces live in `src/components/`.
- **Upload flow**: `mediaUpload(file)` returns a Promise resolved with a public URL. `addItemPage.jsx` collects uploaded file Promises and `await Promise.all(promises)` to get `imageUrls` before posting product data.
- **HTTP client**: Uses `axios` directly; do not introduce a global client without updating all callers. When changing headers/authorization, update call sites that read `localStorage.getItem('token')`.
- **Notifications**: Uses `react-hot-toast` for success/error user feedback; prefer it for toast consistency.

**Safety Notes & Secrets**

- The repository currently contains a hardcoded Supabase `anon_key` and `supabase_url` in `src/utils/mediaUpload.jsx`. Treat these as sensitive — do not rotate or remove without coordinating with the team. When preparing PRs, avoid committing new secrets.

**Where to Look First (Examples)**

- App/Routes: `src/App.jsx` — app providers and route wiring.
- Image upload helper: `src/utils/mediaUpload.jsx` — how files are uploaded and bucket/schema used (`images`).
- Admin add flow: `src/pages/admin/addItemPage.jsx` — example of image upload → backend API flow.
- Verify email flow: `src/pages/verifyEmail/verifyEmail.jsx` — example of axios calls using VITE env.

**Quick PR Guidance for AI Agents**

- Make focused changes: update a single feature or file set (pages + related components).
- When adding or changing backend endpoints, update usages that rely on `VITE_BACKEND_URL`.
- When modifying uploads, preserve the `images` bucket naming unless backend changed.

Feedback

- If any section is unclear or you want more examples (eg. common axios error handling, or how admin pages expect data shapes), tell me which area and I will expand.
