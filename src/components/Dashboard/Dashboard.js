import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChoosePlaylist from '../ChoosePlaylist/ChoosePlaylist'
import GameView from '../GameView/GameView'
import Header from '../Header/Header'
import { connectPlayer, renderPlayer, fetchTokenSwitch, fetchClearTracks } from '../../utils/api'
import { checkForChangedTrack, checkForPlaylistEnd, checkForPlaylistRestart } from '../../utils/helpers'
import { setDeviceId } from '../../actions/user'
import { nextTrack, clearTracksAndArt } from '../../actions/shared'

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

    if(!active){ return }

    if(checkForPlaylistEnd(response) || checkForPlaylistRestart(response)){
      this.props.dispatch(clearTracksAndArt())
      fetchClearTracks(this.props.accessToken, this.props.deviceId)
    }else if(checkForChangedTrack(active, response)){
      dispatch(nextTrack())
    }
  }

  render () {
    const { allPlaylists, tracks, artwork } = this.props
    return (
      <div>
        <Header />
        {
          !allPlaylists.length
            ? <div>Zero Public Playlists</div>
            : !Object.keys(tracks.tracks).length || !artwork.length
                ?<ChoosePlaylist />
                :<GameView />
        }
      </div>

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
    deviceId: user.deviceId,
    tokenTimestamp: user.tokenTimestamp,
    active,
  }
}

export default connect(mapStateToProps)(Dashboard)
