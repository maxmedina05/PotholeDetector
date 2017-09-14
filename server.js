require('dotenv').config();
const express                   = require('express');
const bodyParser                = require('body-parser');

const PORT                      = process.env.PORT || 5099;
const mongoose                  = require('mongoose');

const app                       = express();
const userModule                = require('./api/components/user/user.module');
const authModule                = require('./api/components/authentication/auth.module');

mongoose.Promise                = require('bluebird');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/v1/api', express.static(__dirname + '/public/docs'));

mongoose.connect(process.env.DB_CONN_STR, {
  useMongoClient: true
});

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.use('/users', userModule);
app.use('/auth', authModule);

app.listen(PORT, function() {
  console.log(`Pothole Detector API listening on port ${PORT}`);
});
