import React from 'react';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
import { withTheme } from 'styled-components';

import Navigation from '~/components/common/navigation/Navigation';
import HomeRoutes from '~/components/screens/home/routes';
import SearchRoutes from '~/components/screens/search/routes';
import LibraryRoutes from '~/components/screens/library/routes';
import SettingsRoutes from '~/components/screens/settings/routes';
import SnippetRoutes from '~/components/screens/snippets/routes';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  SEARCH: 'SEARCH',
  LIBRARY: 'LIBRARY',
  PROFILE: 'PROFILE',
  SETTINGS: 'SETTINGS',
  SNIPPET: 'SNIPPET',
};

const ApplicationTabs = createMaterialTopTabNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: HomeRoutes,
      header: null,
    },

    [ROUTE_NAMES.SEARCH]: {
      screen: SearchRoutes,
      header: null,
    },

    [ROUTE_NAMES.SNIPPETS]: {
      screen: SnippetRoutes,
      header: null,
    },

    [ROUTE_NAMES.LIBRARY]: {
      screen: LibraryRoutes,
      header: null,
    },

    [ROUTE_NAMES.SETTINGS]: {
      screen: SettingsRoutes,
      header: null,
    },
  },
  {
    tabBarComponent: ({ navigationState, navigation }) => (
      <Navigation navigationState={navigationState} navigation={navigation} />
    ),
    initialRouteName: ROUTE_NAMES.HOME,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    lazy: false,
    // tabBarOptions: {
    //   labelStyle: {
    //     fontSize: 12,
    //   },
    //   tabStyle: {
    //     width: 100,
    //   },
    //   style: {
    //     backgroundColor: 'blue',
    //   },
    // },
  },
);

const AppContainer = createAppContainer(ApplicationTabs);

export default AppContainer;
