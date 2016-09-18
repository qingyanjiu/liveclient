// 实现与MySQL交互
var db = require('./Database');
var liveSqlMapping = require('./LiveSqlMapping');


module.exports = {

    //创建直播
    addLive: function (param, callback) {
        db.pool.getConnection(function (err, connection) {
            var myDate = new Date();
            if (err) {
                console.error(myDate.toLocaleString() + "---" + err);
                throw err;
            }
            // 建立连接，向表中插入值
            connection.query(liveSqlMapping.insert, [
                param.id,
                param.user_id,
                param.start_time,
                param.end_time,
                param.streamcode,
                param.status,
                param.live_name
            ], function (err, result) {
                if (err) {
                    console.error("addLive--" + myDate.toLocaleString() + "---" + err);
                    callback(err, {});
                }
                // 释放连接
                connection.release();
                callback(err, result);
            });
        });
    },

    //删除旧的直播
    deleteLive: function (param, callback) {
        db.pool.getConnection(function (err, connection) {
            var myDate = new Date();
            if (err) {
                console.error(myDate.toLocaleString() + "---" + err);
                return;
            }
            // 建立连接，向表中插入值
            connection.query(liveSqlMapping.delete,
                [
                    param.status,
                    param.end_time,
                    param.user_id,
                    param.current_status,
                ], function (err, result) {
                    if (err) {
                        console.error(myDate.toLocaleString() + "---" + err);
                        callback(err, {});
                        ;
                    }
                    // 释放连接
                    connection.release();
                    callback(err, result);
                });
        });
    },

    //关闭直播
    endLive: function (param, callback) {
        db.pool.getConnection(function (err, connection) {
            var myDate = new Date();
            if (err) {
                console.error(myDate.toLocaleString() + "---" + err);
                return;
            }
            // 建立连接，向表中插入值
            connection.query(liveSqlMapping.end,
                [
                    param.end_time,
                    param.status,
                    param.streamcode,
                ], function (err, result) {
                    if (err) {
                        console.error(myDate.toLocaleString() + "---" + err);
                        callback(err, {});
                    }
                    // 释放连接
                    connection.release();
                    callback(err, result);
                });
        });
    },

    //获取我的直播信息(通过user_id)
    getMyCurrentLive: function (param, callback) {
        db.pool.getConnection(function (err, connection) {
            var myDate = new Date();
            if (err) {
                console.error(myDate.toLocaleString() + "---" + err);
                return;
            }
            // 建立连接，向表中插入值
            connection.query(liveSqlMapping.get,
                [
                    param.user_id,
                    param.status,
                ], function (err, result) {
                    if (err) {
                        console.error(myDate.toLocaleString() + "---" + err);
                        callback(err, {});
                    }
                    // 释放连接
                    connection.release();
                    callback(err, result);
                });
        });
    },

    //获取所有直播信息
    getAllLives: function (param, callback) {
        db.pool.getConnection(function (err, connection) {
            var myDate = new Date();
            if (err) {
                console.error(myDate.toLocaleString() + "---" + err);
                return;
            }
            // 查询
            connection.query(liveSqlMapping.queryAllAvailable,
                [
                    param.status,
                ], function (err, result) {
                    if (err) {
                        console.error(myDate.toLocaleString() + "---" + err);
                        callback(err, {});
                    }
                    // 释放连接
                    connection.release();
                    callback(err, result);
                });
        });
    },

    //获取用户的直播历史
    getLiveHistory: function (param, callback) {
        db.pool.getConnection(function (err, connection) {
            var myDate = new Date();
            if (err) {
                console.error(myDate.toLocaleString() + "---" + err);
                return;
            }
            // 查询
            connection.query(liveSqlMapping.queryHistory,
                [
                    param.user_id
                ], function (err, result) {
                    if (err) {
                        console.error(myDate.toLocaleString() + "---" + err);
                        callback(err, {});
                    }
                    // 释放连接
                    connection.release();
                    callback(err, result);
                });
        });
    },

};