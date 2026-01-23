"use client";

import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import { useFilterProductStore } from "../store/filterProductStore";

const ProductFilterButtons = () => {
  const {
    setIsFilterOpen,
    setIsDiscountFilterOpen,
    setIsTypeFilterOpen,
  } = useFilterProductStore();

  return (
    <div className="pt-2 lg:hidden">
      <div className=" flex items-center gap-3 ">
        <div className="min-w-[24px]">
          <FilterIcon />
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-3 overflow-x-auto scrollbar-custom">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-surface-50 px-4 py-2 text-[16px] font-semibold text-gray-2"
          >
            <span>Giá</span>
            <ArrowUpIcon />
          </button>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-surface-50 px-4 py-2 text-[16px] font-semibold text-gray-2"
          >
            <span className=" truncate">Danh mục</span>
            <ChevronDownIcon />
          </button>

          <button
            onClick={() => setIsDiscountFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-surface-50 px-4 py-2 text-[16px] font-semibold text-gray-2"
          >
            <span className=" truncate">% giảm giá</span>
            <ChevronDownIcon />
          </button>

          <button
            onClick={() => setIsTypeFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-surface-50 px-4 py-2 text-[16px] font-semibold text-gray-2"
          >
            <span className=" truncate">Loại</span>
            <ChevronDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterButtons;

