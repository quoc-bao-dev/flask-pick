import React from 'react'

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string
  color?: string
}

export const CloseIcon = ({
  size = 16,
  color = 'currentColor',
  className = '',
  ...props
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <path d='M18 6L6 18L18 6Z' fill='#111625' />
      <path d='M6 6L18 18L6 6Z' fill='#111625' />
      <path
        d='M18 6L6 18M6 6L18 18'
        stroke='#111625'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
