import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChoosePlaylist from './ChoosePlaylist'

class Dashboard extends Component {
  render () {
    const { allPlaylists } = this.props
    return (
      !allPlaylists.length
        ? <div>Loading</div>
        : <ChoosePlaylist />

    )
  }
}

function mapStateToProps ({ allPlaylists }) {
  return {
    allPlaylists
  }
}

export default connect(mapStateToProps)(Dashboard)
