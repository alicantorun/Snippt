// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Creators as AuthorCreators } from '~/store/ducks/author';
import { Creators as SnippetCreators } from '~/store/ducks/snippet';

import SnippetsComponent from './components/SnippetsComponent';
import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  LOCAL_STACK_ROUTES: Object,
  navigation: Object,
};

type State = {
  isTextInputFocused: boolean,
  authorName: string,
};

class SnippetsContainer extends Component<Props, State> {
  state = {
    isTextInputFocused: false,
    authorName: '',
  };

  componentDidMount() {
    const { loadSnippets } = this.props;

    loadSnippets();
  }

  onAddPodcast = (snippet: Snippet): void => {
    const { onToggleModal, addPodcast, podcast } = this.props;

    addPodcast(snippet, podcast);
    onToggleModal();
  };

  onPressSnippetListItem = (snippet: Snippet): void => {
    const isPodcastAlreadyInSnippet = this.checkIsPodcastAlreadyInSnippet(
      snippet,
    );

    const isPodcastAlreadyDownloaded = this.checkIsPodcastAlreadyDownloaded(
      snippet,
    );

    if (
      snippet.isAvailableOffline &&
      !isPodcastAlreadyInSnippet &&
      !isPodcastAlreadyDownloaded
    ) {
      CustomAlert(
        TYPES.ADD_UNDOWNLOADED_PODCAST_PLAYLIST_AVAILABLE_OFFLINE,
        () => this.onAddPodcast(snippet),
      );

      return;
    }

    if (isPodcastAlreadyInSnippet) {
      CustomAlert(TYPES.ADD_REPEATED_PODCAS_PLAYLIST, () =>
        this.onAddPodcast(snippet),
      );

      return;
    }

    this.onAddPodcast(snippet);
  };

  checkIsPodcastAlreadyDownloaded = (snippet: Snippet): boolean => {
    const { podcastsDownloaded, podcast } = this.props;

    const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
      podcastDownloaded => podcastDownloaded.id === podcast.id,
    );

    return isPodcastAlreadyDownloaded;
  };

  checkIsPodcastAlreadyInSnippet = (snippet: Snippet): boolean => {
    const { podcast } = this.props;

    const isPodcastAlreadyInSnippet = snippet.podcasts.some(
      podcastInSnippet => podcastInSnippet.id === podcast.id,
    );

    return isPodcastAlreadyInSnippet;
  };

  onTypeAuthorName = (authorName: string): void => {
    this.setState({
      authorName,
    });
  };

  onSearchForAuthor = (): void => {
    const { navigation, LOCAL_STACK_ROUTES } = this.props;
    const { authorName } = this.state;

    if (authorName.length) {
      navigation.navigate(LOCAL_STACK_ROUTES.SEARCH_AUTHORS_RESULT, {
        [CONSTANTS.PARAMS.SEARCH_AUTHOR_BY_NAME]: authorName,
      });
    }
  };

  onToggleDarkLayer = (isTextInputFocused: boolean) => {
    this.setState({
      isTextInputFocused,
    });
  };

  render() {
    const { navigation } = this.props;
    const { isTextInputFocused } = this.state;
    const { onToggleModal, snippets, createSnippet } = this.props;

    console.log('snippets array: ', snippets);

    return (
      <SnippetsComponent
        onSearchForAuthor={this.onSearchForAuthor}
        onToggleDarkLayer={this.onToggleDarkLayer}
        onTypeAuthorName={this.onTypeAuthorName}
        isTextInputFocused={isTextInputFocused}
        navigation={navigation}
        snippets={snippets}
      />
    );
  }
}

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(AuthorCreators, dispatch);

// export default connect(
//   null,
//   mapDispatchToProps,
// )(SnippetsContainer);

const mapStateToProps = state => ({
  podcastsDownloaded: state.localPodcastsManager.podcastsDownloaded,
  snippets: state.snippet.snippets,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SnippetCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnippetsContainer);
