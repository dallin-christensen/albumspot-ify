export function enoughTracks ({ tracks }) {
  return tracks.items.length >= 4 ? true : false
}

export function enoughArt ({ tracks }) {
  let artworkUrls = []
  tracks.items.map((trackData) => {
    if(!trackData.track.album.images.length){ return null }
    let { url } = trackData.track.album.images[1]
    if(!artworkUrls.includes(url)){
      artworkUrls.push(url)
    }
    return url
  })

  return artworkUrls.length >= 4 ? true : false
}

export function formatTracks ({ tracks }) {
  let filteredTracks = tracks.items.filter((trackData) => {
    return !!trackData.track.href
  })

  return filteredTracks.map((trackData) => {
    return {
      name: trackData.track.name,
      artist: trackData.track.artists[0].name,
      album: trackData.track.album.name,
      href: trackData.track.href,
      uri: trackData.track.uri,
      img: trackData.track.album.images[1].url,
    }
  })
}

export function formatArtwork ({ items }) {
  let filteredItems = items.filter((trackData) => {
    return !!trackData.track.href
  })
  return filteredItems.map((trackData) => trackData.track.album.images[1].url)
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

export function checkForPlaylistRestart ({paused, position, track_window, disallows}) {
  if(
    paused === true
    && position === 0
    && track_window.previous_tracks.length === 0
    && disallows.pausing === true
  ){
    return true
  }
  return false
}
