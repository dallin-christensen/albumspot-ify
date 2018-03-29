import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChoosePlaylist from './ChoosePlaylist'
import GameView from './GameView'
import { connectPlayer, renderPlayer } from '../utils/api'
import { setDeviceId } from '../actions/user'
import { nextTrack } from '../actions/shared'

class Dashboard extends Component {
  componentDidMount () {
    renderPlayer()
    connectPlayer(this.props.accessToken, this.setDeviceId, this.listenForNextTrack )
  }

  setDeviceId = (deviceId) => {
    this.props.dispatch(setDeviceId(deviceId))
  }

  listenForNextTrack = ({ track_window, duration }) => {
    const { current_track } = track_window

    if(current_track.uri !== this.props.activeUri && duration !== 0){
      this.props.dispatch(nextTrack())
    }
  }

  render () {
    const { allPlaylists, tracks, artwork } = this.props
    return (
      !allPlaylists.length
        ? <div>Loading</div>
        : !Object.keys(tracks).length || !artwork.length
            ?<ChoosePlaylist />
            :<GameView />
    )
  }
}

function mapStateToProps ({ allPlaylists, tracks, artwork, user }) {
  const allTracks = tracks.tracks
  const activeUri = allTracks.length ? allTracks[tracks.active].uri : null
  return {
    allPlaylists,
    tracks,
    artwork: artwork.all,
    accessToken: user.accessToken,
    activeUri,
  }
}

export default connect(mapStateToProps)(Dashboard)
