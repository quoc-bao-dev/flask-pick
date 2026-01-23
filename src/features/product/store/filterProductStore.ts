import { create } from "zustand";

export interface FilterState {
  activeTab: string;
  activeDeal: string;
  isFilterOpen: boolean;
  isDiscountFilterOpen: boolean;
  isTypeFilterOpen: boolean;
}

interface FilterActions {
  setActiveTab: (tab: string) => void;
  setActiveDeal: (deal: string) => void;
  setIsFilterOpen: (isOpen: boolean) => void;
  setIsDiscountFilterOpen: (isOpen: boolean) => void;
  setIsTypeFilterOpen: (isOpen: boolean) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  activeTab: "all",
  activeDeal: "Từ 1,000đ",
  isFilterOpen: false,
  isDiscountFilterOpen: false,
  isTypeFilterOpen: false,
};

export const useFilterProductStore = create<FilterState & FilterActions>(
  (set) => ({
    ...initialState,
    setActiveTab: (tab) => set({ activeTab: tab }),
    setActiveDeal: (deal) => set({ activeDeal: deal }),
    setIsFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),
    setIsDiscountFilterOpen: (isOpen) =>
      set({ isDiscountFilterOpen: isOpen }),
    setIsTypeFilterOpen: (isOpen) => set({ isTypeFilterOpen: isOpen }),
    resetFilters: () => set(initialState),
  })
);

