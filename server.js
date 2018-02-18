'use strict';

var express     = require('express'),
    bodyParser  = require('body-parser'),
    routes      = require('./api/routes'),
    connection  = require('./api/ConnectionDB');

var app         = express(),
    router      = express.Router(),
    port        = process.env.PORT || 8080;

// Starts UNIX socket
var server = app.listen(port);
var websocket   = require('./api/websocket')(server);

// API requests
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use('/api', bodyParser.json());
routes(router, websocket);
app.use('/api', router);

// Static files requests
app.use(express.static('./public/app'));

// Open DB Connection
connection.openConection();