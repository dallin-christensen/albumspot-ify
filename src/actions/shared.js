import { setUser } from './user'
import { setAllPlaylists } from './allPlaylists'
import { fetchUserAndPlaylists, fetchPlaylist } from '../utils/api'
import { setPlaylist } from './playlist'
import { formatTracks, formatArtwork } from '../utils/helpers'
import { setTracksUnplayed } from './tracks'
import { setArtwork } from './artwork'

export function handleInitialData () {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken

    const dispatchValues = (values) => {
      dispatch(setUser(values[0]))
      dispatch(setAllPlaylists(values[1].items))
    }

    fetchUserAndPlaylists(accessToken, dispatchValues)
  }
}

export function handleGetPlaylist (href) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken

    const dispatchPlaylists = (playlist) => {
      dispatch(setPlaylist(playlist))
      dispatch(setTracksUnplayed(formatTracks(playlist)))
      dispatch(setArtwork(formatArtwork(playlist)))
    }

    fetchPlaylist(accessToken, href, dispatchPlaylists)
  }
}
