/**
 * Camera module that handles the functionality of the RPI camera.
 *
 * Created by BaiChanKheo on 23/10/2016.
 */
'use strict';

//  Dependencies
var child_process = require('child_process');
var Gpio = require('onoff').Gpio; // https://github.com/fivdi/onoff
var Photo = require('../models/photo');

// PIR sensor
var pir = new Gpio(18, 'in', 'rising');

// Watch the GPIO for a high value from the PIR sensor
// Adapted from http://thejackalofjavascript.com/rpi-pir-sensor-node-iot-intruder-alert/
pir.watch(function(err, value) {
    if (err) {
        pir.unexport();
    }

    // Movement is detected
    if (value == 1) {
        // Wait a random time between 1s and 2s, seems to help combat false positives
        setTimeout(function() {
            if (value == 1) {
                takePhoto();
            }
        }, Math.floor(Math.random() * 1000) + 1000);
    }
});

// Function that takes a photo and saves it
function takePhoto() {
    var date = new Date();
    var dateString = date.toISOString().replace(/[-T:.Z]/g, '');
    console.log('Movement detected: ' + date);
    // Take a screenshot (Adapted from https://github.com/girliemac/RPi-KittyCam)
    var filename = 'public/photos/' + dateString + '.jpg';
    var args = ['-w', '640', '-h', '480', '-o', filename, '-t', '20', '-q', '20'];
    var spawn = child_process.spawn('raspistill', args);
    spawn.on('exit', function(status) {
        console.log('Photo saved as: ' + filename + ' (Status: ' + status + ')');

        // Save the data into database
        Photo.create({date: date, location: '/' + filename});
    });
}