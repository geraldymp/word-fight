import * as React from 'react';
import { memo } from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width="50" height="50" viewBox="0 0 256 256" {...props}>
    <G
      style={{
        stroke: 'none',
        strokeWidth: 0,
        strokeDasharray: 'none',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 10,
        fill: 'none',
        fillRule: 'nonzero',
        opacity: 1
      }}
    >
      <Path
        d="M75.16 60.168 59.688 75.639a2.314 2.314 0 0 1-3.273 0l-2.337-2.337a2.314 2.314 0 0 1 0-3.273L69.55 54.558a2.314 2.314 0 0 1 3.273 0l2.337 2.337a2.314 2.314 0 0 1 0 3.273zM14.84 60.168 30.312 75.64a2.314 2.314 0 0 0 3.273 0l2.337-2.337a2.314 2.314 0 0 0 0-3.273L20.45 54.558a2.314 2.314 0 0 0-3.273 0l-2.337 2.337a2.314 2.314 0 0 0 0 3.273z"
        style={{
          stroke: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: '#000',
          fillRule: 'nonzero',
          opacity: 1
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
      <Path
        d="m63.24 60.86 3.82-3.81-8.24-8.91-4.31 3.99zM51.54 54.88l-4.33 4 9.36 8.66 3.81-3.82zM72.675 3.283 22.938 57.046l3.818 3.818 45.689-45.688c.764-.765 2.095-.764 2.86 0a2.024 2.024 0 0 1 0 2.86L29.616 63.724l3.818 3.818 53.763-49.737L90 .479 72.675 3.283zM14.695 18.035a2.024 2.024 0 0 1 0-2.86c.764-.765 2.097-.765 2.861 0L38.35 35.969l4.607-4.98L17.325 3.283 0 .479l2.804 17.325L31.012 43.9l4.589-4.96-20.906-20.905zM15.334 66.662 1.636 80.36a2.314 2.314 0 0 0 0 3.273l5.21 5.21a2.314 2.314 0 0 0 3.273 0l13.698-13.698-8.483-8.483zM88.364 80.36 74.666 66.662l-8.483 8.483L79.88 88.843a2.314 2.314 0 0 0 3.273 0l5.21-5.21a2.315 2.315 0 0 0 .001-3.273z"
        style={{
          stroke: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: '#000',
          fillRule: 'nonzero',
          opacity: 1
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
    </G>
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
