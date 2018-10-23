angular
  .module('app.chat')
  .controller('ChatMessagesController', ChatMessagesController);

ChatMessagesController.$inject = ['userAuth','MessageService','WebSocketService'];
function ChatMessagesController(userAuth, MessageService, WebSocketService){
  var messages = this;
  
  messages.conversations = [];
  
  //WebSocketService.on('users:change', userListRequestManager);
  
  MessageService
    .getConversations(userAuth._id)
    .then(function(response){
    console.log(response.data);
      messages.conversations = response.data;
  });
}