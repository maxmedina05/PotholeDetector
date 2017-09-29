const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/test';

router.route('/').get(function(req, res) {

    MongoClient.connect(url, function(err, db) {
        var METERS_PER_MILE = 1609.34;
        db.collection('restaurants').find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [-73.937875, 40.8234522]
                    },
                    $maxDistance: 100
                }
            }
        }).toArray(function(err, data) {
            console.log('restaurants: ', data.length);
            res.json(data);
        })

    });
});

module.exports = router;
