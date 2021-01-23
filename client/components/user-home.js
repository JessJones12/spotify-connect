import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import spotify from '../store/spotify'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {
    email,
    spotifyUsername,
    spotifyId,
    spotifyProfileUrl,
    spotifyToken,
    spotifyHref
  } = props.user

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <h3>{spotifyUsername}</h3>
      <h3>{spotifyId}</h3>
      <h3>{spotifyProfileUrl}</h3>
      <h3>{spotifyToken}</h3>
      <h3>{spotifyHref}</h3>
      {props.spotify.recentlyPlayed.items.map(item => {
        return (
          <div key={item.played_at}>
            <img src={item.track.album.images[0].url} />
            <audio controls>
              <source src={item.track.preview_url} type="audio/ogg" />
              <source src={item.track.preview_url} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        )
      })}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    spotify: state.spotify
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
