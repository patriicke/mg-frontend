import * as React from 'react';
import { SVGProps } from 'react';
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (

    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10.044" cy="10.3116" r="9.17834" stroke="url(#paint0_linear_3804_50371)" stroke-width="1.66879" />
        <circle cx="10.0443" cy="10.3119" r="6.67516" fill="url(#paint1_linear_3804_50371)" />
        <defs>
            <linearGradient id="paint0_linear_3804_50371" x1="4.52765" y1="5.46802" x2="22.1451" y2="9.00922" gradientUnits="userSpaceOnUse">
                <stop stop-color="#A7CD02" />
                <stop offset="1" stop-color="#FEAD4D" />
            </linearGradient>
            <linearGradient id="paint1_linear_3804_50371" x1="6.36674" y1="7.08285" x2="18.1117" y2="9.44364" gradientUnits="userSpaceOnUse">
                <stop stop-color="#A7CD02" />
                <stop offset="1" stop-color="#FEAD4D" />
            </linearGradient>
        </defs>
    </svg>
);
export default SVGComponent;
