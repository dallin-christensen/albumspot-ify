export function fetchUserAndPlaylists (accessToken, cb, errorCb) {
  const getUserPromise = fetch('https://api.spotify.com/v1/me', {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then((response) => response.json())
  .catch(() => errorCb('Could not retrieve user data'))

  //fetch playlists
  const getPlaylistPromise = fetch('https://api.spotify.com/v1/me/playlists', {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then((response) => response.json())
  .catch(() => errorCb('Could not retrieve user playlist data'))

  Promise.all([getUserPromise, getPlaylistPromise])
  .then((values) => cb(values))
  .catch(() => errorCb('Could not retrieve user data'))
}

export function fetchPlaylist (accessToken, href, cb, errorCb) {
  fetch(href, {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then((response) => response.json())
  .then((playlist) => {
    cb(playlist)
  })
  .catch(() => errorCb('Could not retrieve playlist data'))
}

export function fetchSearchPlaylists (token, searchKey, cb, errorCb) {
  fetch(`https://api.spotify.com/v1/search?q=${searchKey}&type=playlist&limit=15`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
  }).then((response) => response.json())
  .then((playlists) => {
    cb(playlists.playlists.items)
  })
  .catch(() => errorCb('Could not search Spotify playlists'))
}

export function renderPlayer() {
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = 'https://sdk.scdn.co/spotify-player.js'
  document.body.appendChild(s)
}

let player
export function connectPlayer (token, cb, listenCb, errorCb, tokenCb) {
  window.onSpotifyWebPlaybackSDKReady = () => {

        const _spotify = window.Spotify
        player = new _spotify.Player({
          name: 'SpotArtify',
          getOAuthToken: cb => { cb(token); },
          volume: 0.4
        });

        // Error handling
        player.addListener('initialization_error', (error) => {
          const { message } = error
          errorCb(message)
          console.error('1', error);
        });
        player.addListener('authentication_error', (error) => {
          const { message } = error
          errorCb(message)
          console.error('2', error);
        });
        player.addListener('account_error', (error) => {
          const { message } = error
          errorCb(message)
          console.error('3', error);
        });
        player.addListener('playback_error', (error) => {
          const { message } = error
          message === 'Playback error' ? tokenCb() : errorCb(message)
          console.error('4', error);
        });

        // Playback status updates
        player.addListener('player_state_changed', state => {
          if(state === null){ return }
          listenCb(state)
        });

        player.addListener('ready', (response) => {
          cb(response.device_id)
        });

        player.connect();
    }
}

export function disconnectPlayer(){
  player.disconnect();
}




export function fetchPlayTracks(token, device_id, tracks, errorCb, tokenCb){
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
    method: 'PUT',
    body: JSON.stringify({ uris: tracks }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => {
    if(response.status === 401){tokenCb()}
  })
  .catch(() => errorCb('Cannot play track'))
}

export function fetchPause(token, errorCb, tokenCb) {
  fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => {
    if(response.status === 401){tokenCb()}
  })
  .catch(() => errorCb('Cannot pause track'))
}

export function fetchUnpause (token, errorCb, tokenCb) {
  fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => {
    if(response.status === 401){tokenCb()}
  })
  .catch(() => errorCb('Cannot play track'))
}

export function fetchNext (token, errorCb, tokenCb) {
  fetch('https://api.spotify.com/v1/me/player/next', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => {
    if(response.status === 401){tokenCb()}
  })
  .catch(() => errorCb('Cannot skip track'))
}

export function fetchVolume (token, percent, errorCb, tokenCb) {
  fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${percent}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => {
    if(response.status === 401){tokenCb()}
  })
  .catch(() => errorCb('Cannot adjust volume'))
}

export function fetchClearTracks (token, device_id, errorCb, tokenCb) {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
    method: 'PUT',
    body: JSON.stringify({ uris: [] }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => {
    if(response.status === 401){tokenCb()}
  })
  .catch(() => errorCb('Could not clear tracks in playlist'))
}

// export function fetchTokenSwitch (token, cb) {
//   fetch('https://accounts.spotify.com/api/token', {
//     method: 'PUT',
//     body: 'client_credentials',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//   }).then((response) => response.json())
//   .then((newToken) => cb(newToken))
// }
