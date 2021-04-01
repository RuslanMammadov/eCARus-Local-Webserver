var express = require('express');
const app = express()
var http = require('http');
var dgram = require('dgram');
var socketIO = require('socket.io');

var https = require('https')
var fs = require('fs')

const MC_IMITATOR_UDP_PORT = 7777;
const WEBSERVER_UDP_PORT = 8888;
const MC_IMITATOR_FRONTEND_PORT = 1000;
const FRONTEND_PATH = __dirname + '/frontend';

const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}

var udpServer = dgram.createSocket('udp4');

var frontendApp = express();
frontendApp.use(express.static(FRONTEND_PATH));

var httpFrontend = https.createServer(httpsOptions, frontendApp).listen(MC_IMITATOR_FRONTEND_PORT, () => { });
var io = socketIO(httpFrontend);

io.on('error', (err) => {
    console.log(`MC imitator server error:\n${err.stack}`);
    httpFrontend.close();
});

io.on('connection', (socket) => {
    console.log('MC imitator backend is connected to its frontend');
    socket.on('message', (msg) => {
        if (typeof msg === "object") {
            msg = new Uint8Array(msg)
        }
        udpServer.send(msg, WEBSERVER_UDP_PORT, "localhost");
    })
});

udpServer.on('error', (err) => {
    console.log(`MC imitator server error:\n${err.stack}`);
    udpServer.close();
});

udpServer.on('message', (msgAsBuffer) => {
    let byteArray = [];
    byteArray.push(...msgAsBuffer);
    
    console.log("MC: message from backend:", msgAsBuffer);

    io.emit('message', byteArray);
});

udpServer.on('listening', () => {
    const addressInfo = udpServer.address();
    console.log(`MC imitator backend listening ${addressInfo.address}:${addressInfo.port}`);
});

udpServer.bind(MC_IMITATOR_UDP_PORT, "localhost");