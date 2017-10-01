const express                                 = require('express');
const router                                  = express.Router();

router.route('*').get(function(req, res, next) {
  let err = new Error();
  err.status = 404;
  err.message = 'Page was not found!';

  res.status(err.status).json(err);
});

module.exports = router;
