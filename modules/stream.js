/**
 * Handles the camera live stream.
 *
 * Created by BaiChanKheo on 27/10/2016.
 */
'use strict';

var child_process = require('child_process');
var io = require('socket.io').listen(3000);

// Function that starts the Raspi Camera
function startCamera() {
    // Start the camera (Uses MJPG-Streamer adapted from: https://blog.miguelgrinberg.com/post/how-to-build-and-run-mjpg-streamer-on-the-raspberry-pi)
    var args = ['--nopreview', '-w', '320', '-h', '240', '-q', '20', '-o', 'stream/stream.jpg', '-tl', '100', '-t', '9999999', '-th', '0:0:0'];
    child_process.spawn('raspistill', args);
}

// Function that stops the Raspi Camera
function stopCamera() {
    // Stop the processes
    child_process.spawn('pkill', ['-f', 'raspistill']);
}