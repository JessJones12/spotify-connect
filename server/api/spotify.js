const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')

module.exports = router

const refreshToken = async (req, res, next) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  let user = req.user
  try {
    const spotifyResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'refresh_token',
        refresh_token: user.spotifyRefreshToken,
        client_id: process.env.CLIENT_ID
      },
      config
    )

    user.spotifyRefreshToken = spotifyResponse.refresh_token
    user.spotifyToken = spotifyResponse.access_token
    await user.save()

    next()
  } catch (err) {
    console.log(err.response)
    res.send(err)
  }
}

router.get('/recently-played', async (req, res, next) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${req.user.spotifyToken}`
      }
    }

    const spotifyResponse = await axios.get(
      'https://api.spotify.com/v1/me/player/recently-played?limit=50',
      config
    )
    res.send(spotifyResponse.data)
  } catch (err) {
    next(err)
  }
})

router.get('/recommendations', async (req, res, next) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${req.user.spotifyToken}`
      }
    }

    const spotifyResponse = await axios.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${id}`,
      config
    )
    res.send(spotifyResponse.data)
  } catch (err) {
    next(err)
  }
})
