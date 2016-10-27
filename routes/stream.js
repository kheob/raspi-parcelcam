/**
 * Handles the streaming route. Uses MJPG-Streamer (https://sourceforge.net/projects/mjpg-streamer/).
 *
 * Created by BaiChanKheo on 27/10/2016.
 */
'use strict';

// Dependencies
var express = require('express');
var router = express.Router();
var child_process = require('child_process');

// Handles the camera live stream (?start=true and ?start=false query params)
router.get('/', function(req, res) {
    var start = req.query.start;

    if (start === 'true') {
        // Start the camera (Uses MJPG-Streamer adapted from: https://blog.miguelgrinberg.com/post/how-to-build-and-run-mjpg-streamer-on-the-raspberry-pi)
        var args = ['--nopreview', '-w', '320', '-h', '240', '-q', '20', '-o', 'stream/stream.jpg', '-tl', '100', '-t', '9999999', '-th', '0:0:0'];
        child_process.spawn('raspistill', args);

        res.json({message: 'Live camera started.'});
    } else if (start === 'false') {
        // Stop the processes
        child_process.spawn('pkill', ['-f', 'raspistill']);

        res.json({message: 'Live camera stopped.'});
    }
});

module.exports = router;