angular
    .module('app')
    .directive('windowManipulation', windowManipulation);

ConfigController.$inject = ['UsersService'];
function windowManipulation(UsersService){
  var directive = {
    restrict: 'A',
    link: timeCalc
  };
  return directive;
  
  function timeCalc(){
    console.log('aa');
  }
  
  /*window.onbeforeunload = function(){
    var user = window.localStorage.getItem("app-user");
    if(user !== null){
       UsersService.removeUser(JSON.parse(user));
    }
  }*/
}