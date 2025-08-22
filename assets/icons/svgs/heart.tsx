import * as React from 'react';
import { memo } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgComponent = ({
  color = 'red',
  stroke = 'black',
  strokeWidth = 2,
  ...props
}: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <Path
      d="M12 22c8-4 11-9 11-14a6 6 0 0 0-11-3.314A6 6 0 0 0 1 8c0 5 3 10 11 14Z"
      fill={color}
      stroke={'black'}
      strokeWidth={2}
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
