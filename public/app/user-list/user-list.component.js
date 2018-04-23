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
  
  userList.users = UsersService.getUsers().then(userListRequestManager);
  WebSocketService.on('users:change', userListRequestManager);
  
  function userListRequestManager(response){
    if(response.status >= 500){
      console.warn(response.error);
    }else if (response.status === 200){
      userList.users = response.data;
    }
  }
  
}