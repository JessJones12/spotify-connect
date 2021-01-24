import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardColumns, CardDeck, Container, Row, Col} from 'react-bootstrap'
import {
  me,
  fetchRecentlyPlayed,
  fetchRecommendations,
  removeRecommendations
} from '../store'
import {Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)

    this.clickAlbum = this.clickAlbum.bind(this)
  }
  async clickAlbum(id) {
    await this.props.getRecommendations(id)
  }

  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.loadRecentlyPlayed()
  }

  render() {
    const {
      email,
      spotifyUsername,
      spotifyProfileUrl,
      spotifyHref
    } = this.props.user

    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <h3>Welcome, {spotifyUsername}</h3>
        </Row>
        {this.props.spotify.songsRecommended.length > 0 ? (
          <div>
            {' '}
            track selected
            <Button
              variant="outline-success"
              className="back-to-home"
              type="submit"
              onClick={() => {
                this.props.removeRecommendedSongs()
              }}
            >
              Back to Recently Played 🎧
            </Button>{' '}
          </div>
        ) : (
          <div>
            <Row className="justify-content-md-center">
              <h3>Check out your recently played songs!</h3>
            </Row>
            <Row className="justify-content-md-center ">
              {this.props.spotify.recentlyPlayed.items.map(item => {
                const date = new Date(item.played_at).toLocaleString('en-US')

                return (
                  <Col
                    xs="auto"
                    sm="auto"
                    md="auto"
                    lg="auto"
                    xl="auto"
                    key={item.played_at}
                    style={{padding: '15px'}}
                  >
                    <Card style={{maxWidth: '25rem'}}>
                      <Card.Header>{item.track.artists[0].name}</Card.Header>
                      <Card.Img
                        onClick={() => {
                          this.clickAlbum(item.track.id)
                        }}
                        variant="top"
                        src={item.track.album.images[0].url}
                      />
                      <Card.Body>
                        <Card.Title>{item.track.album.name}</Card.Title>
                        <Card.Text>{item.track.name}</Card.Text>
                        <audio controls>
                          <source
                            src={item.track.preview_url}
                            type="audio/ogg"
                          />
                          <source
                            src={item.track.preview_url}
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio tag.
                        </audio>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">
                          Listened to on {date}
                        </small>
                      </Card.Footer>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </div>
        )}
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    spotify: state.spotify,
    spotifyToken: state.user.spotifyToken
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me()),
    loadRecentlyPlayed: () => dispatch(fetchRecentlyPlayed()),
    getRecommendations: id => {
      dispatch(fetchRecommendations(id))
    },
    removeRecommendedSongs: id => {
      dispatch(removeRecommendations(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
