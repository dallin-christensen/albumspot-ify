import React, { Component } from 'react'
import { connect } from 'react-redux'

class GameView extends Component {
  render(){
    const { tracks } = this.props
    return(
      tracks.map((item) => {
        return <div>{item.track.name}</div>
      })
    )
  }
}

function mapStateToProps ({ playlist }) {
  return {
    tracks: playlist.tracks.items
  }
}

export default connect(mapStateToProps)(GameView)
