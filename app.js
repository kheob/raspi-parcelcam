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
require('./modules/camera');
require('./modules/database');

// Model for the photo object
var Photo = require('./models/photo');

var app = express();

// Static server
app.use('/public', express.static(__dirname + '/public'));

// Routes

// Returns all images in the database
app.get('/photos', function(req, res) {
    Photo.find({}, function(err, photos) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({photos: photos});
    });
});

// Start the server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});

