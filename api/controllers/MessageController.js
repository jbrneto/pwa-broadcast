'use strict';

var mongoose = require('mongoose');
require('../models/MessageSchema');
var User = mongoose.model('Message');

exports.getConversations = getConversations;
exports.getBroadcastMessages = getBroadcastMessages;
exports.saveBroadcastMessage = saveBroadcastMessage;
exports.getConversationMessages = getConversationMessages;
exports.saveConversationMessage = saveConversationMessage;

function getConversations(){
  
}
function getBroadcastMessages(){
  
}
function saveBroadcastMessage(){
  
}
function getConversationMessages(){
  
}
function saveConversationMessage(){
  
}