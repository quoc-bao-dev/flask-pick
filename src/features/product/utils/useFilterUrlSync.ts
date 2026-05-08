'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import {
  initialFilterValues,
  useFilterProductStore,
} from '../store/filterProductStore';

/** URL search-param keys we sync (matches the API filter names). */
const PARAM_KEYS = {
  sort: 'sort',
  category: 'category',
  discountTypes: 'discountTypes',
  brandIds: 'brandIds',
  shopTypes: 'shopTypes',
  ratings: 'ratings',
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
  promotionId: 'promotionId',
} as const;

const splitCsv = (raw: string | null): string[] =>
  raw ? raw.split(',').filter(Boolean) : [];

const arraysEqual = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

/**
 * Two-way binds the filter store to URL search params:
 *  - Hydrates the store from the URL once on mount.
 *  - Mirrors store changes back into the URL via `router.replace`.
 *
 * Mount once per page (e.g. in `home.tsx` / `search.tsx`). Mounting twice on
 * the same page would race writes to the URL.
 */
export function useFilterUrlSync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hydrated = useRef(false);

  // Per-slice subscriptions so URL writes only trigger when filters actually move.
  const sortBy = useFilterProductStore((s) => s.sortBy);
  const categoryIds = useFilterProductStore((s) => s.categoryIds);
  const discountTypes = useFilterProductStore((s) => s.discountTypes);
  const priceRange = useFilterProductStore((s) => s.priceRange);
  const selectedBrands = useFilterProductStore((s) => s.selectedBrands);
  const shopTypes = useFilterProductStore((s) => s.shopTypes);
  const ratings = useFilterProductStore((s) => s.ratings);
  const activeTab = useFilterProductStore((s) => s.activeTab);

  // 1. URL → store (once on mount)
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const store = useFilterProductStore.getState();
    const sp = searchParams;

    const sort = sp?.get(PARAM_KEYS.sort);
    if (sort) store.setSortBy(sort);

    const promotionId = sp?.get(PARAM_KEYS.promotionId);
    if (promotionId) store.setActiveTab(promotionId);

    const category = splitCsv(sp?.get(PARAM_KEYS.category) ?? null);
    if (category.length) store.setCategoryIds(category);

    const dt = splitCsv(sp?.get(PARAM_KEYS.discountTypes) ?? null);
    if (dt.length) store.setDiscountTypes(dt);

    const brands = splitCsv(sp?.get(PARAM_KEYS.brandIds) ?? null);
    if (brands.length) store.setSelectedBrands(brands);

    const shops = splitCsv(sp?.get(PARAM_KEYS.shopTypes) ?? null);
    if (shops.length) store.setShopTypes(shops);

    const r = splitCsv(sp?.get(PARAM_KEYS.ratings) ?? null);
    if (r.length) store.setRatings(r);

    const min = sp?.get(PARAM_KEYS.minPrice);
    const max = sp?.get(PARAM_KEYS.maxPrice);
    if (min !== null && min !== undefined) {
      const [, curMax] = store.priceRange;
      store.setPriceRange([
        Number.isFinite(Number(min)) ? Number(min) : curMax,
        max !== null && max !== undefined && Number.isFinite(Number(max))
          ? Number(max)
          : curMax,
      ]);
    } else if (max !== null && max !== undefined) {
      const [curMin] = store.priceRange;
      store.setPriceRange([
        curMin,
        Number.isFinite(Number(max)) ? Number(max) : curMin,
      ]);
    }
  }, [searchParams]);

  // 2. store → URL
  useEffect(() => {
    if (!hydrated.current) return;

    const next = new URLSearchParams(searchParams?.toString() ?? '');

    const setOrDelete = (key: string, value: string | undefined) => {
      if (value && value.length > 0) next.set(key, value);
      else next.delete(key);
    };

    setOrDelete(
      PARAM_KEYS.sort,
      sortBy && sortBy !== initialFilterValues.sortBy ? sortBy : undefined,
    );
    setOrDelete(
      PARAM_KEYS.category,
      categoryIds.length ? categoryIds.join(',') : undefined,
    );
    setOrDelete(
      PARAM_KEYS.discountTypes,
      discountTypes.length ? discountTypes.join(',') : undefined,
    );
    setOrDelete(
      PARAM_KEYS.brandIds,
      selectedBrands.length ? selectedBrands.join(',') : undefined,
    );
    setOrDelete(
      PARAM_KEYS.shopTypes,
      shopTypes.length ? shopTypes.join(',') : undefined,
    );
    setOrDelete(
      PARAM_KEYS.ratings,
      ratings.length ? ratings.join(',') : undefined,
    );
    setOrDelete(
      PARAM_KEYS.promotionId,
      activeTab && activeTab !== initialFilterValues.activeTab ? activeTab : undefined,
    );

    const isPriceDefault = arraysEqual(
      priceRange.map(String),
      initialFilterValues.priceRange.map(String),
    );
    setOrDelete(
      PARAM_KEYS.minPrice,
      isPriceDefault ? undefined : String(priceRange[0]),
    );
    setOrDelete(
      PARAM_KEYS.maxPrice,
      isPriceDefault ? undefined : String(priceRange[1]),
    );

    const nextStr = next.toString();
    const currentStr = searchParams?.toString() ?? '';
    if (nextStr === currentStr) return;

    router.replace(`${pathname}${nextStr ? `?${nextStr}` : ''}`, {
      scroll: false,
    });
  }, [
    pathname,
    router,
    searchParams,
    sortBy,
    categoryIds,
    discountTypes,
    priceRange,
    selectedBrands,
    shopTypes,
    ratings,
    activeTab,
  ]);
}
