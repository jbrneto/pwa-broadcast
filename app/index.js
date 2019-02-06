'use strict';

var express     = require('express');
var app         = express(),
    port        = process.env.PORT || 8080;

app.use(express.static(__dirname + '/www/'));

// Starts UNIX socket
app.listen(port);