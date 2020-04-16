import { all, takeLatest } from 'redux-saga/effects';

import { Types as LocalPodcastsManagerCreators } from '../ducks/localPodcastsManager';
import { Types as PlaylistTypes } from '../ducks/playlist';
import { Types as SubjectTypes } from '../ducks/subject';
import { Types as PlayerTypes } from '../ducks/player';
import { Types as AuthorTypes } from '../ducks/author';
import { Types as HomeTypes } from '../ducks/home';
import { Types as PodcastWithEpisodesTypes } from '../ducks/podcastWithEpisodes';
import { Types as SnippetTypes } from '../ducks/snippet';

import {
  clearAllLocalPodcastsReferences,
  setPodcastsDownloadedList,
  downloadPodcastToLocalStorage,
  removePodcastFromLocalStorage,
  loadPodcastsRecentlyPlayed,
  addPodcastToRecentlyPlayedList,
} from './localPodcastsManager';
import {
  shufflePlaylist,
  setPodcast,
  playNext,
  playPrevious,
  setupPlayer,
  setupShufflePlayer,
  repeatCurrentPodcast,
} from './player';
import { searchAuthorByName, getAuthorById } from './author';
import { getSubjectDetail } from './subject';
import {
  createPlaylist,
  loadPlaylists,
  addPodcast,
  removePodcast,
  getPlaylist,
  setOfflineAvailability,
  removePlaylist,
  editPlaylist,
} from './playlist';
import { getHome } from './home';
import { getPodcastWithEpisodes } from './podcastWithEpisodes';
import {
  createSnippet,
  loadSnippets,
  // addPodcast,
  // removePodcast,
  getSnippet,
  // setOfflineAvailability,
  removeSnippet,
  editSnippet,
} from './snippet';

export default function* rootSaga() {
  return yield all([
    takeLatest(HomeTypes.GET_HOME_REQUEST, getHome),
    takeLatest(
      PodcastWithEpisodesTypes.GET_PODCAST_WITH_EPISODES_REQUEST,
      getPodcastWithEpisodes,
    ),
    takeLatest(
      LocalPodcastsManagerCreators.SET_PODCASTS_DOWNLOADED_LIST_REQUEST,
      setPodcastsDownloadedList,
    ),
    takeLatest(
      LocalPodcastsManagerCreators.DOWNLOAD_PODCAST,
      downloadPodcastToLocalStorage,
    ),
    takeLatest(
      LocalPodcastsManagerCreators.CLEAR_LOCAL_PODCASTS_REFERENCES_REQUEST,
      clearAllLocalPodcastsReferences,
    ),
    takeLatest(
      LocalPodcastsManagerCreators.REMOVE_PODCAST,
      removePodcastFromLocalStorage,
    ),
    takeLatest(
      LocalPodcastsManagerCreators.LOAD_PODCASTS_RECENTLY_PLAYED_REQUEST,
      loadPodcastsRecentlyPlayed,
    ),
    takeLatest(
      LocalPodcastsManagerCreators.ADD_PODCAST_RECENTLY_PLAYED_REQUEST,
      addPodcastToRecentlyPlayedList,
    ),
    takeLatest(PlayerTypes.SET_PODCAST_REQUEST, setPodcast),
    takeLatest(
      PlayerTypes.REPEAT_CURRENT_PODCAST_REQUEST,
      repeatCurrentPodcast,
    ),
    takeLatest(PlayerTypes.SETUP_PLAYER, setupPlayer),
    takeLatest(PlayerTypes.SETUP_SHUFFLE_PLAYER_REQUEST, setupShufflePlayer),
    takeLatest(PlayerTypes.PLAY_NEXT_REQUEST, playNext),
    takeLatest(PlayerTypes.PLAY_PREVIOUS_REQUEST, playPrevious),
    takeLatest(PlayerTypes.SHUFFLE_PLAYLIST_REQUEST, shufflePlaylist),
    takeLatest(AuthorTypes.SEARCH_AUTHOR_BY_NAME_REQUEST, searchAuthorByName),
    takeLatest(SubjectTypes.GET_SUBJECT_DETAIL_REQUEST, getSubjectDetail),
    takeLatest(AuthorTypes.GET_AUTHOR_BY_ID_REQUEST, getAuthorById),
    takeLatest(PlaylistTypes.CREATE_PLAYLIST_REQUEST, createPlaylist),
    takeLatest(PlaylistTypes.LOAD_PLAYLISTS_REQUEST, loadPlaylists),
    takeLatest(PlaylistTypes.ADD_PODCAST_REQUEST, addPodcast),
    takeLatest(PlaylistTypes.REMOVE_PODCAST_REQUEST, removePodcast),
    takeLatest(PlaylistTypes.REMOVE_PLAYLIST_REQUEST, removePlaylist),
    takeLatest(PlaylistTypes.EDIT_PLAYLIST_REQUEST, editPlaylist),
    takeLatest(PlaylistTypes.GET_PLAYLIST_REQUEST, getPlaylist),
    takeLatest(
      PlaylistTypes.SET_AVAILABLE_OFFLINE_REQUEST,
      setOfflineAvailability,
    ),

    takeLatest(SnippetTypes.CREATE_SNIPPET_REQUEST, createSnippet),
    takeLatest(SnippetTypes.LOAD_SNIPPETS_REQUEST, loadSnippets),
    // takeLatest(SnippetTypes.ADD_PODCAST_REQUEST, addPodcast),
    // takeLatest(SnippetTypes.REMOVE_PODCAST_REQUEST, removePodcast),
    takeLatest(SnippetTypes.REMOVE_SNIPPET_REQUEST, removeSnippet),
    takeLatest(SnippetTypes.EDIT_SNIPPET_REQUEST, editSnippet),
    takeLatest(SnippetTypes.GET_SNIPPET_REQUEST, getSnippet),
    // takeLatest(
    //   SnippetTypes.SET_AVAILABLE_OFFLINE_REQUEST,
    //   setOfflineAvailability,
    // ),
  ]);
}
