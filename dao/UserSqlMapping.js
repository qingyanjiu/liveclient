var userSqlMapping = {
  insert:'INSERT INTO user_info VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
  update:'update user_info set last_login_date=? where id=?',
  changeStatus: 'update user_info set status=? where id=?',
  queryById: 'select * from user_info where id=?',
  queryAll: "select * from user_info where username like '%?%' ",
  login:'select * from user_info where (username=? and password=?) or (phone_number=? and password=?) or (email=? and password=?)',
  checkName:'select count(id) count from user_info where username=?',
};

module.exports = userSqlMapping;