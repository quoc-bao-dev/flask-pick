# Testing

**Mapped:** 2026-04-30
**Project:** flask-pick (Next.js product listing app)

## Status

**Testing is entirely absent from this codebase.**

## Framework

None installed. `package.json` contains no test runner dependencies:
- No Jest
- No Vitest
- No Playwright
- No Cypress
- No Testing Library

## Test Files

Zero test files found:
- No `*.test.ts` / `*.test.tsx` files
- No `*.spec.ts` / `*.spec.tsx` files
- No `__tests__/` directories

## Coverage

0% — no tests of any kind.

## CI / Test Scripts

No `test` script configured in `package.json`.

## Implications for New Work

Any new phase that introduces logic should also introduce a test foundation. Suggested starting points:

| Priority | What to test | Framework |
|----------|-------------|-----------|
| High | `mapApiProductToUi` price transform | Vitest (unit) |
| High | `filterProductStore` state transitions | Vitest (unit) |
| High | `useFilterUrlSync` URL ↔ store sync | Vitest + `@testing-library/react` |
| Medium | Filter components render/interaction | `@testing-library/react` |
| Medium | API service layer (mock axios) | Vitest (unit) |
| Low | E2E product listing + filter flows | Playwright |

---
*Last mapped: 2026-04-30*
