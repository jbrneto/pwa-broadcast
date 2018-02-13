var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://jao:senha@ds135747.mlab.com:35747/meanstack';

var db = mongoose.connect(dbUrl)
  .then(function(){
    console.log('Mongo DB Connected!');
  })
  .catch(function(error){
    console.log('Error to Connect Mongo DB: '+error);
  });

// Close connection on terminal Ctrl+C
process.on('SIGINT', function() {
  db.disconnect();
});