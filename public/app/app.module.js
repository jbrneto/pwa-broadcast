(function(angular){
  'use strict';
  //debugger;
  angular
    .module('app', [
      'ui.router',
      // Custom modules
      'app.navMenu',
      'app.userList',
      'app.chat',
      'app.config'
    ])
    .config(MainConfig)
    .controller('MainController', MainController);
  
  MainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function MainConfig($stateProvider, $urlRouterProvider){
    
    $stateProvider
    .state('chat', {
      url : '/',
      abstract: true,
      templateUrl : 'chat/chat.template.html',
      resolve : {
        userAuth: ['$rootScope', '$state', '$timeout', 'UsersService', UserAuth]
      }
    })
    .state('chat.messages', {
      url : '',
      templateUrl : 'chat/chat-messages/chat-messages.template.html',
      controller : 'ChatMessagesController',
      controllerAs : 'messages'
    })
    .state('chat.private', {
      url : 'private/:id_user',
      templateUrl : 'chat/chat-private/chat-private.template.html',
      controller : 'ChatPrivateController',
      controllerAs : 'private'
    })
    .state('config', {
      url : '/config',
      abstract: true,
      templateUrl : 'config/config.template.html',
      resolve : {
        userAuth: ['$rootScope', '$state', '$timeout', 'UsersService', UserAuth]
      }
    })
    .state('config.profile', {
      url : '',
      templateUrl : 'config/config-profile/config-profile.template.html',
      controller : 'ConfigSignupController',
      controllerAs : 'profile'
    })
    .state('config.login', {
      url : '/login',
      templateUrl : 'config/config-login/config-login.template.html',
      controller : 'ConfigLoginController',
      controllerAs : 'login'
    })
    .state('logout', {
      url : '/logout',
      resolve : {
        logout: ['$state', Logout ]
      }
    });
    
    $urlRouterProvider.otherwise('/');
    
    UserAuth.$inject = ['$rootScope', '$state', '$timeout', 'UsersService'];
    function UserAuth($rootScope, $state, $timeout, UsersService){
      if($rootScope.login){
        return $rootScope.login;
      }else{
        var user = JSON.parse(localStorage.getItem("app-user"));
        if(user !== null){
          return UsersService
            .validateUserLogin(user)
            .then(function(response){
              if(response.status === 200){
                 return response.data[0];
              }else{
                 $timeout(function(){
                   $state.go('config.login');
                 });
              }
            });
          //console.log('aaa');
          //return JSON.parse(user);
        }else{
          $timeout(function(){
           $state.go('config.login');
          });
        }
      }
    }
    
    Logout.$inject = ['$state'];
    function Logout($state){
      localStorage.clear();
      $state.go('config.login');
    }
    
  }

  
  function MainController(){
    this.loadingtime = (Date.now() - window.loadingTime);
  }
  
})(window.angular);