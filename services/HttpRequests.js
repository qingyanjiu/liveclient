'use strict';
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

//请求观众数量
exports.requestViewerCount = function (url, callback) {
    //查询具体信息
    request({encoding: null, url: url}, function (err, res, body) {
        if (err)
            return console.error(err);
        if (body) {
            let ht = iconv.decode(body, 'gbk');
            let $ = cheerio.load(ht);
            callback(null,$.html());
        }
    });
}
