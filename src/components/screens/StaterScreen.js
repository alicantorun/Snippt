// @flow

import React, { Component, Fragment } from 'react';
import { Text, View, Button } from 'react-native';
import styled, { withTheme } from 'styled-components';

import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const WelcomeMessage = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  text-align: right;
  color: ${({ theme }) => theme.colors.white};
`;

import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  loadPodcastsRecentlyPlayed: Function,
  setPodcastsDownloadedList: Function,
  loadPlaylists: Function,
  navigation: Object,
};

class StaterScreen extends Component<Props, {}> {
  componentDidMount() {
    const {
      loadPodcastsRecentlyPlayed,
      setPodcastsDownloadedList,
      loadPlaylists,
      navigation,
    } = this.props;

    setPodcastsDownloadedList();

    loadPodcastsRecentlyPlayed();

    loadPlaylists();

    this.loadImages();

    SplashScreen.hide();

    // navigation.navigate(CONSTANTS.ROUTES.ONBOARDING_INTRO);
  }

  loadImages = (): void => {
    FastImage.preload([
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/big.jpeg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/technology/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/all/all.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/background-image.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/user-profile/user-profile.jpg',
      },
    ]);
  };

  onPressNextButton = (): void => {
    this.props.navigation.navigate(CONSTANTS.ROUTES.ONBOARDING_INTRO);
  };

  render() {
    return (
      <Wrapper onPress={console.log('pressed')}>
        <WelcomeMessage>An epic App by Alican & Henno</WelcomeMessage>
        <Button onPress={this.onPressNextButton} title="Go!" />
      </Wrapper>
    );
  }
}

const Creators = Object.assign(
  {},
  LocalPodcastsManagerCreators,
  PlaylistsCreators,
  PlayerCreators,
);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

export default connect(null, mapDispatchToProps)(StaterScreen);
