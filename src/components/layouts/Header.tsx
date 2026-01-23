"use client";

import { _Image } from "@/core/constant/asset";
import Logo from "../ui/Logo";
import SearchIcon from "../icons/SearchIcon";
import CameraIcon from "../icons/CameraIcon";
import { useState, useRef, useEffect } from "react";

const SUGGESTION_TAGS = ["hoodie", "quần baggy", "sweater", "túi đeo chéo"];

const SUGGESTION_ITEMS = [
  "teelab studio",
  "teelab official",
  "teelab girl wear",
  "teelab boy wear",
  "teelab unisex",
  "teelab accessories",
];

const MOCK_SHOPS = [
  {
    id: 1,
    name: "Thời trang gen Z",
    handle: "@fashion69genz",
    image: _Image.product,
  },
  {
    id: 2,
    name: "Thời trang gen alpha",
    handle: "@fashion69genalpha",
    image: _Image.product,
  },
  {
    id: 3,
    name: "Thời trang gen beta",
    handle: "@fashion69genbeta",
    image: _Image.product,
  },
];

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="text-[#596881]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex items-center justify-between">
      <Logo />

      <div className="hidden flex-1 mx-16 xl:block relative" ref={searchRef}>
        <div className="flex items-center gap-2 rounded-[12px] border-2 border-[var(--color-orange-1)] bg-white px-3 py-2">
          <SearchIcon />

          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={() => searchValue && setShowResults(true)}
            placeholder="Tìm kiếm sản phẩm, shop"
            className="w-full bg-transparent placeholder:text-[var(--color-gray-4)] outline-none"
          />

          {searchValue && (
            <button
              onClick={() => {
                setSearchValue("");
                setShowResults(false);
              }}
              className="flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="#111625"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div className="flex h-6 w-8 items-center justify-center rounded-md bg-[var(--color-primary-50)]">
            <CameraIcon />
          </div>
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[12px] shadow-lg border- border-[#DEE4EE] overflow-hidden z-50">
            <div className="p-1">
              {/* Suggestions Section */}
              <div className="p-3">
                <h3 className="text-[14px] font-semibold leading-[24px] tracking-[-2%] text-[#111625] mb-3">
                  Có thể bạn muốn tìm
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {SUGGESTION_TAGS.map((tag) => (
                    <button
                      key={tag}
                      className="bg-[#F7F9FB] rounded-[10px] px-3 py-1.5 text-[14px] font-normal leading-[20px] tracking-[-0.6%] text-[#111625] hover:opacity-80 transition-opacity"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {SUGGESTION_ITEMS.map((item, index) => (
                    <button
                      key={index}
                      className="w-full text-left text-[14px] font-semibold leading-[20px] tracking-[0%] text-[#111625] hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                    >
                      {highlightText(item, searchValue)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#DEE4EE] mx-3"></div>

              {/* Shop Section */}
              <div className="p-3">
                <h3 className="text-[14px] font-semibold leading-[24px] tracking-[-2%] text-[#111625] mb-3">
                  Shop
                </h3>
                <div className="space-y-3">
                  {MOCK_SHOPS.map((shop) => (
                    <button
                      key={shop.id}
                      className="w-full flex items-center gap-3 hover:bg-gray-50 px-2 py-2 rounded transition-colors"
                    >
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div className="flex-1 text-left">
                        <p className="text-[14px] font-medium leading-[20px] tracking-[-0.6%] text-[#111625]">
                          {shop.name}
                        </p>
                        <p className="text-[13px] font-medium leading-[17px] tracking-[0%] text-[#8796AF]">
                          {shop.handle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* === social media links === */}
      <div className="flex items-center gap-2 ">
        <div className="size-[40px] flex items-center justify-center border border-gray-1 rounded-[10px]">
          <img
            src={_Image.threads}
            alt=""
            className="size-[18px] object-contain"
          />
        </div>
        <div className="size-[40px] flex items-center justify-center border border-gray-1 rounded-[10px]">
          <img
            src={_Image.telegram}
            alt=""
            className="size-[18px] object-contain"
          />
        </div>
        <div className="size-[40px] flex items-center justify-center border border-gray-1 rounded-[10px]">
          <img
            src={_Image.facebook}
            alt=""
            className="size-[18px] object-contain"
          />
        </div>
        <div className="size-[40px] flex items-center justify-center border border-gray-1 rounded-[10px]">
          <img
            src={_Image.zalo}
            alt=""
            className="size-[18px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
