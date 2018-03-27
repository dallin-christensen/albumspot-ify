import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shuffle } from '../utils/utils'
import Player from './Player'
import { nextTrackActive } from '../actions/tracks'


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
  constructor(props){
    super(props);
    this.state = {
      availableImgs: this.props.artwork,
      alternateImgs: this.getThreeImgs(),
    }
  }

  shufflePicutres = () => {
    const alts = this.state.alternateImgs
    const active = [this.props.active.img]
    return shuffle(alts.concat(active))
  }

  getThreeImgs = () => {

    //TODO: add a check in here to see if the user has four different pics, if not, bypass do while loop and make necessary changes/notifications
    const activeImg = this.props.active.img

    let i, threeImgs = []
    for(i = 0; i < 3; i++){
      let newImg
      do {
        newImg = this.randImage()
      } while (newImg === activeImg || threeImgs.includes(newImg))
      threeImgs.push(newImg)
    }

    return threeImgs
  }

  randImage = () => {

    const { artwork } = this.props
    const length = artwork.length
    const randImg = artwork[Math.floor(Math.random() * artwork.length)]
    return randImg
  }

  next = () => {
    this.props.dispatch(nextTrackActive())

    this.setState({
      availableImgs: this.props.artwork,
      alternateImgs: this.getThreeImgs(),
    })
  }

  guess = (e) => {
    const guessedEl = document.getElementById(e.target.id)
    const guessedVal = guessedEl.dataset.img
    if(guessedVal === this.props.active.img){ //TODO all this needs replaced with props children and ternary classes
      guessedEl.innerHTML = "CORRECT!"
      guessedEl.classList.add('correct')
    } else {

      guessedEl.innerHTML = "wrong :("
      guessedEl.classList.add('incorrect')
      const correctAns = document.getElementById(this.props.active.img)
      correctAns.innerHTML = "correct answer"
      correctAns.classList.add('correct')
    }
  }

  render(){
    const { active } = this.props
    return(
      <div>
        {Object.keys(active).length === 0
          ? <div>loading</div>
          : <div>
              {this.shufflePicutres().map((img, i) =>{
                return <ArtOption key={img+(Date.now()+i)} id={"option_"+i} img={img} fireSelection={this.guess} />
              })}
              <div><span onClick={this.next}>next</span></div>
              <Player />
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ tracks, artwork }) {
  const activeTrack = tracks.tracks[tracks.active]
  return {
    tracks: tracks.tracks,
    active: activeTrack,
    artwork,
  }
}

export default connect(mapStateToProps)(GameView)
