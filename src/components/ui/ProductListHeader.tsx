"use client";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { _Image } from "@/core/constant/asset";
import { useState, useEffect, useRef } from "react";

interface ProductListHeaderProps {
  productCount?: number;
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  activeDeal?: string;
  onDealChange?: (deal: string) => void;
}

const CATEGORY_OPTIONS = [
  { id: "all", label: "Tất cả", icon: _Image.tool },
  { id: "balo", label: "Balo & Túi ví nam", icon: _Image.balo },
  { id: "pet", label: "Chăm sóc thú cưng", icon: _Image.snack },
  { id: "women-shoes", label: "Giày dép nữ", icon: _Image.shose },
  { id: "grocery", label: "Bách hóa online", icon: _Image.food },
  { id: "men-shoes", label: "Giày dép nam", icon: _Image["shose-2"] },
  { id: "home-care", label: "Giặt giũ và chăm sóc nhà cửa", icon: _Image.wash },
  { id: "tools", label: "Dụng cụ và thiết bị tiện ích", icon: _Image.tool },
  { id: "watch", label: "Đồng hồ", icon: _Image.watch },
];

const DEAL_OPTIONS = ["Từ 1,000đ", "Từ 3,000đ", "Từ 9,000đ", "Từ 29,000đ"];

const SORT_OPTIONS = [
  { key: "price-low", label: "Giá: Thấp -> Cao" },
  { key: "price-high", label: "Giá: Cao -> Thấp" },
  { key: "newest", label: "Mới nhất" },
  { key: "bestselling", label: "Bán chạy" },
];

const ProductListHeader = ({
  productCount = 6988,
  selectedCategory: selectedCategoryProp = "all",
  onCategoryChange,
  activeDeal = DEAL_OPTIONS[0],
  onDealChange,
}: ProductListHeaderProps) => {
  const [sortBy, setSortBy] = useState("price-low");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState(selectedCategoryProp);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Sync with prop if it changes
  useEffect(() => {
    setSelectedCategory(selectedCategoryProp);
  }, [selectedCategoryProp]);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    if (isSortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortOpen]);

  // Check if scrolled to end
  useEffect(() => {
    const checkScrollEnd = () => {
      if (categoryScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          categoryScrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1; // -1 for rounding errors
        setIsAtEnd(isAtEnd);
      }
    };

    const scrollElement = categoryScrollRef.current;
    if (scrollElement) {
      checkScrollEnd(); // Check initial state
      scrollElement.addEventListener("scroll", checkScrollEnd);
      // Also check on resize
      window.addEventListener("resize", checkScrollEnd);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", checkScrollEnd);
      }
      window.removeEventListener("resize", checkScrollEnd);
    };
  }, []);

  return (
    <div className="hidden lg:block space-y-4 mb-6">
      {/* Title and Product Count */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] font-bold text-(--color-text-strong)">
            Danh sách sản phẩm
          </h1>
          <p className="text-[12px] text-[#111625] border border-[#DEE4EE] rounded-lg px-[8px] py-[5px]">
            {productCount.toLocaleString("vi-VN")}{" "}
            <span className="text-gray-2">sản phẩm</span>
          </p>
        </div>

        {/* DEAL Filters and Sort */}
        <div className="flex items-center gap-4">
          {/* DEAL Filters */}
          <div className="flex items-center gap-3">
            <span className="text-[16px] font-medium text-gray-2">DEAL</span>
            <div className="flex items-center gap-3">
              {DEAL_OPTIONS.map((deal) => {
                const isActive = deal === activeDeal;
                return (
                  <button
                    key={deal}
                    onClick={() => onDealChange?.(deal)}
                    className={`rounded-full border-[1.5px] px-3 py-1 text-[16px] font-semibold transition-colors whitespace-nowrap ${
                      isActive
                        ? "border-[var(--color-orange-1)] bg-[var(--color-primary-50)] text-[#111625]"
                        : "border-[var(--color-border-1)] text-[var(--color-text-strong)] hover:border-[var(--color-border-2)]"
                    }`}
                  >
                    {deal}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Dropdown */}
          {/* <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 rounded-lg border border-[var(--color-border-1)] bg-white px-4 py-2 text-[14px] font-semibold text-[var(--color-text-strong)] hover:border-[var(--color-border-2)] transition-colors"
            >
              <span>
                {SORT_OPTIONS.find((s) => s.key === sortBy)?.label ||
                  "Sắp xếp"}
              </span>
              <ChevronDownIcon
                className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg border border-[var(--color-border-1)] shadow-lg z-50 min-w-[200px]">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setSortBy(option.key);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[14px] transition-colors ${
                      sortBy === option.key
                        ? "bg-[var(--color-primary-50)] text-[var(--color-orange-1)] font-semibold"
                        : "text-[var(--color-text-strong)] hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="relative flex items-center">
        <div
          ref={categoryScrollRef}
          className="flex items-center gap-3 overflow-x-auto scrollbar-custom pb-2 pt-2 flex-1"
        >
          {CATEGORY_OPTIONS.map((category) => {
            const isActive = category.id === selectedCategory;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  onCategoryChange?.(category.id);
                }}
                className={`relative flex items-center gap-2 rounded-full px-3 py-2 border-[1.5px] transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-[var(--color-orange-1)] bg-white shadow-sm"
                    : "border-[var(--color-border-1)] bg-white hover:border-[var(--color-border-2)]"
                }`}
              >
                <span className="h-5 w-5 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={category.icon}
                    alt={category.label}
                    className="h-5 w-5 object-contain"
                  />
                </span>
                <span className="text-[13px] text-[var(--color-text-strong)]">
                  {category.label}
                </span>
                {isActive && (
                  <span className="absolute -top-1 -right-1 ">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="18" height="18" rx="9" fill="#F15024" />
                      <path
                        d="M5.5 9L8 11.5L13 6.5"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
          <div className="w-[52px] h-[32px]"></div>
        </div>
        {/* Gradient overlay */}
        {!isAtEnd && (
          <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none bg-gradient-to-r from-transparent to-white z-10"></div>
        )}
        {/* Scroll button */}
        {!isAtEnd && (
          <button
            onClick={() => {
              if (categoryScrollRef.current) {
                categoryScrollRef.current.scrollBy({
                  left: 200,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex-shrink-0 w-8 h-8 rounded-full border border-[#DEE4EE] bg-white flex items-center justify-center hover:opacity-80 transition-opacity z-20"
            aria-label="Scroll right"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="#111625"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductListHeader;
