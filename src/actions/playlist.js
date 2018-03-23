import { fetchPlaylist } from '../utils/api'

export const SET_PLAYLIST = 'SET_PLAYLIST'

export function setPlaylist (playlist) {
  return {
    type: SET_PLAYLIST,
    playlist
  }
}

export function handleGetPlaylist (href) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken

    const dispatchPlaylists = (playlist) => {
      dispatch(setPlaylist(playlist))
    }

    fetchPlaylist(accessToken, href, dispatchPlaylists)
  }
}
