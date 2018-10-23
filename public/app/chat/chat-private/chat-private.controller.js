angular
  .module('app.chat')
  .controller('ChatPrivateController', ChatPrivateController);

ChatPrivateController.$inject = ['userAuth', '$state', '$stateParams', 'MessageService','WebSocketService'];
function ChatPrivateController(userAuth, $state, $stateParams, MessageService, WebSocketService){
  var private = this;
  private.messages = [];
  private.submited = false;
  private.error = false;
  private.offline = false;
  
  if(!$stateParams.id_user){
    $state.go('chat.messages');
  }else{
    
    MessageService
      .getConversationMessages(userAuth._id, $stateParams.id_user)
      .then(function(response){
        if(response.status >= 500){
          console.warn(response.error);
        }else if (response.status === 200){
          private.messages = response.data;
        }
      });
    
    private.submit = function(form){
      if(form.$invalid){
         return;
      }
      
      private.submited = true;
      private.error = false;
      private.offline = false;
      
      var messageObj = {
        sender: userAuth._id, 
        receiver: $stateParams.id_user,
        message: private.message,
        date: new Date().toString()
      };
      
      
      MessageService
        .sendConversationMessage(messageObj)
        .then(function(response){
          private.submited = false;

          if(response.status >= 500){
            console.warn(response.error);
            private.error = true;  
          }else if (response.status === 200){
            private.message = "";
            private.messages.push(messageObj);
          }
        })
        .catch(function(error){
          private.submited = false;
          private.error = true;
        });
    }    
  }
}