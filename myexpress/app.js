var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

// 路由
var indexRouter = require('./routes/index');
var loginApi = require('./routes/loginApi');
var studentApi = require('./routes/studentApi');

// 自定义方法
var {httplog} = require('./common/httplog');
var {appLog, initLog} = require('./common/log');
var {myEmitter} = require('./common/event');

// 引入统一响应管理文件
var gConfig = require('./common/config')
var response = gConfig.response

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// log
initLog()
httplog(app)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', indexRouter);
app.use('/auth', loginApi);
app.use('/student', studentApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    if(req.path.endsWith('.html')){
        res.status(err.status || 500).json(response.SERVERERROR())
    }else{
        res.status(err.status || 500);
    }

  appLog(err)
  res.render('error');
});

module.exports = app;
