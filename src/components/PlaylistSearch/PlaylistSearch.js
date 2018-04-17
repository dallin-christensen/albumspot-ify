import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchPlaylists, handleGetPlaylist, error, clearPlaylistSearch } from '../../actions'
import { PlaylistIcon } from '../'
import { IoAndroidSearch } from 'react-icons/lib/io'
import './style.css'

class PlaylistSearch extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchKey: ''
    }
  }
  updateSearchKey = (e) => {
    e.preventDefault()
    const value = e.target.value

    this.setState({
      searchKey: value
    }, () => {
      if(this.state.searchKey.length){
        this.search(this.state.searchKey)
      } else {
        this.props.dispatch(clearPlaylistSearch())
      }
    })
  }
  search = (value) => {
    this.props.dispatch(searchPlaylists(value))
  }
  invokeError = (msg) => {
    this.props.dispatch(error(msg, 'Warning'))
  }
  render () {
    const { playlistSearch, isPremium, dispatch } = this.props
    return (
      <div>
      <div className='magnifying_glass'>
        <IoAndroidSearch />
      </div>
      <input className='searchbar' type='text' value={this.state.searchKey}  onChange={this.updateSearchKey}/>
        {
          playlistSearch.length
            ? <div className='playlist_container'>
                {
                  playlistSearch.map((pl, i) => {
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
                }
              </div>
            : null
        }

      </div>
    )
  }
}

function mapStateToProps ({ playlistSearch, user }) {
  const isPremium = user[user.userID].product === 'premium'
  return {
    playlistSearch,
    isPremium,
  }
}

export default connect(mapStateToProps)(PlaylistSearch)
