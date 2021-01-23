const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (token, refreshToken, expires_in, profile, done) => {
      console.log('expires', expires_in, 'profile', profile)
      const spotifyId = profile.id
      const spotifyUsername = profile.username
      const email = profile._json.email
      const spotifyProfileUrl = profile.profileUrl
      const spotifyToken = token
      const spotifyHref = profile._json.href
      const spotifyRefreshToken = refreshToken

      User.findOrCreate({
        where: {spotifyId},
        defaults: {
          email,
          spotifyUsername,
          spotifyId,
          spotifyProfileUrl,
          spotifyToken,
          spotifyHref,
          spotifyRefreshToken
        }
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: [
        'user-read-email',
        'user-read-private',
        'ugc-image-upload',
        'user-read-recently-played',
        'user-top-read',
        'user-read-playback-position',
        'user-read-playback-state',
        'user-read-currently-playing',
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-follow-read',
        'user-library-read'
      ],
      showDialog: true
    })
  )

  // router.get('/callback', async (req, res, next) => {
  //   try {
  //     // const users = await User.findAll({
  //     //   // explicitly select only the id and email fields - even though
  //     //   // users' passwords are encrypted, it won't help if we just
  //     //   // send everything to anyone who asks!
  //     //   attributes: ['id', 'email']
  //     // })
  //     res.json('ok')
  //   } catch (err) {
  //     next(err)
  //   }
  // })

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
