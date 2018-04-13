import { SET_PLAYLIST_SEARCH } from '../actions/playlistSearch'

export default function playlistSearch (state = [], action) {
  switch (action.type) {
    case SET_PLAYLIST_SEARCH:
      const playlists = action.playlists
      return playlists

    default:
      return state
  }
}
