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
        userAuth: ['$state', UserAuth]
      }
    })
    .state('chat.messages', {
      url : '',
      templateUrl : 'chat/chat-messages/chat-messages.template.html',
      controller : 'ChatMessagesController',
      controllerAs : 'messages'
    })
    .state('chat.private', {
      url : '/private',
      templateUrl : 'chat/chat-private/chat-private.template.html',
      controller : 'ChatPrivateController',
      controllerAs : 'private'
    })
    .state('config', {
      url : '/config',
      templateUrl : 'config/config.template.html',
      controller : 'ConfigController',
      controllerAs : 'config'
    });
    
    $urlRouterProvider.otherwise('/');
    
    
    function UserAuth($state){
      var user = window.localStorage.getItem("app-user");
      if(user !== null){
        return JSON.parse(user);
      }else{
        $state.go('config');
      }
    }
  }

  
  function MainController(){
    this.loadingtime = (Date.now() - window.loadingTime);
  }
  
})(window.angular);