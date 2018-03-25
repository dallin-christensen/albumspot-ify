// import 'https://sdk.scdn.co/spotify-player.js'



// window.onSpotifyWebPlaybackSDKReady = () => {
//       const token = 'BQD7T_r-ea-Tvnh45pAy56LMZo05wwU9YaQea5cxBCg-fKkpK9v_O8RzfLei2iPNvZm60HwPZ1AQi5RZsSS5kOxtlSLhPGycUHFwpougP3ryMNWgZmKAtkG0KwcR2Nrie_5umvlvdx1sIxGLlHrStUjz0vHYCe2Qg-AN6A';
//       const player = new Spotify.Player({
//         name: 'Web Playback SDK Quick Start Player',
//         getOAuthToken: cb => { cb(token); }
//       });
//
//       // const player = new Spotify.Player()
//
//       // Error handling
//       player.addListener('initialization_error', ({ message }) => { console.error(message); });
//       player.addListener('authentication_error', ({ message }) => { console.error(message); });
//       player.addListener('account_error', ({ message }) => { console.error(message); });
//       player.addListener('playback_error', ({ message }) => { console.error(message); });
//
//       // Playback status updates
//       player.addListener('player_state_changed', state => { console.log(state); });
//
//       player.addListener('ready', ({ device_id }) => {
//         fetchSongs(device_id);
//       });
//
//       player.connect();
//
//       function fetchSongs(id){
//         fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
//           method: 'PUT',
//           body: JSON.stringify({ uris: ['spotify:track:0UPsdEgJx6ypkfFUxD3ZHh', 'spotify:track:3Hbd6gPZ0QErPWXVkC6GRt'] }),
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         });
//       }
//     };

let player;

window.onSpotifyWebPlaybackSDKReady = () => {

  console.log('hi')
  const token = 'BQD7T_r-ea-Tvnh45pAy56LMZo05wwU9YaQea5cxBCg-fKkpK9v_O8RzfLei2iPNvZm60HwPZ1AQi5RZsSS5kOxtlSLhPGycUHFwpougP3ryMNWgZmKAtkG0KwcR2Nrie_5umvlvdx1sIxGLlHrStUjz0vHYCe2Qg-AN6A';

  // player = new Spotify.Player({
  //   name: 'AlbumSpot-ify',
  //   getOAuthToken: cb => { cb(token); }
  // })

  // player.addListener('initialization_error', ({ message }) => { console.error(message); });
  // player.addListener('authentication_error', ({ message }) => { console.error(message); });
  // player.addListener('account_error', ({ message }) => { console.error(message); });
  // player.addListener('playback_error', ({ message }) => { console.error(message); });
  //
  // player.addListener('player_state_changed', state => { console.log(state); });
  //
  // player.addListener('ready', ({ device_id }) => {
  //   console.log(device_id)
  // });
}

export default player
// player.connect();
