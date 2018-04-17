export const SET_USER = 'RECIEVE_USER'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export const SET_DEVICE_ID = 'SET_DEVICE_ID'
export const LOADING = 'LOADING'
export const NOT_LOADING = 'NOT_LOADING'
export const ERROR = 'ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const TOGGLE_SEARCH_VIEW = 'TOGGLE_SEARCH_VIEW'

export function setUser (user) {
  return {
    type: SET_USER,
    user
  }
}

export function setAccessToken (accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken
  }
}

export function setDeviceId (deviceId) {
  return {
    type: SET_DEVICE_ID,
    deviceId
  }
}

export function loading () {
  return {
    type: LOADING
  }
}

export function notLoading () {
  return {
    type: NOT_LOADING
  }
}

export function error (msg, header) {
  return {
    type: ERROR,
    msg,
    header,
  }
}

export function clearError () {
  return {
    type: CLEAR_ERROR
  }
}

export function refreshToken () {
  return {
    type: REFRESH_TOKEN
  }
}

export function toggleSearchView () {
  return {
    type: TOGGLE_SEARCH_VIEW
  }
}
