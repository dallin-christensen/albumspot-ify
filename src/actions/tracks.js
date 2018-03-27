export const SET_TRACKS = 'SET_TRACKS'
export const NEXT_TRACK_ACTIVE = 'NEXT_TRACK_ACTIVE'

export function setTracks (tracks) {
  return {
    type: SET_TRACKS,
    tracks
  }
}

export function nextTrackActive () {
  return {
    type: NEXT_TRACK_ACTIVE
  }
}
