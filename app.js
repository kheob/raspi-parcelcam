/**
 * A Nodejs application that streams video from the raspi camera and exposes a REST api.
 *
 * Created by BaiChanKheo on 22/10/2016.
 */
'use strict';

// Dependencies
var express = require('express'); // http://expressjs.com/

// Modules
require('./modules/camera');
require('./modules/database');

var app = express();

// Static server
app.use('/public', express.static(__dirname + '/public'));

// Routes
app.use('/photos', require('./routes/photos'));

// Start the server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});