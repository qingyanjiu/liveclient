var bookSqlMapping = {
  insert:'INSERT INTO book_info(name, description) VALUES(?,?)',
  update:'update user set name=?, describe=? where id=?',
  delete: 'delete from book_info where id=?',
  queryById: 'select * from book_info where id=?',
  queryAll: 'select * from book_info'
};

module.exports = bookSqlMapping;