var express = require('express')
var fs = require('fs')
var md5 = require('md5')
var moment = require('moment') // 时间模块
var expressSession = require('express-session')
var router = express.Router() // express的路由方式

var baseFilePath = './db.json'

// 配置
router.use(expressSession({
    secret: 'teststring', // md5加密存储
    resave: false, // 客户端并行请求是否覆盖:true-是,false-否
    saveUninitialized: true // 初始化session存储
}))

// 设置拦截器
router.use(function (req, res, next) {
    // 用户访问的不是登录页 && 注册页 则验证身份
    if (req.url !== '/login' && req.url !== '/reg' && req.url !=='/favicon.ico') {
        console.log('路由拦截器',req.url)
        if (!req.session.isLogin) return res.redirect('/login')
    }
    // 其他则匹配下一步
    next()
})

// 登陆
router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res, next) {
    console.log('访问登陆接口中。。。')
    // 异步方式
    fs.readFile(baseFilePath, 'utf8', function (err, data) {
        if (err) next(err)
        // 1.获取请求数据
        var postData = req.body
        // 2.查询用户
        var stus = JSON.parse(data).stus
        var stu = stus.find(item => item.name === postData.name) // 查询用户

        // 3.判断
        if (!stu) return res.status(200).json({resultCod: 1, msg: '用户不存在'})
        if (stu.pwd !== md5(postData.pwd)) return res.status(200).json({resultCod: 1, msg: '密码错误'}) // 密码是加密后的密码，使用md5

        req.session.isLogin = true // 设置session，防翻墙
        req.session.userInfo = postData // 存储用户信息
        return res.status(200).json({resultCod: 0, msg: '成功'}) // 响应状态码，响应数据
    })
    // // 同步方式
    // // 1.获取请求数据
    // var postData = req.body
    //
    // var stus = fs.readFileSync('./db.json', 'utf8')
    // // 2.查询用户
    // stus = JSON.parse(stus).stus
    // var stu = stus.find(item => item.name === postData.name) // 查询用户
    //
    // // 3.判断
    // if (!stu) return res.status(200).json({resultCod: 1, msg: '用户不存在'})
    // if (stu.pwd !== md5(postData.pwd)) return res.status(200).json({resultCod: 1, msg: '密码错误'}) // 密码是加密后的密码，使用md5
    // return res.status(200).json({resultCod: 0, msg: '成功'}) // 响应状态码，响应数据
})


// 退出登陆
router.get('/loginOut', function (req, res) {
    // 1.清除session
    req.session.isLogin = null
    req.session.userInfo = null
    // 2.跳转登陆
    res.redirect('/login')
})

// 注册
router.get('/reg', function (req, res) {
    res.render('register.html')
})

router.post('/reg', function (req, res, next) {

    //  1.读取文件
    fs.readFile(baseFilePath, 'utf8', function (err, data) {
        if (err) return next(err)
        // 2.获取参数
        var postData = req.body
        var stus = JSON.parse(data).stus
        //  3.判断存在
        var stu = stus.find(item => item.name === postData.name)
        if (stu) return res.status(200).json({resultCod: 1, msg: '用户已存在'})
        //  4.组装数据
        stus.push({
            "id": stus[stus.length - 1].id + 1,
            "name": postData.name,
            "pwd": md5(postData.pwd),
            "age": "",
            "sex": "",
            "createAt": moment().format('YYYY/MM/D h:mm:ss')
        })
        //  5.写入数据
        fs.writeFile(baseFilePath, JSON.stringify({stus: stus}), function (err) {
            if (err) return next(err)
            return res.status(200).json({resultCod: 0, msg: '注册成功'})
        })
    })
})

// 统一错误处理
router.use(function (err, req, res, next) {
    res.status(500).json({resultCod: 500, msg: '服务器异常。。。'})
})
module.exports = router






