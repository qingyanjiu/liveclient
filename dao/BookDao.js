// 实现与MySQL交互
var db = require('./Database');
var bookSqlMapping = require('./BookSqlMapping');


// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code:'1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

module.exports = {
  add: function (req, res, next) {
    db.pool.getConnection(function(err, connection) {
      var myDate = new Date();
      if(err){
        console.error(myDate.toLocaleString()+"---"+err);
        jsonWrite(res,err);
        return;
      }
      // 获取前台页面传过来的参数
      var param = req.query || req.params;

      // 建立连接，向表中插入值
      connection.query(bookSqlMapping.insert, [param.name, param.describe], function(err, result) {
        if(err){
          console.error(myDate.toLocaleString()+"---"+err);
          jsonWrite(res,err);
          return;
        }
        if(result) {
          result = {
            code: 200,
            msg:'增加成功'
          };    
        }

        // 以json形式，把操作结果返回给前台页面
        jsonWrite(res, result);

        // 释放连接 
        connection.release();
      });
    });
  }
};