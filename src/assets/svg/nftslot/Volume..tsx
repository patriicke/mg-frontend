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
    <path
      d="M17.3849 22.4405C21.1538 20.7874 23.7953 17.1949 23.7953 12.8233C23.7953 8.45172 21.1538 4.85915 17.3849 3.20605V5.34322C19.9356 6.82427 21.6581 9.66777 21.6581 12.8233C21.6581 15.9788 19.9356 18.8223 17.3849 20.3034V22.4405Z"
      fill={props.fill}
    />
    <path
      d="M17.3859 7.48018V18.166C18.6949 16.9906 19.5231 14.7155 19.5231 12.8231C19.5231 10.9306 18.6949 8.65562 17.3859 7.48018ZM4.56294 18.166H7.44491L15.2488 23.3679V2.27832L7.44491 7.48018H4.56294C3.3843 7.48018 2.42578 8.43869 2.42578 9.61734V16.0288C2.42578 17.2075 3.3843 18.166 4.56294 18.166Z"
      fill={props.fill}
    />
  </svg>
);
export default SVGComponent;
