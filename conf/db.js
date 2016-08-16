// MySQL数据库联接配置
module.exports = {
  mysql: {
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database:'livestream', 
    port: 3306,
    connectionLimit: 10,
    supportBigNumbers: true
  }
};