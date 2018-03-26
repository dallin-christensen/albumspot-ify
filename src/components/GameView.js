import React, { Component } from 'react'
import { connect } from 'react-redux'
import { trackPlayed } from '../actions/tracks'
import { shuffle } from '../utils/utils'
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
  constructor(props){
    super(props);
    this.state = {
      activeTrack: {},
      alternateImgs: [],
      availableImgs: [],
    }
  }

  componentDidMount(){
    this.next()
  }

  selectNewActive = () =>{
    const { tracks } = this.props
    const activeTrack = tracks[ Math.floor(Math.random() * tracks.length) ]
    this.props.dispatch(trackPlayed(activeTrack))
    return activeTrack
  }

  shufflePicutres = () => {
    const alts = this.state.alternateImgs
    const active = [this.state.activeTrack.img]
    return shuffle(alts.concat(active))
  }

  getThreeImgs = () => {

    //TODO: add a check in here to see if the user has four different pics, if not, bypass do while loop and make necessary changes/notifications
    const activeImg = this.state.activeTrack.img

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
    this.setState({
      activeTrack: this.selectNewActive(),
      availableImgs: this.props.artwork
    }, () => {
      this.setState({
        alternateImgs: this.getThreeImgs(),
      })
    })
  }

  guess = (e) => {
    const guessedEl = document.getElementById(e.target.id)
    const guessedVal = guessedEl.dataset.img
    if(guessedVal === this.state.activeTrack.img){ //TODO all this needs replaced with props children and ternary classes
      guessedEl.innerHTML = "CORRECT!"
      guessedEl.classList.add('correct')
    } else {

      guessedEl.innerHTML = "wrong :("
      guessedEl.classList.add('incorrect')
      const correctAns = document.getElementById(this.state.activeTrack.img)
      correctAns.innerHTML = "correct answer"
      correctAns.classList.add('correct')
    }
  }

  render(){
    const { activeTrack } = this.state
    return(
      <div>
        {Object.keys(activeTrack).length === 0
          ? <div>loading</div>
          : <div>
              {this.shufflePicutres().map((img, i) =>{
                return <ArtOption key={img+(Date.now()+i)} id={"option_"+i} img={img} fireSelection={this.guess} />
              })}
              <div><span onClick={this.next}>next</span></div>
              <Player activeTrack={activeTrack.uri} />
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ tracks, artwork }) {
  return {
    tracks: tracks.unplayed,
    artwork
  }
}

export default connect(mapStateToProps)(GameView)
