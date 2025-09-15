import * as React from 'react';
import { memo } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgComponent = ({ color = 'black', ...props }: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 56"
    fill="none"
    {...props}>
    <Path
      fill={color}
      d="M18 4.828c0-1.781 2.154-2.674 3.414-1.414l23.172 23.172a2 2 0 0 1 0 2.828L21.414 52.586c-1.26 1.26-3.414.367-3.414-1.414V4.828Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
