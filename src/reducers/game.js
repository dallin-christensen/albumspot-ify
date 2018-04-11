import { GUESS, RESET_GUESS, CLEAR_GAME, NEXT_NOT_AVAILABLE, GAME_END } from '../actions/game'

const defaultState = {
  hasGuessed: false,
  correct: false,
  score: 0,
  nextIsAvailable: false,
  gameEnd: false,
}

export default function user (state = defaultState, action) {
  switch (action.type) {
    case GUESS:
      return {
        ...state,
        hasGuessed: true,
        correct: action.correct,
        score: action.correct ? state.score + 1 : state.score,
        nextIsAvailable: true
      }

    case RESET_GUESS:
      return {
        ...state,
        hasGuessed: false,
        correct: false,
      }

    case CLEAR_GAME:
      return {
        ...state,
        hasGuessed: false,
        correct: false,
        score: 0,
        gameEnd: false,
      }

    case NEXT_NOT_AVAILABLE:
      return {
        ...state,
        nextIsAvailable: false,
      }

    case GAME_END:
      return {
        ...state,
        gameEnd: true,
      }

    default:
      return state
  }
}
