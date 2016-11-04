/**
 * MongoDB model for the device tokens.
 *
 * Created by BaiChanKheo on 4/11/2016.
 */
'use strict';

var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    token: String
});
var model = mongoose.model('Device', schema);

module.exports = model;