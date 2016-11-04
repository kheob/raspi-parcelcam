/**
 * A Nodejs application that streams video from the raspi camera and exposes a REST api.
 *
 * Created by BaiChanKheo on 22/10/2016.
 */
'use strict';

// Dependencies
var express = require('express'); // http://expressjs.com/
var child_process = require('child_process');
var cors = require('cors'); // https://github.com/expressjs/cors

// Modules
require('./modules/camera');
require('./modules/database');

var app = express();

// Enable CORS
app.use(cors());

// Static server
app.use('/public', express.static(__dirname + '/public'));

// Routes
app.use('/photos', require('./routes/photos'));
app.use('/stream', require('./routes/stream'));
app.use('/devices', require('./routes/devices'));

// Start the server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});

// Start MJPG Streamer on port 8090
child_process.spawn('mjpg_streamer', ['-i', 'input_file.so -f stream -n stream.jpg', '-o', 'output_http.so -p 8090 -w stream']);