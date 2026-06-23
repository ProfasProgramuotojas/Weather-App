import { SVGProps } from "react";

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden={true}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m1.6-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};
