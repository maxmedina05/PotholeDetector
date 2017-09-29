var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sa1234',
  database : 'pothole_db'
});

connection.connect();
connection.query('SELECT * FROM USER', (error, results, _) => {
  if (error) throw error;
  console.log('The results is: ', results[0].name);
});

connection.end();

db.restaurants.find({ location:
   { $geoWithin:
      { $centerSphere: [ [ -73.93414657, 40.82302903 ], 0.5 / 3963.2 ] } } })
