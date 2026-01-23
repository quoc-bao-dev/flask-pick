"use client";

import BalanceIcon from "@/components/icons/BalanceIcon";
import FlashIcon from "@/components/icons/FlashIcon";
import SparkleIcon from "@/components/icons/SparkleIcon";
import StarSmallIcon from "@/components/icons/StarSmallIcon";
import FilterSidebar from "@/components/ui/FilterSidebar";
import ProductListHeader from "@/components/ui/ProductListHeader";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { _Image } from "@/core/constant/asset";
import { useFilterProductStore } from "../store/filterProductStore";

const mockProducts = [
  {
    id: 1,
    image: _Image.product,
    topLabel: "mall" as const,
    bottomLabel: "cheaper" as const,
    title: "Thức ăn hạt Classic Pet vị bò cho chó trưởng thành gói 400g",
    originalPrice: 24000,
    discountPercent: 50,
    currentPrice: 12000,
    rating: 5.0,
    sold: 12,
    total: 18,
    timeRemaining: "01:42:00",
    buttonText: "21:00 - Nhắc tôi",
  },
  {
    id: 2,
    image: _Image.product,
    topLabel: "favorite" as const,
    bottomLabel: "stable" as const,
    title: "Thức ăn hạt Royal Canin cho chó con gói 1.5kg",
    originalPrice: 350000,
    discountPercent: 30,
    currentPrice: 245000,
    rating: 4.8,
    sold: 8,
    total: 15,
    timeRemaining: "02:15:30",
    buttonText: "19:00 - Nhắc tôi",
  },
  {
    id: 3,
    image: _Image.product,
    topLabel: null,
    bottomLabel: "cheaper" as const,
    title: "Pate cho mèo Whiskas gói 400g",
    originalPrice: 45000,
    discountPercent: 40,
    currentPrice: 27000,
    rating: 4.5,
    sold: 20,
    total: 25,
    timeRemaining: "00:30:15",
    buttonText: "00:00 - Nhắc tôi",
  },
  {
    id: 4,
    image: _Image.product,
    topLabel: "mall" as const,
    bottomLabel: null,
    title: "Đồ chơi cho chó mèo bóng tennis cao cấp",
    originalPrice: 150000,
    discountPercent: 25,
    currentPrice: 112500,
    rating: 4.9,
    sold: 5,
    total: 10,
    timeRemaining: "03:20:45",
    buttonText: "02:00 - Nhắc tôi",
  },
  {
    id: 5,
    image: _Image.product,
    topLabel: null,
    bottomLabel: "stable" as const,
    title: "Cát vệ sinh cho mèo Ever Clean gói 10L",
    originalPrice: 280000,
    discountPercent: 20,
    currentPrice: 224000,
    rating: 4.7,
    sold: 15,
    total: 20,
    timeRemaining: "01:10:20",
    buttonText: "21:00 - Nhắc tôi",
  },
  {
    id: 6,
    image: _Image.product,
    topLabel: "favorite" as const,
    bottomLabel: "cheaper" as const,
    title: "Thức ăn hạt Pedigree cho chó lớn gói 3kg",
    originalPrice: 420000,
    discountPercent: 35,
    currentPrice: 273000,
    rating: 4.6,
    sold: 10,
    total: 15,
    timeRemaining: "02:45:10",
    buttonText: "19:00 - Nhắc tôi",
  },
];

