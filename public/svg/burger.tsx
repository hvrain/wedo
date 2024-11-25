import { SVGProps } from "react";

const Burger = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="9" y="12" width="32" height="2" rx="1" fill="currentColor" />
      <rect x="9" y="22" width="32" height="2" rx="1" fill="currentColor" />
      <rect x="9" y="32" width="32" height="2" rx="1" fill="currentColor" />
    </svg>
  );
};

export default Burger;
