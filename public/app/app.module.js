(function(angular){
  'use strict';
  //debugger;
  angular
    .module('app', [
      'ui.router',
      // Custom modules
      'app.navMenu',
      'app.userList',
      'app.chat'
    ])
    .config(MainConfig)
    .controller('MainController', MainController);
  
  MainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function MainConfig($stateProvider, $urlRouterProvider){
    //$urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('chat', {
      url : '/',
      abstract: true,
      templateUrl : 'chat/chat.template.html'
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
  }
  
 
  function MainController(){
    this.loadingtime = 500;
  }
  
})(window.angular);