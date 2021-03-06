import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shuffle } from '../../utils/utils'
import { Player, GameReview } from '../'
import { guess } from '../../actions'
import { IoIosCheckmarkOutline, IoIosCloseOutline } from 'react-icons/lib/io'
import './style.css'
import './tile.css'


class ArtOption extends Component {
  constructor (props){
    super(props)

    this.state = {
      clicked: false,
    }
  }
  flipTile = (e) => {
    this.setState({ clicked: true, })
    this.props.dispatch(guess(this.props.isCorrect))
  }
  render() {
    const { isCorrect, img, hasGuessed, correct, song, artist, album } = this.props
    const { clicked } = this.state
    return (
      <div className="flip-container">
        <div className="flipper art_option"
          id={img}
          data-img={img}
          onClick={!hasGuessed ? this.flipTile : undefined}
          style={{
            transform: hasGuessed && isCorrect
                        ? 'rotateY(-180deg)'
                        : hasGuessed && !correct && clicked
                          ? 'rotateY(180deg)'
                          : 'none'
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
                background: isCorrect ? 'rgba(10, 160, 10, 0.7)' : 'rgba(160, 10, 10, 0.7)' ,
              }}
              className='back_div'
            >
              {isCorrect
                ? <div className='back_c'>
                    <div className='c_icon'><IoIosCheckmarkOutline /></div>
                    <div className='tile_info'>{song}</div>
                    <div className='tile_info'>{artist}</div>
                    <div className='tile_info'>{album}</div>
                  </div>
                : <div className='back_i'><IoIosCloseOutline /></div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapArtOptionStateToProps ({ game }) {
  const { hasGuessed, correct, nextIsAvailable } = game
  return {
    hasGuessed,
    correct,
    nextIsAvailable,
  }
}

const ConnectedArtOption = connect(mapArtOptionStateToProps)(ArtOption)


class GameView extends Component {

  shufflePicutres = () => {
    const wrongs = this.props.wrongArtwork
    const active = [this.props.activeTrack.img]
    return shuffle(wrongs.concat(active))
  }

  render(){
    const { activeTrack, playlistName } = this.props
    return(
      <div>
        { this.props.gameEnd
            ? <GameReview />
            : <div>
                <div>{playlistName}</div>
                <div className='art_container'>
                  {this.shufflePicutres().map((img, i) =>{
                    const isCorrect = activeTrack.img === img
                    return <ConnectedArtOption
                              key={img+(Date.now()+i)}
                              id={"option_"+i}
                              img={img}
                              isCorrect={isCorrect}
                              song={activeTrack.name}
                              artist={activeTrack.artist}
                              album={activeTrack.album}
                            />
                  })}
                </div>
                { this.props.deviceId && <Player /> }
              </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ tracks, artwork, user, game, playlist }) {
  const activeTrack = tracks.tracks[tracks.active]
  const { wrongArtwork } = artwork
  const { deviceId } = user
  const { gameEnd } = game
  return {
    activeTrack,
    wrongArtwork,
    deviceId,
    gameEnd,
    playlistName: playlist.name,
  }
}

export default connect(mapStateToProps)(GameView)
