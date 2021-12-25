import * as React from "react";

export const ChevronDownIcon = React.forwardRef<
  SVGSVGElement,
  JSX.IntrinsicElements["svg"]
>((props, forwardedRef) => (
  <svg
    ref={forwardedRef}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
));
