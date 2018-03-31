import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shuffle } from '../../utils/utils' //TODO:may need to get rid of
import Player from '../Player/Player'
import { clearTracksAndArt } from '../../actions/shared'
import { fetchClearTracks } from '../../utils/api'
import './style.css'
import './tile.css'


function ArtOption (props) {
  //add class 'hover' to flip-container to make flip when clicking
  return (
      <div className="flip-container">
      	<div className="flipper art_option"
          id={props.img}
          data-img={props.img}
          onClick={props.fireSelection}
          style={{
            backgroundImage: `url(${props.img})`,
            width: 245,
            height: 245,
            backgroundSize: 'cover',
            borderRadius: 5}}>
      		<div className="front">

      		</div>
          <div className="back">
            {props.children}
      		</div>
      	</div>
      </div>
  )
}



class GameView extends Component {

  shufflePicutres = () => {
    const wrongs = this.props.wrongArtwork
    const active = [this.props.activeTrack.img]
    return shuffle(wrongs.concat(active))
  }

  guess = (e) => {
    const guessedEl = document.getElementById(e.target.id)
    const guessedVal = guessedEl.dataset.img
    if(guessedVal === this.props.activeTrack.img){ //TODO all this needs replaced with props children and ternary classes
      guessedEl.innerHTML = "CORRECT!"
      guessedEl.classList.add('correct')
    } else {

      guessedEl.innerHTML = "wrong :("
      guessedEl.classList.add('incorrect')
      const correctAns = document.getElementById(this.props.activeTrack.img)
      correctAns.innerHTML = "correct answer"
      correctAns.classList.add('correct')
    }
  }

  clearTracksAndArt = () => {
    this.props.dispatch(clearTracksAndArt())
    fetchClearTracks(this.props.accessToken, this.props.deviceId)
  }

  render(){
    return(
      <div>
        <div>
          <span onClick={this.clearTracksAndArt}>back</span>
          <div className='art_container'>
            {this.shufflePicutres().map((img, i) =>{
              return <ArtOption
                        key={img+(Date.now()+i)}
                        id={"option_"+i} img={img}
                        fireSelection={this.guess}
                      >
                        {this.props.activeTrack.img === img ? "correct" : "NOPE"}
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
