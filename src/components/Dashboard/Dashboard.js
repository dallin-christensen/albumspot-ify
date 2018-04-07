import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChoosePlaylist from '../ChoosePlaylist/ChoosePlaylist'
import GameView from '../GameView/GameView'
import Header from '../Header/Header'
import SpotArtifyModal from '../Modal/SpotArtifyModal'
import { connectPlayer, renderPlayer, fetchTokenSwitch, fetchClearTracks } from '../../utils/api'
import { checkForChangedTrack, checkForPlaylistEnd, checkForPlaylistRestart } from '../../utils/helpers'
import { setDeviceId } from '../../actions/user'
import { nextTrack, clearTracksAndArt } from '../../actions/shared'
import './style.css'

function NoPlaylists (props) {
  return (
    <div>
      <div className='user_greeting'>
        Welcome {props.name}!
      </div>
      <div className='noplaylists_text'>
        <p>Uh oh, it appears you don't have any publicly accessable playlists!</p>
        <p>If you would like to continue, follow or create a Spotify playlist and set it to 'Public'.</p>
        <p>Then simply refresh this page!</p>
      </div>
    </div>
  )
}
const CNoPlaylists = connect((state) => ({
  name: state.user[state.user.userID].display_name
}))(NoPlaylists)

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
          <div>
            {
              !allPlaylists.length
                ? <CNoPlaylists />
                : !Object.keys(tracks.tracks).length || !artwork.length
                    ?<ChoosePlaylist />
                    :<GameView />
            }
            <SpotArtifyModal />
          </div>
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
