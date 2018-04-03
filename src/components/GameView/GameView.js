import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shuffle } from '../../utils/utils' //TODO:may need to get rid of
import Player from '../Player/Player'
import { clearTracksAndArt } from '../../actions/shared'
import { guess } from '../../actions/game'
import { fetchClearTracks } from '../../utils/api'
import { IoIosCheckmarkOutline, IoIosCloseOutline } from 'react-icons/lib/io'
import './style.css'
import './tile.css'


class ArtOption extends Component {
  flipTile = (e) => {
    const clicked = e.target
    this.props.dispatch(guess(this.props.correct))
  }
  render() {
    const { correct, img, children, hasGuessed } = this.props
    return (
      <div className="flip-container">
        <div className="flipper art_option"
          id={img}
          data-img={img}
          onClick={this.flipTile}
          style={{
            transform: hasGuessed ? 'rotateY(180deg)' : 'none',
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
              {correct
                ? <IoIosCheckmarkOutline />
                : <IoIosCloseOutline />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapArtOptionStateToProps ({ game }) {
  const { hasGuessed } = game
  return {
    hasGuessed,
  }
}

const ConnectedArtOption = connect(mapArtOptionStateToProps)(ArtOption)


class GameView extends Component {

  shufflePicutres = () => {
    const wrongs = this.props.wrongArtwork
    const active = [this.props.activeTrack.img]
    return shuffle(wrongs.concat(active))
  }

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
              return <ConnectedArtOption
                        key={img+(Date.now()+i)}
                        id={"option_"+i} img={img}
                        correct={isCorrect}
                      />
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
