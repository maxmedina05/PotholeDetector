require('dotenv').config();
const express                   = require('express');
const bodyParser                = require('body-parser');

const PORT                      = process.env.PORT || 5099;
const app                       = express();

const userModule                = require('./api/components/user/user.module');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/v1/api', express.static(__dirname + '/public/docs'));

app.get('/', function(req, res) {
  res.send('Hello World');
});

userModule(app);

app.listen(PORT, function() {
  console.log(`Pothole Detector API listening on port ${PORT}`);
});
