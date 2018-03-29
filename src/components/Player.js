import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPlayTracks, fetchPause, fetchUnpause, fetchNext, fetchVolume } from '../utils/api'
import { formatFetchAllTracks } from '../utils/helpers'
import { nextTrack } from '../actions/shared'


class Player extends Component {
  constructor (props) {
    super(props)
    this.state = {
      paused: false,
      volume: 50
    }
  }

  componentDidMount(){
    const { token, deviceId, tracks } = this.props
    fetchPlayTracks(token, deviceId, formatFetchAllTracks(tracks))
  }

  togglePause = () => {
    const { token } = this.props

    if(this.state.paused){
      fetchUnpause(token)
    } else {
      fetchPause(token)
    }

    this.setState({
      paused: !this.state.paused
    })
  }

  nextTrack = () => {
    const { token, dispatch } = this.props
    fetchNext(token)
    dispatch(nextTrack())
  }

  volumeUp = () => {
    const { volume } = this.state
    const newVol = volume >= 100 ? 100 : volume + 10
    fetchVolume(this.props.token, newVol)
    this.setState({
      volume: newVol
    })
  }

  volumeDown = () => {
    const { volume } = this.state
    const newVol = volume <= 0 ? 0 : volume - 10
    fetchVolume(this.props.token, newVol)
    this.setState({
      volume: newVol
    })
  }

  render () {
    return (
      <div>
        <span onClick={this.togglePause}>play/pause</span><br />
        <span onClick={this.nextTrack}>next</span><br />
        <span>volume:{this.state.volume}</span><br />
        <span onClick={this.volumeUp}>vol up</span><br />
        <span onClick={this.volumeDown}>vol down</span><br />
      </div>
    )
  }
}

function mapStateToProps({ user, tracks }){
  const allTracks = tracks.tracks
  const activeUri = allTracks[tracks.active].uri
  return {
    tracks: allTracks,
    token: user.accessToken,
    deviceId: user.deviceId,
    activeUri
  }
}

export default connect(mapStateToProps)(Player)
