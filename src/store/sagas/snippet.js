import { call, select, delay, put, all } from 'redux-saga/effects';

import { Creators as SnippetCreators } from '../ducks/snippet';
import { apiFirebase } from '~/services/api';

import {
  removeItemFromStorage,
  persistItemInStorage,
  getItemFromStorage,
} from '~/utils/AsyncStorageManager';

import {
  downloadPodcast,
  stopPodcastDownload,
  removePodcastFromLocalStorage,
} from './localPodcastsManager';

import CONSTANTS from '~/utils/CONSTANTS';

export function* loadSnippets() {
  try {
    const snippetsFromStorage = yield getItemFromStorage(
      CONSTANTS.KEYS.SNIPPET_STORAGE_KEY,
      [],
    );

    const snippets =
      typeof snippetsFromStorage === 'string'
        ? JSON.parse(snippetsFromStorage)
        : [];

    yield put(SnippetCreators.loadSnippetsSuccess(snippets));
  } catch (err) {
    yield put(SnippetCreators.loadSnippetsFailure());
  }
}

export function* createSnippet({ payload }) {
  try {
    const { snippets } = yield select((state) => state.snippet);

    const {
      podcastTitle,
      episodeTitle,
      snippetText,
      thumbnail,
      podcast,
    } = payload;

    console.log('startingn fetch');

    try {
      const response = yield call(apiFirebase.post, '/snippets.json', {
        podcastTitle,
        episodeTitle,
        snippetText,
        thumbnail,
        podcast,
      });

      console.log('response: Success');
      console.log('response: ', response);
    } catch (error) {
      console.log('error', error);
    }

    // TODO

    // const snippetsUpdated = [
    //   {
    //     isAvailableOffline: false,
    //     downloads: [],
    //     podcasts: [],
    //     podcastTitle,
    //     episodeTitle,
    //     snippetText,
    //     thumbnail,
    //     podcast,
    //   },
    //   ...snippets,
    // ];

    // yield persistItemInStorage(
    //   CONSTANTS.KEYS.SNIPPET_STORAGE_KEY,
    //   snippetsUpdated,
    // );

    // yield put(SnippetCreators.createSnippetSuccess(snippetsUpdated));
  } catch (err) {
    yield put(
      SnippetCreators.createSnippetFailure(
        'An unexpected error happened. Sorry for that.',
      ),
    );
  }
}

function* _handlePersistsSnippetsUpdated(snippet, podcasts) {
  const { snippets } = yield select((state) => state.snippet);

  const snippetUpdated = {
    ...snippet,
    podcasts,
  };

  const snippetsUpdated = snippets.map((snippetFromState) =>
    snippetFromState.title === snippet.title
      ? snippetUpdated
      : snippetFromState,
  );

  yield persistItemInStorage(
    CONSTANTS.KEYS.SNIPPET_STORAGE_KEY,
    snippetsUpdated,
  );

  return snippetsUpdated;
}

export function* editSnippet({ payload }) {
  try {
    const { snippets } = yield select((state) => state.snippet);
    const { snippetTitle, index } = payload;

    const snippetsUpdated = Object.assign([...snippets], {
      [index]: {
        ...snippets[index],
        title: snippetTitle,
      },
    });

    yield persistItemInStorage(
      CONSTANTS.KEYS.SNIPPET_STORAGE_KEY,
      snippetsUpdated,
    );

    yield put(SnippetCreators.editSnippetSuccess(snippetsUpdated));
  } catch (err) {
    yield put(SnippetCreators.editSnippetFailure());
  }
}

export function* removeSnippet({ payload }) {
  try {
    const { snippets } = yield select((state) => state.snippet);
    const { snippetToRemove } = payload;

    const snippetsUpdated = snippets.filter(
      (snippet) => snippet.title !== snippetToRemove.title,
    );

    if (snippetToRemove.isAvailableOffline) {
      yield call(_setSnippetToUnvailableOffline, snippetToRemove);
    }

    yield persistItemInStorage(
      CONSTANTS.KEYS.SNIPPET_STORAGE_KEY,
      snippetsUpdated,
    );

    yield put(SnippetCreators.removeSnippetSuccess(snippetsUpdated));
  } catch (err) {
    yield put(SnippetCreators.removeSnippetFailure());
  }
}

export function* addPodcast({ payload }) {
  try {
    const { snippet, podcast } = payload;

    let snippetUpdated = snippet;

    if (snippet.isAvailableOffline) {
      const { podcastsDownloaded } = yield select(
        (state) => state.localPodcastsManager,
      );

      const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
        (podcastDownloaded) => podcastDownloaded.id === podcast.id,
      );

      if (!isPodcastAlreadyDownloaded) {
        snippetUpdated = {
          ...snippetUpdated,
          downloads: [podcast.id, ...snippetUpdated.downloads],
        };

        yield call(downloadPodcast, podcast);
      }
    }

    const podcastsUpdated = [podcast, ...snippet.podcasts];

    const snippetsUpdated = yield call(
      _handlePersistsSnippetsUpdated,
      snippetUpdated,
      podcastsUpdated,
    );

    yield put(SnippetCreators.addPodcastSuccess(snippetsUpdated));
  } catch (err) {
    yield put(
      SnippetCreators.createSnippetFailure(
        'An unexpected error happened while try to add podcast on snippet. Sorry for that.',
      ),
    );
  }
}

