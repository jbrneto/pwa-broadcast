angular
  .module('app.userList')
    .component('userList',{
      templateUrl: 'user-list/user-list.template.html',
      controller: UserListController,
      controllerAs: 'userList'
});

UserListController.$inject = ['UsersService','WebSocketService'];
function UserListController(UsersService, WebSocketService){
  var userList = this;
  
  userList.users = [];
  userList.broadcastCount = 0;
  
  UsersService.getUsers().then(userListRequestManager);
  WebSocketService.on('users:change', userListRequestManager);
  WebSocketService.on('broadcast:message', newBroadcastMessage);
  WebSocketService.on('private:message', newPrivateMessage);
  
  function userListRequestManager(response){
    if(response.status >= 500){
      console.warn(response.error);
    }else if (response.status === 200){
      userList.users = response.data;
    }
  }
  
  function newBroadcastMessage(response) {
    if(response.status >= 500){
      console.warn(response.error);
    }else if (response.status === 200){
      userList.broadcastCount++;
    }
  }
  
  function newPrivateMessage(response) {
    if(response.status >= 500){
      console.warn(response.error);
    }else if (response.status === 200){
      for (var user in userList.users) {
        if (user._id == response.data._id_sender) {
          user.notReadCount++;
          break;
        }
      }
    }
  }
  
}