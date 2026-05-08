# Technology Stack

**Analysis Date:** 2026-04-30

## Languages

**Primary:**
- TypeScript 5.x - All source files (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**
- CSS (via Tailwind utility classes) - Styling throughout components

## Runtime

**Environment:**
- Node.js 22 (Alpine) - Specified in `Dockerfile` (`node:22-alpine`)

**Package Manager:**
- pnpm (latest, via corepack) - Used for install and build
- Lockfile: `pnpm-lock.yaml` (present; `yarn.lock` also present but pnpm is canonical per Dockerfile)

## Frameworks

**Core:**
- Next.js 16.0.7 - App Router, SSR/SSG, file-based routing (`next.config.ts`)
- React 19.2.0 - UI rendering

**State Management:**
- Zustand 5.0.9 - Client-side global state (`src/features/product/store/filterProductStore.ts`, `src/features/product/store/uiProductStore.ts`)
- `zustand/middleware` `devtools` - Redux DevTools integration

**Data Fetching:**
- TanStack React Query 5.90.12 - Server state, caching, query invalidation (`src/core/config/queryClient.ts`, `src/app/providers.tsx`)
- Axios 1.13.2 - HTTP client (`src/core/axios/instance.ts`)

**Styling:**
- Tailwind CSS 4.x - Utility-first CSS (`src/app/globals.css`, `postcss.config.mjs`)
- `@tailwindcss/postcss` 4.x - PostCSS integration

**Build/Dev:**
- ESLint 9 + `eslint-config-next` 16.0.7 - Linting (`eslint.config.mjs`)
- TypeScript compiler (noEmit, Next.js handles emit) - Type checking

## Key Dependencies

**Critical:**
- `next` 16.0.7 - Framework; all routing, SSR, image optimization, metadata, fonts
- `@tanstack/react-query` 5.90.12 - All API state management; retry logic (retry: 2), staleTime (5s)
- `zustand` 5.0.9 - Filter state, UI state across the product feature
- `axios` 1.13.2 - Single HTTP client instance with interceptors (`src/core/axios/instance.ts`)

**Infrastructure:**
- `tailwindcss` 4.x - All visual styling
- `@types/react` 19, `@types/node` 20, `@types/react-dom` 19 - TypeScript types

## Configuration

**Environment:**
- `NEXT_PUBLIC_API_URL` - Base URL for all API calls; consumed in `src/core/axios/instance.ts`
- `.env` file present in repo root (contents not read)
- `NEXT_TELEMETRY_DISABLED=1` - Set at build and runtime in Dockerfile

**Build:**
- `next.config.ts` - `output: 'standalone'` for Docker deployment
- `tsconfig.json` - ES2017 target, strict mode, bundler module resolution, path alias `@/*` → `./src/*`
- `postcss.config.mjs` - Tailwind PostCSS plugin
- `eslint.config.mjs` - Next.js core-web-vitals + TypeScript rules

**Fonts:**
- Google Fonts via `next/font/google`: Geist Sans + Geist Mono (`src/app/layout.tsx`)

## Platform Requirements

**Development:**
- Node.js 22+, pnpm (corepack)
- `NEXT_PUBLIC_API_URL` env var must be set

**Production:**
- Docker container (3-stage build: deps → builder → runner)
- Runs as non-root `nextjs` user on port 3000
- Standalone Next.js server (`node server.js`)
- Target domain: `https://flashpick.vn` / `https://flash-pick.vn`

---

*Stack analysis: 2026-04-30*
