angular
  .module('app.userList')
    .component('userList',{
      templateUrl: 'user-list/user-list.template.html',
      controller: UserListController,
      controllerAs: 'userList'
});

UserListController.$inject = ['UsersService'];
function UserListController(UsersService){
  this.users = UsersService.getUsers();
}