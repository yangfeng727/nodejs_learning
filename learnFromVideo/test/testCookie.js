// 错误统一处理测试页面
var express = require('express')
var cookieParse = require('cookie-parser')
var app = express()

// 配置

// md5（'admin','dddadsadas'）cookie加密使用的md5方式，这里设置一个字符串
app.use(cookieParse('tsss')) //如：md5(''admin) 加盐 md5('admin' .$salt)
// 需求：设置cookie数据a=1永久,b=2（1分钟）c=3（加密）d=4(删除)
// 路由
app.get('/set', function (req, res, next) {
// res.cookie(键，值，{signed:是否加密true-是，false-否默认,maxAge：时间/毫秒})
    res.cookie('a', 1)
    res.cookie('b', 2, {maxAge: 60 * 1000})
    res.cookie('c', 3, {signed: true})
    res.cookie('d', 4)
    res.send('设置成功，请通过/get获取')
})

app.get('/get', function (req, res, next) {
    // 获取(未加密):req.cookies
    // 获取(  加密):req.signedCookies
    console.log(req.cookies)
    console.log('a: ', req.cookies.a)
    console.log('b: ', req.cookies.b)
    console.log('c: ', req.cookies.c)
    console.log('d: ', req.cookies.d)
    console.log('获取加密后的 c: ', req.signedCookies.c)
    res.send('获取成功，请查看控制台')
})

app.get('/del', function (req, res, next) {
// 清除 res.clearCookie(键)
    res.clearCookie('d')
    res.send('删除成功，请请求/get查看控制台')
})

// 全局错误统一处理中间件
// 统一处理项目500错误


// 注意：参数可以不加，但是都写顺序不更改变
// app.use('/', function (err, req, res, next) { // ‘/’可以不写，效果一样
app.use(function (err, req, res, next) {
    res.send('网络错误，请稍后再试。。。') // 可自己定义404页面
    // end是nodejs内置的
    // send 是express内置的
    // 区别：send自动识别编码
})

// 监听
app.listen(8080, function () {
    console.log('服务启动成功，访问：http://localhost:8080')
})
