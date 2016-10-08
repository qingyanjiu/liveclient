"use strict";

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var InitDatabase = require('../services/InitDatabase');
var constants = require('../services/constants');
var liveBusiness = require('../business/LiveBusiness');

/* GET home page. */
router.get('/', function (req, res, next) {
    //先看看有没有初始化过数据库
    var connection = mysql.createConnection({
        host: constants.DB_ALIA,
        user: 'root',
        password: '123',
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
                    "title": 'MokuLive',
                    "streamUrl": constants.SERVER_URL,
                    "streamName": "live",
                    "streamCode": null,
                    "live_name":null,
                    "username":null,
                    "user_id":null,
                }
                var param = {"status": constants.LIVE_STATUS_STARTED};
                liveBusiness.queryAllLives(param, (err, data)=> {
                    if (err) {
                        console.error("indexRoute--get--/--error");
                        throw err;
                    }
                    if (data) {
                        if (data.length > 0) {
                            json.streamCode = data[0].streamcode;
                            json.live_name = data[0].live_name;
                            json.username = data[0].username;
                            res.render('index', json);
                        }
                        else {
                            res.render('index', json);
                        }
                    }
                });
            }
        }
    });
    connection.end();

});


router.get('/init', function (req, res, next) {
    //先看看有没有初始化过数据库
    var connection = mysql.createConnection({
        host: constants.DB_ALIA,
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
                    "streamUrl": constants.SERVER_URL,
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
        host: constants.DB_ALIA,
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
                    "streamUrl": constants.SERVER_URL,
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
