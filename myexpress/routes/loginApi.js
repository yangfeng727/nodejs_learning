var express = require('express');
var router = express.Router();
var md5 = require('md5')
var loginModel = require('../models/login')
var {myEmitter} = require('../common/event')

// 引入统一响应管理文件
var gConfig = require('../common/config')
var response = gConfig.response


router.post('/login', function (req, res, next) {
    var {name, pwd} = req.body
    if (!name || !pwd) return res.status(200).json(response.RESFAIL('账号或密码不能为空'))
    loginModel.findUser(name, function (err, data) {
        if (err) return next(err)
        if (!data || !data.length) { // 用户不存在
            return res.status(200).json(response.RESFAIL('用户不存在')) // 登录失败
        }

        if (md5(pwd) !== data[0].pwd) return res.status(200).json(response.RESFAIL('密码错误'))

        return res.status(200).json(response.SUCCESS('登录成功'))

    })
    // // 异步方式
    // fs.readFile(baseFilePath, 'utf8', function (err, data) {
    //     if (err) next(err)
    //     // 1.获取请求数据
    //     var postData = req.body
    //     // 2.查询用户
    //     var stus = JSON.parse(data).stus
    //     var stu = stus.find(item => item.name === postData.name) // 查询用户
    //
    //     // 3.判断
    //     if (!stu) return res.status(200).json({resultCode: 1, msg: '用户不存在'})
    //     if (stu.pwd !== md5(postData.pwd)) return res.status(200).json({resultCode: 1, msg: '密码错误'}) // 密码是加密后的密码，使用md5
    //
    //     req.session.isLogin = true // 设置session，防翻墙
    //     req.session.userInfo = postData // 存储用户信息
    //     return res.status(200).json({resultCode: 0, msg: '成功'}) // 响应状态码，响应数据
    // })
})

module.exports = router;
