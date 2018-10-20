angular
  .module('app')
  .factory('MessageService', MessageService);

MessageService.$inject = ['$http'];
function MessageService($http){
  var service = {
      getConversations: getConversations,
      getConversationMessages: getConversationMessages,
      sendConversationMessage: sendConversationMessage,
      sendBroadcastMessage: sendBroadcastMessage
  };
  return service;
  
  function getConversations(id_user){
    return $http({
        method : "GET",
        url : `api/conversations/${id_user}`
    }).then(function(response) {
        if(response.status == 200){
           return response.data;
        }else{
           return new Error(response.data);
        } 
      
    }).catch(function(error) {
       return new Error(error);
    });
  }
  
  function getConversationMessages(id_user1, id_user2){
    return $http({
        method : "GET",
        url : `api/messages?user1=${id_user1}&user2=${id_user2}`
    }).then(function(response) {
        if(response.status == 200){
           return response.data;
        }else{
           return new Error(response.data);
        }
    }).catch(function(error) {
       return new Error(error);
    });
  }
  
  function sendConversationMessage(message){
    return $http({
        method : "POST",
        url : "api/messages",
        data: JSON.stringify(message)
    }).then(function(response) {
        return response;
      
    }).catch(function(error) {
       return error;
    });
  }
  
  function sendBroadcastMessage(message){
    return $http({
        method : "POST",
        url : "api/broadcast",
        data: JSON.stringify(message)
    }).then(function(response) {
        return response;
      
    }).catch(function(error) {
       return error;
    });
  }
  
}