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

// Returns images for a particular date
router.get('/:date', function(req, res) {
    var date = Date.parse(req.params.date);
    console.log(date);
    res.json({date: date});
});

module.exports = router;