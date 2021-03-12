var logger = require('morgan');
var fs = require('fs');
var path = require('path');
var FileStreamRotator = require('file-stream-rotator');

exports.httplog = function (app) {
    app.use(logger('dev'));
    var logDirectory='./logs/httplog'; // http请求log日志文件目录
    !fs.existsSync(logDirectory) && fs.mkdirSync(logDirectory);

    var accessLogStream=FileStreamRotator.getStream({
        filename:logDirectory+'/accss-%DATE%.log',
        frequency:'daily',
        verbose:false
    })

    app.use(logger('combined',{stream:accessLogStream})); //写入日志文件
}