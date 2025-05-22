import * as React from 'react';
import { memo } from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={50} height={50} viewBox="0 0 256 256" {...props}>
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
        d="M8 90a7.999 7.999 0 0 1-5.657-13.657l74-74a8 8 0 0 1 11.314 11.313l-74 74A7.973 7.973 0 0 1 8 90z"
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
        d="M82 90a7.974 7.974 0 0 1-5.657-2.343l-74-74a7.998 7.998 0 0 1 0-11.313 8 8 0 0 1 11.313 0l74 74A8 8 0 0 1 82 90z"
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
