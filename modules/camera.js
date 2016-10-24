/**
 * Camera module that handles the functionality of the RPI camera.
 *
 * Created by BaiChanKheo on 23/10/2016.
 */

//  Dependencies
var child_process = require('child_process');
var Gpio = require('onoff').Gpio; // https://github.com/fivdi/onoff

// PIR sensor
var pir = new Gpio(18, 'in', 'both');

// Watch the GPIO for a high value from the PIR sensor
// Adapted from http://thejackalofjavascript.com/rpi-pir-sensor-node-iot-intruder-alert/
var previousValue = 0;

pir.watch(function(err, value) {
    if (err) {
        pir.unexport();
    }

    // Movement is detected
    if (value == 1) {
        if (previousValue == 0) {
            previousValue = 1;
        } else {
            takePhoto();
            previousValue = 0;
        }
    } else {
        previousValue = 0;
    }
});

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