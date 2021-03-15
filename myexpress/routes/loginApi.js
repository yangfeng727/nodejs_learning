var express = require('express');
var router = express.Router();
var md5 = require('md5')
var loginModel = require('../models/login')
var {myEmitter} = require('../common/event')

// 引入统一响应管理文件
var gConfig = require('../common/config')
var response = gConfig.response


// 登录
router.post('/login', function (req, res, next) {
    var {name, pwd} = req.body
    if (!name || !pwd) return res.status(200).json(response.RESFAIL('账号或密码不能为空'))
    loginModel.findUser(name, function (err, data) {
        if (err) return next(err)
        if (!data || !data.length) { // 用户不存在
            return res.status(200).json(response.RESFAIL('用户不存在')) // 登录失败
        }

        if (md5(pwd) !== data[0].pwd) return res.status(200).json(response.RESFAIL('密码错误'))

        req.session.isLogin = true // 设置session，防翻墙
        req.session.userName = name // 存储用户信息

        return res.status(200).json(response.SUCCESS('登录成功'))

    })
})


// 注册
router.post('/reg', function (req, res, next) {
    var {name, pwd} = req.body
    if (!name || !pwd) return res.status(200).json(response.RESFAIL('账号或密码不能为空'))
    loginModel.findUser(name, function (err, data) {
        if (err) return next(err)
        if (data && data.length) {
            return res.status(200).json(response.RESFAIL('该用户已存在'))
        }

        // 插入
        loginModel.insertUser({name,pwd:md5(pwd)}, function (err, data) {
            if (err) return next(err)
            return res.status(200).json(response.SUCCESS('注册成功'))

        })

    })

})


module.exports = router;
