const express = require('express');
const router = express.Router();
const md5 = require('md5')
const studentModel = require('../models/student')
const {myEmitter} = require('../common/event')

// 引入统一响应管理文件
const gConfig = require('../common/config')
const response = gConfig.response
const authLoginFilter = gConfig.authLoginFilter


// 查询学生列表-需要权限判断
router.get('/getList', function (req, res, next) {
    if(authLoginFilter(req)) return res.status(200).json(authLoginFilter(req)) // 登录权限过滤

    studentModel.findStudentList(function (err, data) {
        if (err) return next(err)
        return res.status(200).json({...response.SUCCESS(),data:data})
    })
})

// 根据id删除学生-需要权限判断
router.post('/delStudent', function (req, res, next) {
    var {id} = req.body
    if(!id) return res.status(200).json({...response.RESFAIL('参数错误')})
    if(authLoginFilter(req)) return res.status(200).json(authLoginFilter(req)) // 登录权限过滤

    // 此处可以加上逻辑（先根据查询当前用户信息和登录信息对比，删除的是登录用户，则清除登录状态（清楚 session || req.session.isLogin = false)）

    studentModel.delStudentOne(id,function (err, data) {
        if (err) return next(err)
        return res.status(200).json({...response.SUCCESS()})
    })
})

module.exports = router;
