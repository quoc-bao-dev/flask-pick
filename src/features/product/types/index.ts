/**
 * Product Interface
 * Represents a single product entity in the system
 */
export interface Product {
  id: number;
  image: string;
  topLabel: 'mall' | 'favorite' | null;
  bottomLabel: 'cheaper' | 'stable' | null;
  title: string;
  originalPrice: number;
  discountPercent: number;
  currentPrice: number;
  rating: number;
  sold: number;
  total: number;
  timeRemaining: string;
  buttonText: string;
  type: 'sale' | 'notify';
}

/**
 * Product Filter Values
 * Defines the core business logic of what's being filtered
 */
export interface ProductFilterValues {
  activeTab: string;
  activeDeal: string;
  sortBy: string;
  discountTypes: string[];
  discountPercentages: string[];
  priceRange: [number, number];
  selectedBrand: string;
  shopTypes: string[];
  ratings: string[];
  totalProducts: number; // Added field to track the currently filtered count
}

/**
 * Product UI State
 * Controls visibility of various filters/modals in the layout
 */
export interface ProductFilterUiState {
  isFilterOpen: boolean;
  isDiscountFilterOpen: boolean;
  isTypeFilterOpen: boolean;
}
