// @flow

import React, { Component } from 'react';
import { Platform } from 'react-native';

import Sound from 'react-native-video';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

type PlayerProps = {
  shouldSeekProgressSlider: boolean,
  shouldRepeatCurrent: boolean,
  playlist: Array<Object>,
  currentPodcast: Object,
  playlistIndex: number,
  stopPlayer: boolean,
  seekValue: number,
  paused: boolean,
};

type Props = {
  seekProgressTimerSuccess: Function,
  repeatCurrentPodcast: Function,
  setCurrentTime: Function,
  setPodcast: Function,
  player: PlayerProps,
  playNext: Function,
};

let switchOn = true;

class SoundComponent extends Component<Props, {}> {
  _soundRef: Object = null;

  componentWillReceiveProps(nextProps) {
    const { seekProgressTimerSuccess, player } = nextProps;
    const {
      shouldSeekProgressSlider,
      seekValue,
      setSnippet,
      currentTime,
      currentTimeRaw,
    } = player;

    if (shouldSeekProgressSlider) {
      this._soundRef.seek(seekValue, 50);
      seekProgressTimerSuccess(seekValue);
    }

    if (setSnippet) {
      this.playSnippet(currentTimeRaw);
    }
  }

  onEnd = (): void => {
    const { repeatCurrentPodcast, playNext, player } = this.props;
    const { shouldRepeatCurrent } = player;

    if (Platform.OS === 'ios' && shouldRepeatCurrent) {
      repeatCurrentPodcast();
      return;
    }

    if (!shouldRepeatCurrent) {
      playNext();
    }
  };

  playSnippet = currentTimeRaw => {
    let currentTimeRawOnMemory = currentTimeRaw;
    // if (currentTime < 15 && switchOn) {

    if (switchOn) {
      this._soundRef.seek(currentTimeRaw - 5);
      // switchOn = true;
      console.log('switched to', currentTimeRaw);
      // }
    }
    switchOn = false;

    // if (!switchOn) {
    //   this._soundRef.seek(currentTimeRaw + 10);
    //   switchOn = true;
    // }
  };

  // playSnippet = currentTime => {
  //   if (currentTime < 15 && switchOn) {
  //     if (currentTime > 5) {
  //       this._soundRef.seek(0);
  //       switchOn = false;
  //       console.log('Snippet Begins');
  //     }
  //   }

  //   if (currentTime > 15) {
  //     this._soundRef.seek(0);
  //     switchOn = true;
  //     console.log('Snippet Ends');
  //   }
  // };

  render() {
    const { setCurrentTime, player } = this.props;
    const {
      shouldRepeatCurrent,
      currentPodcast,
      stopPlayer,
      paused,
      setSnippet,
      currentTime,
    } = player;

    // console.log(this.props.player.setSnippet, this.props.player.currentTimeRaw);

    const isPodcastDefined =
      !!currentPodcast &&
      !!currentPodcast.uri &&
      typeof currentPodcast.uri === 'string';

    return isPodcastDefined && !stopPlayer ? (
      <Sound
        onProgress={({ currentTime }) => {
          if (!paused) {
            setCurrentTime(currentTime);
            // console.log(currentTime);
            if (setSnippet) {
              setCurrentTime(currentTime);
            }
          }
        }}
        onEnd={this.onEnd}
        source={{
          uri: currentPodcast.audio,
        }}
        ref={ref => {
          this._soundRef = ref;
        }}
        repeat={shouldRepeatCurrent}
        playInBackground
        paused={paused}
        rate={1.0}
        audioOnly
        // onLoad={({ duration }) => console.log('MEDİA LOADED', duration)}
        // onProgress={({ currentTime }) => this.playSnippet(currentTime)}
      />
    ) : null;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(SoundComponent);
