'use strict';

var express     = require('express'),
    bodyParser  = require('body-parser');

var app     = express(),
    router  = require('./api/routes')(express.Router()),
    port    = process.env.PORT || 8080;

// API requests
app.use('/api', 
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    router);

// Static files requests
app.use(express.static('./public/app'));

// Open DB Connection
require('api/ConnectionBD');

// Starts UNIX socket
app.listen(port);