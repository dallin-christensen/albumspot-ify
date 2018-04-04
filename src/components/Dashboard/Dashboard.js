import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChoosePlaylist from '../ChoosePlaylist/ChoosePlaylist'
import GameView from '../GameView/GameView'
import { connectPlayer, renderPlayer } from '../../utils/api'
import { checkForChangedTrack } from '../../utils/helpers'
import { setDeviceId } from '../../actions/user'
import { nextTrack } from '../../actions/shared'

class Dashboard extends Component {
  componentDidMount () {
    renderPlayer()
    connectPlayer(this.props.accessToken, this.setDeviceId, this.listenForNextTrack )
  }

  setDeviceId = (deviceId) => {
    this.props.dispatch(setDeviceId(deviceId))
  }

  listenForNextTrack = (response) => {
    const { dispatch, active } = this.props

    if(checkForChangedTrack(active, response)){
      dispatch(nextTrack())
    }
  }

  render () {
    const { allPlaylists, tracks, artwork } = this.props
    return (
      !allPlaylists.length
        ? <div>Zero Public Playlists</div>
        : !Object.keys(tracks).length || !artwork.length
            ?<ChoosePlaylist />
            :<GameView />
    )
  }
}

function mapStateToProps ({ allPlaylists, tracks, artwork, user }) {
  const allTracks = tracks.tracks
  const active = allTracks.length ? allTracks[tracks.active] : null
  return {
    allPlaylists,
    tracks,
    artwork: artwork.all,
    accessToken: user.accessToken,
    active,
  }
}

export default connect(mapStateToProps)(Dashboard)
