/**
 * Camera module that handles the functionality of the RPI camera.
 *
 * Created by BaiChanKheo on 23/10/2016.
 */

//  Dependencies
var RaspiCam = require('raspicam'); // https://github.com/troyth/node-raspicam
var Gpio = require('onoff').Gpio; // https://github.com/fivdi/onoff

// Configuration
var cam = new RaspiCam({
    mode: 'photo',
    output: './public/photo/image.jpg',
    encoding: 'jpg',
    timeout: 0
});
var pir = new Gpio(4, 'in', 'both'); // PIR sensor

// Watch the GPIO for a high value from the PIR sensor
// Adapted from http://thejackalofjavascript.com/rpi-pir-sensor-node-iot-intruder-alert/
pir.watch(function(err, value) {
    if (err) {
        pir.unexport();
    }

    // Movement is detected
    if (value == 1) {
        console.log('Movement detected: ' + new Date());
        // Take a screenshot
        cam.start();
    }

    // No movement
    if (value == 0) {
        console.log('Movement stopped: ' + new Date());
        // Take a screenshot
        cam.stop();
    }
});

// Camera functions
cam.on('start', function(err, timestamp) {
    console.log('Photo started at ' + timestamp);
});

cam.on('read', function(err, timestamp, filename) {
    console.log('Image captured with filename: ' + filename);
});

module.exports.cam = cam;
module.exports.pir = pir;