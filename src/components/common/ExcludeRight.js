import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M24 0v24H0c13.255 0 24-10.745 24-24z"
        fill={props.fill || '#22282D'}
      />
    </Svg>
  );
}

export default SvgComponent;
