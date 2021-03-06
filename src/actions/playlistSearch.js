export const SET_PLAYLIST_SEARCH = 'SET_PLAYLIST_SEARCH'
export const CLEAR_PLAYLIST_SEARCH = 'CLEAR_PLAYLIST_SEARCH'
export const SET_SEARCH_KEY = 'SET_SEARCH_KEY'

export function setPlaylistSearch (playlists) {
  return {
    type: SET_PLAYLIST_SEARCH,
    playlists
  }
}

export function clearPlaylistSearch () {
  return {
    type: CLEAR_PLAYLIST_SEARCH,
  }
}

export function setSearchKey (searchKey) {
  return {
    type: SET_SEARCH_KEY,
    searchKey
  }
}
