var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');// post提交需要使用的 node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
var multer = require('multer'); // node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据

var cookieParser = require('cookie-parser')
var util = require('util');
app.use(cookieParser())

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '/tmp/'}).array('image'));

app.get('/', function (req, res) {
    // console.log("Cookies: " + util.inspect(req.cookies));
    res.end("Cookies: " + util.inspect(req.cookies))
})

app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
})

// get提交
app.get('/process_get', function (req, res) {

    // 输出 JSON 格式
    var response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

// post提交
app.post('/process_post', function (req, res) {

    // 输出 JSON 格式
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

// 文件上传
app.post('/file_upload', function (req, res) {

    console.log(req.files[0]);  // 上传的文件信息

    var uploadPath = '/public/upload/'; // public 目录设置了的才能访问
    var des_file = __dirname + uploadPath + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            var response;
            if (err) {
                console.log(err);
                response = {
                    message: 'Upload failed'
                };
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
            res.end(JSON.stringify(response)+'<img src=\''+uploadPath+req.files[0].originalname+'\' />');
        });
    });
})

// 这里不设置127.0.0.1 会打印为http://:::8081
var server = app.listen(8081, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
