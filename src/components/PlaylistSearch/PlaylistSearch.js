import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchPlaylists, handleGetPlaylist, error, clearPlaylistSearch } from '../../actions'
import { PlaylistIcon } from '../'
import { IoAndroidSearch } from 'react-icons/lib/io'
import logo_md from '../../images/spotartify_200.png'
import './style.css'

function PlaylistSearch (props) {
  const { playlists, isPremium, dispatch } = props
  return (
    <div>
      {
        playlists.length
          ? <div className='playlist_container'>
              {
                playlists.map((pl, i) => {
                  return  <span
                            key={pl.name + i}
                            onClick={() => isPremium
                                      ? dispatch(handleGetPlaylist(pl.href))
                                      : this.invokeError('This functionality is restricted to premium users only')
                                    }
                          >
                            <PlaylistIcon
                              imgSrc={pl.images[0] ? pl.images[0].url : logo_md}
                              name={pl.name}
                            />
                          </span>
                })
              }
            </div>
          : 'Search Spotify Playlists'
      }

    </div>
  )
}

function mapStateToProps ({ playlistSearch, user }) {
  const isPremium = user[user.userID].product === 'premium'
  const { playlists } = playlistSearch
  return {
    playlists,
    isPremium,
  }
}

export default connect(mapStateToProps)(PlaylistSearch)
