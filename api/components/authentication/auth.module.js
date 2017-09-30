const express = require('express');
const passport = require('passport');
const authController = require('./auth.controller');
const router = express.Router();

/**
 * @swagger
 *  /auth/google:
 *   get:
 *     tags:
 *       - Authrization
 *     description: Use passport.authenticate() as route middleware to authenticate the request. The first step in Google authentication will involve redirecting the user to google.com.  After authorization, Google will redirect the user back to this application at /auth/google/callback
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: an access token
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['email']
  }));

  /**
   * @swagger
   *  /auth/google/callback:
   *   get:
   *     tags:
   *       - Authrization
   *     description: Use passport.authenticate() as route middleware to authenticate the request. The first step in Google authentication will involve redirecting the user to google.com.  After authorization, Google will redirect the user back to this application at /auth/google/callback
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: an access token
   *       default:
   *         description: Error
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/?access_token=' + req.user.token);
  });

module.exports = router;
