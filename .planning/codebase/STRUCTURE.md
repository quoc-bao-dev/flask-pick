# Structure

**Mapped:** 2026-04-30
**Project:** flask-pick (Next.js product listing app)

## Directory Layout

```
flask-pick/
├── src/
│   ├── app/                        # Next.js App Router
│   │   └── (product)/              # Route group for product pages
│   │       ├── page.tsx            # Home → features/product/pages/home.tsx
│   │       ├── search/
│   │       │   └── page.tsx        # Search → features/product/pages/search.tsx
│   │       └── layout.tsx          # Shared product layout
│   ├── features/
│   │   └── product/                # Single feature slice
│   │       ├── components/         # Product UI components
│   │       │   ├── CategoryFilter.tsx
│   │       │   ├── FilterBottomSheet.tsx
│   │       │   ├── FilterSidebar.tsx
│   │       │   ├── MobileSearchOverlay.tsx
│   │       │   ├── PriceRangeFilter.tsx
│   │       │   ├── ProductListing.tsx
│   │       │   └── SearchResultsListing.tsx
│   │       ├── pages/
│   │       │   ├── home.tsx
│   │       │   └── search.tsx
│   │       ├── store/
│   │       │   └── filterProductStore.ts
│   │       ├── types/
│   │       │   └── index.ts
│   │       └── utils/              # mapApiProductToUi and helpers
│   ├── services/                   # API service modules
│   │   ├── product/                # api.ts, keys.ts, query.ts, types.ts, index.ts
│   │   ├── search/                 # api.ts, keys.ts, query.ts, types.ts, index.ts
│   │   ├── discount-type/          # api.ts, keys.ts, query.ts, types.ts, index.ts
│   │   └── common/                 # shared service utilities
│   ├── core/                       # Shared infrastructure
│   │   ├── axios/
│   │   │   └── instance.ts         # Axios client singleton
│   │   ├── hooks/                  # useFilterUrlSync and other shared hooks
│   │   ├── queryClient.ts          # React Query client instance
│   │   ├── constants/              # App-wide constants
│   │   └── utils/                  # Shared utility functions
│   └── components/                 # Shared UI components
│       ├── ui/
│       │   └── DesktopSearch.tsx
│       ├── common/                 # Reusable cross-feature components
│       ├── icons/                  # SVG icon components
│       └── layouts/                # Page layout shells
├── public/                         # Static assets
├── .planning/                      # GSD planning artifacts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── eslint.config.mjs
├── .prettierrc
├── Dockerfile
├── .dockerignore
└── .env
```

## Key Locations

| What | Where |
|------|-------|
| App entry routes | `src/app/(product)/` |
| Product pages | `src/features/product/pages/` |
| Filter components | `src/features/product/components/` |
| State stores | `src/features/product/store/` |
| Product types | `src/features/product/types/index.ts` |
| Price transform | `src/features/product/utils/` |
| API clients | `src/services/{domain}/api.ts` |
| React Query hooks | `src/services/{domain}/query.ts` |
| RQ key factories | `src/services/{domain}/keys.ts` |
| Axios instance | `src/core/axios/instance.ts` |
| URL sync hook | `src/core/hooks/` |
| Shared UI | `src/components/ui/` |
| Planning docs | `.planning/` |

## Naming Conventions

- **Components**: PascalCase (`ProductListing.tsx`, `FilterSidebar.tsx`)
- **Stores**: camelCase with Store suffix (`filterProductStore.ts`)
- **Hooks**: camelCase with `use` prefix (`useFilterUrlSync`)
- **Types**: PascalCase interfaces/types, exported from `types/index.ts`
- **Services**: one directory per domain, flat file structure
- **Route groups**: parentheses notation `(product)` — no URL segment added

## File Patterns

- Feature components: `src/features/{feature}/components/{ComponentName}.tsx`
- Service modules: `src/services/{domain}/{api|keys|query|types|index}.ts`
- Shared hooks: `src/core/hooks/{hookName}.ts`
- Page components: `src/features/{feature}/pages/{pageName}.tsx`

---
*Last mapped: 2026-04-30*
