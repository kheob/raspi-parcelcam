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
    var endOfDay = new Date(req.params.date); // End range

    date = new Date().setHours(0,0,0,0);
    endOfDay = new Date().setHours(23,59,59,999);

    // endOfDay.setHours(23,59,59,999); // Source: http://stackoverflow.com/a/8636674/6601606

    // Find the photos in that date range
    Photo.find({date: {
        "$gte": date,
        "$lt": endOfDay
    }}, function(err, photos) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({photos: photos});
    });
});

module.exports = router;