export function fetchUserAndPlaylists (accessToken, cb) {
  const getUserPromise = fetch('https://api.spotify.com/v1/me', {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then((response) => response.json())

  //fetch playlists
  const getPlaylistPromise = fetch('https://api.spotify.com/v1/me/playlists', {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then((response) => response.json())

  Promise.all([getUserPromise, getPlaylistPromise])
  .then((values) => cb(values))
}

export function fetchPlaylist (accessToken, href, cb) {
  fetch(href, {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then((response) => response.json())
  .then((playlist) => cb(playlist))
}
