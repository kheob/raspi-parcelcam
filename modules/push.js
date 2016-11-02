/**
 * Handles push notification functionality.
 * Uses: https://github.com/node-apn/node-apn
 *
 * Created by BaiChanKheo on 2/11/2016.
 */
'use strict';

var apn = require('apn');

var service = new apn.Provider({
    cert: 'keys/cert.cer',
    key: 'keys/key.pem'
});

var users = [{
    name: 'Bai Chan',
    devices: ['e6d7df653655ebf0f1a55bb66b9cded02a30b99a']}
];

users.forEach(function(user) {
    var notification = new apn.Notification();
    notification.alert = 'Looks like you got a delivery!';

    // Send the notifcation to all the user's devices
    service.send(notification, user.devices).failed(function(result) {
        console.log('Failed: ' + result.length);
        console.log(result.failed);
    }).sent(function(result) {
        console.log('Sent: ' + result.length);
    });
});