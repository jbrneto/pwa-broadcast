var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://127.0.0.1:27017/test';
var db = null;

var openConection = function(){
  db = mongoose.connect(dbUrl, function(error){
    if(error){
      console.log('Error to Connect Mongo DB: '+error);
    }else{
      console.log('Mongo DB Connected!');
    }
  });
}

var closeConection = function(){
  if(db){
     db.disconnect();
  }
  mongoose.disconnect();
  console.log('Mongo DB Disconnected!\n');
}

// Close connection on terminal Ctrl+C
process.on('SIGINT', function() {
  closeConection();
  process.exit();
});

module.exports = {
  openConection: openConection,
  closeConection: closeConection
};