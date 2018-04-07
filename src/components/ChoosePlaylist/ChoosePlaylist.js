import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlaylistIcon from '../PlaylistIcon/PlaylistIcon'
import { handleGetPlaylist } from '../../actions/shared'
import { IoArrowDownC, IoAndroidArrowDown } from 'react-icons/lib/io'
import './style.css'

class ChoosePlaylist extends Component {
  render(){
    const { allPlaylists } = this.props
    return (
      <div>
        <h1 className='user_greeting'>Wecome, {this.props.userName}!</h1>
        <p className='user_instructions'>
          Select a playlist to get started!&nbsp;
          {<span className='arrows'><IoAndroidArrowDown /><IoAndroidArrowDown /><IoAndroidArrowDown /></span>}
        </p>
        <div className='playlist_container'>
          {allPlaylists.map((pl) => {
            return  <span onClick={() => this.props.dispatch(handleGetPlaylist(pl.href))}>
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
  return {
    allPlaylists,
    userName
  }
}

export default connect(mapStateToProps)(ChoosePlaylist)
