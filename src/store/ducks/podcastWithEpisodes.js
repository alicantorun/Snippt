export const Types = {
  GET_PODCAST_WITH_EPISODES_REQUEST:
    'subject/GET_PODCAST_WITH_EPISODES_REQUEST',
  GET_PODCAST_WITH_EPISODES_SUCCESS:
    'subject/GET_PODCAST_WITH_EPISODES_SUCCESS',
  GET_PODCAST_WITH_EPISODES_ERROR: 'subject/GET_PODCAST_WITH_EPISODES_ERROR',
};

const INITIAL_STATE = {
  loading: true,
  error: false,
  data: null,
};

export const Creators = {
  getPodcastWithEpisodes: id => ({
    type: Types.GET_PODCAST_WITH_EPISODES_REQUEST,
    id,
  }),

  getPodcastWithEpisodesSuccess: data => ({
    type: Types.GET_PODCAST_WITH_EPISODES_SUCCESS,
    payload: { data },
  }),

  getPdcastWithEpisodesFailure: () => ({
    type: Types.GET_PODCAST_WITH_EPISODES_ERROR,
  }),
};

const subject = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_PODCAST_WITH_EPISODES_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_PODCAST_WITH_EPISODES_SUCCESS:
      return {
        ...state,
        data: payload.data,
        loading: false,
      };

    case Types.GET_PODCAST_WITH_EPISODES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default subject;
