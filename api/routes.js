module.exports = function(router){
  
  router.route('/users')
    .get(function(req, res){
      res.json({nome:'jao'});
    });
  
  router.route('/message')
    .get(function(req, res){
      res.json({nome:'jao', message:'oii'});
    });
  
  router.route('/message/:user_id')
    .get(function(req, res){
      res.json({nome:'jonas', message:'alou'});
    });
}