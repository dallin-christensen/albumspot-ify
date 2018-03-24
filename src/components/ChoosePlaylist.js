import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlaylistIcon from './PlaylistIcon'
import { handleGetPlaylist } from '../actions/shared'

class ChoosePlaylist extends Component {
  render(){
    const { allPlaylists } = this.props
    return (
      allPlaylists.map((pl) => {

        return  <span onClick={() => this.props.dispatch(handleGetPlaylist(pl.href))}>
                  <PlaylistIcon
                    imgSrc={pl.images[0].url}
                    name={pl.name}
                  />
                </span>
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
