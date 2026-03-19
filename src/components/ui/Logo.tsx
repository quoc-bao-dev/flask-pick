import { _Image } from '@/core/constant/asset'
import Image from 'next/image'
import React from 'react'

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

const Logo = ({ className = '', ...props }: LogoProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`} {...props}>
      <Image
        src={_Image.logo}
        alt="Flash Pick Logo"
        title="Flash Pick"
        width={32}
        height={32}
        className="size-[21px] xl:size-[32px]"
      />
      <span className="text-center text-base font-semibold leading-none tracking-normal capitalize xl:text-2xl">
        Flash Pick
      </span>
    </div>
  )
}

export default Logo

