/**
 * A Nodejs application that streams video from the raspi camera and exposes a REST api.
 *
 * Created by BaiChanKheo on 22/10/2016.
 */
'use strict';

// Dependencies
var express = require('express'); // http://expressjs.com/
var fs = require('fs'); // Node file system object

// Modules
require('./modules/camera.js');

var app = express();

// Static server
app.use('/static', express.static(__dirname + '/public'));

// Routes
app.get('/latest', function(req, res) {

});

// Start the server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});

