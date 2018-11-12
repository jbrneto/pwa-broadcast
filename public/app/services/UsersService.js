angular
  .module('app')
  .factory('UsersService', UsersService);

UsersService.$inject = ['$http', 'WebSocketService'];
function UsersService($http, WebSocketService){
  var service = {
      getUsers: getUsers,
      getUserLogin: getUserLogin,
      validateUserLogin: validateUserLogin,
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
        if(response.status == 200){
           return response.data;
        }else{
           return new Error(response.data);
        } 
      
    }).catch(function(error) {
       return new Error(error);
    });
  }
  
  function getUserLogin(user){
    return WebSocketService
      .getSocketId(function(socket_id){
        return $http({
            method : "GET",
            url : `api/login?email=${user.email}&password=${user.password}&socket_id=${socket_id}`
        }).then(function(response) {
            if(response.status == 200){
               return response.data;
            }else{
               return new Error(response.data);
            }
        }).catch(function(error) {
           return new Error(error);
        });
      });
  }
  
  function validateUserLogin(user){
    return WebSocketService
      .getSocketId(function(socket_id){
        return $http({
            method : "PUT",
            url : `api/login/${user._id}`,
            data: JSON.stringify({
              socket_id: socket_id
            })
        }).then(function(response) {
            if(response.status == 200){
               return response.data;
            }else{
               return new Error(response.data);
            }
        }).catch(function(error) {
           return new Error(error);
        });
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