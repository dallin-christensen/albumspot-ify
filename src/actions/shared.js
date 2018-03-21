import { setUser } from './user'
import { setAllPlaylists } from './allPlaylists'

export function handleInitialData () {
  return (dispatch, getState) => {
    const accessToken = getState().user.accessToken
    //loading

    //fetch user
    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then((response) => response.json())
    .then((data) => dispatch(setUser(data)))

    //fetch playlists
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then((response) => response.json())
    .then((data) => dispatch(setAllPlaylists(data.items)))
  }
}
