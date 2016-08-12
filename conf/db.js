// MySQL数据库联接配置
module.exports = {
  mysql: {
    host: 'rdsym2yqfamaunmprivate.mysql.rds.aliyuncs.com', 
    user: 'book',
    password: '19831226lc',
    database:'book', 
    port: 3306,
    connectionLimit: 10,
    supportBigNumbers: true
  }
};