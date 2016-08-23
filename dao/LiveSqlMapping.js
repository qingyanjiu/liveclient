var userSqlMapping = {
  insert:'INSERT INTO live_info VALUES(?,?,?,?,?,?)',
  delete:'update live_info set status=? where user_id=?',
  end:'update live_info set status=?,end_time=? where user_id=?',
  get:'select * from live_info where user_id=? and status=?',
  queryAllAvailable:'select * from live_info where status=? order by start_time asc',
  queryHistory:'select * from live_info where user_id=? order by start_time desc'
};

module.exports = userSqlMapping;