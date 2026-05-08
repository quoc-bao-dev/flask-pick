# Architecture

**Mapped:** 2026-04-30
**Project:** flask-pick (Next.js product listing app)

## Pattern

**Feature-Sliced Design** with Next.js App Router.

- Single feature slice: `src/features/product/` owns pages, components, stores, utils, and types
- Services layer: `src/services/` provides domain-scoped API modules
- Core infra: `src/core/` holds shared axios client, React Query client, hooks, constants, and utils
- Shared UI: `src/components/` holds presentational primitives and layouts

## Layers

```
App Router (src/app/)
    ↓
Pages (src/features/product/pages/)
    ↓
Container Components (ProductListing, SearchResultsListing)
    ↓
Stores (Zustand) ←→ URL sync hook (useFilterUrlSync)
    ↓
Services (src/services/{domain}/query.ts)
    ↓
API (src/core/axios/instance.ts → external REST API)
```

## Entry Points

- `/` → `src/app/(product)/page.tsx` → `src/features/product/pages/home.tsx`
- `/search` → `src/app/(product)/search/page.tsx` → `src/features/product/pages/search.tsx`
- Route group `(product)` wraps both pages under shared layout

## State Management

Two Zustand stores:

| Store | File | Responsibility |
|-------|------|----------------|
| `filterProductStore` | `src/features/product/store/filterProductStore.ts` | Business filter state (category, price range, etc.) |
| `uiProductStore` | `src/features/product/store/` | Modal/drawer visibility (filter sheet open/closed) |

### URL Sync

`useFilterUrlSync` (likely in `src/core/hooks/`) provides **bidirectional** URL ↔ store binding — mounted once per page to keep query params and store in sync.

## Data Flow

```
URL params
    ↓
useFilterUrlSync (mount)
    ↓
filterProductStore (write)
    ↓
React Query (src/services/product/query.ts)
    ↓
Axios (src/core/axios/instance.ts)
    ↓
External API
    ↓
mapApiProductToUi (price ÷ 100_000)
    ↓
UI Components
```

## Critical Transform

`mapApiProductToUi` in `src/features/product/utils/` scales prices by dividing by **100_000** — the external API returns prices in a sub-unit format. This is the only place this conversion should happen.

## Component Patterns

**Container / Presentational split:**

| Type | Component | Responsibility |
|------|-----------|----------------|
| Container | `ProductListing` | Fetches data, passes to presenter |
| Container | `SearchResultsListing` | Fetches search results |
| Presentational | `ProductsList` | Renders product grid |
| Presentational | `ProductCard` | Renders single product |

## Services Structure

Each service domain follows a consistent pattern:

```
src/services/{domain}/
  api.ts       — raw API call functions (axios)
  keys.ts      — React Query key factories
  query.ts     — useQuery / useMutation hooks
  types.ts     — domain-specific API response types
  index.ts     — public re-exports
```

Domains: `product`, `search`, `discount-type`, `common`

## Networking

- Axios instance: `src/core/axios/instance.ts`
- Base URL configured via env var
- Interceptors present but **stub** — no auth token injection implemented

## Abstractions

- `src/core/queryClient.ts` — shared React Query client instance
- `src/core/hooks/` — shared custom hooks (includes `useFilterUrlSync`)
- `src/features/product/utils/` — product-specific transforms (includes `mapApiProductToUi`)
- `src/features/product/types/index.ts` — UI-side product types

---
*Last mapped: 2026-04-30*
