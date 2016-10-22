/**
 * A Nodejs application that streams video from the raspi camera and exposes a REST api.
 *
 * Created by BaiChanKheo on 22/10/2016.
 */
'use strict';

// Dependencies
var express = require('express'); // http://expressjs.com/
var RaspiCam = require('raspicam'); // https://github.com/troyth/node-raspicam
var fs = require('fs'); // Node file system object

var app = express();
var cam = new RaspiCam({
    mode: 'photo',
    output: './public/photo/image.jpg',
    encoding: 'jpg',
    timeout: 0
});

// Static server
app.use('/static', express.static(__dirname + '/public'));

// Routes
app.get('/latest', function(req, res) {
    takePhoto(res);
});

// Start the server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});

// Camera
cam.on('start', function(err, timestamp) {
    console.log('Photo started at ' + timestamp);
});

// Starts the camera, takes a photo, and returns
function takePhoto(res) {
    cam.start();

    // Write file
    cam.on('read', function(err, timestamp, filename) {
        console.log('Image captured with filename: ' + filename);
        cam.stop();

        // Get the image and serve
        res.send('public/photo/image.jpg');
    });
}