angular
  .module('app.chat')
  .controller('ChatPrivateController', ChatPrivateController);

ChatMessagesController.$inject = ['userAuth', '$stateParams', '$state'];
function ChatPrivateController(userAuth, $stateParams, $state){
  if(!$stateParams.id_user){
    $state.go('chat.messages');
  }else{
    
  }
}