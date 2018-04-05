export function formatTracks ({ tracks }) {
  return tracks.items.map((trackData) => {
    return {
      name: trackData.track.name,
      href: trackData.track.href,
      uri: trackData.track.uri,
      img: trackData.track.album.images[1].url,
    }
  })
}

export function formatArtwork ({ items }) {
  return items.map(trackData => trackData.track.album.images[1].url )
}


export function formatFetchAllTracks(tracks){
  return tracks.map((track) => {
    return track.uri
  })
}

export function checkForChangedTrack(active, {track_window, duration, paused, position}) {
  const { current_track } = track_window



  if(current_track.uri !== active.uri
    && current_track.linked_from_uri !== active.uri
    && current_track.name !== active.name
    && duration !== 0
    && (paused !== true || position !== 0 )
  ){
      return true
  }

  return false
}

export function checkForPlaylistEnd ({ paused, track_window, position, disallows }) {

  if(paused === true
    && track_window.next_tracks.length === 0
    && position === 0
    && disallows.resuming === true
  ){
    return true
  }

  return false
}

export function checkForPlaylistRestart ({paused, position, track_window}) {
  if(
    paused === true
    && position === 0
    && track_window.previous_tracks.length === 0
  ){
    return true
  }
  return false
}
