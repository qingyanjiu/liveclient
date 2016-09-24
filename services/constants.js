var rf = require("fs");
var serverip = rf.readFileSync("conf/ServerIp", "utf-8");
var dbip = rf.readFileSync("conf/DBIp","utf-8");

var constants = {
    TITLE: "木木直播",

    DB_ALIA: dbip,

    PIC_URL: "http://" + serverip.trim() + ":8099/",

    SERVER_URL: serverip.trim(),
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

    LIVE_STATUS_STARTED: "0",
    LIVE_STATUS_ENDED: "1",
};

module.exports = constants;