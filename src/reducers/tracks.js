import { SET_TRACKS, NEXT_TRACK_ACTIVE } from '../actions/tracks'

const defaultState = {
  tracks: [],
  active: 0
}

export default function tracks (state = defaultState, action) {
  switch (action.type) {
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.tracks
      }

    case NEXT_TRACK_ACTIVE:
      return {
        ...state,
        active: ++state.active,
      }

    default:
      return state
  }
}
