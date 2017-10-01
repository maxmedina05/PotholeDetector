process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

function errorHandler(err, req, res, next) {
  console.log('************************************** ERROR HANDLER ***********************************************');
  console.log(err);
  if (err.status === 404) {
    return res.send('NOT FOUND!');
  }

  if(err.status === 400) {
    return res.status(400).json(err);
  }

  return res.status(500).send(err);
}

module.exports = errorHandler;
