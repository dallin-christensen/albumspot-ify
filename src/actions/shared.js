import { setUser } from './user'
import { setAllPlaylists } from './allPlaylists'
import { fetchUserAndPlaylists, fetchPlaylist } from '../utils/api'
import { setPlaylist } from './playlist'
import { formatTracks, formatArtwork } from '../utils/helpers'
import { setTracks } from './tracks'
import { setArtwork, setWrongArtwork } from './artwork'
import { shuffle } from '../utils/utils'

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
      dispatch(setTracks(shuffle(formatTracks(playlist))))
      dispatch(setArtwork(formatArtwork(playlist.tracks)))
      // dispatch(setArtwork(playlist))
      dispatch(setWrongArtwork())
    }

    fetchPlaylist(accessToken, href, dispatchPlaylists)
  }
}
