import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PlaylistIcon } from '../'
import { clearTracksAndArt } from '../../actions'
import './style.css'

class GameReview extends Component {
  toChoosePlaylist = () => {
    this.props.dispatch(clearTracksAndArt())
  }
  render () {
    const { score, trackLen, playlistName, playlistImg } = this.props
    const percent = Math.round((score/trackLen) * 100)
    const goodNews = percent >= 70 ? true : false
    return (
      <div className='review_container'>
        <div className='review_message'>
          {goodNews ? 'You win! Now go get that master\'s!' : 'Bummer! Try again!'}
        </div>
        <div className='review_flex'>
          <PlaylistIcon
            imgSrc={playlistImg}
            name={playlistName}
          />
          <div className='review_data_container'>
            <div className='review_score'>{score}/{trackLen}</div>
            <div className={goodNews ? 'review_percent' : 'review_percent red'}>{percent}%</div>
            <div className='back_container'>
              <button className='review_back' onClick={this.toChoosePlaylist}>To Playlists</button>
            </div>
          </div>
        </div>
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
