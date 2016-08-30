var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var InitDatabase = require('../services/InitDatabase');

/* GET home page. */
router.get('/', function (req, res, next) {
    //先看看有没有初始化过数据库
    var connection = mysql.createConnection({
        host: 'srs-db',
        user: 'root',
        password: '123'
    });
    connection.connect();
    connection.query('show databases', function (err, data) {
        if (err)
            throw err;
        //如果没有livestream这个数据库，说明没有初始化
        if (JSON.stringify(data).indexOf("livestream") == -1) {
            res.redirect("/init");
        }
        else {
            //如果已经有数据库，正常进入系统
            if (req.session.userid) {
                res.redirect("/live");
            }
            else {
                var json = {
                    "title": 'PRIVATE直播',
                    "streamUrl": "10.204.21.34",
                    "streamName": "live",
                    "streamCode": "livestream"
                }
                res.render('index', json);
            }
        }
    });
    connection.end();

});


router.get('/init', function (req, res, next) {
    //先看看有没有初始化过数据库
    var connection = mysql.createConnection({
        host: 'srs-db',
        user: 'root',
        password: '123'
    });
    connection.connect();
    connection.query('show databases', function (err, data) {
        if (err)
            throw err;
        //如果没有livestream这个数据库，说明没有初始化
        if (JSON.stringify(data).indexOf("livestream") == -1) {
            res.render("init");
        }
        else {
            //如果已经有数据库， 就直接进入系统，不能随便初始化
            if (req.session.userid) {
                res.redirect("/live");
            }
            else {
                var json = {
                    "title": 'PRIVATE直播',
                    "streamUrl": "10.204.21.34",
                    "streamName": "live",
                    "streamCode": "livestream"
                }
                res.render('index', json);
            }
        }
    });
    connection.end();
});

router.post('/initDatabase', function (req, res, next) {
    //先看看有没有初始化过数据库
    var connection = mysql.createConnection({
        host: 'srs-db',
        user: 'root',
        password: '123'
    });
    connection.connect();
    connection.query('show databases', function (err, data) {
        if (err)
            throw err;
        //如果没有livestream这个数据库，说明没有初始化
        if (JSON.stringify(data).indexOf("livestream") == -1) {
            InitDatabase.initDatabase({}, function (err, data) {
                if (err)
                    res.json({"result": "error"});
                if (data)
                    res.json(data);
            });
        }
        else {
            //如果已经有数据库， 就直接进入系统，不能随便初始化
            if (req.session.userid) {
                res.redirect("/live");
            }
            else {
                var json = {
                    "title": 'PRIVATE直播',
                    "streamUrl": "10.204.21.34",
                    "streamName": "live",
                    "streamCode": "livestream"
                }
                res.render('index', json);
            }
        }
    });
    connection.end();
});

module.exports = router;
