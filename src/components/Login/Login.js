import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loading } from '../../actions'
import logo_lg from '../../images/spotartify_200.png'
import './style.css'

class Login extends Component {
  authenticate = (e) => {
    e.preventDefault()

    this.props.dispatch(loading())
    window.location = 'https://spotify-game-backend.herokuapp.com/login'
  }
  render () {
    return (
      <div className='login_container'>
        <div className='login_toptext_container'>
          Hello and Welcome to
        </div>
        <div className='login_logo_container'>
          <img className='login_logo' src={logo_lg} alt='big awesome logo' />
          <div className='login_logo_text'>SpotArtify</div>
        </div>
        <div className='login_overview_container'>
          the album art guessing game for Spotify Premium users!<br />
          get started by clicking the button below!
        </div>
        <div className='login_button_container'>
          <button className='login_button' onClick={this.authenticate}>Login To Spotify</button>
        </div>
      </div>
    )


  }
}

export default connect()(Login)
