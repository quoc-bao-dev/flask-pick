import React from 'react';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

/**
 * RosetteIcon component
 * Responsibility: Provide a rosette/star shape icon as per Figma design.
 * 
 * @param {IconProps} props - Component props
 * @returns {JSX.Element} The rendered component
 */
export const RosetteIcon = ({
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
        d="M9 15.75L10.9875 14.5125L13.275 14.7375L14.2875 12.675L16.275 11.4375L15.75 9L16.275 6.5625L14.2875 5.325L13.275 3.2625L10.9875 3.4875L9 2.25L7.0125 3.4875L4.725 3.2625L3.7125 5.325L1.725 6.5625L2.25 9L1.725 11.4375L3.7125 12.675L4.725 14.7375L7.0125 14.5125L9 15.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
