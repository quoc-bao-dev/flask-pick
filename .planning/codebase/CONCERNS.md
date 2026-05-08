# Concerns

**Mapped:** 2026-04-30
**Project:** flask-pick (Next.js product listing app)

## Tech Debt

| # | Item | Location | Severity |
|---|------|----------|----------|
| 1 | Filter params `activeDeal`, `activeTab`, `discountPercentages` stored in state but **never sent to API** | `src/features/product/store/filterProductStore.ts` | High |
| 2 | Module-level singleton `QueryClient` — SSR leak risk in server components | `src/core/queryClient.ts` | High |
| 3 | Apply button in filter sheet calls `console.log` — not wired to any action | `src/features/product/components/FilterBottomSheet.tsx` | High |
| 4 | Category and brand constants **duplicated** across feature and service layers | Multiple files | Medium |
| 5 | Hardcoded product count `(69)` appears everywhere — not dynamic | Multiple components | Medium |
| 6 | Axios interceptors are stubs — no auth token injection implemented | `src/core/axios/instance.ts` | Medium |
| 7 | `06-API-INTEGRATION.md` planning doc committed to project root (not `.planning/`) | `/06-API-INTEGRATION.md` | Low |
| 8 | `uiProductStore` may be partially redundant with local component state | `src/features/product/store/` | Low |
| 9 | No environment variable validation at startup | `src/core/axios/instance.ts` | Medium |
| 10 | Dead code in filter components from prior refactor | `src/features/product/components/` | Low |

## Bugs

| # | Bug | Location | Impact |
|---|-----|----------|--------|
| 1 | **RegExp injection** — user search query passed directly into `new RegExp()` for highlight, allows ReDoS | Search highlight utility | High |
| 2 | `sold/total` progress bar overflows at >100% — no clamp | `ProductCard` or related component | Medium |
| 3 | Camera/scan button in search bar is non-functional (no handler) | `src/components/ui/DesktopSearch.tsx` or `MobileSearchOverlay.tsx` | Medium |
| 4 | Recent searches are hardcoded — no persistence or real history | Search overlay component | Medium |
| 5 | `itemId` cast to `number` may cause collision if IDs are large integers (JS precision) | Product type/mapping | Low |

## Security

| # | Issue | Location | Severity |
|---|-------|----------|----------|
| 1 | **ReDoS** via unsanitized user input in `new RegExp(userQuery)` | Search highlight | High |
| 2 | `NEXT_PUBLIC_API_URL` not validated — silent failure if unset | `src/core/axios/instance.ts` | Medium |
| 3 | `dangerouslySetInnerHTML` usage — verify no unescaped user content flows in | Components (search highlight) | High |

## Performance

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | Raw `<img>` tags instead of `next/image` — no automatic optimization | Product components | Medium |
| 2 | Filter object re-created on every render — defeats `useQuery` key stability / debounce | `filterProductStore` consumers | Medium |
| 3 | `ResizeObserver` instances not cleaned up properly — potential memory churn | Filter/layout components | Low |
| 4 | Infinite query accumulates pages without bound — no upper page limit | `ProductListing` / `SearchResultsListing` | Medium |

## Testing

**0 tests exist anywhere in the codebase.**

- No unit tests
- No integration tests
- No E2E tests
- No test configuration (`jest`, `vitest`, `playwright`, etc.)

This is the highest-risk area for ongoing development.

## Fragile Areas

- **`mapApiProductToUi`** — price ÷ 100_000 transform is a silent contract with the API. If the API changes units, UI prices will be wrong with no indication.
- **`useFilterUrlSync`** — bidirectional URL ↔ store binding is complex; desync bugs are hard to reproduce.
- **Dead filter params** — `activeDeal`, `activeTab`, `discountPercentages` create a false impression that filtering works on these dimensions.

---
*Last mapped: 2026-04-30*
