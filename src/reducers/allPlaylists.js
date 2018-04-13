import { SET_ALL_PLAYLISTS } from '../actions/allPlaylists'

export default function allPlaylists (state = [], action) {
  switch (action.type) {
    case SET_ALL_PLAYLISTS:
      const playlists = action.playlists
      return playlists

    default:
      return state
  }
}
