/**
 * A Nodejs application that streams video from the raspi camera and exposes a REST api.
 *
 * Created by BaiChanKheo on 22/10/2016.
 */
'use strict';

// Dependencies
var express = require('express'); // http://expressjs.com/
var RaspiCam = require('raspicam'); // https://github.com/troyth/node-raspicam

var app = express();
var cam = new RaspiCam({
    mode: 'photo',
    output: './photo/image.jpg',
    encoding: 'jpg',
    timeout: 0
});

// Routes
app.get('/latest', function(req, res) {
    cam.start();
});

app.listen(3000, function() {
    console.log('Server started on port 3000');
});

// Camera
cam.on('start', function(err, timestamp) {
    console.log('Photo started at ' + timestamp);
});

cam.on('read', function(err, timestamp, filename) {
    console.log('Image captured with filename: ' + filename);
});

cam.on('exit', function(timestamp) {

});