import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M0 0v24h24C10.745 24 0 13.255 0 0z" fill="#22282D" />
    </Svg>
  );
}

export default SvgComponent;
