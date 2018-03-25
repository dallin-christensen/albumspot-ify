import React, { Component } from 'react'
import { connect } from 'react-redux'

class Player extends Component {
  componentDidMount () {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://sdk.scdn.co/spotify-player.js'
    document.body.appendChild(s)

    window.onSpotifyWebPlaybackSDKReady = () => {

          // debugger
          const token = 'BQDA4IZfG3Ti4LEUhP_siqOJkjWKAyov35fkz31GRniEDl3rzZqjXllfherrSqSatvcOisSu5dpPoDwaqj_GKUnBTP3cRGoz9C3Z5kFJezmQgkARzyiXriVtBnbgaEexuMYrufXt4sBGLk5xVd3lZMfC6a9s_XE3d0rs1A'
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
            this.fetchSongs(device_id);
          });

          player.connect();

          // fetchSongs = (id) => {
          //   fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          //     method: 'PUT',
          //     body: JSON.stringify({ uris: [this.props.activeTrack] }),
          //     headers: {
          //       'Content-Type': 'application/json',
          //       'Authorization': `Bearer ${token}`
          //     },
          //   });
          // }
      }

  }

  fetchSongs = (id) => {
    const token = 'BQDA4IZfG3Ti4LEUhP_siqOJkjWKAyov35fkz31GRniEDl3rzZqjXllfherrSqSatvcOisSu5dpPoDwaqj_GKUnBTP3cRGoz9C3Z5kFJezmQgkARzyiXriVtBnbgaEexuMYrufXt4sBGLk5xVd3lZMfC6a9s_XE3d0rs1A'
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [this.props.activeTrack] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  }

  render () {
    return (
      <div></div>
    )
  }
}

function mapStateToProps({ user }){
  return {
    accessToken: user.accessToken
  }
}

export default connect(mapStateToProps)(Player)
