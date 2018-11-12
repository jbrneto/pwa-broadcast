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
    .get(UserController.getUserLogin)
    .get(socketLoginMiddleware);
  
  router.route('/login/:user_id')
    .put(UserController.getUser)
    .put(socketLoginMiddleware);
  
  router.route('/user')
    .post(UserController.saveUser)
    .all(socketUserMiddleware);
  
  router.route('/user/:user_id')
    .get(UserController.getUser)
    .put(UserController.editUser)
    .delete(UserController.removeUser)
    .all(socketUserMiddleware);
  
  router.route('/conversations/:user_id')
    .get(MessageController.getConversations);
  
  router.route('/broadcast')
    .post(MessageController.sendBroadcastMessage)
    .all(socketBroadcastMessageMiddleware);
  
  router.route('/messages')
    .get(MessageController.getConversationMessages)
    .post(MessageController.saveConversationMessage)
    .post(socketPrivateMessageMiddleware);
  
  router.use(function(req, res, next) {
    res.statusCode = res.locals.resobj.status;
    res.json(res.locals.resobj.response);
    next();
  });
  
  // Login Socket comunication middleware
  function socketLoginMiddleware(req, res, next){
    if (res.locals.resobj.response.status === 200) {
        var old_id = (!!req.query.socket_id) ? req.query.socket_id : req.body.socket_id;
        websocket.resetClientId(old_id, res.locals.resobj.response.data._id);
    }
    next();
  }
  
  // User Socket comunication middleware
  function socketUserMiddleware(req, res, next){
    if (res.locals.resobj.response.status === 200) {
       UserController._getAll(function(response){
         websocket.usersChange(response);
       });
    }
    next();
  }
  
  // Private Message Socket comunication middleware
  function socketPrivateMessageMiddleware(req, res, next){
    if (res.locals.resobj.response.status === 200) {
       websocket.sendPrivateMessage(req.body.receiver, res.response);
    }
    next();
  }
  
  // Broadcast Message Socket comunication middleware
  function socketBroadcastMessageMiddleware(req, res, next){
    websocket.broadCastMessage(res.response);
    next();
  }
}