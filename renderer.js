// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var jQuery = require("jQuery");
var io = require('socket.io-client');

var serverUrl = 'http://localhost:8887';
var conn = io.connect(serverUrl);

/**
 * When send button is pressed send the input text value to the Brain
 */
jQuery("#send").on("click", function () {
    let message = jQuery("#textCommand").val();
    console.log(message);
    conn.emit('textCommand', message, function (resp, data) {
        console.log('server sent resp code ' + resp);
        if (resp === '200') {// Command succesfully received from server
            jQuery("#thumbUp").css("display", "inline-block");
        } else if (resp === '404')
            jQuery("#thumbDown").css("display", "inline-block");
    });
});