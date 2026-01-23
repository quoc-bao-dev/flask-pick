"use client";

import BalanceIcon from "@/components/icons/BalanceIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import SparkleIcon from "@/components/icons/SparkleIcon";
import StarSmallIcon from "@/components/icons/StarSmallIcon";
import { _Image } from "@/core/constant/asset";
import { useState, useEffect, useRef } from "react";
import RangeInput from "./RangeInput";

interface FilterSidebarProps {
  onApply: () => void;
  onReset: () => void;
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

const BRAND_OPTIONS = [
  "Toshiba",
  "Sony",
  "Mitsubishi",
  "Kawasaki",
  "Toyota",
  "Honda",
  "Yamaha",
  "Subaru",
  "Daikin",
  "Canon",
  "LG",
  "Huyndai",
  "Samsung",
  "Casper",
  "Sharp",
];

const FilterSidebar = ({ onApply, onReset }: FilterSidebarProps) => {
  const [sortBy, setSortBy] = useState("relevant");
  const [discountTypes, setDiscountTypes] = useState<string[]>([]);
  const [discountPercentages, setDiscountPercentages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    69000, 8869000,
  ]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Samsung");
  const [shopTypes, setShopTypes] = useState<string[]>([]);
  const [ratings, setRatings] = useState<string[]>([]);
  const brandDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        brandDropdownRef.current &&
        !brandDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBrandOpen(false);
      }
    };

    if (isBrandOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBrandOpen]);

  const toggleDiscountType = (type: string) => {
    setDiscountTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleDiscountPercentage = (percent: string) => {
    setDiscountPercentages((prev) =>
      prev.includes(percent)
        ? prev.filter((p) => p !== percent)
        : [...prev, percent]
    );
  };

  const toggleShopType = (type: string) => {
    setShopTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleRating = (rating: string) => {
    setRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const parseInputNumber = (value: string) => {
    const numeric = Number(value.replace(/[^\d]/g, "") || "0");
    return numeric;
  };

  const formatPrice = (value: number) => value.toLocaleString("vi-VN");

  const handleMinInputChange = (value: string) => {
    setPriceRange(([_, max]) => {
      const nextMin = clamp(parseInputNumber(value), 0, max);
      return [nextMin, max];
    });
  };

  const handleMaxInputChange = (value: string) => {
    setPriceRange(([min, _]) => {
      const nextMax = clamp(parseInputNumber(value), min, 10000000);
      return [min, nextMax];
    });
  };

  const handleReset = () => {
    setSortBy("relevant");
    setDiscountTypes([]);
    setDiscountPercentages([]);
    setPriceRange([69000, 8869000]);
    setSelectedCategory("all");
    setSelectedBrand("Samsung");
    setShopTypes([]);
    setRatings([]);
    onReset();
  };

  const handleApply = () => {
    onApply();
  };

  return (
    <div className="space-y-6 p-3 rounded-lg bg-white border border-[#DEE4EE]">
      <div className="">
        <h2 className="text-[24px] font-semibold ">Bộ lọc</h2>
      </div>
      <div className="mb-6 h-px bg-[#DEE4EE]"></div>
      {/* Sắp xếp theo */}
      <div>
        <h3 className="text-[14px] font-normal leading-[28px] tracking-normal text-gray-2 mb-3 uppercase">
          SẮP XẾP THEO
        </h3>
        <div className="space-y-3">
          {[
            { key: "relevant", label: "Liên quan" },
            { key: "newest", label: "Mới nhất" },
            { key: "bestselling", label: "Bán chạy" },
          ].map((option) => (
            <label
              key={option.key}
              className="flex justify-between items-center cursor-pointer"
            >
              <span className="text-[14px] font-medium leading-[20px] tracking-[-0.6%] text-[var(--color-text-strong)]">
                {option.label}
              </span>
              <input
                type="radio"
                name="sortBy"
                value={option.key}
                checked={sortBy === option.key}
                onChange={() => setSortBy(option.key)}
                className="w-5 h-5 border-2 border-[#DEE4EE] rounded-full appearance-none cursor-pointer bg-white checked:border-[var(--color-orange-1)] relative checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-orange-1)] checked:after:rounded-full"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Loại giảm giá */}
      <div>
        <h3 className="text-[14px] font-normal leading-[28px] tracking-normal text-gray-2 mb-3 uppercase">
          LOẠI GIẢM GIÁ
        </h3>
        <div className="space-y-3">
          {[
            {
              key: "cheaper",
              label: "Rẻ hơn lịch sử",
              count: 69,
              icon: <SparkleIcon className="h-4 w-4 text-white" />,
            },
            {
              key: "stable",
              label: "Giá không đổi",
              count: 69,
              icon: <BalanceIcon className="h-4 w-4 text-white" />,
            },
          ].map((option) => (
            <label
              key={option.key}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-[14px] font-medium leading-[20px] tracking-[-0.6%] text-[var(--color-text-strong)] underline decoration-wavy decoration-[#8796AF]"
                  style={
                    {
                      textUnderlineOffset: "21.5%",
                      textDecorationThickness: "4.5%",
                    } as React.CSSProperties
                  }
                >
                  {option.label}
                </span>
                <span className="text-[14px] text-[#8796AF]">
                  ({option.count})
                </span>
              </div>
              <input
                type="checkbox"
                checked={discountTypes.includes(option.key)}
                onChange={() => toggleDiscountType(option.key)}
                className="w-5 h-5 rounded border-[var(--color-border-1)] accent-[var(--color-orange-1)] focus:ring-[var(--color-orange-1)]"
              />
            </label>
          ))}
        </div>
      </div>

      {/* % giảm giá */}
      <div>
        <h3 className="text-[14px] font-normal leading-[28px] tracking-normal text-gray-2 mb-3 uppercase">
          % GIẢM GIÁ
        </h3>
        <div className="space-y-3">
          {[
            { key: "over50", label: "Giảm sốc (Trên 50%)", count: 69 },
            {
              key: "30-50",
              label: "Giảm sâu (30% - 50%)",
              count: 69,
            },
            {
              key: "10-30",
              label: "Giảm vừa (10% - 30%)",
              count: 69,
            },
            { key: "under10", label: "Giảm ít (Dưới 10%)", count: 69 },
          ].map((option) => (
            <label
              key={option.key}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium leading-[20px] tracking-[-0.6%] text-[var(--color-text-strong)]">
                  {option.label}
                </span>
                <span className="text-[14px] text-[#8796AF]">
                  ({option.count})
                </span>
              </div>
              <input
                type="checkbox"
                checked={discountPercentages.includes(option.key)}
                onChange={() => toggleDiscountPercentage(option.key)}
                className="w-5 h-5 rounded border-[var(--color-border-1)] accent-[var(--color-orange-1)] focus:ring-[var(--color-orange-1)]"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Khoảng giá */}
      <div>
        <h3 className="text-[14px] font-normal leading-[28px] tracking-normal text-gray-2 mb-3 uppercase">
          KHOẢNG GIÁ
        </h3>
        <div className="space-y-4">
          {/* Slider */}
          <RangeInput
            min={0}
            max={10000000}
            step={1000}
            value={priceRange}
            onChange={setPriceRange}
          />

          {/* Input fields */}
          <div className="relative flex flex-col">
            <div className="relative flex border border-[#DEE4EE] rounded-[10px] ">
              <div className="px-3 py-2 bg-[#F7F9FB] text-[#8796AF] text-[14px] pointer-events-none">
                ₫
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={formatPrice(priceRange[0])}
                onChange={(e) => handleMinInputChange(e.target.value)}
                className="flex-1 px-3 py-2  text-[14px] placeholder:text-[#8796AF] focus:outline-none focus:border-[var(--color-orange-1)]"
                placeholder="Tối thiểu"
              />
            </div>
            {/* Dashed line connector */}
            <div className="ml-4 border border-dashed border-[#DEE4EE] h-[16px] w-px"></div>
            <div className="relative flex border border-[#DEE4EE] rounded-[10px] ">
              <div className="px-3 py-2 bg-[#F7F9FB] text-[#8796AF] text-[14px] pointer-events-none">
                ₫
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={formatPrice(priceRange[1])}
                onChange={(e) => handleMaxInputChange(e.target.value)}
                className="flex-1 px-3 py-2  text-[14px] placeholder:text-[#8796AF] focus:outline-none focus:border-[var(--color-orange-1)]"
                placeholder="Tối đa"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Áp dụng button ở giữa */}
      <button
        onClick={handleApply}
        className="w-full px-4 py-3 bg-[var(--color-orange-1)] rounded-lg text-[14px] font-semibold text-white hover:opacity-90 transition-opacity"
      >
        Áp dụng
      </button>

      {/* SHOP */}
      <div>
        <h3 className="text -[14px] font-normal leading-[28px] tracking-normal text-gray-2 mb-3 uppercase">
          SHOP
        </h3>
        <div className="space-y-3">
          {[
            { key: "mall", label: "Shop Mall", count: 69 },
            { key: "favorite", label: "Shop Yêu thích", count: 69 },
            { key: "favorite-plus", label: "Shop Yêu thích +", count: 69 },
          ].map((option) => (
            <label
              key={option.key}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium leading-[20px] tracking-[-0.6%] text-[var(--color-text-strong)]">
                  {option.label}
                </span>
                <span className="text-[14px] text-[#8796AF]">
                  ({option.count})
                </span>
              </div>
              <input
                type="checkbox"
                checked={shopTypes.includes(option.key)}
                onChange={() => toggleShopType(option.key)}
                className="w-5 h-5 rounded border-[var(--color-border-1)] accent-[var(--color-orange-1)] focus:ring-[var(--color-orange-1)]"
              />
            </label>
          ))}
        </div>
      </div>

      {/* === danh mục === */}
      {/* <div className="my-2 h-px bg-gray-1"></div>
      <div className="pt-2">
        <h2 className="text-sm text-gray-2 uppercase">Danh Mục</h2>
        <button
          type="button"
          onClick={() => setIsCategoryOpen(true)}
          className="w-full mt-2 py-2 px-3 rounded-lg bg-gray-1 text-gray-2 flex gap-2 items-center justify-between text-left"
        >
          <div className="flex gap-2 items-center">
            <CategoryIcon />
            <p className="text-sm">
              {CATEGORY_OPTIONS.find((c) => c.id === selectedCategory)?.label ||
                "Chọn danh mục"}
            </p>
          </div>
          <div className="">
            <ChevronRightIcon />
          </div>
        </button>
      </div> */}

      {/* Category Modal/Drawer - có thể implement sau */}
      {/* {isCategoryOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Danh mục</h2>
              <button
                onClick={() => setIsCategoryOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2 border-2 border-[var(--color-orange-1)] rounded-lg px-3 py-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
                >
                  <path
                    d="M11.8125 11.8125L15 15"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.75 7.875C12.75 10.6005 10.6005 12.75 7.875 12.75C5.1495 12.75 3 10.6005 3 7.875C3 5.1495 5.1495 3 7.875 3C10.6005 3 12.75 5.1495 12.75 7.875Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
                <input
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Tìm kiếm danh mục"
                  className="flex-1 text-[14px] outline-none placeholder:text-gray-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORY_OPTIONS.filter((c) =>
                c.label.toLowerCase().includes(categorySearch.toLowerCase())
              ).map((category) => {
                const isActive = category.id === selectedCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsCategoryOpen(false);
                    }}
                    className={`flex items-center gap-2 rounded-full px-3 py-2 border transition-colors ${
                      isActive
                        ? "border-[var(--color-orange-1)] bg-white shadow-sm"
                        : "border-[var(--color-border-1)] bg-white"
                    }`}
                  >
                    <span className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={category.icon}
                        alt={category.label}
                        className="h-6 w-6 object-contain"
                      />
                    </span>
                    <span className="text-[13px] text-[var(--color-text-strong)] text-left">
                      {category.label}
                    </span>
                    {isActive && (
                      <span className="ml-auto h-5 w-5 rounded-full bg-[var(--color-orange-1)] text-white flex items-center justify-center text-[12px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )} */}

      {/* === brand === */}
      <div className="pt-2 relative" ref={brandDropdownRef}>
        <h2 className="text-sm text-gray-2 uppercase">thương hiệu</h2>
        <button
          type="button"
          onClick={() => setIsBrandOpen(!isBrandOpen)}
          className="w-full mt-4 py-2 px-3 rounded-lg bg-[#F7F9FB] text-gray-2 flex gap-2 items-center justify-between text-left"
        >
          <div className="flex gap-2 items-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.74986 5.39986C3.74986 4.96225 3.9237 4.54257 4.23313 4.23313C4.54257 3.9237 4.96225 3.74986 5.39986 3.74986H6.14986C6.58553 3.74961 7.00342 3.57706 7.31236 3.26986L7.83736 2.74486C7.99069 2.59066 8.173 2.46829 8.37379 2.38479C8.57458 2.30129 8.7899 2.2583 9.00736 2.2583C9.22482 2.2583 9.44013 2.30129 9.64093 2.38479C9.84172 2.46829 10.024 2.59066 10.1774 2.74486L10.7024 3.26986C11.0114 3.57736 11.4299 3.74986 11.8649 3.74986H12.6149C13.0525 3.74986 13.4721 3.9237 13.7816 4.23313C14.091 4.54257 14.2649 4.96225 14.2649 5.39986V6.14986C14.2649 6.58486 14.4374 7.00336 14.7449 7.31236L15.2699 7.83736C15.4241 7.99069 15.5464 8.173 15.6299 8.37379C15.7134 8.57458 15.7564 8.7899 15.7564 9.00736C15.7564 9.22482 15.7134 9.44013 15.6299 9.64093C15.5464 9.84172 15.4241 10.024 15.2699 10.1774L14.7449 10.7024C14.4377 11.0113 14.2651 11.4292 14.2649 11.8649V12.6149C14.2649 13.0525 14.091 13.4721 13.7816 13.7816C13.4721 14.091 13.0525 14.2649 12.6149 14.2649H11.8649C11.4292 14.2651 11.0113 14.4377 10.7024 14.7449L10.1774 15.2699C10.024 15.4241 9.84172 15.5464 9.64093 15.6299C9.44013 15.7134 9.22482 15.7564 9.00736 15.7564C8.7899 15.7564 8.57458 15.7134 8.37379 15.6299C8.173 15.5464 7.99069 15.4241 7.83736 15.2699L7.31236 14.7449C7.00342 14.4377 6.58553 14.2651 6.14986 14.2649H5.39986C4.96225 14.2649 4.54257 14.091 4.23313 13.7816C3.9237 13.4721 3.74986 13.0525 3.74986 12.6149V11.8649C3.74961 11.4292 3.57706 11.0113 3.26986 10.7024L2.74486 10.1774C2.59066 10.024 2.46829 9.84172 2.38479 9.64093C2.30129 9.44013 2.2583 9.22482 2.2583 9.00736C2.2583 8.7899 2.30129 8.57458 2.38479 8.37379C2.46829 8.173 2.59066 7.99069 2.74486 7.83736L3.26986 7.31236C3.57706 7.00342 3.74961 6.58553 3.74986 6.14986V5.39986Z"
                stroke="#596881"
                strokeWidth="1.73333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm">{selectedBrand || "Chọn thương hiệu"}</p>
          </div>
          <div className="">
            <ChevronDownIcon
              className={`transition-transform ${
                isBrandOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Brand Dropdown */}
        {isBrandOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-[var(--color-border-1)] shadow-lg z-50 p-4 max-h-[400px] overflow-y-auto">
            <div className="mb-4">
              <div className="flex items-center gap-2 border-2 border-[var(--color-orange-1)] rounded-lg px-3 py-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
                >
                  <path
                    d="M11.8125 11.8125L15 15"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.75 7.875C12.75 10.6005 10.6005 12.75 7.875 12.75C5.1495 12.75 3 10.6005 3 7.875C3 5.1495 5.1495 3 7.875 3C10.6005 3 12.75 5.1495 12.75 7.875Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
                <input
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Tìm kiếm thương hiệu"
                  className="flex-1 text-[14px] outline-none placeholder:text-gray-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {BRAND_OPTIONS.filter((b) =>
                b.toLowerCase().includes(brandSearch.toLowerCase())
              ).map((brand) => {
                const isActive = brand === selectedBrand;
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => {
                      setSelectedBrand(brand);
                      setIsBrandOpen(false);
                    }}
                    className={`relative rounded-full px-3 py-2 border text-[13px] transition-colors ${
                      isActive
                        ? "border-[var(--color-orange-1)] text-[var(--color-text-strong)] bg-white"
                        : "border-[var(--color-border-1)] text-[var(--color-text-strong)] bg-white"
                    }`}
                  >
                    {brand}
                    {isActive && (
                      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[var(--color-orange-1)] text-white flex items-center justify-center text-[12px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ĐÁNH GIÁ */}
      <div>
        <h3 className="text-[14px] font-normal leading-[28px] tracking-normal text-gray-2 mb-3 uppercase">
          ĐÁNH GIÁ
        </h3>
        <div className="space-y-3">
          {[
            { key: "5.0", label: "5.0", count: 69 },
            { key: "4.0+", label: "4.0 trở lên", count: 69 },
            { key: "3.0+", label: "3.0 trở lên", count: 69 },
            { key: "2.0+", label: "2.0 trở lên", count: 69 },
            { key: "1.0+", label: "1.0 trở lên", count: 69 },
          ].map((option) => (
            <label
              key={option.key}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <StarSmallIcon />
                <span className="text-[14px] text-[var(--color-text-strong)] font-medium leading-[20px] tracking-[-0.6%]">
                  {option.label}
                </span>
                <span className="text-[14px] text-[#8796AF]">
                  ({option.count})
                </span>
              </div>
              <input
                type="checkbox"
                checked={ratings.includes(option.key)}
                onChange={() => toggleRating(option.key)}
                className="w-5 h-5 rounded border-[var(--color-border-1)] accent-[var(--color-orange-1)] focus:ring-[var(--color-orange-1)]"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Thiết lập lại button ở cuối */}
      <button
        onClick={handleReset}
        className="w-full px-4 py-3 border border-[var(--color-border-1)] rounded-lg text-[14px] font-semibold text-[var(--color-text-strong)] hover:bg-gray-50 transition-colors"
      >
        Thiết lập lại
      </button>
    </div>
  );
};

export default FilterSidebar;
