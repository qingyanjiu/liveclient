'use strict';

var userBusiness = require('./userBusiness');
var constants = require('../services/constants');


// -------------------------------------------------userRegisterTest
		    var param = {};
        param.username = "test";
        param.password = "111111";
        param.gender = constants.GENDER_MALE;
        param.nick = "testnick";
        // param.register_date = dateTime;
        param.last_login_date = "";
        // param.true_name_cert = constants.TRUENAME_UNCERTED;
        param.true_name = "";
        param.phone_number = "";
        param.email = "";
        // param.status = constants.USER_STATUS_INUSE;

        userBusiness.register(param,(err,result)=>{
        	if(err){
        		console.log(err);
        	}
        	console.log(result);
        });
// ----------------------------------------------------

// ----------------------------------------------------userLoginTest
			// var loginParam = {};
			// loginParam.username = "test";
			// loginParam.password = "111111";
			// userBusiness.login(loginParam,(err,result)=>{
			// 	if(err){
			//        console.log(err);
			//     }
			//        console.log(result[0].id);
			// });
// ----------------------------------------------------

