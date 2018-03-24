import React, { Component } from 'react'
import { connect } from 'react-redux'
import { trackPlayed } from '../actions/tracks'
import { shuffle } from '../utils/utils'

class GameView extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTrack: {},
      alternateImgs: [],
      availableImgs: this.props.artwork,
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
        newImg = this.getImage()
      // } while (!threeImgs.includes(activeImg))
    } while (newImg === activeImg)
      threeImgs.push(newImg)
    }

    return threeImgs
  }

  getImage = () => {
    const artwork = this.state.availableImgs
    const length = artwork.length
    const randImg = artwork[Math.floor(Math.random() * artwork.length)]
    this.setState({
      availableImgs: this.state.availableImgs.filter((img) => {
        return img !== randImg
      })
    })
    return randImg
  }

  next = () => {
    this.setState({
      activeTrack: this.selectNewActive(),
    }, () => {
      this.setState({
        alternateImgs: this.getThreeImgs(),
      })
    })
  }

  render(){
    const { activeTrack } = this.state
    return(
      <div>
        {Object.keys(activeTrack).length === 0
          ? <div>loading</div>
          : <div>
              {this.shufflePicutres().map((img) =>{
                return <img src={img} />
              })}
              <div>{activeTrack.name}</div>
              <div><span onClick={this.next}>next</span></div>
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
