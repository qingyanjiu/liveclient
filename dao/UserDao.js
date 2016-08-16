// 实现与MySQL交互
var db = require('./Database');
var userSqlMapping = require('./UserSqlMapping');


module.exports = {

  //判断用户名是否在用户表中已经存在
  checkName:function (param,callback) {
    db.pool.getConnection(function(err, connection) {
      var myDate = new Date();
      if(err){
        console.error(myDate.toLocaleString()+"---"+err);
        throw err;
      }
      // 建立连接，向表中插入值
      connection.query(userSqlMapping.checkName, [param.username], function(err, result) {
        if(err){
          console.error("checkName--"+myDate.toLocaleString()+"---"+err);
          callback(err,{});
        }
        // 释放连接 
        connection.release();
        callback(err,result);
      });
    });
  },

  //用户注册
  addUser: function (param,callback) {
    db.pool.getConnection(function(err, connection) {
      var myDate = new Date();
      if(err){
        console.error(myDate.toLocaleString()+"---"+err);
        return;
      }
      // 建立连接，向表中插入值
      connection.query(userSqlMapping.insert, 
        [
        param.id,
        param.username,
        param.password,
        param.gender,
        param.nick,
        param.register_date,
        param.last_login_date,
        param.true_name_cert,
        param.true_name,
        param.phone_number,
        param.email,
        param.status
        ], function(err, result) {
        if(err){
          console.error(myDate.toLocaleString()+"---"+err);
          callback(err,{});;
        }
        // 释放连接 
        connection.release();
        callback(err,result);
      });
    });
  },

  //用户登录
  getUser: function (param,callback) {
    db.pool.getConnection(function(err, connection) {
      var myDate = new Date();
      if(err){
        console.error(myDate.toLocaleString()+"---"+err);
        return;
      }
      // 建立连接，向表中插入值
      connection.query(userSqlMapping.login, 
        [
        param.username,
        param.password,
        param.username,
        param.password,
        param.username,
        param.password,
        ], function(err, result) {
        if(err){
          console.error(myDate.toLocaleString()+"---"+err);
          callback(err,{});
        }
        // 释放连接 
        connection.release();
        callback(err,result);
      });
    });
  },



};