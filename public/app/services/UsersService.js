angular
  .module('app')
  .factory('UsersService', UsersService);

UsersService.$inject = ['$http'];
function UsersService($http){
  var service = {
      getUsers: getUsers,
      addUser: addUser,
      editUser: editUser,
      removeUser: removeUser
  };
  return service;
  
  function getUsers(){
    $http({
        method : "GET",
        url : "api/users"
    }).then(function(response) {
        return response.data;
      
    }).catch(function(error) {
       return error.errorText;
    });
  }
  function addUser(){
    
  }
  function editUser(){
    
  }
  function removeUser(){
    
  }
}