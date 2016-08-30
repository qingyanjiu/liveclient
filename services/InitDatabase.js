var mysql = require('mysql');

module.exports = {
    initDatabase: function (param, callback) {
        var connection = mysql.createConnection({
            host: 'srsdb',
            user: 'root',
            password: '123'
        });
        connection.connect();
        // 建立连接，向表中插入值
        connection.query('drop database if exists livestream', function (err, result) {
            if (err) throw err
            connection.query('create database livestream', function (err, result) {
                if (err) throw err
                connection.query('use livestream', function (err, result) {
                    if (err) throw err
                    connection.query('SET FOREIGN_KEY_CHECKS=0', function (err, result) {
                        if (err) throw err
                        //建用户表
                        connection.query(
                            "CREATE TABLE `user_info` ("
                            + "`id` varchar(36) NOT NULL,"
                            + "`username` varchar(20) NOT NULL,"
                            + "`password` varchar(50) NOT NULL,"
                            + "`gender` varchar(1) DEFAULT NULL,"
                            + "`nick` varchar(30) DEFAULT NULL,"
                            + "`register_date` varchar(20) NOT NULL,"
                            + "`last_login_date` varchar(20) DEFAULT NULL,"
                            + "`true_name_cert` varchar(1) DEFAULT NULL,"
                            + "`true_name` varchar(10) DEFAULT NULL,"
                            + "`phone_number` varchar(15) DEFAULT NULL,"
                            + "`email` varchar(30) DEFAULT NULL,"
                            + "`status` varchar(1) NOT NULL,"
                            + " PRIMARY KEY (`id`)"
                            + ") ENGINE=InnoDB DEFAULT CHARSET=utf8;", function (err, results) {
                                if (err) throw err
                                //建直播表
                                connection.query(
                                    "CREATE TABLE `live_info` ("
                                    + "`id` varchar(36) NOT NULL,"
                                    + "`user_id` varchar(36) NOT NULL,"
                                    + "`start_time` varchar(20) NOT NULL,"
                                    + "`end_time` varchar(20) DEFAULT NULL,"
                                    + "`streamcode` varchar(36) NOT NULL,"
                                    + "`status` varchar(1) NOT NULL,"
                                    + "`live_name` varchar(40) NOT NULL,"
                                    + "PRIMARY KEY (`id`),"
                                    + "KEY `FK_user_id` (`user_id`),"
                                    + "CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`)"
                                    + ") ENGINE=InnoDB DEFAULT CHARSET=utf8;", function (err, result) {
                                        if (err) throw err
                                        //建视图
                                        connection.query(
                                            "CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `live_list` AS select `a`.`username` AS `username`,`a`.`true_name` AS `true_name`,`b`.`start_time` AS `start_time`,`b`.`streamcode` AS `streamcode`,`b`.`status` AS `status`,`b`.`live_name` AS `live_name` from (`user_info` `a` join `live_info` `b`) where (`a`.`id` = `b`.`user_id`) ;"
                                            , function (err, results) {
                                                if (err) throw err
                                            })
                                    })
                            });
                    });
                });
            });
            // 释放连接
            callback(err, {"result": "success"});
        });
    },
};