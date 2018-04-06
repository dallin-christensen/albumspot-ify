import React, { Component } from 'react'
import connect from 'react-redux'
import logo_lg from '../../images/spotartify_200.png'
import './style.css'

export default function Loading (props) {
  return (
    <div className='loading_container'>
      <div className='loading_circle'>
        <img src={logo_lg} className='loading_image' />
      </div>
    </div>
  )
}
