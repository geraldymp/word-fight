import * as React from 'react';
import { memo } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props}>
    <Path
      fill={props.color}
      d="M113 4H15A11 11 0 0 0 4 15v64.57a11 11 0 0 0 11 11h25.28a1 1 0 0 1 1 1V121a5 5 0 0 0 8.54 3.54l31.08-31.08a1 1 0 0 1 .71-.29h31.39a11 11 0 0 0 11-11V15a11 11 0 0 0-11-11Zm7 75.57a7 7 0 0 1-7 7H83.71a7 7 0 0 0-5 2.05L48 116.34a1 1 0 0 1-1.71-.71V93.57a7 7 0 0 0-7-7H15a7 7 0 0 1-7-7V15a7 7 0 0 1 7-7h98a7 7 0 0 1 7 7Z"
    />
  </Svg>
);

export default memo(SvgComponent);
