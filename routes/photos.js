/**
 * Handles all the routing of photos and subroutes.
 *
 * Created by BaiChanKheo on 25/10/2016.
 */
'use strict';

var express = require('express');
var router = express.Router();

// Model for the photo object
var Photo = require('../models/photo');

// Returns all images in the database
router.get('/', function(req, res) {
    Photo.find({}, function(err, photos) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({photos: photos});
    });
});

// Returns images for a particular date (format: YYYY-MM-DD)
router.get('/:date', function(req, res) {
    var date = new Date(req.params.date); // Start range
    var nextDay = date.getDate() + 1; // End range

    console.log(date.toUTCString());
    console.log(nextDay.toUTCString());

    // Find the photos in that date range
    Photo.find({date: {
        "$gte": date,
        "$lt": nextDay
    }}, function(err, photos) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({photos: photos});
    });
});

module.exports = router;