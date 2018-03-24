import { SET_ARTWORK } from '../actions/artwork'

export default function artwork (state = [], action) {
  switch (action.type) {
    case SET_ARTWORK:
      return action.artwork

    default:
      return state
  }
}
