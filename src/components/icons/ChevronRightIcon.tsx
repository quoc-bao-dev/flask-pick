import React from 'react';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

export const ChevronRightIcon = ({
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
        d="M6.75 4.5L11.25 9L6.75 13.5"
        stroke={color}
        strokeWidth="1.73333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
