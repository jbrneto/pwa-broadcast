angular
  .module('app')
  .factory('WebSocketService', WebSocketService);

function WebSocketService(){
  var socket = io(),
      socket_id = null;
  
  var socket_promise = new Promise(function(resolve, reject){
    socket.on('connect', function(){
      socket_id = socket.id;
      resolve(socket_id);
    });
  });
  
  return {
    getSocketId: function (callback) {
      return socket_promise.then(callback);
    },
    on: function (eventName, callback) {
      socket.on(eventName, callback);
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, callback);
    }
  };
}