import { SET_TRACKS_UNPLAYED, TRACK_PLAYED } from '../actions/tracks'

const defaultState = {
  unplayed: [],
  played: []
}

export default function tracks (state = defaultState, action) {
  switch (action.type) {
    case SET_TRACKS_UNPLAYED:
      return {
        ...state,
        unplayed: action.tracks
      }

    case TRACK_PLAYED:
      return {
        played: state.played.concat([action.track]),
        unplayed: state.unplayed.filter((track) => {
          return track.href !== action.track.href
        })
      }

    default:
      return state
  }
}
