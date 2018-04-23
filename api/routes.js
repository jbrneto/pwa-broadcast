'use strict';

module.exports = function(router, websocket){
  var UserController = require('./controllers/UserController');
  var MessageController = require('./controllers/MessageController');
  
  /*router.use(function(req, res, next) {
    next();
  });*/
  
  // API User routes
  router.route('/users')
    .get(UserController.getAll);
  
  router.route('/login')
    .get(UserController.getUserLogin);
  
  router.route('/user')
    .post(UserController.saveUser)
    .all(socketUserMiddleware);
  
  router.route('/user/:user_id')
    .get(UserController.getUser)
    .put(UserController.editUser)
    .delete(UserController.removeUser)
    .all(socketUserMiddleware);
  
  router.route('/conversations')
    .get(MessageController.getConversations);
  
  router.route('/broadcast')
    .get(MessageController.getBroadcastMessages)
    .post(MessageController.saveBroadcastMessage);
  
  router.route('/messages')
    .post(MessageController.saveConversationMessage);
  
  router.route('/messages/:user_id')
    .get(MessageController.getConversationMessages);
  
  router.use(function(req, res, next) {
    res.statusCode = res.locals.resobj.status;
    res.json(res.locals.resobj.response);
    next();
  });
  
  // Socket comunication middleware
  function socketUserMiddleware(req, res, next){
    if(res.statusCode == 200){
       UserController._getAll(function(response){
         websocket.usersChange(response);
       });
    }
    next();
  }
}