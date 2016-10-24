/**
 * Database model for each photo.
 *
 * Created by BaiChanKheo on 24/10/2016.
 */
'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date: Date,
    filename: String
});

var model = mongoose.model('Photo', schema);

module.exports = model;