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
  .then((playlist) => {
    cb(playlist)
  })
}

export function fetchTrackData (accessToken, href, cb) {
  fetch(href, {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then((response) => response.json())
  .then((tracks) => cb(tracks))
}


export function connectPlayer (token, cb) {
  window.onSpotifyWebPlaybackSDKReady = () => {

        const _spotify = window.Spotify
        const player = new _spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(token); }
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        player.addListener('ready', ({ device_id }) => {
          cb(device_id)
        });

        player.connect();
    }
}
