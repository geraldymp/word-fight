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
      d="M38 51.172c0 1.781-2.154 2.674-3.414 1.414L11.414 29.414a2 2 0 0 1 0-2.828L34.586 3.414C35.846 2.154 38 3.047 38 4.828v46.344Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
