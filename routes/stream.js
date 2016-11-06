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
        var args = ['--nopreview', '-w', '320', '-h', '480', '-q', '50', '-o', 'stream/stream.jpg', '-tl', '100', '-t', '9999999', '-th', '0:0:0'];
        child_process.spawn('raspistill', args);

        res.json({message: 'Live camera started. Motion detection will be disabled until you stop the live camera.'});
    } else if (start === 'false') {
        // Stop the processes
        child_process.spawn('pkill', ['-f', 'raspistill']);

        res.json({message: 'Live camera stopped. Motion detection resumed.'});
    }
});

// Get status of the MJPG streamer process
router.get('/status', function(req, res) {
    var child = child_process.spawn('pgrep', ['mjpg_streamer']);
    child.stdout.on('data', function(data) {
        // Online if data received
        res.json({message: "Stream online."});
    });
    child.on('exit', function() {
        res.json({error: "Stream offline."});
    });
});

module.exports = router;