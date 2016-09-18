'use strict';

var express = require('express');
var router = express.Router();
var liveBusiness = require('../business/LiveBusiness');
var constants = require('../services/constants');

//进入我的直播界面
router.get('/', function (req, res, next) {
    var userid;
    if (req.session.userid)
        userid = req.session.userid;
    var json = {
        "title": 'PRIVATE主页面', "user_id": userid, "username": req.session.username,
        "streamUrl": constants.SERVER_URL, "streamName": constants.LIVE_STREAM_NAME, "streamcode": ""
    };
    //先查询当前用户是否有正在进行的直播，有的话返回直播推流码
    liveBusiness.queryMyCurrentLive(json, (err, data)=> {
        if (err) {
            console.error("LiveRouter--post--/--error");
            throw err;
        }
        if (data) {
            if(data.length > 0){
                json.streamcode = data[0].streamcode;
                res.render('user_page', json);
            }
            else{
                res.render('user_page', json);
            }
        }
    });
});


//进入我的直播界面
router.get('/list', function (req, res, next) {
    var userid;
    if (req.session.userid)
        userid = req.session.userid;
    var json = {
        "title": 'PRIVATE主页面', "user_id": userid, "username": req.session.username,
        "streamUrl": constants.SERVER_URL, "streamName": constants.LIVE_STREAM_NAME,"snapshotUrl":constants.PIC_URL
    };
    //先查询当前用户是否有正在进行的直播，有的话返回直播推流码
    liveBusiness.queryAllLives(json, (err, data)=> {
        if (err) {
            console.error("LiveRouter--post--/--error");
            throw err;
        }
        if (data) {
            if(data.length > 0){
                json.lives = data;
                res.render('live_list', json);
            }
            else{
                json.lives = [];
                res.render('live_list', json);
            }
        }
    });
});


//开启直播
router.post('/start', function (req, res, next) {
    var param = req.body;
    liveBusiness.startLive(param, (err, data)=> {
        if (err) {
            console.error("LiveRouter--post--start--error");
            console.error(err);
            // throw err;
            res.json({"error":"开启直播失败,请稍后再试"});
        }
        if (data) {
            res.json(data);
        }
    });
});

//关闭直播
router.post('/end', function (req, res, next) {
    var param = req.body;
    liveBusiness.endLive(param, (err, data)=> {
        if (err) {
            console.error("LiveRouter--post--end--error");
            console.error(err);
            res.json({"error":"关闭直播失败,请稍后再试"});
            // throw err;
        }
        if (data) {
            if (data.result === "success")
                res.json({result: 'success'});
        }
    });
});

module.exports = router;
