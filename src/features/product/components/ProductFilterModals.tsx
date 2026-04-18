'use client'

import FilterBottomSheet from './FilterBottomSheet'
import DiscountFilterBottomSheet from './DiscountFilterBottomSheet'
import TypeFilterBottomSheet from './TypeFilterBottomSheet'
import MobileSearchOverlay from './MobileSearchOverlay'
import { useUiProductStore } from '../store/uiProductStore'

/**
 * ProductFilterModals component
 * Responsibility: Orchestrate and manage the state for all bottom sheet filters.
 * By "moving state down" to this component, the main page remains uncluttered.
 * 
 * @returns {JSX.Element} The rendered modals
 */
const ProductFilterModals = () => {
  // --- Hooks (Directly accessing UI state from store) ---
  const {
    isFilterOpen,
    isDiscountFilterOpen,
    isTypeFilterOpen,
    setIsFilterOpen,
    setIsDiscountFilterOpen,
    setIsTypeFilterOpen,
  } = useUiProductStore()

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
        onReset={() => {
          // Reset point
        }}
      />

      {/* 2. Specialized Discount Filter Bottom Sheet */}
      <DiscountFilterBottomSheet
        isOpen={isDiscountFilterOpen}
        onClose={handleCloseDiscountFilter}
        onApply={(selectedDiscounts) => {
          console.log('Selected discounts:', selectedDiscounts)
          setIsDiscountFilterOpen(false)
        }}
        onReset={() => {
          // Reset point
        }}
      />

      {/* 3. Product Type Filter Bottom Sheet */}
      <TypeFilterBottomSheet
        isOpen={isTypeFilterOpen}
        onClose={handleCloseTypeFilter}
        onApply={(selectedTypes) => {
          console.log('Selected types:', selectedTypes)
          setIsTypeFilterOpen(false)
        }}
        onReset={() => {
          // Reset point
        }}
      />

      {/* 4. Mobile Search Full-screen Overlay */}
      <MobileSearchOverlay />
    </>
  )
}

export default ProductFilterModals
