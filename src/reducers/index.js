import { combineReducers } from 'redux'
// import polls from './polls'
import user from './user'
import allPlaylists from './allPlaylists'
// import authedUser from './authedUser'
// import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  user,
  allPlaylists
})
