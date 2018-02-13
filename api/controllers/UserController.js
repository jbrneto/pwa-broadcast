'use strict';

var mongoose = require('mongoose');
require('../models/UserSchema');
var User = mongoose.model('User');

exports.getAll = getAll;
exports.getUser = getUser;
exports.saveUser = saveUser;
exports.editUser = editUser;
exports.removeUser = removeUser;

function getAll(req, res){
  User.find({})
  .then(function(users){
    res.statusCode = 200;
    res.send(users);
  })
  .catch(function(error){
    res.statusCode = 501;
    res.send('Failed to Get Users');
  });
}
function getUser(req, res){
  User.findOne({
    _id: req.id
  })
  .then(function(users){
    res.statusCode = 200;
    res.send(users);
  })
  .catch(function(error){
    res.statusCode = 501;
    res.send('Failed to Get Users');
  });
}
function saveUser(req, res){
  User.insertOne({
    name: req.name
  })
  .then(function(){
    res.statusCode = 200;
    res.send('User Created');
  })
  .catch(function(error){
    res.statusCode = 501;
    res.send('Failed to Created User');
  });
}
function editUser(req, res){
  
}
function removeUser(req, res){
  
}
