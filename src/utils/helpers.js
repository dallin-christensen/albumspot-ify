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

export function checkForChangedTrack(active, response) {
  const { current_track } = response.track_window

  if(current_track.uri !== active.uri
    && current_track.linked_from_uri !== active.uri
    && current_track.name !== active.name
    && response.duration !== 0){
      return true
  }

  return false
}
