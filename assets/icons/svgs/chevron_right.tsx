import * as React from 'react';
import { memo } from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

const SvgComponent = ({
  color = 'red',
  stroke = 'black',
  strokeWidth = 6,
  ...props
}: SvgProps) => (
  <Svg viewBox="0 0 270 256" preserveAspectRatio="none" {...props}>
    <G transform="translate(0,33) scale(1.249,1.4)">
      <Path
        fill={color}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m162.4 132.4 42.6-64a7.8 7.8 0 0 0 0-8.8l-42.6-64a7.9 7.9 0 0 0-6.7-3.6H0l45 67.6a7.8 7.8 0 0 1 0 8.8L0 136h155.7a7.9 7.9 0 0 0 6.7-3.6Z"
      />
    </G>
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
