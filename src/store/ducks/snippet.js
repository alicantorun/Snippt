export const Types = {
  CREATE_SNIPPET_REQUEST: 'snippet/CREATE_SNIPPET_REQUEST',
  CREATE_SNIPPET_SUCCESS: 'snippet/CREATE_SNIPPET_SUCCESS',
  CREATE_SNIPPET_ERROR: 'snippet/CREATE_SNIPPET_ERROR',
  LOAD_SNIPPETS_REQUEST: 'snippet/LOAD_SNIPPETS_REQUEST',
  LOAD_SNIPPETS_SUCCESS: 'snippet/LOAD_SNIPPETS_SUCCESS',
  LOAD_SNIPPETS_ERROR: 'snippet/LOAD_SNIPPETS_ERROR',
  ADD_PODCAST_REQUEST: 'snippet/ADD_PODCAST_REQUEST',
  ADD_PODCAST_SUCCESS: 'snippet/ADD_PODCAST_SUCCESS',
  ADD_PODCAST_ERROR: 'snippet/ADD_PODCAST_ERROR',
  REMOVE_PODCAST_REQUEST: 'snippet/REMOVE_PODCAST_REQUEST',
  REMOVE_PODCAST_SUCCESS: 'snippet/REMOVE_PODCAST_SUCCESS',
  REMOVE_PODCAST_ERROR: 'snippet/REMOVE_PODCAST_ERROR',
  GET_SNIPPET_REQUEST: 'snippet/GET_SNIPPET_REQUEST',
  GET_SNIPPET_SUCCESS: 'snippet/GET_SNIPPET_SUCCESS',
  GET_SNIPPET_ERROR: 'snippet/GET_SNIPPET_ERROR',
  SET_AVAILABLE_OFFLINE_REQUEST: 'snippet/SET_AVAILABLE_OFFLINE_REQUEST',
  SET_AVAILABLE_OFFLINE_SUCCESS: 'snippet/SET_AVAILABLE_OFFLINE_SUCCESS',
  SET_AVAILABLE_OFFLINE_ERROR: 'snippet/SET_AVAILABLE_OFFLINE_ERROR',
  REMOVE_SNIPPET_REQUEST: 'snippet/REMOVE_SNIPPET_REQUEST',
  REMOVE_SNIPPET_SUCCESS: 'snippet/REMOVE_SNIPPET_SUCCESS',
  REMOVE_SNIPPET_ERROR: 'snippet/REMOVE_SNIPPET_ERROR',
  EDIT_SNIPPET_REQUEST: 'snippet/EDIT_SNIPPET_REQUEST',
  EDIT_SNIPPET_SUCCESS: 'snippet/EDIT_SNIPPET_SUCCESS',
  EDIT_SNIPPET_ERROR: 'snippet/EDIT_SNIPPET_ERROR',
};

const INITIAL_STATE = {
  snippets: [],
  snippet: {
    isAvailableOffline: false,
    downloads: [],
    podcasts: [],
    podcastTitle: '',
    episodeTitle: '',
    snippetText: '',
    thumbnail: '',
    podcast: [],
  },
  error: false,
};

