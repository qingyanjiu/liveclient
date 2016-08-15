var guid = require('./guid');
var Date = require('./MyDate');
var md5 = require('md5');

// console.log(guid.create());
// console.log(md5(123456));
var myDate = new Date();
var date = myDate.pattern("yyyy-MM-dd HH:mm:ss");
console.log(date);


