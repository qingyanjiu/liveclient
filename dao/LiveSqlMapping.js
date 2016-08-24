var liveSqlMapping = {
  insert:'INSERT INTO live_info VALUES(?,?,?,?,?,?,?)',
  delete:'update live_info set status=? where user_id=?',
  end:'update live_info set end_time=?,status=? where streamcode=?',
  get:'select * from live_info where user_id=? and status=?',
  queryAllAvailable:'select * from live_list where status=? order by start_time asc',
  queryHistory:'select * from live_info where user_id=? order by start_time desc'
};

module.exports = liveSqlMapping;