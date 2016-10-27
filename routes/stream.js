/**
 * Handles the streaming route.
 *
 * Created by BaiChanKheo on 27/10/2016.
 */
'use strict';

// Dependencies
var express = require('express');
var router = express.Router();
var child_process = require('child_process');

// Holds all processes (Source: http://stackoverflow.com/a/15834482/6601606)
var processes = [];

// Handles the camera live stream (?start=true and ?start=false query params)
router.get('/', function(req, res) {
    var start = req.query.start;

    if (start === 'true') {
        // Start the camera (Uses MJPG-Streamer adapted from: https://blog.miguelgrinberg.com/post/how-to-build-and-run-mjpg-streamer-on-the-raspberry-pi)
        var args = ['--nopreview', '-w', '320', '-h', '240', '-q', '5', '-o', 'stream/stream.jpg', '-tl', '100', '-t', '9999999', '-th', '0:0:0'];
        child_process.spawn('raspistill', args);

        // Wait a bit for the camera to get ready
        setInterval(function() {
            child_process.spawn('mjpg_streamer', ['-i', 'input_file.so -f stream -n stream.jpg', '-o', 'output_http.so -p 3000 -w stream']);
        }, 1000);

        res.send('Live camera started.');
    } else if (start === 'false') {
        // Stop the processes
        child_process.spawn('pkill', ['-f', 'raspistill']);
        child_process.spawn('pkill', ['-f', 'mjpg']);

        res.send('Live camera stopped.');
    }
});

module.exports = router;