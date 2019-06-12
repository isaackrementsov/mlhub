var express = require('express');
var app = express();
var ws = require('ws');
var http = require('http');
var server = http.createServer();
var wss = new ws.Server({noServer: true});

server.on('upgrade', function(request, socket, head) {
	wss.handleUpgrade(request, socket, head, function(ws) {
		wss.emit('connection', {server:ws, req:request})
	});
});
var connections = [];

wss.on('connection', function(conn) {

});
