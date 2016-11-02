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
    service.send(notification, user.devices).then( result => {
        console.log("sent:", result.sent.length);
        console.log("failed:", result.failed.length);
        console.log(result.failed);
    });
});