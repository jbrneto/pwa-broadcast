angular
  .module('app.config')
  .controller('ConfigController', ConfigController);

ConfigController.$inject = ['$state','UsersService'];
function ConfigController($state, UsersService){
  var config = this;
  
  config.submited = false;
  config.success = false;
  config.error = false;
  
  config.submit = function(form){
    if(form.$invalid){
       return;
    }
    
    config.submited = true;
    
    UsersService.addUser({name: config.name})
      .then(function(response){
        config.submited = false;
        config.success = true;
        if(window.localStorage.getItem("app-user") !== null){
           window.localStorage.setItem("app-user", JSON.stringify(response));
           $state.go('/');
        }
      })
      .catch(function(error){
        config.submited = false;
        config.error = true;
      });
  }
}