/**
 * Camera module that handles the functionality of the RPI camera.
 *
 * Created by BaiChanKheo on 23/10/2016.
 */

//  Dependencies
var child_process = require('child_process');
var gpio = require('rpi-gpio'); // https://github.com/JamesBarwell/rpi-gpio.js

// Listen for changes on the PIR pin
// Adapted from: https://medium.com/@brandonaaskov/raspberry-pi-javascript-motion-sensor-9dab542b0c38#.coditw47o
var pir = {
    pin: 12,
    loop: 2000,
    triggered: false,
    value: undefined
};
var readInterval = function() {
    gpio.read(pir.pin, function(error, value) {
        if (value === pir.triggered) {
            // Don't do anything if the value hasn't changed
            return;
        }

        // Set the triggered value to the new value if changed
        pir.triggered = value;

        // Do something if the PIR is triggered
        if (pir.triggered) {
            takePhoto();
        } else {
            console.log('No movement detected.');
        }
    });
};

// Setup
gpio.setMode(gpio.MODE_RPI);
gpio.setup(pir.pin, gpio.DIR_IN, function(error) {
    if (error) {
        console.error(error);
    }
    return setInterval(readInterval, pir.loop);
});

// var Gpio = require('onoff').Gpio; // https://github.com/fivdi/onoff
//
//
// var pir = new Gpio(4, 'in', 'both'); // PIR sensor
//
// // Watch the GPIO for a high value from the PIR sensor
// // Adapted from http://thejackalofjavascript.com/rpi-pir-sensor-node-iot-intruder-alert/
// pir.watch(function(err, value) {
//     if (err) {
//         pir.unexport();
//     }
//
//     // Movement is detected
//     if (value == 1) {
//         takePhoto();
//     }
// });

// Function that takes a photo and saves it
function takePhoto() {
    var date = new Date();
    var dateString = date.toISOString().replace(/[-T:.Z]/g, '');
    console.log('Movement detected: ' + date);
    // Take a screenshot (Adapted from https://github.com/girliemac/RPi-KittyCam)
    var filename = 'public/photo/' + dateString + '.jpg';
    var args = ['-w', '640', '-h', '480', '-o', filename, '-t', '20', '-q', '20'];
    var spawn = child_process.spawn('raspistill', args);
    spawn.on('exit', function(status) {
        console.log('Photo saved as: ' + filename + ' (Status: ' + status + ')');
    });
}