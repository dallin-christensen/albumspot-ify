export const SET_USER = 'RECIEVE_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export const SET_DEVICE_ID = 'SET_DEVICE_ID'
export const LOADING = 'LOADING'
export const NOT_LOADING = 'NOT_LOADING'

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
