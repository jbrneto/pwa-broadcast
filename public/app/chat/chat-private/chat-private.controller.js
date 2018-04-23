angular
  .module('app.chat')
  .controller('ChatPrivateController', ChatPrivateController);

ChatMessagesController.$inject = ['userAuth'];
function ChatPrivateController(userAuth){
  console.log('aa');
}