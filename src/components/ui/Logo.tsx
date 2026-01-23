import { _Image } from "@/core/constant/asset";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <Image src={_Image.logo} alt="logo" width={32} height={32} className="size-[21px] xl:size-[32px]" />
      <span className="font-semibold text-base xl:text-2xl leading-none tracking-normal text-center capitalize">
        Flash Pick
      </span>
    </div>
  );
};

export default Logo;
