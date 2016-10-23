/**
 * Created by BaiChanKheo on 23/10/2016.
 */
'use strict'

const child_process = require('child_process');

// Johnny-Five for RPi
const raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({io: new raspi()});

var i = 0;

board.on('ready', function() {
    console.log('board is ready');

    // Create a new `motion` hardware instance.
    const motion = new five.Motion('P1-12'); //a PIR is wired on pin 7 (GPIO 4)

    // 'calibrated' occurs once at the beginning of a session
    motion.on('calibrated', function() {
        console.log('calibrated');
    });

    // Motion detected
    motion.on('motionstart', function() {
        console.log('motionstart');

        // Run raspistill command to take a photo with the camera module
        var filename = 'photo/image_.jpg';
        var args = ['-w', '320', '-h', '240', '-o', filename, '-t', '1'];
        var spawn = child_process.spawn('raspistill', args);

        spawn.on('exit', function(code) {
            console.log('A photo is saved as '+filename+ ' with exit code, ' + code);
            var timestamp = Date.now();
        });
    });

    // 'motionend' events
    motion.on('motionend', function() {
        console.log('motionend');
    });
});