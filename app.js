/**
 * A Nodejs application that streams video from the raspi camera and exposes a REST api.
 *
 * Created by BaiChanKheo on 22/10/2016.
 */
'use strict';

// Dependencies
var express = require('express'); // http://expressjs.com/
var child_process = require('child_process');

// Modules
require('./modules/camera');
require('./modules/database');

var app = express();

// Static server
app.use('/public', express.static(__dirname + '/public'));

// Routes
app.use('/photos', require('./routes/photos'));
app.use('/stream', require('./routes/stream'));

// Enable CORS (Source: http://jonathanmh.com/how-to-enable-cors-in-express-js-node-js/)
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Start the server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});

// Start MJPG Streamer on port 8090
child_process.spawn('mjpg_streamer', ['-i', 'input_file.so -f stream -n stream.jpg', '-o', 'output_http.so -p 8090 -w stream']);