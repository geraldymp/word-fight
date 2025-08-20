import * as React from 'react';
import { memo } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
    <Path fill="none" d="M0 0h256v256H0z" />
    <Path
      d="m133.7 211.9 81-81c19.9-20 22.8-52.7 4-73.6a52 52 0 0 0-75.5-2.1L128 70.5l-13.1-13.2c-20-19.9-52.7-22.8-73.6-4a52 52 0 0 0-2.1 75.5l83.1 83.1a8.1 8.1 0 0 0 11.4 0Z"
      opacity={0.2}
    />
    <Path
      fill={props.color}
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="m133.7 211.9 81-81c19.9-20 22.8-52.7 4-73.6a52 52 0 0 0-75.5-2.1L128 70.5l-13.1-13.2c-20-19.9-52.7-22.8-73.6-4a52 52 0 0 0-2.1 75.5l83.1 83.1a8.1 8.1 0 0 0 11.4 0Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
