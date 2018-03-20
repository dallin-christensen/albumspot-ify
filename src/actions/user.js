export const SET_USER = 'RECIEVE_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

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
