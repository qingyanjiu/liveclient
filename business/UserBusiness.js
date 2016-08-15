var UserDao = require('../dao/UserDao');
var guid = require('../services/guid');
var Date = require('../services/MyDate');
var md5 = require('md5');
var constants = require('../services/constants');

var myDate = new Date();
var dateTime = myDate.pattern("yyyy-MM-dd HH:mm:ss");

module.exports = {
  //注册用户
  //@param param
  //param.username 用户名
  //param.password1 密码
  register: function (param,callback) {
    //先检查用户名是否已有人使用
    UserDao.checkName(param,function(err,result){
      var ret;
      param.id = guid.create();
      param.password = md5(param.password);
      param.register_date = dateTime;
      param.true_name_cert = constants.TRUENAME_UNCERTED;
      param.status = constants.USER_STATUS_INUSE;

      if(err){
        console.error("UserBusiness--regist--checkName--error");
        throw err;
        }
      if(result){
        //如果没有已注册的同名用户,则注册用户
        if(result[0].count === 0){
          UserDao.addUser(param,function(err,res){
            if(err){
              console.error("UserBusiness--regist--addUser--error");
              throw err;
            }
            ret = {"result":"success"};
            callback(err,ret);
          });
        }
        //如果已经被注册
        else{
          ret = {"result":"exist"};
          callback(err,ret);
        }

      }
    });
  },
  
  //登录系统
  //@param param
  //param.username 用户名
  //param.password 密码
  login: function (param,callback) {
    param.password = md5(param.password);
    UserDao.getUser(param,function(err,result){
      if(err){
        console.error("UserBusiness--login--error");
        throw err;
        }
      if(result){
        callback(err,result);
      }
    });
  },
  
  
};