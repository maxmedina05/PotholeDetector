require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const TIME_LIMIT = 6; // months
MongoClient.connect(process.env.DB_CONN_STR, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server');

  let timespan = new Date();
  timespan.setMonth(timespan.getMonth() - TIME_LIMIT);

  db.collection('streetdefects').update({
    updatedAt: {
      $lte: timespan
    }
  }, {
    $set: {
      deleted: true
    }
  }, {
    multi: true
  }, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log(result.result);
    }
    db.close();
  })
});
