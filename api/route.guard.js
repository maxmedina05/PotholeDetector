const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'MY_SUPER_SECRET_CODE';

router.use(function(req, res, next) {
  let authorization = req.headers['authorization'];
  console.log(authorization);
  if (authorization) {
    jwt.verify(authorization, SECRET, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'User not authorized'
    });
  }
});

module.exports = router;
