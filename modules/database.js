/**
 * Contains all database interactions.
 * Base on www.teamtreehouse.com course.
 *
 * Created by BaiChanKheo on 24/10/2016.
 */
'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/parcelcam', function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Database connection to MongoDB');
    }
});