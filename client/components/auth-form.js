import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Carousel from 'react-bootstrap/Carousel'
import {Button, Row, Col} from 'react-bootstrap'
import FigureImage from 'react-bootstrap/FigureImage'
import Figure from 'react-bootstrap/Figure'

/**
 * COMPONENT
 *
 *
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <div>
      <Row className="justify-content-md-center ">
        <Col>
          <h2 className="mainTitle"> Welcome to Spotify Connect</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center ">
        <Col>
          <h2 className="subTitle">
            Pick any song from your Recently Played and get top new
            recommendations based on the music you love.
          </h2>
        </Col>
      </Row>

      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner1.png"
            alt="First slide"
            height="400px"
          />
          <Carousel.Caption>
            <h3>Connect</h3>
            <p>New music. Anytime. Anywhere.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner2.png"
            alt="Second slide"
            height="400px"
          />

          <Carousel.Caption>
            <h3>Explore recommendations</h3>
            <p>Top tracks & more </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner3.png"
            alt="Third slide"
            height="400px"
          />

          <Carousel.Caption>
            <h3>Personalize the music you love </h3>
            <p>Create the soundtrack of your life.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Button variant="primary" size="lg" block>
        <a className="login" href="/auth/spotify">
          {' '}
          Login with Spotify
        </a>
      </Button>
      <Row className="justify-content-md-center ">
        <Col>
          <div className="subTitle">A new way to stay connected.</div>
        </Col>
      </Row>
      <Figure>
        <Figure.Image width="100%" src="images/extra.png" />
        <Figure.Caption>
          Nulla vitae elit libero, a pharetra augue mollis interdum.
        </Figure.Caption>
      </Figure>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
