import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ProductFilterValues } from '../types';

interface ProductFilterActions {
  setActiveTab: (tab: string) => void;
  setActiveDeal: (deal: string) => void;
  setSortBy: (sortBy: string) => void;
  setCategoryIds: (ids: string[]) => void;
  setDiscountTypes: (types: string[]) => void;
  setDiscountPercentages: (percentages: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setSelectedBrands: (brands: string[]) => void;
  setShopTypes: (types: string[]) => void;
  setRatings: (ratings: string[]) => void;
  setTotalProducts: (count: number) => void;
  resetFilters: () => void;
}

export const initialFilterValues: ProductFilterValues = {
  activeTab: 'all',
  activeDeal: 'all',
  sortBy: 'relevant',
  categoryIds: [],
  discountTypes: [],
  discountPercentages: [],
  priceRange: [0, 10_000_000],
  selectedBrands: [],
  shopTypes: [],
  ratings: [],
  totalProducts: 0,
};


/**
 * useFilterProductStore
 * Responsibility: Track business logic filter values for product listing.
 */
export const useFilterProductStore = create<ProductFilterValues & ProductFilterActions>()(
  devtools((set) => ({
    ...initialFilterValues,

    setActiveTab: (tab) => set({ activeTab: tab }, false, 'product/setActiveTab'),
    setActiveDeal: (deal) => set({ activeDeal: deal }, false, 'product/setActiveDeal'),
    setSortBy: (sortBy) => set({ sortBy }, false, 'product/setSortBy'),
    setCategoryIds: (categoryIds) => set({ categoryIds }, false, 'product/setCategoryIds'),
    setDiscountTypes: (discountTypes) => set({ discountTypes }, false, 'product/setDiscountTypes'),
    setDiscountPercentages: (discountPercentages) => set({ discountPercentages }, false, 'product/setDiscountPercentages'),
    setPriceRange: (priceRange) => set({ priceRange }, false, 'product/setPriceRange'),
    setSelectedBrands: (selectedBrands) => set({ selectedBrands }, false, 'product/setSelectedBrands'),
    setShopTypes: (shopTypes) => set({ shopTypes }, false, 'product/setShopTypes'),
    setRatings: (ratings) => set({ ratings }, false, 'product/setRatings'),
    setTotalProducts: (totalProducts) => set({ totalProducts }, false, 'product/setTotalProducts'),

    resetFilters: () => set(initialFilterValues, false, 'product/resetFilters'),
  }))
);
