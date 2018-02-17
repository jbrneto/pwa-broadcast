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
  User.find({},function(error, users){
    if(error){
       res.statusCode = 501;
      res.send(error);
    }else{
      res.statusCode = 200;
      res.json(users);
    }
  });
}
function getUser(req, res){
  User.findById(
    req.params.user_id,
  function(error, user){
    if(error){
      res.statusCode = 501;
      res.send(error);
    }else{
      res.statusCode = 200;
      res.json(user);
    }
  });
}
function saveUser(req, res){
  var user = new User(req.body);
  user.save(function(error, user){
    if(error){
      res.statusCode = 501;
      res.send(error);
    }else{
      res.statusCode = 200;
      res.json(user);
    }
  });
}
function editUser(req, res){
  User.findByIdAndUpdate(
    req.params.user_id,
    req.body,
  function(error, user){
    if(error){
      res.statusCode = 501;
      res.send(error);
    }else{
      res.statusCode = 200;
      res.json(user);
    }
  });
}
function removeUser(req, res){
  User.findByIdAndRemove(
    req.params.user_id, 
  function(error, user) {
    if(error){
      res.statusCode = 501;
      res.send(error);
    }else{
      res.statusCode = 200;
      res.json(user);
    }
  });
}
