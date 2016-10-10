var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var partials = require('express-partials');
var session = require('express-session');
// var flash = require('connect-flash');
var fs = require('fs');

// var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');

var routes = require('./routes/index');
var userRoutes = require('./routes/User');
var liveRoutes = require('./routes/Live');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(partials());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));
app.use(cookieParser());


//
//session控制，过滤用户是否登录
//

//将sessionstore保存到内存中,sessionstore里包含了所有session的信息
var sessionStore = new session.MemoryStore({reapInterval: 60000 * 10});

app.use(session({
    secret: 'alaien', // 建议使用 128 个字符的随机字符串
    name: 'alaien_session',
    store: sessionStore,
    cookie: {maxAge: 60 * 1000 * 30},
    resave: false,
    saveUninitialized: true
}));
//写入store变量，后台可以通过app。get('store')获取
app.set('store', sessionStore);


app.use(express.static(path.join(__dirname, 'public')));

//过滤器！！！！！！！！！！！！！
app.use(function (req, res, next) {
    // //如果传过来的参数里有sessionid，说明是手机端来的，先去找session，再写入req
    // var param = req.body || req.query;
    // if(param.sessionid){
    //   //获取sessionstore
    //   app.get('store');
    //   //用sessionid去找session
    //   sessionStore.get(param.sessionid, function(err,session){
    //     //如果没找到
    //     if(err || !session){
    //       console.log(param.sessionid+"session过期了");
    //       res.json({"result":"expired"});
    //     }
    //     //如果找到了，把session写入req
    //     else{
    //       //登录类型，如果是手机，登录时带一个登录类型的type字段mobile
    //       session.type = param.type;
    //       req.session.type = session.type;
    //       req.session.user_id = session.user_id;
    //       req.session.user_name = session.user_name;
    //     }
    //   });
    // }


    //获取访问的设备类型
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    //判断是不是手机
    var phone = deviceAgent.match(/(iphone|ipod|android)/);
    //判断是不是pad
    var pad = deviceAgent.match(/(ipad)/);
    var type = "phone";
    if(pad)
        type = "pad";
    //如果是手机，直接跳转到手机端的直播列表；如果是pad，调到pad端的直播列表
    if (phone || pad) {
        var url = req.originalUrl;
        if (url.indexOf("/live/mobile/") == -1)
            return res.redirect("/live/mobile/list/"+type);
        next();
    }

    //否则是电脑端,浏览器直接去session判断
    else {
        // 检查 session 中的 字段判断是否登录
        // 如果存在则通过，否则跳转到首页
        //首页、登录、注册请求，不会被过滤
        var url = req.originalUrl;
        if (url != "/"
            //初始化数据库的相关请求，不会被过滤
            && url != "/init"
            && url != "/initDatabase"
            //用户登录注册、注销请求不会被过滤
            && url != "/user/login"
            && url != "/user/register"
            && url != "/user/login"
            //查看直播列表请求，不会被过滤
            && url != "/live/list"
            //跳转到某个用户直播间的请求，不会被过滤
            && url.indexOf("/live/show/") == -1
            //查询当前直播间观看用户数量的请求，不会被过滤
            && url != "/live/viewerCount"
            //查看弹幕列表请求，不会被过滤
            && url != "/live/danmuList"
            //登录的用户，不会被过滤
            && !req.session.userid
            //移动端相关请求url，均过滤
            || url.indexOf("/live/mobile") != -1
            ) {
            return res.redirect("/");
        }
        next();
    }
});

app.use(morgan('common'));


// app.use(flash());


app.use(function (req, res, next) {

    // res.locals.title = config['title']
    res.locals.csrf = req.session ? req.session._csrf : '';
    res.locals.req = req;
    res.locals.session = req.session;
    // res.locals.success=req.flash("success").lenghth?req.flash("success"):null;
    // res.locals.error=req.flash("error").lenghth?req.flash("error"):null;
    // res.locals.result=req.flash("result").lenghth?req.flash("result"):null;


    var _send = res.send;
    var sent = false;
    res.send = function (data) {
        if (sent) return;
        _send.bind(res)(data);
        sent = true;
    };

    next();
});


app.use('/', routes);
app.use('/user', userRoutes);
app.use('/live', liveRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;