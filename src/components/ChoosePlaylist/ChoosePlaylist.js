import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PlaylistIcon, PlaylistSearch } from '../'
import { handleGetPlaylist, error } from '../../actions'
import './style.css'

class SavedPlaylists extends Component {
  invokeError = (msg) => {
    this.props.dispatch(error(msg, 'Warning'))
  }
  render () {
    const { allPlaylists, isPremium, dispatch } = this.props
    return (
      allPlaylists.map((pl, i) => {
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
      })
    )
  }
}

const CSavedPlaylists = connect(mapStateToProps)(SavedPlaylists)

class ChoosePlaylist extends Component {
  render(){
    const { userName, searchView } = this.props
    return (
      <div>
        <h1 className='user_greeting'>{userName === '' ? 'Welcome!' : `Welcome, ${userName}!`}</h1>

        <p className='user_instructions'>
          Select a playlist to get started!
        </p>
        <hr className='horizontal_line' />

        <div className='playlist_container'>
          {
            searchView
              ? <PlaylistSearch />
              : <CSavedPlaylists />
          }
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
    searchView: user.searchView,
  }
}

export default connect(mapStateToProps)(ChoosePlaylist)
