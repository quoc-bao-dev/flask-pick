import React from 'react';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

export const FlashIcon = ({
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
      <g clipPath="url(#clip0_563_2682)">
        <path
          d="M9.54031 0.700073C10.3303 -0.247393 11.8681 0.400004 11.7434 1.62683V1.62781L11.2708 6.24988H15.0003C15.2376 6.24998 15.4699 6.31788 15.6702 6.44519C15.8706 6.57267 16.0314 6.75454 16.1321 6.9696C16.2328 7.1847 16.2699 7.42447 16.2395 7.66003C16.2091 7.89546 16.1121 8.11726 15.9602 8.29968L8.46024 17.2997V17.3007C7.67018 18.2479 6.1313 17.5998 6.25613 16.3729L6.72879 11.7499H3.00027C2.76276 11.7498 2.52977 11.6821 2.32938 11.5546C2.12901 11.4271 1.96917 11.2452 1.86844 11.0302C1.76771 10.8151 1.73063 10.5753 1.76102 10.3397C1.79144 10.1044 1.88755 9.88241 2.03934 9.70007H2.04031L9.54031 0.700073Z"
          fill={color === 'currentColor' ? '#F15024' : color}
          stroke="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_563_2682">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
