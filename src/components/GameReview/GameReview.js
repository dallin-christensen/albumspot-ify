import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PlaylistIcon } from '../'
import { clearTracksAndArt } from '../../actions'

class GameReview extends Component {
  toChoosePlaylist = () => {
    this.props.dispatch(clearTracksAndArt())
  }
  render () {
    const { score, trackLen, playlistName, playlistImg } = this.props
    const percent = Math.round((score/trackLen) * 100)
    return (
      <div>
        <div>{percent}%</div>
        <PlaylistIcon
          imgSrc={playlistImg}
          name={playlistName}
        />
        <div onClick={this.toChoosePlaylist}>go back</div>
      </div>
    )
  }
}

function mapStateToProps ({ game, tracks, playlist }) {
  return {
    score: game.score,
    trackLen: tracks.tracks.length,
    playlistName: playlist.name,
    playlistImg: playlist.images[0].url,
  }
}

export default connect(mapStateToProps)(GameReview)
