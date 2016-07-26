// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var jQuery = require("jQuery");
var io = require('socket.io-client');

var serverUrl = 'http://localhost:8887';
var socketClient = io.connect(serverUrl);

/**
 * When send button is pressed send the input text value to the Brain
 */
jQuery("#send").on("click", function () {
    // Remove previously displayed thumb
    jQuery("#thumbUp").css("display", "none");
    jQuery("#thumbDown").css("display", "none");
    jQuery("#thumbHorizzontal").css("display", "none");

    socketClient.emit('textCommand', jQuery("#textCommand").val(), function (resp, data) {
        console.log('Server sent resp code:' + resp);// Good
        if (resp === 1) {// Command succesfully received from server
            console.log("Successfully executed");
            jQuery("#thumbUp").css("display", "inline-block");
        } else if (resp === 503) {
            console.log("Internal server error");
        } else if (resp === -1) {
            jQuery("#thumbHorizzontal").css("display", "inline-block");
            console.log("Parameter missing");
        } else if (resp === 0) {
            jQuery("#thumbDown").css("display", "inline-block");
            console.log("No command found");
        }
    });
});

/**
 * Socket.io server
 */
var fs = require('fs')
    , http = require('http')
    , socketServer = require('socket.io');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end("Server index page!");
}).listen(5678, function () {
    console.log('Listening at: http://localhost:5678');
});

socketServer.listen(server).on('connection', function (socket) {
    socket.on('command', function (msg) {
        jQuery("#jsonCommand").val(msg);
    });
});
