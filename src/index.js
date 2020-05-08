// @flow

import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import SoundComponent from './components/common/SoundComponent';
import { ThemeContextProvider } from './ThemeContextProvider';
import ApplicationNavigator from './routes';
import store from './store';

import './config/ReactotronConfig';

// if (__DEV__) {
console.log('DEV MODE ');
import('./config/ReactotronConfig').then(() =>
  console.log('Reactotron Configured'),
);
// }

const App = (): Object => (
  <Provider store={store}>
    <ThemeContextProvider>
      <ApplicationNavigator />
      <SoundComponent />
    </ThemeContextProvider>
  </Provider>
);
export default App;
