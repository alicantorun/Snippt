export const Types = {
  GET_PODCAST_REQUEST: 'subject/GET_PODCAST_REQUEST',
  GET_PODCAST_SUCCESS: 'subject/GET_PODCAST_SUCCESS',
  GET_PODCAST_ERROR: 'subject/GET_PODCAST_ERROR',
};

const INITIAL_STATE = {
  loading: true,
  error: false,
  data: null,
};

export const Creators = {
  getPodcast: id => ({
    type: Types.GET_PODCAST_REQUEST,
    id,
  }),

  getPodcastSuccess: data => ({
    type: Types.GET_PODCAST_SUCCESS,
    payload: { data },
  }),

  getPodcastFailure: () => ({
    type: Types.GET_PODCAST_ERROR,
  }),
};

const subject = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_PODCAST_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_PODCAST_SUCCESS:
      return {
        ...state,
        data: payload.data,
        loading: false,
      };

    case Types.GET_PODCAST_ERROR:
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
