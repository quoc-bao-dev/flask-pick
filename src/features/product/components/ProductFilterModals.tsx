'use client'

import FilterBottomSheet from './FilterBottomSheet'
import DiscountFilterBottomSheet from './DiscountFilterBottomSheet'
import TypeFilterBottomSheet from './TypeFilterBottomSheet'
import MobileSearchOverlay from './MobileSearchOverlay'
import { useUiProductStore } from '../store/uiProductStore'
import { useFilterProductStore } from '../store/filterProductStore'

/**
 * ProductFilterModals component
 * Responsibility: Orchestrate and manage the state for all bottom sheet filters.
 * By "moving state down" to this component, the main page remains uncluttered.
 * 
 * @returns {JSX.Element} The rendered modals
 */
const ProductFilterModals = () => {
  const {
    isFilterOpen,
    isDiscountFilterOpen,
    isTypeFilterOpen,
    setIsFilterOpen,
    setIsDiscountFilterOpen,
    setIsTypeFilterOpen,
  } = useUiProductStore()

  const {
    discountTypes,
    setDiscountTypes,
    discountPercentages,
    setDiscountPercentages,
    resetFilters,
  } = useFilterProductStore()

  // --- Handlers ---
  
  const handleCloseMainFilter = () => {
    setIsFilterOpen(false)
  }

  const handleApplyMainFilter = () => {
    setIsFilterOpen(false)
    // Handle global filter apply logic here if needed
  }

  const handleCloseDiscountFilter = () => {
    setIsDiscountFilterOpen(false)
  }

  const handleCloseTypeFilter = () => {
    setIsTypeFilterOpen(false)
  }

  return (
    <>
      {/* 1. Global/Main Filter Bottom Sheet */}
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={handleCloseMainFilter}
        onApply={handleApplyMainFilter}
        onReset={resetFilters}
      />

      {/* 2. Specialized Discount Filter Bottom Sheet */}
      <DiscountFilterBottomSheet
        isOpen={isDiscountFilterOpen}
        initialSelected={discountTypes}
        onClose={handleCloseDiscountFilter}
        onApply={(selected) => {
          setDiscountTypes(selected)
          setIsDiscountFilterOpen(false)
        }}
        onReset={() => setDiscountTypes([])}
      />

      {/* 3. Product Type Filter Bottom Sheet */}
      <TypeFilterBottomSheet
        isOpen={isTypeFilterOpen}
        initialSelected={discountPercentages} // Assuming "Type" in modal map to percentages or vice versa?
        onClose={handleCloseTypeFilter}
        onApply={(selected) => {
          setDiscountPercentages(selected)
          setIsTypeFilterOpen(false)
        }}
        onReset={() => setDiscountPercentages([])}
      />

      {/* 4. Mobile Search Full-screen Overlay */}
      <MobileSearchOverlay />
    </>
  )
}

export default ProductFilterModals
