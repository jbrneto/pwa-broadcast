angular
  .module('app.userList')
    .component('userList',{
      templateUrl: 'user-list/user-list.template.html',
      controller: UserListController,
      controllerAs: 'userList'
});

UserListController.$inject = ['WebSocketService'];
function UserListController(WebSocketService){
  var userList = this;
  WebSocketService.on('users:change', function(users){
    userList.users = users;
  });
}