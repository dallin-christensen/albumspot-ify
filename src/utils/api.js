import { formatFetchAllTracks } from './helpers'

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

export function renderPlayer() {
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = 'https://sdk.scdn.co/spotify-player.js'
  document.body.appendChild(s)
}

let player
export function connectPlayer (token, cb, listenCb) {
  window.onSpotifyWebPlaybackSDKReady = () => {

        const _spotify = window.Spotify
        player = new _spotify.Player({
          name: 'SpotArtify',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener('player_state_changed', state => {
          if(state === null){ return }
          listenCb(state)
        });

        player.addListener('ready', ({ device_id }) => {
          cb(device_id)
        });

        player.connect();
    }
}

export function disconnectPlayer(){
  player.disconnect();
}

export function fetchPlayTracks(token, device_id, tracks){
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
    method: 'PUT',
    body: JSON.stringify({ uris: tracks }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}

export function fetchPause(token) {
  fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}

export function fetchUnpause (token) {
  fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}

export function fetchNext (token) {
  fetch('https://api.spotify.com/v1/me/player/next', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}

export function fetchVolume (token, percent) {
  fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${percent}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}
