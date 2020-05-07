import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SNIPPTRight(props) {
  return (
    <Svg width={10} height={455} viewBox="0 0 10 455" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 454.3h7.677v-80.845H0V454.3zm0-91.657c5.353-4.441 7.677-12.251 7.677-24.71v-50.75H0v75.46zm0-96.687c5.353-4.441 7.677-12.251 7.677-24.71v-50.751H0v75.461zm0-97.009h7.5v-25.998H0v25.998zm0-49.93l7.5-2.423V86.5H0v32.517zm0-56.028c6.593-4.826 9.814-13.8 9.814-30.089C9.814 16.087 6.79 5.987 0 .236V62.99z"
        fill={props.fill || '#fff'}
      />
    </Svg>
  );
}

export default SNIPPTRight;
