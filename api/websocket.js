'use strict';

module.exports = function(server){
  var io  = require('socket.io').listen(server),
      connectedClients = [];
  
  // Function to update user on in client side
  function usersChange(users){
    io.emit('users:change', users);
  }
  
  // Function to send to all users a broadcast message
  function broadCastMessage(message){
    io.emit('broadcast:message', message);
  }
  
  // Function to send a message for a specific user
  function sendPrivateMessage(client_id, message){
    connectedClients[client_id].emit('private:message', message);
  }
  
  // Function to assign a new name to a socket connection
  function resetClientId(old_id, new_id) {
    connectedClients[new_id] = connectedClients[old_id];
    delete connectedClients[old_id];
  }
  
  io.on('connection', function(socket){
    connectedClients[socket.id] = socket;
  });
  
  return {
    usersChange: usersChange,
    broadCastMessage: broadCastMessage,
    sendPrivateMessage: sendPrivateMessage,
    resetClientId: resetClientId
  }
}