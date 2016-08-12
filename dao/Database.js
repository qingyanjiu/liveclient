var mysql = require('mysql');
var config = require('../conf/db');

var pool = mysql.createPool(config.mysql);

exports.pool = pool;