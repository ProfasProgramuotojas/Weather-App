import { SVGProps } from "react";

export const WarningIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="M12 9v3.75m0 3.5h.008M10.34 3.94l-7.5 13A1.5 1.5 0 004.16 19.5h15.68a1.5 1.5 0 001.32-2.56l-7.5-13a1.5 1.5 0 00-2.62 0z"
      />
    </svg>
  );
};
