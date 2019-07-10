var dataBase = [
    {name: '小明', content: '你好啊', createAt: '2019/07/01 12:05:03'},
    {name: '小明', content: '你好啊', createAt: '2019/07/01 12:05:03'},
    {name: '小明', content: '你好啊', createAt: '2019/07/01 12:05:03'}
]

var express = require('express')
var url = require('url') // 解析地址栏参数
var moment = require('moment') // 时间模块

// 创建web服务器
var app = express()
// 配置模板引擎（ps:使用render方法必须）
app.engine('html', require('express-art-template'))
// 在express中
// 作用：允许指定目录下的文件被外访问
// 语法：express.static('目录名')
// 返回：一个函数，可理解为读取URL需要读取的文件
app.use('/public', express.static('public'))
// 路由

// 留言板列表
app.get('/', function (req, res) {
    res.render('index.html', {
        dataBase: dataBase
    })
})
// 留言板新增
app.get('/add', function (req, res) {
    res.render('post.html')
})
// 留言板新增处理
app.get('/addMsg', function (req, res) {
    var paramObj = url.parse(req.url, true).query
    var date = moment().format('YYYY/MM/D h:mm:ss')
    dataBase.push({
        name: paramObj.name,
        content: paramObj.content,
        createAt: date
    })
    res.redirect('/') // 跳转
})
app.listen(8080, function () {
    console.log('服务启动成功，访问：http://localhost:8080')
})
