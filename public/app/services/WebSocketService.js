angular
  .module('app')
  .factory('WebSocketService', WebSocketService);

WebSocketService.$inject = ['$rootScope'];
function WebSocketService($rootScope){
  var socket = io();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, callback);
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, callback);
    }
  };
}