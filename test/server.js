/**
 * Created by BaiChanKheo on 26/10/2016.
 */
//
// Init
//

var http = require('http');
var mjpegServer = require('mjpeg-server');

//
// Init
//

var http = require('http');
var mjpegServer = require('mjpeg-server');

//
// HTTP Server
//

// Create a global variable so we can check of its existence later and kill the process
// when necessary.
var python;
http.createServer(function(req, res) {
    // Parse our incoming URL.
    var url = require('url').parse(req.url, true);

    // Start the stream.
    if (url.query.stream == "start") {
        if (python == undefined) {
            // Init the mjpeg-server.
            reqHandler = mjpegServer.createReqHandler(req, res);

            python = process('python3', ['camera.py']);
            console.log('camera started.');

            // Because our JPEG's are flowing in chopped up, we must assemble them in an array.
            var i = 0;
            var bufArray = [];
            // We will undoubtedly have to drop some frames, so create a cache of our last good buffer.
            var lastGoodBuffer;
            python.stdout.on('data', function (data) {
                // If it's the very first time we receive data, throw the data in the array since
                // we know it will always start with JPEG header info.
                if (i == 0) {
                    bufArray.push(data);
                    i++;
                    // Read a few bytes and make sure they're our JPEG header info:
                    // ff d8 ff e0 00 10 4a 46 49 46 00 01 02 00 00 01 00 01 00 00 ff db 00 etc..
                } else if (data.readIntLE(0, 1).toString() == "-1" && data.readIntLE(1, 2).toString() == "-40") {
                    // If our buffer is longer than one, then we have a good frame. Else, we'll
                    // drop the frame and send our last good frame.
                    if (bufArray.length > 1) {
                        // Concatenate the buffers in the array.
                        var buf = Buffer.concat(bufArray);
                        // Update cache.
                        lastGoodBuffer = Buffer(buf);
                        // Send the frame!
                        reqHandler.update(buf);
                        // Start new array.
                        bufArray = [data];
                    } else {
                        // We had an invalid frame, start a new array.
                        bufArray = [data];
                        if (lastGoodBuffer != undefined) {
                            // Send our cached frame!
                            reqHandler.update(buf);
                        }
                    }
                    // Assembling the JPEG...
                } else {
                    bufArray.push(data);
                }
            });

            python.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
            });
        } else {

        }
    }

    // Stop the stream.
    if (url.query.stream == "stop") {
        if (python != undefined) {
            // Stop the process.
            python.kill();
            console.log('camera stopped.');
            python = undefined;
        }
    }
}).listen(8080);