export const Creators = {
  createSnippet: ({
    podcastTitle,
    episodeTitle,
    snippetText,
    thumbnail,
    podcast,
  }) => ({
    type: Types.CREATE_SNIPPET_REQUEST,
    payload: { podcastTitle, episodeTitle, snippetText, thumbnail, podcast },
  }),

  createSnippetSuccess: (snippets) => ({
    type: Types.CREATE_SNIPPET_SUCCESS,
    payload: { snippets },
  }),

  createSnippetFailure: () => ({
    type: Types.CREATE_SNIPPET_ERROR,
  }),

  loadSnippets: () => ({
    type: Types.LOAD_SNIPPETS_REQUEST,
  }),

  loadSnippetsSuccess: (snippets) => ({
    type: Types.LOAD_SNIPPETS_SUCCESS,
    payload: { snippets },
  }),

  loadSnippetsFailure: () => ({
    type: Types.LOAD_SNIPPETS_ERROR,
  }),

  addPodcast: (snippet, podcast) => ({
    type: Types.ADD_PODCAST_REQUEST,
    payload: { snippet, podcast },
  }),

  addPodcastSuccess: (snippets) => ({
    type: Types.ADD_PODCAST_SUCCESS,
    payload: { snippets },
  }),

  addPodcastFailure: () => ({
    type: Types.ADD_PODCAST_ERROR,
  }),

  removePodcast: (snippet, podcastIndex) => ({
    type: Types.REMOVE_PODCAST_REQUEST,
    payload: { snippet, podcastIndex },
  }),

  removePodcastSuccess: (snippets, snippetUpdated) => ({
    type: Types.REMOVE_PODCAST_SUCCESS,
    payload: { snippets, snippetUpdated },
  }),

  removePodcastFailure: () => ({
    type: Types.REMOVE_PODCAST_ERROR,
  }),

  getSnippet: (title) => ({
    type: Types.GET_SNIPPET_REQUEST,
    payload: { title },
  }),

  getSnippetSuccess: (snippet) => ({
    type: Types.GET_SNIPPET_SUCCESS,
    payload: { snippet },
  }),

  getSnippetFailure: (title) => ({
    type: Types.GET_SNIPPET_ERROR,
  }),

  setOfflineAvailability: (snippet, available) => ({
    type: Types.SET_AVAILABLE_OFFLINE_REQUEST,
    payload: { snippet, available },
  }),

  setOfflineAvailabilitySuccess: (snippetUpdated, snippetsUpdated) => ({
    type: Types.SET_AVAILABLE_OFFLINE_SUCCESS,
    payload: { snippetUpdated, snippetsUpdated },
  }),

  setOfflineAvailabilityError: () => ({
    type: Types.SET_AVAILABLE_OFFLINE_ERROR,
  }),

  removeSnippet: (snippetToRemove) => ({
    type: Types.REMOVE_SNIPPET_REQUEST,
    payload: { snippetToRemove },
  }),

  removeSnippetSuccess: (snippets) => ({
    type: Types.REMOVE_SNIPPET_SUCCESS,
    payload: { snippets },
  }),

  removeSnippetFailure: () => ({
    type: Types.REMOVE_SNIPPET_ERROR,
  }),

  editSnippet: (snippetTitle, index) => ({
    type: Types.EDIT_SNIPPET_REQUEST,
    payload: { snippetTitle, index },
  }),

  editSnippetSuccess: (snippets) => ({
    type: Types.EDIT_SNIPPET_SUCCESS,
    payload: { snippets },
  }),

  editSnippetFailure: () => ({
    type: Types.EDIT_SNIPPET_ERROR,
  }),
};

const snippet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.CREATE_SNIPPET_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.CREATE_SNIPPET_SUCCESS:
      return {
        ...state,
        snippets: payload.snippets,
      };

    case Types.CREATE_SNIPPET_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.LOAD_SNIPPETS_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.LOAD_SNIPPETS_SUCCESS:
      return {
        ...state,
        snippets: payload.snippets,
      };

    case Types.LOAD_SNIPPETS_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.ADD_PODCAST_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.ADD_PODCAST_SUCCESS:
      return {
        ...state,
        snippets: payload.snippets,
      };

    case Types.ADD_PODCAST_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.REMOVE_PODCAST_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.REMOVE_PODCAST_SUCCESS:
      return {
        ...state,
        snippet: payload.snippetUpdated,
        snippets: payload.snippets,
      };

    case Types.REMOVE_PODCAST_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.REMOVE_SNIPPET_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.REMOVE_SNIPPET_SUCCESS:
      return {
        ...state,
        snippets: payload.snippets,
      };

    case Types.REMOVE_SNIPPET_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.EDIT_SNIPPET_REQUEST:
      return {
        ...state,
        error: false,
      };

    case Types.EDIT_SNIPPET_SUCCESS:
      return {
        ...state,
        snippets: payload.snippets,
      };

    case Types.EDIT_SNIPPET_ERROR:
      return {
        ...state,
        error: true,
      };

    case Types.GET_SNIPPET_REQUEST:
      return {
        ...state,
      };

    case Types.GET_SNIPPET_SUCCESS:
      return {
        ...state,
        snippet: payload.snippet,
      };

    case Types.GET_SNIPPET_ERROR:
      return {
        ...state,
      };

    case Types.SET_AVAILABLE_OFFLINE_REQUEST:
      return {
        ...state,
      };

    case Types.SET_AVAILABLE_OFFLINE_SUCCESS:
      return {
        ...state,
        snippets: payload.snippetsUpdated,
        snippet: payload.snippetUpdated,
      };

    case Types.SET_AVAILABLE_OFFLINE_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default snippet;
