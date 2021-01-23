import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_RECENTLY_PLAYED = 'GET_RECENTLY_PLAYED'
const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'

/**
 * INITIAL STATE
 */
const defaultSpotify = {
  recentlyPlayed: {items: []},
  selectedTrack: {}
}

/**
 * ACTION CREATORS
 */
const getRecentlyPlayed = data => ({type: GET_RECENTLY_PLAYED, data})

const getRecommendations = data => ({type: GET_RECOMMENDATIONS, data})

/**
 * THUNK CREATORS
 */
export const fetchRecentlyPlayed = () => async dispatch => {
  try {
    const res = await axios.get('api/spotify/recently-played')
    dispatch(getRecentlyPlayed(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchRecommendations = () => async dispatch => {
  try {
    const res = await axios.get('api/spotify/recommendations')
    dispatch(getRecommendations(res.data))
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
    case GET_RECOMMENDATIONS:
      return {...state, recommendationsPlayed: action.data}
    default:
      return state
  }
}
