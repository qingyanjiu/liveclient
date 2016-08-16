var express = require('express');
var router = express.Router();
var userBusiness = require('../business/UserBusiness');

router.post('/login', function(req, res, next) {
	var param = req.body;
  	userBusiness.login(param, (err,data)=>{
    if(err){
      console.error("UserRouter--post--login--error");
      throw err;
    }
    if(data){
      if(data.length === 0)
      	res.json({result:'empty'});
      else {
          //用户session写入
          req.session.username = data[0].username;
          req.session.userid = data[0].id;
          //同步到sessionstore里
          req.session.save();
          console.log(req.session.username + "----" + req.session.userid + "-------" + param.type);
          res.json({result: 'success'});
      }
    }
  });
});



router.post('/register', function(req, res, next) {
	var param = req.body;
  	userBusiness.register(param, (err,data)=>{
    if(err){
      console.error("UserRouter--post--register--error");
      throw err;
    }
    if(data){
      if(data.result === "success")
        res.json({result: 'success'});
      else if(data.result === "exist")
        res.json({result: 'exist'});
    }
  });
});

module.exports = router;
