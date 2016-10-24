/**
 * Camera module that handles the functionality of the RPI camera.
 *
 * Created by BaiChanKheo on 23/10/2016.
 */

//  Dependencies
var child_process = require('child_process');
var gpio = require('rpi-gpio'); // https://github.com/JamesBarwell/rpi-gpio.js

// Listen for changes on the PIR pin
var pir = 12;
gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' is now ' + value + ' (' + new Date() + ")");
});
gpio.setup(pir, gpio.DIR_IN, gpio.EDGE_BOTH);

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