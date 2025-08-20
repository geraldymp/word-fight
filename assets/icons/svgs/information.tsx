import * as React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';
const SvgComponent = ({ color = 'black', ...props }: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 52 52"
    {...props}>
    <Rect
      width={6}
      height={6}
      x={23}
      y={10.76}
      rx={3}
      transform="rotate(180 26 13.76)"
      fill={color}
    />
    <Path
      fill={color}
      d="M27 41.24a2 2 0 0 1-2-2v-13h-2a2 2 0 0 1 0-4h4a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2Z"
    />
  </Svg>
);
export default SvgComponent;