const renderBottomLabel = (type: "cheaper" | "stable") => {
  if (type === "cheaper") {
    return (
      <div
        className="absolute left-0 bottom-0 flex items-center gap-1 rounded-tr-[4px] rounded-bl-[4px] bg-[var(--color-orange-1)] px-2 py-1 text-xs font-semibold text-white"
        style={{
          border: "1px solid",
          borderImageSource:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
        <SparkleIcon className="h-3 w-3 text-white" />
        Rẻ hơn lịch sử
      </div>
    );
  }

  return (
    <div
      className="absolute left-0 bottom-0 flex items-center gap-1 rounded-tr-[4px] rounded-bl-[4px] bg-[#0e1624] px-2 py-1 text-xs font-semibold text-white"
      style={{
        border: "1px solid",
        borderImageSource:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)",
      }}
    >
      <BalanceIcon className="h-4 w-4" />
      Giá không đổi
    </div>
  );
};

const renderTopLabel = (type: "mall" | "favorite") => {
  if (type === "mall") {
    return (
      <div className="absolute left-0 top-0 rounded-tl-[4px] rounded-br-[4px] bg-[#e21942] px-3 py-1 text-sm font-semibold text-white">
        Mall
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-0 rounded-tl-[4px] rounded-br-[4px] bg-[#f8c16b] px-3 py-1 text-sm font-semibold text-[#111625]">
      Yêu thích
    </div>
  );
};

const ProductsList = () => {
  const { activeDeal, setActiveDeal } = useFilterProductStore();

  return (
    <div className="pt-2">
      {/* ==== filter desktop ==== */}
      <div className="pt-2"></div>
      <div className="flex gap-5">
        <div className="hidden lg:block w-[266px] flex-shrink-0">
          {/* ==== filter side bar */}
          <div className="sticky top-4">
            <FilterSidebar
              onApply={() => {
                console.log("Apply filter");
                // Handle apply filter logic here
              }}
              onReset={() => {
                console.log("Reset filter");
                // Handle reset filter logic here
              }}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {/* Product List Header - Desktop only */}
          <ProductListHeader
            productCount={mockProducts.length}
            selectedCategory="all"
            onCategoryChange={(categoryId) => {
              console.log("Category changed:", categoryId);
              // Handle category change logic here
            }}
            activeDeal={activeDeal}
            onDealChange={(deal) => {
              setActiveDeal(deal);
            }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-3 rounded-xl border border-[var(--color-border-1)] bg-white p-3"
              >
                <div className="relative w-full overflow-hidden rounded-[4px]">
                  {product.topLabel && renderTopLabel(product.topLabel)}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                  {product.bottomLabel &&
                    renderBottomLabel(product.bottomLabel)}
                </div>

                <p className="text-[14px] font-semibold leading-5 text-[var(--color-text-strong)] line-clamp-2">
                  {product.title}
                </p>

                <div className="flex items-center gap-2 mt-auto">
                  <p className="text-sm text-gray-3 line-through">
                    {product.originalPrice.toLocaleString("vi-VN")} đ
                  </p>
                  <div className="rounded-md bg-[#FBE6C4] px-2 py-1 text-xs font-semibold text-[var(--color-orange-1)]">
                    -{product.discountPercent}%
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-[var(--color-orange-1)]">
                    {product.currentPrice.toLocaleString("vi-VN")} đ
                  </p>
                  <div className="flex items-center gap-1 text-gray-3">
                    <StarSmallIcon />
                    <p className="text-xs font-semibold">{product.rating}</p>
                  </div>
                </div>

                {/* progress */}
                <>
                  <div className="flex items-center gap-2">
                    <div className="relative h-2 flex-1 rounded-full bg-[#FFE6CC]">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{
                          width: `${(product.sold / product.total) * 100}%`,
                          background:
                            "linear-gradient(303.52deg, #FF9800 4.88%, #F15024 13.95%, #FF8500 54.25%, #FFA726 95.56%, #F15024 105.63%)",
                        }}
                      >
                        <div className="absolute right-0 top-1/2 flex translate-x-1/2 -translate-y-1/2 items-center justify-center">
                          <FlashIcon />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm font-semibold">
                    <p className="text-gray-3">
                      {product.sold}/{product.total} đã bán
                    </p>
                    <p className="text-[var(--color-orange-1)]">
                      {product.timeRemaining}
                    </p>
                  </div>
                </>

                <div className="">
                  <button className="cursor-pointer border border-orange-1 text-orange-1 rounded-lg px-4 py-2 text-sm w-full hover:bg-orange-1 hover:text-white transition-colors duration-200">
                    {product.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default ProductsList;
