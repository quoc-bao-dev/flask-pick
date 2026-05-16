import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { ProductFilterUiState } from '../types'


interface ProductFilterUiActions {
  setIsFilterOpen: (isOpen: boolean) => void
  setIsDiscountFilterOpen: (isOpen: boolean) => void
  setIsTypeFilterOpen: (isOpen: boolean) => void
  setIsMobileSearchOpen: (isOpen: boolean) => void
  setOpenFilterWithCategory: (open: boolean) => void
  closeAllFilters: () => void
}

const initialUiState: ProductFilterUiState = {
  isFilterOpen: false,
  isDiscountFilterOpen: false,
  isTypeFilterOpen: false,
  isMobileSearchOpen: false,
  openFilterWithCategory: false,
}

/**
 * useUiProductStore
 * Responsibility: Track visibility state of filter drawers and modals in the product feature.
 */
export const useUiProductStore = create<ProductFilterUiState & ProductFilterUiActions>()(
  devtools((set) => ({
    ...initialUiState,

    setIsFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }, false, 'ui/setIsFilterOpen'),
    setIsDiscountFilterOpen: (isOpen) =>
      set({ isDiscountFilterOpen: isOpen }, false, 'ui/setIsDiscountFilterOpen'),
    setIsTypeFilterOpen: (isOpen) => set({ isTypeFilterOpen: isOpen }, false, 'ui/setIsTypeFilterOpen'),
    setIsMobileSearchOpen: (isOpen) =>
      set({ isMobileSearchOpen: isOpen }, false, 'ui/setIsMobileSearchOpen'),
    setOpenFilterWithCategory: (open) =>
      set({ openFilterWithCategory: open }, false, 'ui/setOpenFilterWithCategory'),
    closeAllFilters: () => set(initialUiState, false, 'ui/closeAllFilters'),
  })),
)
