export const SET_ARTWORK = 'SET_ARTWORK'
export const SET_WRONG_ARTWORK = 'SET_WRONG_ARTWORK'

export function setArtwork (artwork) {
  return {
    type: SET_ARTWORK,
    artwork
  }
}

export function setWrongArtwork (wrongArtwork) {
  return {
    type: SET_WRONG_ARTWORK,
    wrongArtwork
  }
}
