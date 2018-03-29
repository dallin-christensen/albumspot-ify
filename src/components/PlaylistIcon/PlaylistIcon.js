import React, { Component } from 'react'

export default function PlaylistIcon ({ name, imgSrc }) {
  return (
    <div>
      <img src={imgSrc} style={{width: '200px'}} />
      <div>{name}</div>
    </div>
  )
}
