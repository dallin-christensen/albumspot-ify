import React from 'react'
import './style.css'

export default function PlaylistIcon ({ name, imgSrc }) {
  return (
    <div className='playlist_icon_container'>
      <img src={imgSrc} className='playlist_icon' alt={name} />
      <div className='playlist_title'>{name}</div>
    </div>
  )
}
