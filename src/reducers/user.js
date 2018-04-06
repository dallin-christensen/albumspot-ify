import {
  SET_USER, REMOVE_USER, SET_ACCESS_TOKEN,
  SET_DEVICE_ID, LOADING, NOT_LOADING
} from '../actions/user'

const defaultState = {
  loading: false,
}

export default function user (state = defaultState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
        tokenTimestamp: Date.now(),
      }

    case SET_USER:
      return {
        ...state,
        [action.user.id]: action.user,
        userID: action.user.id,
      }

    case SET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.deviceId
      }

    case LOADING:
      return {
        ...state,
        loading: true
      }

    case NOT_LOADING:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
