import { setUser } from './user'
import { setAllPlaylists } from './allPlaylists'
import { fetchUserAndPlaylists } from '../utils/api'

export function handleInitialData () {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken
    
    const dispatchValues = (values) => {
      dispatch(setUser(values[0]))
      dispatch(setAllPlaylists(values[1].items))
    }

    fetchUserAndPlaylists(accessToken, dispatchValues);
  }
}
