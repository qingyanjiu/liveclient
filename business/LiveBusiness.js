'use strict';

var LiveDao = require('../dao/LiveDao');
var guid = require('../services/guid');
var Date = require('../services/MyDate');
var md5 = require('md5');
var constants = require('../services/constants');

var myDate = new Date();
var dateTime = myDate.pattern("yyyy-MM-dd HH:mm:ss");

module.exports = {
    //开启直播
    startLive: function (param, callback) {
        //先将之前的直播都置为无效
        param.status = constants.LIVE_STATUS_ENDED;
        LiveDao.deleteLive(param, function (err, result) {
            var ret = {};
            param.id = guid.create();
            param.status = constants.LIVE_STATUS_STARTED;
            param.start_time = dateTime;
            param.streamcode = guid.create();
            param.password = null;
            if (err) {
                console.error("LiveBusiness--startLive--deleteLive--error");
                callback(err, {});
            }
            if (result) {
                LiveDao.addLive(param, function (er, res) {
                    if (er) {
                        console.error("LiveBusiness--startLive--addLive--error");
                        callback(er, {});
                    }
                    if(res) {
                        ret = {"result": param.streamcode};
                        callback(err, ret);
                    }
                });
            }
        });
    },

    //关闭直播
    endLive: function (param, callback) {
        param.status = constants.LIVE_STATUS_ENDED;
        param.end_time = dateTime;
        param.current_status = constants.LIVE_STATUS_STARTED;
        //先将之前的直播都置为无效
        LiveDao.endLive(param, function (err, result) {
            var ret = {};
            if (err) {
                console.error("LiveBusiness--endlive--endLive--error");
                callback(err, {});
            }
            if (result) {
                ret = {"result": "success"};
                callback(err, ret);
            }
        });
    },

    //查看直播列表
    queryAllLives: function (param, callback) {
        //查询所有有效的直播
        param.status1 = constants.LIVE_STATUS_STARTED;
        param.status2 = constants.LIVE_STATUS_LIVING;
        LiveDao.getAllLives(param, function (err, result) {
            var ret = {};
            if (err) {
                console.error("LiveBusiness--queryAllLives--getAllLives--error");
                callback(err, {});
            }
            if (result) {
                callback(err, result);
            }
        });
    },


    //查看直播历史
    queryLiveHistory: function (param, callback) {
        //查询历史直播
        param.status = constants.LIVE_STATUS_STARTED;
        LiveDao.getLiveHistory(param, function (err, result) {
            var ret = {};
            if (err) {
                console.error("LiveBusiness--queryAllLives--getLiveHistory--error");
                callback(err, {});
            }
            if (result) {
                callback(err, result);
            }
        });
    },


    //查看我正在进行的直播
    queryMyCurrentLive: function (param, callback) {
        param.status1 = constants.LIVE_STATUS_STARTED;
        param.status2 = constants.LIVE_STATUS_LIVING;
        LiveDao.getMyCurrentLive(param, function (err, result) {
            if (err) {
                console.error("LiveBusiness--queryMyCurrentLive--getMyCurrentLive--error");
                callback(err, {});
            }
            if (result) {
                callback(err, result);
            }
        });
    },


    //获取某个用户的直播信息
    getUserLive: function (param, callback) {
        param.status1 = constants.LIVE_STATUS_STARTED;
        param.status2 = constants.LIVE_STATUS_LIVING;
        LiveDao.getLiveFromUsername(param, function (err, result) {
            if (err) {
                console.error("LiveBusiness--getUserLive--getUserLive--error");
                callback(err, {});
            }
            if (result) {
                callback(err, result);
            }
        });
    },

    //修改房间名
    updateLiveName: function (param, callback) {
        LiveDao.updateLiveName(param, function (err, result) {
            if (err) {
                console.error("LiveBusiness--updateLiveName--updateLiveName--error");
                callback(err, {});
            }
            if (result) {
                callback(err, result);
            }
        });
    },

    //房间加密
    updateLivePassword: function (param, callback) {
        LiveDao.updateLivePassword(param, function (err, result) {
            if (err) {
                console.error("LiveBusiness--updateLivePassword--updateLiveName--error");
                callback(err, {});
            }
            if (result) {
                callback(err, result);
            }
        });
    },


};