var rf = require("fs");
var serverip = rf.readFileSync("conf/ServerIp", "utf-8");
var dbip = rf.readFileSync("conf/DBIp","utf-8")
var clientip = rf.readFileSync("conf/WebClientIp","utf-8");

var constants = {
    TITLE: "木木直播",

    //数据库别名或者ip地址
    DB_ALIA: dbip,

    //预览图片前缀
    PIC_URL: "http://" + serverip.trim() + ":8099/",

    //推流的服务端别名或者ip地址
    SERVER_URL: serverip.trim(),

    //web客户端域名或者ip地址
    WEB_CLIENT_URL: clientip.trim(),

    //推流的流名称
    LIVE_STREAM_NAME: "live",

    USER_STATUS_INUSE: "0",
    USER_STATUS_STOPPED: "1",
    USER_STATUS_BANNED: "2",

    STREAM_LIVEING: "0",
    STREAM_RESTING: "1",

    GENDER_MALE: "0",
    GENDER_FEMALE: "1",

    TRUENAME_CERTED: "0",
    TRUENAME_UNCERTED: "1",

    //直播间状态：已开启，未开播
    LIVE_STATUS_STARTED: "0",
    //直播间状态：关闭
    LIVE_STATUS_ENDED: "1",
    //直播间状态：已开启，已开播
    LIVE_STATUS_LIVING: "9",
};

module.exports = constants;