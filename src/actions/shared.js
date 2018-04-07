import { setUser, loading, notLoading, error } from './user'
import { setAllPlaylists } from './allPlaylists'
import { fetchUserAndPlaylists, fetchPlaylist } from '../utils/api'
import { setPlaylist } from './playlist'
import { formatTracks, formatArtwork } from '../utils/helpers'
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
      dispatch(setAllPlaylists(values[1].items)) //TODO:this is where errors on old token
      dispatch(notLoading())
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
      dispatch(createWrongArtwork())
    }

    fetchPlaylist(accessToken, href, dispatchPlaylists)
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
