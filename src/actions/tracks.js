export const SET_TRACKS_UNPLAYED = 'SET_TRACKS_UNPLAYED'
export const TRACK_PLAYED = 'TRACK_PLAYED'

export function setTracksUnplayed (tracks) {
  return {
    type: SET_TRACKS_UNPLAYED,
    tracks
  }
}

export function trackPlayed (track) {
  return {
    type: TRACK_PLAYED,
    track
  }
}
