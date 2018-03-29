import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPlayTracks } from '../utils/api'
import { formatFetchAllTracks } from '../utils/helpers'


class Player extends Component {
  componentDidMount(){
    const { token, deviceId, tracks } = this.props
    fetchPlayTracks(token, deviceId, formatFetchAllTracks(tracks))
  }

  render () {
    return (
      <div></div>
    )
  }
}

function mapStateToProps({ user, tracks }){
  return {
    tracks: tracks.tracks,
    token: user.accessToken,
    deviceId: user.deviceId,
  }
}

export default connect(mapStateToProps)(Player)
