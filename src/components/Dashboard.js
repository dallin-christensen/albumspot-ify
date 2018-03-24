import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChoosePlaylist from './ChoosePlaylist'
import GameView from './GameView'

class Dashboard extends Component {
  render () {
    const { allPlaylists, tracks, artwork } = this.props
    return (
      !allPlaylists.length
        ? <div>Loading</div>
        : !Object.keys(tracks).length || !artwork.length
            ?<ChoosePlaylist />
            :<GameView />
    )
  }
}

function mapStateToProps ({ allPlaylists, tracks, artwork }) {
  return {
    allPlaylists,
    tracks,
    artwork
  }
}

export default connect(mapStateToProps)(Dashboard)
