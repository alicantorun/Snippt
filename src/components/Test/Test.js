/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';

import Test2 from '~/components/Test2/Test2';

const App: () => React$Node = () => {
  return (
    <View>
      <Text>Test 1</Text>
      <Test2 />
    </View>
  );
};

export default App;
