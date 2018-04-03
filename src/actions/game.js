export const GUESS = 'GUESS'
export const RESET_GUESS = 'RESET_GUESS'

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
