var liveSqlMapping = {
  insert:'INSERT INTO live_info VALUES(?,?,?,?,?,?,?)',
  delete:'update live_info set status=? where user_id=? and status=?',
  end:'update live_info set end_time=?,status=? where streamcode=?',
  get:'select * from live_info where user_id=? and status in (?,?)',
  queryAllAvailable:'select * from live_list where status in (?,?) order by status desc,start_time desc',
  queryHistory:'select * from live_info where user_id=? order by start_time desc',
  getLiveFromName:'select * from live_list where username=? and status in (?,?)',
  updateLiveName:'update live_info set live_name=? where streamcode=?',
};

module.exports = liveSqlMapping;