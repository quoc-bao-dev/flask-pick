import { useMemo } from 'react';

import type { ProductFilters } from '@/services/product';

import { useFilterProductStore } from '../store/filterProductStore';

export const PRODUCT_PAGE_SIZE = 20;

/**
 * Builds the API filter object from the global filter store using granular
 * selectors so unrelated store writes (e.g. `totalProducts`) don't churn deps.
 *
 * @param applyFilters When false, returns only the page size (used for
 *                     unfiltered listings such as suggestions).
 */
export function useProductFilterParams(
  applyFilters: boolean,
): Omit<ProductFilters, 'cursor'> {
  const sortBy = useFilterProductStore((s) => s.sortBy);
  const categoryIds = useFilterProductStore((s) => s.categoryIds);
  const discountTypes = useFilterProductStore((s) => s.discountTypes);
  const priceRange = useFilterProductStore((s) => s.priceRange);
  const selectedBrands = useFilterProductStore((s) => s.selectedBrands);
  const shopTypes = useFilterProductStore((s) => s.shopTypes);
  const ratings = useFilterProductStore((s) => s.ratings);
  const activeTab = useFilterProductStore((s) => s.activeTab);
  const discountPercentages = useFilterProductStore((s) => s.discountPercentages);

  return useMemo(() => {
    if (!applyFilters) return { limit: PRODUCT_PAGE_SIZE };

    const [minPrice, maxPrice] = priceRange;

    return {
      limit: PRODUCT_PAGE_SIZE,
      q: undefined, // Add q here if needed in the future, but for now we focus on promotionId
      sort: sortBy && sortBy !== 'relevant' ? sortBy : undefined,
      minPrice,
      maxPrice,
      promotionId: activeTab !== 'all' ? activeTab : undefined,
      discountTypes: discountTypes.length ? discountTypes.join(',') : undefined,
      discountPercents: discountPercentages.length ? discountPercentages.join(',') : undefined,
      brandIds: selectedBrands.length ? selectedBrands.join(',') : undefined,
      isMall: shopTypes.includes('mall') || undefined,
      isPreferred: shopTypes.includes('favorite') || undefined,
      isPreferredPlus: shopTypes.includes('favorite-plus') || undefined,
      minRating: ratings.length
        ? Math.min(
            ...ratings.map((r) => Number(r)).filter((n) => !Number.isNaN(n)),
          )
        : undefined,
      category: categoryIds.length ? categoryIds.join(',') : undefined,
    };
  }, [
    applyFilters,
    sortBy,
    categoryIds,
    discountTypes,
    priceRange,
    selectedBrands,
    shopTypes,
    ratings,
    activeTab,
    discountPercentages,
  ]);
}
