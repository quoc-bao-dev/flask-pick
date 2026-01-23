import { SVGProps } from "react";

const BalanceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 2.5V13.5M4.5 13.5H11.5M2 5.5H14M4 5.5L2.5 9C2.5 9.66304 2.76339 10.2989 3.23223 10.7678C3.70107 11.2366 4.33696 11.5 5 11.5C5.66304 11.5 6.29893 11.2366 6.76777 10.7678C7.23661 10.2989 7.5 9.66304 7.5 9L6 5.5H4ZM12 5.5L10.5 9C10.5 9.66304 10.7634 10.2989 11.2322 10.7678C11.7011 11.2366 12.337 11.5 13 11.5C13.663 11.5 14.2989 11.2366 14.7678 10.7678C15.2366 10.2989 15.5 9.66304 15.5 9L14 5.5H12Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BalanceIcon;
