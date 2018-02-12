var express     = require('express');
var bodyParser  = require('body-parser');

var app     = express();
var router  = express.Router();
var port    = process.env.PORT || 8080;

// API requests
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use('/api', bodyParser.json());
require('./api/routes')(router);
app.use('/api', router);

// Static files requests
app.use(express.static('./public/app'));

// Starts UNIX socket
app.listen(port);