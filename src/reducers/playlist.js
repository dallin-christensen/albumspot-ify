import { SET_PLAYLIST } from '../actions/playlist'

export default function user (state = {}, action) {
  switch (action.type) {
    case SET_PLAYLIST:
      return action.playlist

    default:
      return state
  }
}
