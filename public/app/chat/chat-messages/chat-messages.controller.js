angular
  .module('app.chat')
  .controller('ChatMessagesController', ChatMessagesController);

ChatMessagesController.$inject = ['userAuth'];
function ChatMessagesController(userAuth){
  console.log(userAuth);
}