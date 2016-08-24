var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.userid) {
        res.redirect("/live");
    }
    else {
        var json = {"title": 'PRIVATE直播', "streamUrl": "10.204.21.34", "streamName": "live", "streamCode": "livestream"}
        res.render('index', json);
    }
});

module.exports = router;
