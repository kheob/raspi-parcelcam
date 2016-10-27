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

// Handles the camera live stream (?start=true and ?start=false query params)
router.get('/', function(req, res) {
    var start = req.params.start;

    if (start) {
        // Start the camera (Uses MJPG-Streamer adapted from: https://blog.miguelgrinberg.com/post/how-to-build-and-run-mjpg-streamer-on-the-raspberry-pi)
        var args = ['--nopreview', '-w', '320', '-h', '240', '-q', '5', '-o', 'stream/stream.jpg', '-tl', '100', '-t', '9999999', '-th', '0:0:0', '&'];
        var camera = child_process.spawn('raspistill', args);
        var liveStream = child_process.spawn('LD_LIBRARY_PATH=/usr/local/lib mjpg_streamer', ['-i', 'input_file.so -f /tmp/stream -n pic.jpg', '-o', 'output_http.so -w /usr/local/www']);
        res.send('start');
    } else {
        // Stop the camera
        res.send('stop');
    }
});

module.exports = router;