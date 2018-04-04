export const GUESS = 'GUESS'
export const RESET_GUESS = 'RESET_GUESS'
export const CLEAR_GAME = 'CLEAR_GAME'

export function guess (correct) {
  return {
    type: GUESS,
    correct
  }
}

export function resetGuess () {
  return {
    type: RESET_GUESS,
  }
}

export function clearGame () {
  return {
    type: CLEAR_GAME,
  }
}
