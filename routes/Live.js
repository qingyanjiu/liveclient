'use strict';

var httpReq = require('../services/HttpRequests');

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
            if (data.length > 0) {
                json.streamcode = data[0].streamcode;
                json.livename = data[0].live_name;
                res.render('user_page', json);
            }
            else {
                res.render('user_page', json);
            }
        }
    });
});


//进入直播列表界面
router.get('/list', function (req, res, next) {
    var userid;
    if (req.session.userid)
        userid = req.session.userid;
    var json = {
        "title": '直播列表', "user_id": userid, "username": req.session.username,
        "streamUrl": constants.SERVER_URL, "streamName": constants.LIVE_STREAM_NAME, "snapshotUrl": constants.PIC_URL
    };
    //查询所有直播
    liveBusiness.queryAllLives(json, (err, data)=> {
        if (err) {
            console.error("LiveRouter--get--list/--error");
            throw err;
        }
        if (data) {
            if (data.length > 0) {
                json.lives = data;
                res.render('live_list', json);
            }
            else {
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
            res.json({"error": "开启直播失败,请稍后再试"});
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
            res.json({"error": "关闭直播失败,请稍后再试"});
            // throw err;
        }
        if (data) {
            if (data.result === "success")
                res.json({result: 'success'});
        }
    });
});


//跳转到特定用户直播界面
router.get('/show/:username', function (req, res, next) {
    var param = req.body;
    var username = req.params.username;
    param.username = username;
    console.log(req.params.username);
    var userid;
    var myname;
    if (req.session.userid) {
        userid = req.session.userid;
        myname = req.session.username;
    }
    liveBusiness.getUserLive(param, (err, data)=> {
        if (err) {
            console.error("LiveRouter--get--:username--error");
            console.error(err);
            res.json({"error": "获取直播失败,请尝试刷新页面"});
            // throw err;
        }
        if (data) {
            if (data.length > 0) {
                var title = data[0].username + "的直播间";
                data[0].title = title;
                data[0].user_id = userid;
                data[0].username = username;
                data[0].streamUrl = constants.SERVER_URL;
                data[0].streamName = constants.LIVE_STREAM_NAME;
                data[0].streamCode = data[0].streamcode;
                data[0].myname = myname;
                res.render('index', data[0]);
            }
        }
    });
});

//查询当前直播间人数
router.post('/viewerCount', function (req, res, next) {
    var param = req.body;
    var url = "http://" + constants.SERVER_URL + ":8099/nclients?app=" + constants.LIVE_STREAM_NAME + "&name=" + param.streamCode;
    httpReq.requestViewerCount(url, (err, data)=> {
        res.json({"count": data});
    });
});

//只看弹幕列表的请求
router.get('/danmuList', function (req, res, next) {
    var userid;
    if (req.session.userid)
        userid = req.session.userid;
    if (userid) {
        var json = {};
        json.user_id = userid;
        //先查询当前用户是否有正在进行的直播，有的话返回直播推流码
        liveBusiness.queryMyCurrentLive(json, (err, data)=> {
            if (err) {
                console.error("LiveRouter--get--danmuList/--error");
                throw err;
            }
            if (data) {
                if (data.length > 0) {
                    json.streamCode = data[0].streamcode;
                    res.render('danmuList', json);
                }
            }
        });
    }
    else {
        res.render('loginWindow');
    }
});

//进入移动端直播列表界面
router.get('/mobile/list/:type', function (req, res, next) {
    //设备类型
    var deviceType = req.params.type;
    var json = {
        "title": '直播列表',
        "streamUrl": constants.SERVER_URL,
        "snapshotUrl": constants.PIC_URL,
        "deviceType":deviceType
    };
    //查询所有直播
    liveBusiness.queryAllLives(json, (err, data)=> {
        if (err) {
            console.error("LiveRouter--get--mobileIndex/--error");
            throw err;
        }
        if (data) {
            if (data.length > 0) {
                json.lives = data;
                res.render('mobile_list', json);
            }
            else {
                json.lives = [];
                res.render('mobile_list', json);
            }
        }
    });
});


//进入移动端某用户直播间
router.get('/mobile/:livecode/:livename/:username', function (req, res, next) {
    var livecode = req.params.livecode;
    var livename = req.params.livename;
    var username = req.params.username;
    console.log(livename);
    var json = {
        "title": username + '的直播间',
        "streamUrl": constants.SERVER_URL,
        "snapshotUrl": constants.PIC_URL,
        "livecode": livecode,
        "livename": livename,
        "username": username,
    };
    res.render('mobile_room', json);
});


module.exports = router;
