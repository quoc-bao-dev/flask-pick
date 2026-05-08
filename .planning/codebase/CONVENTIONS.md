# Conventions

**Mapped:** 2026-04-30
**Project:** flask-pick (Next.js product listing app)

## Code Style

**Prettier config** (`.prettierrc`):
- No semicolons
- Single quotes
- 2-space indent
- `printWidth: 100`

**ESLint config** (`eslint.config.mjs`):
- `next/core-web-vitals` ruleset
- TypeScript flat config

## Naming

| Construct | Convention | Example |
|-----------|-----------|---------|
| Components | PascalCase | `FilterSidebar`, `ProductCard` |
| Interfaces / Types | PascalCase | `ProductType`, `FilterState` |
| Hooks | camelCase with `use` prefix | `useFilterUrlSync` |
| Utils / helpers | camelCase | `mapApiProductToUi` |
| Stores | camelCase with `Store` suffix | `filterProductStore` |
| Module-level constants | SCREAMING_SNAKE_CASE | `DEFAULT_PAGE_SIZE` |
| Files — components | PascalCase `.tsx` | `ProductListing.tsx` |
| Files — hooks/utils/stores | camelCase `.ts` | `filterProductStore.ts` |

## Component Patterns

**`'use client'` directive** — always the first line (before imports) in any interactive component that uses hooks or browser APIs.

**JSDoc responsibility comments** — every component and hook export has a `Responsibility:` comment describing its single concern:
```ts
/**
 * Responsibility: Renders the desktop search input with suggestion dropdown.
 */
export function DesktopSearch() { ... }
```

## State / Data Patterns

**Zustand devtools action strings** — use `domain/actionName` format:
```ts
set(state => ..., false, 'filter/setCategory')
```

**React Query key factory** — hierarchical pattern per service domain:
```ts
// src/services/product/keys.ts
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: FilterParams) => [...productKeys.lists(), filters] as const,
}
```

## Import Conventions

- `@/*` path alias — used for all cross-feature and cross-layer imports
- Relative paths (`./`, `../`) — only within the same directory
- Barrel exports via `index.ts` for service modules

```ts
// Cross-feature: use alias
import { useFilterUrlSync } from '@/core/hooks/useFilterUrlSync'

// Same directory: relative
import { mapApiProductToUi } from './mapApiProductToUi'
```

## Error Handling

- API errors propagated through React Query's `error` state
- No global error boundary observed
- No custom error classes defined

## TypeScript

- Strict mode not explicitly confirmed but types used throughout
- API response types in `src/services/{domain}/types.ts`
- UI types in `src/features/product/types/index.ts`
- Separation: API types vs UI types, bridged by `mapApiProductToUi`

---
*Last mapped: 2026-04-30*
