'use strict';

module.exports = function(server){
  var io  = require('socket.io').listen(server);
  
  // Function to update user on in client side
  function usersChange(users){
    io.emit('users:change', users);
  }
  
  // Function to send to all users a broadcast message
  function broadCastMessage(message){
    io.emit('broadcast:message', message);
  }
  
  // Function to send a message for a specific user
  function sendPrivateMessage(session_id, message){
    io.clients[session_id].emit('private:message', message);
  }
  
  return {
    usersChange: usersChange,
    broadCastMessage: broadCastMessage,
    sendPrivateMessage: sendPrivateMessage
  }
}