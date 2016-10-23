/**
 * Camera module that handles the functionality of the RPI camera.
 *
 * Created by BaiChanKheo on 23/10/2016.
 */

//  Dependencies
// var RaspiCam = require('raspicam'); // https://github.com/troyth/node-raspicam
var Gpio = require('onoff').Gpio; // https://github.com/fivdi/onoff
var child_process = require('child_process');

// Configuration
// var cam = new RaspiCam({
//     mode: 'photo',
//     output: './public/photo/image.jpg',
//     encoding: 'jpg',
//     timeout: 0
// });
var pir = new Gpio(4, 'in', 'both'); // PIR sensor

// Watch the GPIO for a high value from the PIR sensor
// Adapted from http://thejackalofjavascript.com/rpi-pir-sensor-node-iot-intruder-alert/
pir.watch(function(err, value) {
    if (err) {
        pir.unexport();
    }

    // Movement is detected
    if (value == 1) {
        var date = (new Date()).toLocaleDateString();
        console.log('Movement detected: ' + date);
        // Take a screenshot (Adapted from https://github.com/girliemac/RPi-KittyCam)
        var filename = 'public/photo/' + date + '.jpg';
        var args = ['-w', '640', '-h', '480', '-o', filename, '-t', '5', '-q', '20'];
        var spawn = child_process.spawn('raspistill', args);
        spawn.on('exit', function(status) {
            console.log('Photo saved as: ' + filename + ' (Status: ' + status + ')');
        });
    }
});