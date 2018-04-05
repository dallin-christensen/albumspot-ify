import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.css'
import logo_sm from '../../images/spotartify_50.png'

class Header extends Component {
  render () {
    return (
      <div className='header_container'>
        <img src={logo_sm} />
        <div>score</div>
      </div>
    )
  }
}

export default connect()(Header)
