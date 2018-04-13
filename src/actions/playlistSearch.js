export const SET_PLAYLIST_SEARCH = 'SET_PLAYLIST_SEARCH'

export function setPlaylistSearch (playlists) {
  return {
    type: SET_PLAYLIST_SEARCH,
    playlists
  }
}
