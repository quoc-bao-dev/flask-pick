import React from 'react';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

export const CategoryIcon = ({
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
        d="M9 2.25L6 7.5H12L9 2.25Z"
        stroke={color}
        strokeWidth="1.73333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 12.75C10.5 13.3467 10.7371 13.919 11.159 14.341C11.581 14.7629 12.1533 15 12.75 15C13.3467 15 13.919 14.7629 14.341 14.341C14.7629 13.919 15 13.3467 15 12.75C15 12.1533 14.7629 11.581 14.341 11.159C13.919 10.7371 13.3467 10.5 12.75 10.5C12.1533 10.5 11.581 10.7371 11.159 11.159C10.7371 11.581 10.5 12.1533 10.5 12.75Z"
        stroke={color}
        strokeWidth="1.73333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 11.25C3 11.0511 3.07902 10.8603 3.21967 10.7197C3.36032 10.579 3.55109 10.5 3.75 10.5H6.75C6.94891 10.5 7.13968 10.579 7.28033 10.7197C7.42098 10.8603 7.5 11.0511 7.5 11.25V14.25C7.5 14.4489 7.42098 14.6397 7.28033 14.7803C7.13968 14.921 6.94891 15 6.75 15H3.75C3.55109 15 3.36032 14.921 3.21967 14.7803C3.07902 14.6397 3 14.4489 3 14.25V11.25Z"
        stroke={color}
        strokeWidth="1.73333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
