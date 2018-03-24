import { combineReducers } from 'redux'
import user from './user'
import allPlaylists from './allPlaylists'
import playlist from './playlist'
import tracks from './tracks'
import artwork from './artwork'
// import authedUser from './authedUser'
// import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  user,
  allPlaylists,
  playlist,
  tracks,
  artwork,
})
