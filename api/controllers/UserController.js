'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
require('../models/UserSchema');
var User = mongoose.model('User');

exports._getAll = _getAll; // Get all users without manipulate response
exports.getAll = getAll;
exports.getUser = getUser;
exports.getUserLogin = getUserLogin;
exports.saveUser = saveUser;
exports.editUser = editUser;
exports.removeUser = removeUser;

// Util function to Fetch all users
function __getAll(callback){
  User.find({}, callback);
}

function _getAll(callback){
  __getAll(function(error, users){
    var res = {};
    dbResponseHandler(res, error, users);
    callback(res.locals.resobj.response);
   });
}

function getAll(req, res, next){
  __getAll(function(error, users){
    dbResponseHandler(res, error, users);
    next();
  });
}

function getUser(req, res, next){
  User.findById(
    req.params.user_id,
  function(error, user){
    dbResponseHandler(res, error, user);
    next();
  });
}

function getUserLogin(req, res, next){
  User.findOne({
    email: req.query.email,
    password: _encrypt(req.query.password)
  },function(error, user){
    dbResponseHandler(res, error, user);
    next();
  });
}

function saveUser(req, res, next){
  var user = new User(req.body);
  user.password = _encrypt(user.password);
  user.save(function(error, user){
    dbResponseHandler(res, error, user);
    next();
  });
}

function editUser(req, res, next){
  
  var updateObj = {
    name: req.body.name,
    email: req.body.email,
  };
  
  if(req.body.password){
     updateObj.password = _encrypt(req.body.password);
  }
  
  User.findByIdAndUpdate(
    req.params.user_id, updateObj, {new: true},
  function(error, user){
    dbResponseHandler(res, error, user);
    next();
  });
}

function removeUser(req, res, next){
  User.findByIdAndRemove(
    req.params.user_id, 
  function(error, user) {
    dbResponseHandler(res, error, user);
    next();
  });
}

// Response handler
function dbResponseHandler(res, error, data){
  var internalStatus = 200;
  
  if(error){
     internalStatus = 501;
  }else{
     if(Array.isArray(data)){
       if(data.length === 0) internalStatus = 204;
    }else{
       if(!data) internalStatus = 204;
    }
  }
      
  res.locals.resobj = {
    status: 200,
    response: {
      status: internalStatus,
      error: error,
      data: clearSensitiveData(data)
    }
  }
}

// Clear Sensitive data
function clearSensitiveData(data){
  if(!data){
    data = {};
  }else{
    if(!Array.isArray(data)){
      delete data.password;
    }else{
      for(var i=0; i< data.length; i++) delete data[i].password;
    }
  }
  return data;
}

// MD5 Encrypt
function _encrypt(data){
 return crypto.createHash('md5').update(data).digest("hex"); 
}
