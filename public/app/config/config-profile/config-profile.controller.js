angular
  .module('app.config')
  .controller('ConfigSignupController', ConfigSignupController);

ConfigSignupController.$inject = ['userAuth','$state','UsersService'];
function ConfigSignupController(userAuth, $state, UsersService){
  var profile = this;
  
  if(userAuth){
    profile.isRegistered = true;
    profile.name = userAuth.name;
    profile.email = userAuth.email;
    profile.password = "";
    profile.confirmPassword = "";
  }else{
    profile.isRegistered = false;
  }
  
  profile.submited = false;
  profile.success = false;
  profile.error = false;
  profile.error_pass = false;
  
  profile.submit = function(form){
    if(form.$invalid){
       return;
    }
    
    profile.error_pass = false;
    
    var user = {
      name: profile.name,
      email: profile.email
    };
    
    if(profile.password.trim().length !== 0){
       if(profile.password.trim() !== profile.confirmPassword.trim()){
          profile.error_pass = true;
         return;
       }else{
         user.password = profile.password.trim();
       }
    }
    
    profile.submited = true;
    
    if(form.$name == "accountForm"){
       createAccount(user);
    }else{
       user.id = userAuth._id;
       editAccount(user);
    }
    
  }
  
  function createAccount(user){
     UsersService.addUser(user)
    .then(responseHandlerThen)
    .catch(responseCatchHandler);
  }
  
  function editAccount(user){
    UsersService.editUser(user)
    .then(responseHandlerThen)
    .catch(responseCatchHandler);
  }
  
  function responseHandlerThen(response){
    profile.submited = false;
    
    if(response.status != 200){
      profile.error = true;
      console.warn(response.error);
    }else{
      profile.success = true;
      profile.submited = false;
      profile.error = false;
      
      var userLastState = localStorage.getItem("app-user");
      localStorage.setItem("app-user", JSON.stringify(response.data.data));
      if(!userLastState){
         $state.go('chat.messages');
      }else{
        location.reload();
      }
    }
  }
  
  function responseCatchHandler(error){
    profile.submited = false;
    profile.error = true;
  }
}