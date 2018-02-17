angular
  .module('app.config')
  .controller('ConfigController', ConfigController);

ConfigController.$inject = ['$rootScope','$scope','$state','UsersService'];
function ConfigController($rootScope, $scope, $state, UsersService){
  
  this.submited = false;
  this.success = false;
  this.error = false;
  
  this.submit = function(form){
    if(form.$invalid){
       return;
    }
    this.submited = true;
    UsersService.addUser({name: this.name})
      .then(function(response){
        $scope.submited = false;
        $scope.success = true;
        if(window.localStorage.getItem("app-user") !== null){
           window.localStorage.setItem("app-user", JSON.stringify(response));
           $state.go('/');
        }
      })
      .catch(function(error){
        $scope.submited = false;
        $scope.error = true;
      });
  }
}