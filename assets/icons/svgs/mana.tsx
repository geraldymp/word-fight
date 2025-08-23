import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <G data-name="Layer 2">
      <Path
        fill={props.color}
        d="M18 11a1 1 0 0 1-1 1 5 5 0 0 0-5 5 1 1 0 0 1-2 0 5 5 0 0 0-5-5 1 1 0 0 1 0-2 5 5 0 0 0 5-5 1 1 0 0 1 2 0 5 5 0 0 0 5 5 1 1 0 0 1 1 1ZM19 24a1 1 0 0 1-1 1 2 2 0 0 0-2 2 1 1 0 0 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 2 0 2 2 0 0 0 2 2 1 1 0 0 1 1 1ZM28 17a1 1 0 0 1-1 1 4 4 0 0 0-4 4 1 1 0 0 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 0 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 1 1Z"
      />
    </G>
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
