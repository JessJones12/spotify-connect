import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  Card,
  CardColumns,
  CardDeck,
  Container,
  Row,
  Col,
  Alert
} from 'react-bootstrap'
import {
  me,
  fetchRecentlyPlayed,
  fetchRecommendations,
  removeRecommendations
} from '../store'
import {Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)

    this.clickAlbum = this.clickAlbum.bind(this)
  }
  async clickAlbum(track) {
    await this.props.getRecommendations(track)
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
        {this.props.spotify.songsRecommended.length > 0 ? (
          <div className="recommendations">
            <Row className="justify-content-md-center">
              <h1 className="clickOnAlbum">
                Click on any album cover for song recommendations.<Badge variant="secondary">
                  New
                </Badge>{' '}
              </h1>
            </Row>{' '}
            🎸 Just for you, {spotifyUsername}! 🎸
            <Alert variant="success">
              Recommendations based on "{this.props.spotify.clickedTrack.name}"
              by {this.props.spotify.clickedTrack.artists[0].name}
            </Alert>
            <Row>
              <Button
                variant="outline-success"
                className="back-to-home"
                type="submit"
                onClick={() => {
                  this.props.removeRecommendedSongs()
                }}
              >
                Back to Recently Played 🎧
              </Button>
            </Row>
            <Row className="justify-content-md-center ">
              {this.props.spotify.songsRecommended.map(track => {
                return (
                  <Col
                    xs="auto"
                    sm="auto"
                    md="auto"
                    lg="auto"
                    xl="auto"
                    key={track.played_at}
                    style={{padding: '15px'}}
                  >
                    <Card style={{width: '25rem'}}>
                      <Card.Header className="titleOfTrack">
                        {track.album.artists[0].name}
                      </Card.Header>
                      <Card.Img
                        className="click-area"
                        src={track.album.images[1].url}
                        onClick={() => {
                          this.clickAlbum(track)
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="titleOfTrack">
                          {track.album.name}
                        </Card.Title>
                        <Card.Text className="titleOfTrack">
                          {track.name}
                        </Card.Text>
                        <audio controls>
                          <source src={track.preview_url} type="audio/ogg" />
                          <source src={track.preview_url} type="audio/mpeg" />
                          Your browser does not support the audio tag.
                        </audio>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">
                          Add to my Liked songs{' '}
                        </small>
                      </Card.Footer>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </div>
        ) : (
          <div>
            <Row className="justify-content-md-center">
              <h3 className="welcome">Welcome, {spotifyUsername}</h3>
            </Row>
            <Row className="justify-content-md-center">
              <h1 className="clickOnAlbum">
                Click on any album cover for song recommendations.<Badge variant="secondary">
                  New
                </Badge>{' '}
              </h1>
            </Row>
            <Row className="justify-content-md-center">
              <h6 className="recentlyPlayed">Your Recently Played Songs</h6>
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
                    <Card style={{width: '25rem'}}>
                      <Card.Header>{item.track.artists[0].name}</Card.Header>
                      <Card.Img
                        className="click-area"
                        onClick={() => {
                          this.clickAlbum(item.track)
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
    getRecommendations: track => {
      dispatch(fetchRecommendations(track))
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
