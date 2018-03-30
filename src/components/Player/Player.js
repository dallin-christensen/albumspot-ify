import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.css'
import { fetchPlayTracks, fetchPause, fetchUnpause, fetchNext, fetchVolume } from '../../utils/api'
import { formatFetchAllTracks } from '../../utils/helpers'
import { nextTrack } from '../../actions/shared'
import { FaPlay, FaPause } from 'react-icons/lib/fa'
import { MdSkipNext, MdVolumeUp } from 'react-icons/lib/md'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'


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

  changeVolume = (value) => {
    fetchVolume(this.props.token, value)
    this.setState({
      volume: value
    })
  }

  render () {
    return (
      <div className='player_container'>
        <div className='left_section'>
          <div className='player_play' onClick={this.togglePause}>
            {this.state.paused
              ? <FaPlay className='extra_margin_left' />
              : <FaPause /> }
          </div>
          <div className='player_skip' onClick={this.nextTrack}>
            <MdSkipNext />
          </div>
        </div>

        <div className='volume_section'>
          <div className='player_vol_symbol'>
            <MdVolumeUp />
          </div>
          <div className='player_vol_slider'>
            <Slider
              value={this.state.volume}
              orientation='horizontal'
              onChange={this.changeVolume}
            />
          </div>
        </div>
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