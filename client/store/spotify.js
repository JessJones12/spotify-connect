import axios from 'axios'
import history from '../history'
import {removeUser} from './user'
/**
 * ACTION TYPES
 */
const GET_RECENTLY_PLAYED = 'GET_RECENTLY_PLAYED'
const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS'
const REMOVE_RECOMMENDATIONS = 'REMOVE_RECOMMENDATIONS'

/**
 * INITIAL STATE
 */
const defaultSpotify = {
  recentlyPlayed: {items: []},
  clickedTrack: {},
  songsRecommended: []
}

/**
 * ACTION CREATORS
 */
const getRecentlyPlayed = data => ({type: GET_RECENTLY_PLAYED, data})

const getRecommendations = data => ({type: GET_RECOMMENDATIONS, data})

const removeRecommendedSongs = data => ({type: REMOVE_RECOMMENDATIONS, data})

/**
 * THUNK CREATORS
 */

export const removeRecommendations = id => dispatch => {
  try {
    dispatch(removeRecommendedSongs(id))
  } catch (error) {
    console.log('oh no, error!')
    dispatch(removeUser())
  }
}

export const fetchRecentlyPlayed = () => async dispatch => {
  try {
    const res = await axios.get('api/spotify/recently-played')
    dispatch(getRecentlyPlayed(res.data))
  } catch (err) {
    console.error(err)
    dispatch(removeUser())
  }
}

export const fetchRecommendations = track => async dispatch => {
  try {
    const res = await axios.get(
      `api/spotify/recommendations?track_id=${track.id}`
    )
    dispatch(
      getRecommendations({
        clickedTrack: track,
        recommendedSongs: res.data.tracks
      })
    )
  } catch (err) {
    console.error(err)
    dispatch(removeUser())
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
      return {
        ...state,
        clickedTrack: action.data.clickedTrack,
        songsRecommended: action.data.recommendedSongs
      }
    case REMOVE_RECOMMENDATIONS:
      return {...state, clickedTrack: {}, songsRecommended: []}
    default:
      return state
  }
}
