export const SET_ALL_PLAYLISTS = 'SET_ALL_PLAYLISTS'

export function setAllPlaylists (playlists) {
  return {
    type: SET_ALL_PLAYLISTS,
    playlists
  }
}
