import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_RECENTLY_PLAYED = 'GET_RECENTLY_PLAYED'

/**
 * INITIAL STATE
 */
const defaultSpotify = {
  recentlyPlayed: {items: []}
}

/**
 * ACTION CREATORS
 */
const getRecentlyPlayed = data => ({type: GET_RECENTLY_PLAYED, data})

/**
 * THUNK CREATORS
 */
export const fetchRecentlyPlayed = spotifyToken => async dispatch => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${spotifyToken}`
      }
    }
    const res = await axios.get(
      'https://api.spotify.com/v1/me/player/recently-played',
      config
    )
    dispatch(getRecentlyPlayed(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultSpotify, action) {
  switch (action.type) {
    case GET_RECENTLY_PLAYED:
      return {...state, recentlyPlayed: action.data}
    default:
      return state
  }
}
