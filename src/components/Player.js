import React, { Component } from 'react'
import { connect } from 'react-redux'
import { connectPlayer } from '../utils/api'
import { setDeviceId } from '../actions/user'
import { formatFetchAllTracks } from '../utils/helpers'

class Player extends Component {
  componentDidMount () {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://sdk.scdn.co/spotify-player.js'
    document.body.appendChild(s)

    connectPlayer(this.props.accessToken, this.setDeviceId)

  }

  setDeviceId = (deviceId) => {
    this.props.dispatch(setDeviceId(deviceId))
    this.fetchSongs(deviceId)
  }

  fetchSongs = (id) => {
    const token = this.props.accessToken
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: formatFetchAllTracks(this.props.tracks) }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then((data) => console.log(data));
  }

  render () {
    return (
      <div></div>
    )
  }
}

function mapStateToProps({ user, tracks }){
  return {
    accessToken: user.accessToken,
    tracks: tracks.tracks
  }
}

export default connect(mapStateToProps)(Player)
