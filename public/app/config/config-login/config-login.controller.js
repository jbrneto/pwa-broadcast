angular
  .module('app.config')
  .controller('ConfigLoginController', ConfigLoginController);

ConfigLoginController.$inject = ['$state','UsersService'];
function ConfigLoginController($state, UsersService){
  var login = this;
  
  login.submited = false;
  login.success = false;
  login.error = false;
  login.invalid = false;
  
  login.submit = function(form){
    if(form.$invalid){
       return;
    }
    
    login.submited = true;
    
    UsersService.getUserLogin({
      email: login.email,
      password: login.password,
    })
      .then(function(response){
        login.submited = false;
        
        if(response.status >= 500){
          console.warn(response.error);
        }else if (response.status === 204){
          login.invalid = true;
        }else if (response.status === 200){
          login.success = true;
          if(window.localStorage.getItem("app-user") == null){
             window.localStorage.setItem("app-user", JSON.stringify(response.data));
             $state.go('chat.messages');
          }
        }
      })
      .catch(function(error){
        login.submited = false;
        login.error = true;
      });
  }
}