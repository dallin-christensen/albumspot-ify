import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchClearTracks, disconnectPlayer } from '../../utils/api'
import { clearTracksAndArt, error, refreshToken,
  toggleSearchView, setSearchKey, searchPlaylists, clearPlaylistSearch } from '../../actions'
import { IoAndroidSearch, IoAndroidArrowDropright } from 'react-icons/lib/io'
import logo_sm from '../../images/spotartify_200.png'
import './style.css'

class Header extends Component {
  clearTracksAndArt = () => {
    this.props.dispatch(clearTracksAndArt())
    fetchClearTracks(this.props.accessToken, this.props.deviceId, this.invokeError, this.refreshToken)
  }
  invokeError = (msg) => {
    this.props.dispatch(error(msg, 'Warning'))
  }
  refreshToken = () => {
    this.props.dispatch(refreshToken())
    disconnectPlayer()
  }
  toggleSearchView = () => {
    this.props.dispatch(toggleSearchView())
    document.getElementById('searchKeyInput').focus()
  }
  setSearchKey = (e) => {
    e.preventDefault()

    this.props.dispatch(setSearchKey(e.target.value))

    !e.target.value
      ? this.clearPlaylistSearch()
      : setTimeout(() => {
          document.getElementById('searchKeyInput').value === this.props.searchKey 
            && this.props.searchKey !== '' 
            && this.searchPlaylists()
        }, 500);
  }
  searchPlaylists = () => {
    this.props.dispatch(searchPlaylists())
  }
  clearPlaylistSearch = () => {
    this.props.dispatch(clearPlaylistSearch())
  }
  render () {
    const { inGameview, searchView, searchKey } = this.props
    return (
      <div className='header_container'>
        <div className='header_title_container'>
          <div className='header_logo_container'>
            <img src={logo_sm} className='header_logo' alt='logo' />
          </div>
          <div
            className='header_title'
            onClick={inGameview ? this.clearTracksAndArt : undefined}
          >
              &nbsp;SpotArtify
          </div>
        </div>
        {
          inGameview
            ? <div>score
                <div className='header_score_container'>{this.props.score}/{this.props.tracksLen}</div>
              </div>
            : <div
                className='menu_option'
                title={!searchView ? 'Search all public Spotify playlists' : 'Back to your playlists'} >
                  <div
                    onClick={this.toggleSearchView}
                    className='search_or_collapse'>
                    {!searchView ? <IoAndroidSearch /> : <IoAndroidArrowDropright />}
                  </div>
                  <input
                    type='text'
                    id='searchKeyInput'
                    onChange={this.setSearchKey}
                    value={searchKey}
                    className={!searchView
                                  ? 'extendable_search'
                                  : 'extendable_search extended_search'}
                  />
              </div>
        }
      </div>
    )
  }
}

function mapStateToProps({tracks, artwork, user, game, playlistSearch}) {
  const tracksLen = Object.keys(tracks.tracks).length
  const inGameview = tracksLen && artwork.all.length ? true : false
  const { accessToken, deviceId, searchView } = user
  const { score } = game
  const { searchKey } = playlistSearch
  return {
    inGameview,
    accessToken,
    deviceId,
    score,
    tracksLen,
    searchView,
    searchKey,
  }
}

export default connect(mapStateToProps)(Header)
