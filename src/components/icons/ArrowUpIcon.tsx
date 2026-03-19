import React from 'react';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

export const ArrowUpIcon = ({
  size = 18,
  color = 'currentColor',
  className = '',
  ...props
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M9 3.75V14.25M9 3.75L13.5 8.25M9 3.75L4.5 8.25"
        stroke={color}
        strokeWidth="1.73333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
