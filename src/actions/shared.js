import { setUser, loading, notLoading, error } from './user'
import { setAllPlaylists } from './allPlaylists'
import { fetchUserAndPlaylists, fetchPlaylist } from '../utils/api'
import { setPlaylist } from './playlist'
import { formatTracks, formatArtwork, enoughTracks, enoughArt } from '../utils/helpers'
import { setTracks } from './tracks'
import { setArtwork, setWrongArtwork } from './artwork'
import { shuffle } from '../utils/utils'
import { nextTrackActive, activeStartOver } from './tracks'
import { resetGuess, clearGame } from './game'

export function handleInitialData () {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken

    const dispatchValues = (values) => {
      dispatch(setUser(values[0]))
      dispatch(setAllPlaylists(values[1].items))
      dispatch(notLoading())
    }

    const errorCb = (msg) => {
      dispatch(error(msg, 'Warning'))
    }

    fetchUserAndPlaylists(accessToken, dispatchValues, errorCb)
  }
}

export function handleGetPlaylist (href) {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken

    const dispatchPlaylists = (playlist) => {
      if(!enoughTracks(playlist)){
        dispatch(error(
          'This playlist does not have enough tracks to play SpotArtify. Add more tracks or select a different playlist :)',
          'Unable to play playlist'
        ))
      } else if (!enoughArt(playlist)) {
        dispatch(error(
          'This playlist does not have enough different album art to play SpotArtify. You need at least four songs with seperate artwork to play. Add more tracks or select a different playlist :)',
          'Unable to play playlist'
        ))
      } else {
        dispatch(setPlaylist(playlist))
        dispatch(setTracks(shuffle(formatTracks(playlist))))
        dispatch(setArtwork(formatArtwork(playlist.tracks)))
        dispatch(createWrongArtwork())
      }
    }

    const errorCb = (msg) => {
      dispatch(error(msg, 'Warning'))
    }

    fetchPlaylist(accessToken, href, dispatchPlaylists, errorCb)
  }
}

export function createWrongArtwork () {
  return (dispatch, getState) => {
    const state = getState()
    const { active } = state.tracks
    const { tracks } = state.tracks
    const artwork = state.artwork.all
    const activeImg = tracks[active].img
    let i, wrongs = [], len = artwork.length

    for(i = 0; i < 3; i++){
      let newImg
      do {
        newImg = artwork[Math.floor(Math.random() * len)]
      } while (newImg === activeImg || wrongs.includes(newImg))
      wrongs.push(newImg)
    }

    dispatch(setWrongArtwork(wrongs))
  }
}

export function nextTrack () {
  return (dispatch) => {
    dispatch(resetGuess())
    dispatch(nextTrackActive())
    dispatch(createWrongArtwork())
  }
}

export function clearTracksAndArt () {
  return (dispatch) => {
    dispatch(setTracks([]))
    dispatch(activeStartOver())
    dispatch(setArtwork([]))
    dispatch(clearGame())
  }
}
