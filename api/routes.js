'use strict';

module.exports = function(router){
  var UserController = require('./controllers/UserController');
  var MessageController = require('./controllers/MessageController');
  
  router.route('/users')
    .get(UserController.getAll);
  
  router.route('/user')
    .post(UserController.saveUser)
  
  router.route('/user/:user_id')
    .get(UserController.getUser)
    .put(UserController.editUser)
    .delete(UserController.removeUser);
  
  router.route('/conversations')
    .get(MessageController.getConversations);
  
  router.route('/broadcast')
    .get(MessageController.getBroadcastMessages)
    .post(MessageController.saveBroadcastMessage);
  
  router.route('/messages')
    .post(MessageController.saveConversationMessage);
  
  router.route('/messages/:user_id')
    .get(MessageController.getConversationMessages);
}