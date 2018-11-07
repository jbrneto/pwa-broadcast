'use strict';

var mongoose = require('mongoose');
require('../models/MessageSchema');
var Message = mongoose.model('Message');

exports.getConversations = getConversations;
exports.getConversationMessages = getConversationMessages;
exports.saveConversationMessage = saveConversationMessage;
exports.sendBroadcastMessage = sendBroadcastMessage;

function getConversations(req, res, next){
  Message.aggregate([
    {
      $match: { 
        receiver: mongoose.Types.ObjectId(req.params.user_id)
      }
    },
    {
      $sort: { 'date': -1 }
    },
    {
      $group: 
        { 
          _id: '$sender',
          date: { $first: '$date' },
          message: { $first: '$message' }
        }
    },
    { $lookup: 
       {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'sender'
      }
    },
    {
      $unwind: '$sender'
    },
    {
      $project:
      {
        date: 1,
        message: 1,
        "sender._id": 1,
        "sender.name": 1
      }
    }])
  .exec(function(error, messages){
    dbResponseHandler(res, error, messages);
    next();
  });
}

function getConversationMessages(req, res, next){
  Message
    .aggregate()
    .match({
      sender: mongoose.Types.ObjectId(req.query.user1),
      receiver: mongoose.Types.ObjectId(req.query.user2)
    })
    .project({
      sender: 1,
      receiver: 1,
      message: 1,
      date: 1,
      isMine: { $eq: [ '$sender', req.query.user1 ] }
    })
    .exec(function(error, messages){
      dbResponseHandler(res, error, messages);
      next();
    });
}

function saveConversationMessage(req, res, next){
  var message = new Message(req.body);
  message.save(function(error, message){
    dbResponseHandler(res, error, message);
    next();
  });
}

function sendBroadcastMessage(req, res, next){
  dbResponseHandler(res, null, {});
  next();
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
      data: data
    }
  }
}