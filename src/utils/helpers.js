export function formatTracks ({ tracks }) {
  return tracks.items.map((trackData) => {
    return {
      name: trackData.track.name,
      href: trackData.track.href,
      uri: trackData.track.uri,
      img: trackData.track.album.images[1].url
    }
  })
}

export function formatArtwork ({ tracks }) {
  return tracks.items.map((trackData) => {
    return trackData.track.album.images[1].url
  })
}
