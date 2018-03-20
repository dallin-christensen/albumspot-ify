import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthed } from '../actions/user'

class Login extends Component {
  componentDidMount () {
    //do auth stuff
  }
  authenticate = (e) => {
    e.preventDefault()

    window.location = 'https://spotify-game-backend.herokuapp.com/login'
  }
  render () {
    return <button onClick={this.authenticate}>Login To Spotify</button>
  }
}

export default connect()(Login)
