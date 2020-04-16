import { combineReducers } from 'redux';

import localPodcastsManager from './localPodcastsManager';
import playlist from './playlist';
import subject from './subject';
import player from './player';
import author from './author';
import home from './home';
import snippet from './snippet';
import podcastWithEpisodes from './podcastWithEpisodes';

export default combineReducers({
  localPodcastsManager,
  playlist,
  subject,
  author,
  player,
  home,
  snippet,
  podcastWithEpisodes,
});
