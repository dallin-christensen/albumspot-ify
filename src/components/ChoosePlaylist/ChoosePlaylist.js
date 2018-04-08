import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlaylistIcon from '../PlaylistIcon/PlaylistIcon'
import { handleGetPlaylist } from '../../actions/shared'
import { error } from '../../actions/user'
import { IoAndroidArrowDown } from 'react-icons/lib/io'
import './style.css'

class ChoosePlaylist extends Component {
  invokeError = (msg) => {
    this.props.dispatch(error(msg, 'Warning'))
  }
  render(){
    const { allPlaylists, userName, isPremium, dispatch } = this.props
    return (
      <div>
        <h1 className='user_greeting'>Wecome, {userName}!</h1>

        <p className='user_instructions'>
          Select a playlist to get started!&nbsp;
          {<span className='arrows'><IoAndroidArrowDown /><IoAndroidArrowDown /><IoAndroidArrowDown /></span>}
        </p>
        <hr className='horizontal_line' />
        <div className='playlist_container'>
          {allPlaylists.map((pl, i) => {
            return  <span
                      key={pl.name + i}
                      onClick={() => isPremium
                                ? dispatch(handleGetPlaylist(pl.href))
                                : this.invokeError('This functionality is restricted to premium users only')
                              }
                    >
                      <PlaylistIcon
                        imgSrc={pl.images[0].url}
                        name={pl.name}
                      />
                    </span>
          })}
        </div>
      </div>

    )
  }
}

function mapStateToProps({allPlaylists, user}) {
  const userName = user[user.userID].display_name
  const isPremium = user[user.userID].product === 'premium'
  return {
    allPlaylists,
    userName,
    isPremium,
  }
}

export default connect(mapStateToProps)(ChoosePlaylist)
