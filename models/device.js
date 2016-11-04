/**
 * MongoDB model for the device IDs.
 *
 * Created by BaiChanKheo on 4/11/2016.
 */
'use strict';

var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    deviceID: String
});
var model = mongoose.model('Device', schema);

module.exports = model;