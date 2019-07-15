var express = require('express')
var fs = require('fs')
var md5 = require('md5')
var moment = require('moment') // 时间模块
var router = express.Router() // express的路由方式

var baseFilePath = './db.json'
// 登陆
router.get('/', function (req, res) {
    res.render('login.html')
})

router.post('/', function (req, res, next) {
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






