import { SET_TRACKS, NEXT_TRACK_ACTIVE, ACTIVE_START_OVER } from '../actions/tracks'

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

    case ACTIVE_START_OVER:
      return {
        ...state,
        active: 0
      }

    default:
      return state
  }
}
