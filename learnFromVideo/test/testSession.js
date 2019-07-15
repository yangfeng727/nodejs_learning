// 错误统一处理测试页面
var express = require('express')
var expressSession = require('express-session')
var app = express()

// 配置
// md5（'admin','dddadsadas'）cookie加密使用的md5方式，这里设置一个字符串
app.use(expressSession({
    secret: 'teststring', // md5加密存储
    resave: false, // 客户端并行请求是否覆盖:true-是,false-否
    saveUninitialized: true // 初始化session存储
}))
// 需求：设置session数据a=1,b=2,c=3最后删除c
// 路由
app.get('/set', function (req, res, next) {
    req.session.a = 1
    req.session.b = 2
    req.session.c = 3
    res.send('设置成功，请通过/get获取')
})

app.get('/get', function (req, res, next) {
    console.log(req.session.a)
    console.log(req.session.b)
    console.log(req.session.c)
    res.send('获取成功，请查看控制台')
})

app.get('/del', function (req, res, next) {
    req.session.c = null
    res.send('删除成功，请请求/get查看控制台')
})

// 监听
app.listen(8080, function () {
    console.log('服务启动成功，访问：http://localhost:8080')
})
