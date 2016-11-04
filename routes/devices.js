/**
 * Push route for submitting device IDs.
 *
 * Created by BaiChanKheo on 4/11/2016.
 */
'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); // https://github.com/expressjs/body-parser

// Model for the photo object
var Device = require('../models/device');

// Submit a device ID
router.post('/', bodyParser.json(), function(req, res) {
    // Get the ID
    var id = req.body.deviceID;

    // Add to database
    Device.create({deviceID: id}, function(err) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        // Send response
        res.json({message: 'Success! Device added to push notifications.'})
    });
});

// Returns all device IDs
router.get('/', function(req, res) {
    Device.find({}, function(err, devices) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({devices: devices});
    });
});

module.exports = router;