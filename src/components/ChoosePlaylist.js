import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlaylistIcon from './PlaylistIcon'

class ChoosePlaylist extends Component {
  render(){
    const { allPlaylists } = this.props
    return (
      allPlaylists.map((pl) => {

        return  <PlaylistIcon
                  imgSrc={pl.images[0].url}
                  name={pl.name}
                />
      })
    )
  }
}

function mapStateToProps({allPlaylists}) {
  return {
    allPlaylists
  }
}

export default connect(mapStateToProps)(ChoosePlaylist)
