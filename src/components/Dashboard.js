import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChoosePlaylist from './ChoosePlaylist'
import GameView from './GameView'
import { connectPlayer, renderPlayer } from '../utils/api'
import { setDeviceId } from '../actions/user'

class Dashboard extends Component {
  componentDidMount () {
    renderPlayer()
    connectPlayer(this.props.accessToken, this.setDeviceId)
  }

  setDeviceId = (deviceId) => {
    this.props.dispatch(setDeviceId(deviceId))
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
  return {
    allPlaylists,
    tracks,
    artwork: artwork.all,
    accessToken: user.accessToken
  }
}

export default connect(mapStateToProps)(Dashboard)
