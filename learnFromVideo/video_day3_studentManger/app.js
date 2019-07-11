var express = require('express')
var bodyParser = require('body-parser');// 解析post请求数据 post提交需要使用的 node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
// 创建web服务器
var app = express()
app.engine('html', require('express-art-template'))
app.use('/public', express.static('public'))

app.use(bodyParser.json());// 解析文本格式数据（application/json）  解析后放到req对象的body属性中
app.use(bodyParser.urlencoded({extended: false})); // 解析文本格式数据（application/x-www-form-urlencoded）
// 路由

// 学生管理路由
var stuRouter = require('./routes/stu')
app.use('/stu', stuRouter)

app.listen(8080, function () {
    console.log('服务启动成功，访问：http://localhost:8080')
})
