import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shuffle } from '../../utils/utils' //TODO:may need to get rid of
import Player from '../Player/Player'
import { clearTracksAndArt } from '../../actions/shared'
import { fetchClearTracks } from '../../utils/api'
import './style.css'
import './tile.css'


class ArtOption extends Component {
  //add class 'hover' to flip-container to make flip when clicking
  constructor (props) {
    super(props)
    this.state = {
      isFlipped: false,
    }
  }
  flipTile = (e) => {
    const clicked = e.target

    this.setState({
      isFlipped: true,
    })
  }
  render() {
    const { correct, img, children } = this.props
    return (
      <div className="flip-container">
        <div className="flipper art_option"
          id={img}
          data-img={img}
          onClick={this.flipTile}
          style={{
            transform: this.state.isFlipped ? 'rotateY(180deg)' : 'none',
          }}>
          <div className="front"
            style={{
              backgroundImage: `url(${img})` ,
            }}
          ></div>
          <div className="back"
            style={{
              backgroundImage: `url(${img})`,
            }}
          >
            <div
              style={{
                background: correct ? 'rgba(10, 160, 10, 0.7)' : 'rgba(160, 10, 10, 0.7)' ,
              }}
            >
              {children}
            </div>

          </div>
        </div>
      </div>
    )
  }
}

// opacity: '0.9',
// boxShadow: this.props.correct
//   ? 'outset 0 0 0 125px rgba(10, 160, 10, 0.94)'
//   : 'outset 0 0 0 125px rgba(160, 10, 10, 0.94)',

// opacity: 0.7;
// box-shadow:inset 0 0 0 100px rgba(10, 160, 10, 0.34);


class GameView extends Component {

  shufflePicutres = () => {
    const wrongs = this.props.wrongArtwork
    const active = [this.props.activeTrack.img]
    return shuffle(wrongs.concat(active))
  }

  // guess = (e) => {
  //   const guessedEl = document.getElementById(e.target.id)
  //   const guessedVal = guessedEl.dataset.img
  //   if(guessedVal === this.props.activeTrack.img){ //TODO all this needs replaced with props children and ternary classes
  //     guessedEl.innerHTML = "CORRECT!"
  //     guessedEl.classList.add('correct')
  //   } else {
  //
  //     guessedEl.innerHTML = "wrong :("
  //     guessedEl.classList.add('incorrect')
  //     const correctAns = document.getElementById(this.props.activeTrack.img)
  //     correctAns.innerHTML = "correct answer"
  //     correctAns.classList.add('correct')
  //   }
  // }

  clearTracksAndArt = () => {
    this.props.dispatch(clearTracksAndArt())
    fetchClearTracks(this.props.accessToken, this.props.deviceId)
  }

  render(){
    const { activeTrack } = this.props
    return(
      <div>
        <div>
          <span onClick={this.clearTracksAndArt}>back</span>
          <div className='art_container'>
            {this.shufflePicutres().map((img, i) =>{
              const isCorrect = activeTrack.img === img
              return <ArtOption
                        key={img+(Date.now()+i)}
                        id={"option_"+i} img={img}
                        correct={isCorrect}
                      >
                        {activeTrack.img === img ? "correct" : "NOPE"}
                      </ArtOption>
            })}
          </div>
          { this.props.deviceId && <Player /> }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ tracks, artwork, user }) {
  const activeTrack = tracks.tracks[tracks.active]
  const { wrongArtwork } = artwork
  return {
    activeTrack,
    wrongArtwork,
    deviceId: user.deviceId,
    accessToken: user.accessToken
  }
}

export default connect(mapStateToProps)(GameView)
