import { combineReducers } from 'redux'
import user from './user'
import allPlaylists from './allPlaylists'
import playlistSearch from './playlistSearch'
import playlist from './playlist'
import tracks from './tracks'
import artwork from './artwork'
import game from './game'

export default combineReducers({
  user,
  allPlaylists,
  playlistSearch,
  playlist,
  tracks,
  artwork,
  game,
})
