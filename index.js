#!/usr/bin/env node

/**************************************************************************
 Web server stuff
**************************************************************************/

var express = require('express')
var app = express();
const server_port = 3001

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));

app.listen(server_port, () => console.log(`App listening on port ${server_port}!`))

/**************************************************************************
 Serial port stuff
**************************************************************************/

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const SerialPort = require('serialport')
const sp = new SerialPort('/dev/ttyAMA0', {
    baudRate: 9600
})

const Readline = SerialPort.parsers.Readline;
const parser = sp.pipe(new Readline({
    delimiter: '\r\n'
}));

parser.on('data', function(data) {
    if (IsJsonString(data)) {
        var json_data = JSON.parse(data);
        console.log(json_data);
    }
})
