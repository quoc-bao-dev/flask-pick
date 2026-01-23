"use client";

import { useFilterProductStore } from "../store/filterProductStore";

const tabs = [
  { key: "all", title: "Tất cả" },
  { key: "19", title: "19:00", subtitle: "Đang diễn ra" },
  { key: "21", title: "21:00", subtitle: "Sắp diễn ra" },
  { key: "00", title: "00:00", subtitle: "Ngày mai" },
  { key: "02", title: "02:00", subtitle: "Ngày kia" },
];

const ProductTabs = () => {
  const { activeTab, setActiveTab } = useFilterProductStore();

  return (
    <div className="pt-2">
      <div className="relative border-b border-[var(--color-border-1)]">
        <div className="flex min-w-full items-stretch gap-6 h-full overflow-x-auto scrollbar-hide xl:pt-4">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <div className=" relative" key={tab.key}>
                <button
                  className={`relative text-center cursor-pointer h-full flex flex-col items-center justify-center xl:gap-2 whitespace-nowrap pb-2 xl:pb-4  xl:min-w-[280px] ${
                    isActive
                      ? "text-[var(--color-orange-1)]"
                      : "text-[var(--color-gray-2)]"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <div className="text-[16px] xl:text-2xl font-semibold leading-5">
                    {tab.title}
                  </div>
                  {tab.subtitle ? (
                    <div
                      className={`text-[12px] xl:text-base leading-4 whitespace-nowrap ${
                        isActive
                          ? "text-[var(--color-orange-1)]"
                          : "text-[var(--color-gray-2)]"
                      }`}
                    >
                      {tab.subtitle}
                    </div>
                  ) : null}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[4px] rounded-t-full bg-[var(--color-orange-1)]" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;

