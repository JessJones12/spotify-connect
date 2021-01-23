import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar, Nav} from 'react-bootstrap'

const Navigationbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Spotify Connect</Navbar.Brand>
      <Nav className="mr-auto">
        {isLoggedIn ? (
          <>
            {/* The navbar will show these links after you log in */}
            <Nav.Link to="home">Home</Nav.Link>
            <Nav.Link href="#" onClick={handleClick}>
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
            <Nav.Link to="/login">Login</Nav.Link>
            <Nav.Link to="/signup">Sign Up</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navigationbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
