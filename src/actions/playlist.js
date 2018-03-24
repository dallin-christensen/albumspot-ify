export const SET_PLAYLIST = 'SET_PLAYLIST'

export function setPlaylist (playlist) {
  return {
    type: SET_PLAYLIST,
    playlist
  }
}
