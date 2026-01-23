"use client";

import FilterBottomSheet from "@/components/ui/FilterBottomSheet";
import DiscountFilterBottomSheet from "@/components/ui/DiscountFilterBottomSheet";
import TypeFilterBottomSheet from "@/components/ui/TypeFilterBottomSheet";
import ProductDealFilter from "../partials/ProductDealFilter";
import ProductFilterButtons from "../partials/ProductFilterButtons";
import ProductTabs from "../partials/ProductTabs";
import ProductsList from "../partials/ProductsList";
import { useFilterProductStore } from "../store/filterProductStore";

const Home = () => {
  const {
    isFilterOpen,
    isDiscountFilterOpen,
    isTypeFilterOpen,
    setIsFilterOpen,
    setIsDiscountFilterOpen,
    setIsTypeFilterOpen,
  } = useFilterProductStore();

  return (
    <>
      <ProductTabs />
      <ProductDealFilter />
      <ProductFilterButtons />
      <ProductsList />

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={() => {
          setIsFilterOpen(false);
          // Handle apply filter logic here
        }}
        onReset={() => {
          // Handle reset filter logic here
        }}
      />

      {/* Discount Filter Bottom Sheet */}
      <DiscountFilterBottomSheet
        isOpen={isDiscountFilterOpen}
        onClose={() => setIsDiscountFilterOpen(false)}
        onApply={(selectedDiscounts) => {
          console.log("Selected discounts:", selectedDiscounts);
          // Handle apply discount filter logic here
        }}
        onReset={() => {
          // Handle reset discount filter logic here
        }}
      />

      {/* Type Filter Bottom Sheet */}
      <TypeFilterBottomSheet
        isOpen={isTypeFilterOpen}
        onClose={() => setIsTypeFilterOpen(false)}
        onApply={(selectedTypes) => {
          console.log("Selected types:", selectedTypes);
          // Handle apply type filter logic here
        }}
        onReset={() => {
          // Handle reset type filter logic here
        }}
      />
    </>
  );
};

export default Home;
