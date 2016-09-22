// MySQL数据库联接配置

var constants = require('../services/constants');
var rf=require("fs");

var dbip = rf.readFileSync("conf/DBIp","utf-8");


module.exports = {
  // mysql: {
  //   host: '192.168.99.100',
  //   user: 'root',
  //   password: '123',
  //   database:'livestream',
  //   port: 3306,
  //   connectionLimit: 10,
  //   supportBigNumbers: true
  // }

    mysql: {
        host: dbip,
        user: 'root',
        password: '123',
        database:'livestream',
        port: 3306,
        connectionLimit: 10,
        supportBigNumbers: true
    }
  
  //  mysql: {
  //   host: '10.10.11.174',
  //   user: 'u6RGBpsT3ZjkqHrY',
  //   password: 'pNenQbWCifaOspqVj',
  //   database:'kCr8lUzcWhJoSV3Z',
  //   port: 3306,
  //   connectionLimit: 10,
  //   supportBigNumbers: true
  // }
};