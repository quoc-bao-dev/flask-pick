"use client";

import { useFilterProductStore } from "../store/filterProductStore";

const dealOptions = ["Từ 1,000đ", "Từ 3,000đ", "Từ 9,000đ", "Từ 29,000đ"];

const ProductDealFilter = () => {
  const { activeDeal, setActiveDeal } = useFilterProductStore();

  return (
    <div className="pt-2 lg:hidden">
      <div className="flex items-center gap-3 text-[16px] font-semibold text-[var(--color-gray-2)]">
        <span>DEAL</span>
        <div className=" flex-1 min-w-0">
          <div className="flex w-max items-center gap-3 scrollbar-custom max-w-full overflow-x-auto  ">
            {dealOptions.map((label) => {
              const isActive = label === activeDeal;
              return (
                <button
                  key={label}
                  onClick={() => setActiveDeal(label)}
                  className={`rounded-full border px-3 py-1 text-[16px] font-semibold transition-colors whitespace-nowrap  cursor-pointer ${
                    isActive
                      ? "border-[var(--color-orange-1)] bg-[var(--color-primary-50)] text-[var(--color-orange-1)]"
                      : "border-[var(--color-border-1)] text-[var(--color-text-strong)] hover:border-[var(--color-border-2)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDealFilter;

