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
    return $http({
        method : "GET",
        url : "api/users"
    }).then(function(response) {
        return response;
      
    }).catch(function(error) {
       return error;
    });
  }
  
  function addUser(user){
    return $http({
        method : "POST",
        url : "api/user",
        data: JSON.stringify(user)
    }).then(function(response) {
        return response;
      
    }).catch(function(error) {
       return error;
    });
  }
  
  function editUser(user){
    return $http({
        method : "PUT",
        url : "api/user/"+user.id,
        data: JSON.stringify(user)
    }).then(function(response) {
        return response;
      
    }).catch(function(error) {
       return error;
    });
  }
  
  function removeUser(user){
    return $http({
        method : "DELETE",
        url : "api/user"+user.id
    }).then(function(response) {
        return response;
      
    }).catch(function(error) {
       return error;
    });
  }
  
}