import { setUser } from './user'

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
  }
}
