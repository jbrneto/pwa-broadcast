'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Message', MessageSchema);