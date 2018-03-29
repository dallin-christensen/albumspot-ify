import { SET_ARTWORK, SET_WRONG_ARTWORK } from '../actions/artwork'

const defaultState = {
  all: [],
  wrongArtwork: []
}

export default function artwork (state = defaultState, action) {
  switch (action.type) {
    case SET_ARTWORK:
      return {
        ...state,
        all: action.artwork
      }

    case SET_WRONG_ARTWORK:
      return {
        ...state,
        wrongArtwork: action.wrongArtwork
      }

    default:
      return state
  }
}
