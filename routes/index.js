var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var json = { "title": 'PRIVATE直播' ,"streamUrl":"10.204.21.34","streamName":"live","streamCode":"livestream"}
  res.render('index', json);
});

router.get('/main', function(req, res, next) {
  var loginState = "0";
  if(req.session.userid)
      loginState = req.session.userid;
  var json = { "title": 'PRIVATE主页面',"userid":loginState,"username":req.session.username};
  res.render('main', json);
});

module.exports = router;