export function* removePodcast({ payload }) {
  try {
    const { snippets } = yield select((state) => state.snippet);
    const { snippet, podcastIndex } = payload;

    if (snippet.isAvailableOffline) {
      const podcast = snippet.podcasts[podcastIndex];
      const isPodcastDownloadedBySnippet = snippet.downloads.some(
        (podcastId) => podcastId === podcast.id,
      );

      if (isPodcastDownloadedBySnippet) {
        yield call(removePodcastFromLocalStorage, {
          payload: {
            podcast: {
              id: podcast.id,
            },
          },
        });
      }
    }

    const podcastsUpdated = snippet.podcasts.filter(
      (podcastInSnippet, index) => index !== podcastIndex,
    );

    const snippetsUpdated = yield call(
      _handlePersistsSnippetsUpdated,
      snippet,
      podcastsUpdated,
    );

    yield put(
      SnippetCreators.removePodcastSuccess(snippetsUpdated, {
        ...snippet,
        podcasts: podcastsUpdated,
      }),
    );
  } catch (err) {
    yield put(SnippetCreators.removePodcastFailure());
  }
}

export function* getSnippet({ payload }) {
  try {
    const { title } = payload;
    const { localPodcastsManager, snippet } = yield select((state) => state);

    const { podcastsDownloaded } = localPodcastsManager;
    const { snippets } = snippet;

    const snippetSelected = snippets.find(
      (snippetInStore) => snippetInStore.title === title,
    );

    const podcasts = snippetSelected.podcasts.map((podcast) => ({
      ...podcast,
      isDownloaded: podcastsDownloaded.some(
        (podcastDownloaded) => podcastDownloaded.id === podcast.id,
      ),
    }));

    yield put(
      SnippetCreators.getSnippetSuccess({
        ...snippetSelected,
        podcasts,
      }),
    );
  } catch (err) {
    yield put(SnippetCreators.getSnippetFailure());
  }
}

function* _setSnippetToAvailableOffline(snippetSelected) {
  try {
    const { localPodcastsManager, snippet } = yield select((state) => state);

    const { podcastsDownloaded } = localPodcastsManager;
    const podcastsDownloadedBySnippet = [];

    const podcastsToDownload = snippetSelected.podcasts.filter((podcast) => {
      const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
        (podcastDownloaded) => podcastDownloaded.id === podcast.id,
      );

      return !isPodcastAlreadyDownloaded;
    });

    const snippetUpdated = {
      ...snippetSelected,
      isAvailableOffline: true,
      downloads: podcastsToDownload.map((podcast) => podcast.id),
    };

    yield call(
      _handlePersistsSnippetsUpdated,
      snippetUpdated,
      snippetSelected.podcasts,
    );

    const snippetsUpdated = snippet.snippets.map((snippet) =>
      snippet.title === snippetUpdated.title ? snippetUpdated : snippet,
    );

    yield put(
      SnippetCreators.setOfflineAvailabilitySuccess(
        snippetUpdated,
        snippetsUpdated,
      ),
    );

    yield all(
      podcastsToDownload.map((podcast) => call(downloadPodcast, podcast)),
    );
  } catch (err) {
    throw err;
  }
}

function* _setSnippetToUnvailableOffline(snippetSelected) {
  try {
    const { localPodcastsManager, snippet } = yield select((state) => state);
    const { podcastsDownloaded, downloadingList } = localPodcastsManager;

    const jobsToCancel = downloadingList.filter((downloadingItem) => {
      const shouldCancelPodcatDownload = snippetSelected.downloads.some(
        (podcastId) => downloadingItem.id === podcastId,
      );
      return shouldCancelPodcatDownload;
    });

    const podcastsAlreadyDownloadedBySnippetSelected = snippetSelected.downloads.filter(
      (podcast) => {
        const isPodcastAlreadyDownloaded = podcastsDownloaded.some(
          (podcastDownloaded) => podcastsDownloaded.id === podcast.id,
        );
        return isPodcastAlreadyDownloaded;
      },
    );

    yield all(
      podcastsAlreadyDownloadedBySnippetSelected.map((id) =>
        call(removePodcastFromLocalStorage, {
          payload: {
            podcast: {
              id,
            },
          },
        }),
      ),
    );

    yield all(
      jobsToCancel.map((jobInfo) => call(stopPodcastDownload, jobInfo)),
    );

    const snippetUpdated = {
      ...snippetSelected,
      isAvailableOffline: false,
      downloads: [],
    };

    yield call(
      _handlePersistsSnippetsUpdated,
      snippetUpdated,
      snippetSelected.podcasts,
    );

    const snippetsUpdated = snippet.snippets.map((snippet) =>
      snippet.title === snippetUpdated.title ? snippetUpdated : snippet,
    );

    yield put(
      SnippetCreators.setOfflineAvailabilitySuccess(
        snippetUpdated,
        snippetsUpdated,
      ),
    );
  } catch (err) {
    throw err;
  }
}

export function* setOfflineAvailability({ payload }) {
  try {
    const { snippet, available } = payload;

    if (available) {
      yield call(_setSnippetToAvailableOffline, snippet);
    }

    if (!available) {
      yield call(_setSnippetToUnvailableOffline, snippet);
    }
  } catch (err) {
    console.log(err);
    yield put(SnippetCreators.setOfflineAvailabilityError());
  }
}
