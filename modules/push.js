/**
 * Handles push notification functionality.
 * Uses: https://github.com/node-apn/node-apn
 *
 * Created by BaiChanKheo on 2/11/2016.
 */
'use strict';

var apn = require('apn');

var service = new apn.Provider({
    cert: 'certs/cert.pem',
    key: 'certs/key.pem'
});

// Get all devices and send a PN to each
var Device = require('../models/device');

Device.find({}, function(err, devices) {
    if (err) {
        return res.status(500).json({message: err.message});
    }

    var deviceIDs = [];

    devices.forEach(function(device) {
        deviceIDs.push(device.deviceID);
    });

    var notification = new apn.Notification();
    notification.alert = 'Looks like you\' got a new delivery!';

    // Send the notifcation to all the user's devices
    service.send(notification, deviceIDs).then( result => {
        console.log("sent:", result.sent.length);
        console.log("failed:", result.failed.length);
        console.log(result.failed);
    });
});