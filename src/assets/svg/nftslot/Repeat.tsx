import * as React from 'react';
import { SVGProps } from 'react';
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3562_3385)">
      <path
        d="M16.7204 19.2304C13.8833 20.935 9.1529 20.5596 6.88002 16.7769C4.60713 12.9942 6.49645 8.6412 9.33349 6.93653C12.1705 5.23187 16.901 5.60729 19.1738 9.39001C20.5944 11.7542 20.3123 14.4979 19.462 16.2959M17.0004 13.2701L19.462 16.2959L23.056 14.78"
        stroke="white"
        strokeWidth={1.10326}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.78708 15.8735L10.8197 15.8735L11.4354 14.4437L14.7518 14.4437L15.3574 15.8735L16.4 15.8735L13.3716 8.85348L12.8155 8.85348L9.78708 15.8735ZM11.7928 13.5699L13.0936 10.5315L14.3943 13.5699L11.7928 13.5699Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_3562_3385">
        <rect
          width={17.6522}
          height={17.6522}
          fill="white"
          transform="translate(16.047 0.972168) rotate(59)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default SVGComponent;
