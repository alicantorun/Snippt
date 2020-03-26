import { call, select, delay, put } from 'redux-saga/effects';

import api from '~/services/api';
import { SERVER_URL } from 'react-native-dotenv';

import { getItemFromStorage } from '../../utils/AsyncStorageManager';
import { Creators as PodcastCreators } from '../ducks/podcast';
import CONSTANTS from '../../utils/CONSTANTS';
import parseParams from './utils/parseParams';

export function* getPodcast(id) {
  try {
    // const rawInterests = yield call(
    //   getItemFromStorage,
    //   CONSTANTS.KEYS.INTERESTS_STORAGE_KEY,
    //   [],
    // );

    // const interests =
    //   typeof rawInterests === 'string'
    //     ? JSON.parse(rawInterests)
    //     : rawInterests;

    // const interestsSelected = interests
    //   .filter(interest => interest.isSelected)
    //   .map(interest => interest.title.toLowerCase());
    // This bring best podcasts for now
    const { data } = yield call(
      api.get,
      `/podcasts/${id.id}`,
      //  {
      //   paramsSerializer: params => parseParams(params),
      //   params: { categories: interestsSelected },
      // }
    );

    // console.log(data);

    yield put(PodcastCreators.getPodcastSuccess(data));
  } catch (err) {
    yield put(PodcastCreators.getPodcastFailure());
  }
}
