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
    openFilterWithCategory,
    setIsFilterOpen,
    setIsDiscountFilterOpen,
    setIsTypeFilterOpen,
    setOpenFilterWithCategory,
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
    setOpenFilterWithCategory(false)
  }

  const handleApplyMainFilter = () => {
    setIsFilterOpen(false)
    setOpenFilterWithCategory(false)
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
        openWithCategory={openFilterWithCategory}
      />

      {/* 2. Specialized Discount Percent Filter Bottom Sheet (% GIẢM GIÁ) */}
      <DiscountFilterBottomSheet
        isOpen={isDiscountFilterOpen}
        initialSelected={discountPercentages}
        onClose={handleCloseDiscountFilter}
        onApply={(selected) => {
          setDiscountPercentages(selected)
          setIsDiscountFilterOpen(false)
        }}
        onReset={() => setDiscountPercentages([])}
      />

      {/* 3. Product Type Filter Bottom Sheet (LOẠI GIẢM GIÁ) */}
      <TypeFilterBottomSheet
        isOpen={isTypeFilterOpen}
        initialSelected={discountTypes}
        onClose={handleCloseTypeFilter}
        onApply={(selected) => {
          setDiscountTypes(selected)
          setIsTypeFilterOpen(false)
        }}
        onReset={() => setDiscountTypes([])}
      />

      {/* 4. Mobile Search Full-screen Overlay */}
      <MobileSearchOverlay />
    </>
  )
}

export default ProductFilterModals
