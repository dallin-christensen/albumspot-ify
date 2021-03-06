import {
  SET_USER, SET_ACCESS_TOKEN, REFRESH_TOKEN, TOGGLE_SEARCH_VIEW,
  SET_DEVICE_ID, LOADING, NOT_LOADING, ERROR, CLEAR_ERROR
} from '../actions/user'

const defaultError ={
  msg: '',
  header: '',
}

const defaultState = {
  loading: false,
  error: defaultError,
  refreshToken: false,
  searchView: false,
}

function error(state, action) {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        msg: action.msg,
        header: action.header,
      }

    case CLEAR_ERROR:
      return defaultError

    default:
      return state
  }
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

    case ERROR:
      return {
        ...state,
        error: error(state.error, action),
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: error(state.error, action),
      }
    case REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: true
      }

    case TOGGLE_SEARCH_VIEW:
      return {
        ...state,
        searchView: !state.searchView,
      }

    default:
      return state
  }
}
