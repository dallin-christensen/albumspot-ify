import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ChoosePlaylist, GameView, Header } from '../'
import SpotArtifyModal from '../Modal/SpotArtifyModal'
import { connectPlayer, renderPlayer, fetchClearTracks, disconnectPlayer } from '../../utils/api'
import { checkForChangedTrack, checkForPlaylistEnd, checkForPlaylistRestart, isNextTrack } from '../../utils/helpers'
import { setDeviceId, error, refreshToken, loading, nextTrack, gameEnd, 
  clearTracksAndArt, pause, unPause } from '../../actions'
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
    const { dispatch, active, trackNext } = this.props

    if(!active){ return }

    this.showPauseSate(response)

    if(checkForPlaylistEnd(response) || checkForPlaylistRestart(response)){
      this.props.dispatch(gameEnd())
      this.fetchClearTracks()
    }else if(checkForChangedTrack(active, response)){

      if(isNextTrack(trackNext, response)){
        dispatch(nextTrack())
      } else {
        dispatch(clearTracksAndArt())
        this.fetchClearTracks()
      }

    }
  }

  showPauseSate = (response) => {
    const { paused, dispatch } = this.props

    if(paused !== response.paused){
      response.paused ? dispatch(pause()) : dispatch(unPause())
    }
  }

  fetchClearTracks = () => {
    const { accessToken, deviceId } = this.props
    fetchClearTracks(accessToken, deviceId, this.invokeError, this.refreshToken)
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
                  : Object.keys(tracks.tracks).length && artwork.length
                      ?<GameView />
                      : <ChoosePlaylist />
            }
            <SpotArtifyModal />
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ allPlaylists, tracks, artwork, user, game }) {
  const allTracks = tracks.tracks
  const active = allTracks.length ? allTracks[tracks.active] : null
  const trackNext = allTracks.length && tracks.active !== tracks.length - 1
          ? allTracks[tracks.active + 1]
          : null
  const { accessToken, deviceId, refreshToken } = user
  return {
    allPlaylists,
    tracks,
    artwork: artwork.all,
    accessToken,
    deviceId,
    refreshToken,
    active,
    trackNext,
    paused: game.paused,
  }
}

export default connect(mapStateToProps)(Dashboard)
