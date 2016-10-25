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
    const aest = 11;
    var date = new Date(req.params.date); // Start range
    date.setHours(date.getHours() - aest); // Account for locale
    var nextDay = new Date(req.params.date); // End range
    nextDay.setDate(date.getDate() + 1); // Get tomorrow's date (Source: http://stackoverflow.com/a/23081260/6601606)
    nextDay.setHours(nextDay.getHours() - aest);

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