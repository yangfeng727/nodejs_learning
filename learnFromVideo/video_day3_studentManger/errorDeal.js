// 错误统一处理测试页面
var express = require('express')
var fs = require('fs')
var app = express()

// 配置

// 路由
app.get('/stu', function (req, res, next) {
console.log(11)
})

app.get('/stu', function (req, res, next) {
    fs.readFile('aaaa.txt', 'utf8', function (err, data) {
        if (err) next(err) // next不加参数则交给下一个第一个匹配成功的
                           // next 加参数则交给下面第一个有err参数的
        res.send(data)
    })
})


// 全局错误统一处理中间件
// 统一处理项目500错误
// 注意：参数可以不加，但是都写顺序不更改变
app.use('/', function (err, req, res, next) {
    res.send('网络错误，请稍后再试。。。') // 可自己定义404页面
    // end是nodejs内置的
    // send 是express内置的
    // 区别：send自动识别编码
})
// 监听
app.listen(8080, function () {
    console.log('服务启动成功，访问：http://localhost:8080')
})
