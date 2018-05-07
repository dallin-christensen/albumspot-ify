export const GUESS = 'GUESS'
export const RESET_GUESS = 'RESET_GUESS'
export const CLEAR_GAME = 'CLEAR_GAME'
export const NEXT_NOT_AVAILABLE = 'NEXT_NOT_AVAILABLE'
export const GAME_END = 'GAME_END'
export const PAUSE = 'PAUSE'
export const UNPAUSE = 'UNPAUSE'

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

export function nextNotAvailable () {
  return {
    type: NEXT_NOT_AVAILABLE
  }
}

export function gameEnd () {
  return {
    type: GAME_END
  }
}

export function pause () {
  return {
    type: PAUSE
  }
}

export function unPause () {
  return {
    type: UNPAUSE
  }
}