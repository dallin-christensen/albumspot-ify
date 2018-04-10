import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ChoosePlaylist, GameView, Header } from '../'
import SpotArtifyModal from '../Modal/SpotArtifyModal'
import { connectPlayer, renderPlayer, fetchClearTracks, disconnectPlayer } from '../../utils/api'
import { checkForChangedTrack, checkForPlaylistEnd, checkForPlaylistRestart } from '../../utils/helpers'
import { setDeviceId, error, refreshToken, loading, nextTrack, clearTracksAndArt } from '../../actions'
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

class RefreshToken extends Component {
  toBackend = () => {
    this.props.dispatch(loading())
    window.location = 'https://spotify-game-backend.herokuapp.com/login'
  }
  render () {
    return (
      <div className='noplaylists_text'>
        <p>Unfortunately your Spotify session has timed out!</p>
        <p>Lucky for you, this button will help you out of this predicament!</p>
        <button className='renew_session_button' onClick={this.toBackend}>Renew Session</button>
      </div>
    )
  }
}
const CRefreshToken = connect()(RefreshToken)


class Dashboard extends Component {
  componentDidMount () {
    renderPlayer()
    connectPlayer(
      this.props.accessToken,
      this.setDeviceId,
      this.listenForNextTrack,
      this.invokeError,
      this.refreshToken
    )
  }

  setDeviceId = (deviceId) => {
    this.props.dispatch(setDeviceId(deviceId))
  }

  listenForNextTrack = (response) => {
    const { dispatch, active } = this.props

    if(!active){ return }

    if(checkForPlaylistEnd(response) || checkForPlaylistRestart(response)){
      this.props.dispatch(clearTracksAndArt())
      fetchClearTracks(this.props.accessToken, this.props.deviceId, this.invokeError, this.refreshToken)
    }else if(checkForChangedTrack(active, response)){
      dispatch(nextTrack())
    }
  }

  invokeError = (msg) => {
    this.props.dispatch(error(msg, 'Warning'))
  }
  refreshToken = () => {
    this.props.dispatch(refreshToken())
    disconnectPlayer()
  }

  render () {
    const { allPlaylists, tracks, artwork, refreshToken } = this.props
    return (
      <div>
        <Header />
        {
          <div>
            { refreshToken
              ? <CRefreshToken />
              : !allPlaylists.length
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
  const { accessToken, deviceId, refreshToken } = user
  return {
    allPlaylists,
    tracks,
    artwork: artwork.all,
    accessToken,
    deviceId,
    refreshToken,
    active,
  }
}

export default connect(mapStateToProps)(Dashboard)
