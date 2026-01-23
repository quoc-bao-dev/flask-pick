import { PropsWithChildren } from "react";
import Header from "./Header";
import SearchIcon from "../icons/SearchIcon";
import CameraIcon from "../icons/CameraIcon";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-3">
      <Header />
      
      {/* ==== search mobile ==== */}
      <div className="pt-2">
        <div className="xl:hidden flex items-center gap-2 rounded-[12px] border-2 border-[var(--color-orange-1)] bg-white px-3 py-2">
          <SearchIcon />

          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, shop"
            className="w-full bg-transparent text-[var(--color-gray-4)] placeholder:text-[var(--color-gray-4)] outline-none"
          />

          <div className="flex h-6 w-8 items-center justify-center rounded-md bg-[var(--color-primary-50)]">
            <CameraIcon />
          </div>
        </div>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default MainLayout;