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
var photoIndex = 0;

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
        var filename = 'public/photo/image' + photoIndex + '.jpg';
        var args = ['-w', '640', '-h', '480', '-o', filename, '-t', '0'];
        var spawn = child_process.spawn('raspistill', args);
        spawn.on('exit', function() {
            console.log('Photo saved as: ' + filename);
            photoIndex++;
        });
    }
});

// // Camera functions
// cam.on('start', function(err, timestamp) {
//     console.log('Photo started at ' + timestamp);
// });
//
// cam.on('read', function(err, timestamp, filename) {
//     console.log('Image captured with filename: ' + filename);
//     cam.stop();
// });
//
// module.exports.cam = cam;
// module.exports.pir = pir;