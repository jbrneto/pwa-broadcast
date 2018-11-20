angular
  .module('app.chat')
  .controller('ChatPrivateController', ChatPrivateController);

ChatPrivateController.$inject = [
  'userAuth', '$state', '$stateParams', '$timeout', 'MessageService','WebSocketService'
];
function ChatPrivateController(
  userAuth, $state, $stateParams, $timeout, MessageService, WebSocketService
){
  var private = this;
  private.messages = [];
  private.submited = false;
  private.error = false;
  private.offline = false;
  
  private.typedMessage = function(evt){
    if(evt.keyCode === 13 && !evt.altKey && !evt.ctrlKey && !evt.shiftKey){
       private.submit();
    }
  }
  
  private.submit = function(form){
    if(form && form.$invalid){
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
          messageObj.isMine = true;
          private.messages.push(messageObj);
          scrollDownChat();
        }
      })
      .catch(function(error){
        private.submited = false;
        private.error = true;
      });
  }
  
  WebSocketService.on('private:message', privateMassageManager);
  function privateMassageManager(response){
    if(response.status >= 500){
      console.warn(response.error);
    }else if (response.status === 200){
      private.messages.push(response.data);
      scrollDownChat();
    }
  }
  
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
          scrollDownChat();
        }
      });
  }
  
  function scrollDownChat(){
    $timeout(function(){
      var el = document.querySelector('form[name=privateForm] > div');
      el.scrollTo(0, el.scrollHeight);
    }, 0, false);
  }
}