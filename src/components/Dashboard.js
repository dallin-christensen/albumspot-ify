import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChoosePlaylist from './ChoosePlaylist'
import GameView from './GameView'

class Dashboard extends Component {
  render () {
    const { allPlaylists, playlist } = this.props
    return (
      !allPlaylists.length
        ? <div>Loading</div>
        : !Object.keys(playlist).length
            ?<ChoosePlaylist />
            :<GameView />
    )
  }
}

function mapStateToProps ({ allPlaylists, playlist }) {
  return {
    allPlaylists,
    playlist
  }
}

export default connect(mapStateToProps)(Dashboard)
