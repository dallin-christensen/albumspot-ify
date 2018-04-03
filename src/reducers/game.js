import { GUESS, RESET_GUESS } from '../actions/game'

const defaultState = {
  hasGuessed: false,
  correct: false,
  score: 0,
}

export default function user (state = defaultState, action) {
  switch (action.type) {
    case GUESS:
      return {
        ...state,
        hasGuessed: true,
        correct: action.correct,
        score: action.correct ? state.score + 1 : state.score,
      }

    case RESET_GUESS:
      return {
        ...state,
        hasGuessed: false,
        correct: false,
      }

    default:
      return state
  }
}
