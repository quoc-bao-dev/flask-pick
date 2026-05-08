# External Integrations

**Analysis Date:** 2026-04-30

## APIs & External Services

**Backend REST API (primary):**
- Custom backend API - Product listing, search, discount types
  - SDK/Client: Axios instance at `src/core/axios/instance.ts`
  - Auth: None detected (no auth headers in interceptors `src/core/axios/interceptors.ts`)
  - Base URL: `process.env.NEXT_PUBLIC_API_URL`
  - Timeout: 30,000ms
  - Endpoints consumed:
    - `GET /api/v1/products` — paginated product listing with filters (`src/services/product/api.ts`)
    - `GET /api/v1/search/suggestions` — typeahead suggestions (`src/services/search/api.ts`)
    - `GET /api/v1/search/results` — full search with time facets (`src/services/search/api.ts`)
    - `GET /api/v1/discount-types` — discount type reference data (`src/services/discount-type/api.ts`)

**Google Fonts:**
- Geist Sans, Geist Mono loaded via `next/font/google` (`src/app/layout.tsx`)
- No API key required; handled by Next.js font optimization at build time

**Shopee (indirect):**
- Application aggregates Shopee Flash Sale data (product model includes `flashSaleStart`, `flashSaleEnd`, `itemId` fields per `src/services/product/types.ts`)
- No direct Shopee API calls from frontend; data sourced through backend

## Data Storage

**Databases:**
- None — frontend only; all persistence delegated to backend API

**File Storage:**
- Local filesystem only — public assets in `/public/` directory

**Caching:**
- TanStack React Query in-memory cache (`src/core/config/queryClient.ts`)
  - Default staleTime: 5,000ms
  - Default retry: 2
- Browser `sessionStorage` — session UUID for search tracking (`src/core/hooks/useSessionUuid.ts`, key: `fp:sessionUuid`)

## Authentication & Identity

**Auth Provider:**
- None detected — no login/auth flows, no auth headers in HTTP interceptors
- Session identity: per-tab UUID via `crypto.randomUUID()` stored in `sessionStorage` (`src/core/hooks/useSessionUuid.ts`), passed as `sessionUuid` param to search suggestions API

## Monitoring & Observability

**Error Tracking:**
- None — `console.error` used in query client mutation error handler (`src/core/config/queryClient.ts`)
- TODO comment in codebase references unimplemented toast notifications

**Logs:**
- `console.error` only; no structured logging framework

**Analytics:**
- Next.js telemetry explicitly disabled (`NEXT_TELEMETRY_DISABLED=1` in Dockerfile)

## CI/CD & Deployment

**Hosting:**
- Docker container (standalone Next.js server, port 3000)
- Domain: `https://flashpick.vn` / `https://flash-pick.vn`

**CI Pipeline:**
- None detected (no `.github/`, `.gitlab-ci.yml`, or similar config files found)

**SEO:**
- `src/app/sitemap.ts` — generates `/sitemap.xml` with base URL `https://flash-pick.vn`
- `src/app/robots.ts` — generates `/robots.txt`
- OpenGraph + Twitter card metadata in `src/app/layout.tsx`

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_API_URL` — backend base URL (consumed by `src/core/axios/instance.ts`)

**Optional env vars (set in Dockerfile):**
- `NEXT_TELEMETRY_DISABLED=1`
- `NODE_ENV=production`
- `PORT=3000`
- `HOSTNAME=0.0.0.0`

**Secrets location:**
- `.env` file in repo root (existence confirmed; contents not read)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected

---

*Integration audit: 2026-04-30*
