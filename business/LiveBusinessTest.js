'use strict';

var liveBusiness = require('./LiveBusiness');
var constants = require('../services/constants');


// -------------------------------------------------startLive
// var param = {};
// param.user_id = "68A29D8B-6796-4603-A8C1-9550A585E2BB";
// param.end_time = "";
//
// liveBusiness.startLive(param, (err, result)=> {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
// ----------------------------------------------------

// ----------------------------------------------------endLive
// var param = {};
// param.user_id = "68A29D8B-6796-4603-A8C1-9550A585E2BB";
// liveBusiness.endLive(param, (err, result)=> {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
// ----------------------------------------------------

// ----------------------------------------------------queryAllLives
// var param = {};
// liveBusiness.queryAllLives(param, (err, result)=> {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
// ----------------------------------------------------

// ----------------------------------------------------queryLiveHistory
// var param = {};
// param.user_id = "68A29D8B-6796-4603-A8C1-9550A585E2BB";
// liveBusiness.queryLiveHistory(param, (err, result)=> {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
// ----------------------------------------------------


// ----------------------------------------------------queryMyCurrentLive
var param = {};
param.user_id = "68A29D8B-6796-4603-A8C1-9550A585E2BB";
liveBusiness.queryMyCurrentLive(param, (err, result)=> {
    if (err) {
        console.log(err);
    }
    console.log(result);
});