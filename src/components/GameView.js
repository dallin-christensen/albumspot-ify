import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shuffle } from '../utils/utils' //TODO:may need to get rid of
import Player from './Player'


function ArtOption (props) {
  return (
    <div className="art_option"
      id={props.img}
      data-img={props.img}
      onClick={props.fireSelection}
      style={{
        backgroundImage: `url(${props.img})`,
        width: 200,
        height: 200,
        backgroundSize: 'cover'
      }}>

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

  render(){
    return(
      <div>
        <div>
          {this.shufflePicutres().map((img, i) =>{
            return <ArtOption key={img+(Date.now()+i)} id={"option_"+i} img={img} fireSelection={this.guess} />
          })}
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
    deviceId: user.deviceId
  }
}

export default connect(mapStateToProps)(GameView)
