import { SET_PLAYLIST_SEARCH, CLEAR_PLAYLIST_SEARCH, SET_SEARCH_KEY } from '../actions/playlistSearch'

const defaultState = {
  searchKey: '',
  playlists: [],
}

export default function playlistSearch (state = defaultState, action) {
  switch (action.type) {
    case SET_PLAYLIST_SEARCH:
      // const playlists = action.playlists
      // return playlists
      return {
        ...state,
        playlists: action.playlists,
      }

    case CLEAR_PLAYLIST_SEARCH:
      return {
        ...state,
        playlists: []
      }

    case SET_SEARCH_KEY:
      return {
        ...state,
        searchKey: action.searchKey,
      }

    default:
      return state
  }
}
