/**
 * Push route for submitting device tokens.
 *
 * Created by BaiChanKheo on 4/11/2016.
 */
'use strict';

var express = require('express');
var router = express.Router();

// Model for the photo object
var Device = require('../models/device');

// Submit a device token
router.post('/', function(req, res) {
    // Get the token
    var token = req.body.token;

    // Add to database
    Device.create({token: token}, function(err) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        // Send response
        res.json({message: 'Success! Device added to push notifications.'})
    });
});

// Returns all device tokens
router.get('/', function(req, res) {
    Device.find({}, function(err, devices) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({devices: devices});
    });
    res.send('hi');
});

module.exports = router;