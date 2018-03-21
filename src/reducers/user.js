import { SET_USER, REMOVE_USER, SET_ACCESS_TOKEN } from '../actions/user'

//recieve_user
//remove_user
//error

export default function user (state = {}, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken
      }

    case SET_USER:
      return {
        ...state,
        [action.user.id]: action.user
      }

    default:
      return state
  }
}
