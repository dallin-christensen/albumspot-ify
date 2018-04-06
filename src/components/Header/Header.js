import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.css'
import { fetchClearTracks } from '../../utils/api'
import { clearTracksAndArt } from '../../actions/shared'
import logo_sm from '../../images/spotartify_50.png'

class Header extends Component {
  clearTracksAndArt = () => {
    this.props.dispatch(clearTracksAndArt())
    fetchClearTracks(this.props.accessToken, this.props.deviceId)
  }
  render () {
    const { inGameview } = this.props
    return (
      <div className='header_container'>
        <div className='header_title_container'>
          <div className='header_logo_container'>
            <img src={logo_sm} className='header_logo' />
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
            && <div className='header_score_container'>{this.props.score}/{this.props.tracksLen}</div>
        }
      </div>
    )
  }
}

function mapStateToProps({tracks, artwork, user, game}) {
  const tracksLen = Object.keys(tracks.tracks).length
  const inGameview = tracksLen && artwork.all.length ? true : false
  const { accessToken, deviceId } = user
  const { score } = game
  return {
    inGameview,
    accessToken,
    deviceId,
    score,
    tracksLen,
  }
}

export default connect(mapStateToProps)(Header)
