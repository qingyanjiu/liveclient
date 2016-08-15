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
      else if(data.result === "success")
        res.json({result:'success'});
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
        if(data.result === "exist")
      	res.json({result:'exist'});
      else if(data.result === "success")
        res.json({result:'success'});
    }
  });
});

module.exports = router;
