// var moment = require('moment') // 时间模块
// // 管理 学生路由
// module.exports=function (app,fs) {
//     // 》页面跳转《
// // 学生列表
//     app.get('/stu', function (req, res) {
//
//         // 获取学生列表数据
//         fs.readFile('./db.json', 'utf8', function (err, data) {
//             // 判断
//             if (err) res.send('server Error.')
//             // console.log(data.stus, 444) // 特别注意：从文件获取过来是字符串
//             // 渲染
//             res.render('index.html', {
//                 studentList: JSON.parse(data).stus
//             })
//         })
//     })
//
// // 学生添加页
//     app.get('/stu/create', function (req, res) {
//         res.render('post.html')
//     })
//
// // 》接口处理《
// // 添加学生
//     app.post('/stu/create', function (req, res) {
//         // res.render('post.html')
//         console.log(req.body) // { name: '', pwd: '', age: '', sex: '女' }
//         // 1.接受数据
//         var stuOne = req.body
//         // 2.过滤数据
//
//         // 3.入库 获取数据库数据，压入新数据（因为是操作文件增加复杂度，如果是数据库则直接插入）
//         fs.readFile('./db.json', 'utf8', function (err, data) {
//             // 判断
//             if (err) res.send('server Error.')
//             // 3.1获取原有数据
//             var stus = JSON.parse(data).stus
//
//             // 3.2处理新数据
//             stuOne.createAt = moment().format('YYYY/MM/D h:mm:ss')
//             stuOne.id = stus[stus.length - 1].id + 1 // 难点
//             // 3.3压入新数据
//             stus.push(stuOne)
//             // 3.4 写入数据 {注意：写入json文件时，不能直接写对象，需要先转换为字符串再写入}
//             fs.writeFile('./db.json', JSON.stringify({stus}), function (err) {
//                 if (err) res.send('server Error.')
//                 // 3.5判断跳转
//                 res.redirect('/stu')
//             })
//         })
//     })
//
// }

var express = require('express')
var router = express.Router() // express的路由方式

//学生管理 models
var stuModel = require('../models/stu')
// 管理 学生路由

// 》页面跳转《
// 学生列表
router.get('/', function (req, res) {
    stuModel.find(function (err, data) {
        if (err) res.status(500).send('server Error.')
        res.render('index.html', {
            studentList: data
        })
    })
})

// 学生添加页
router.get('/create', function (req, res) {
    res.render('post.html')
})

// 》接口处理《
// 添加学生
router.post('/create', function (req, res) {
    // res.render('post.html')
    // console.log(req.body) // { name: '', pwd: '', age: '', sex: '女' }
    // 1.接受数据
    var stuOne = req.body
    // 2.过滤数据

    // 3.入库 获取数据库数据，压入新数据（因为是操作文件增加复杂度，如果是数据库则直接插入）
    stuModel.add(stuOne, function (err) {
        if (err) res.status(500).send('server Error.')
        res.redirect('/stu')
    })
    // fs.readFile('./db.json', 'utf8', function (err, data) {
    //     // 判断
    //     if (err) res.send('server Error.')
    //     // 3.1获取原有数据
    //     var stus = JSON.parse(data).stus
    //
    //     // 3.2处理新数据
    //     stuOne.createAt = moment().format('YYYY/MM/D h:mm:ss')
    //     stuOne.id = stus[stus.length - 1].id + 1 // 难点
    //     // 3.3压入新数据
    //     stus.push(stuOne)
    //     // 3.4 写入数据 {注意：写入json文件时，不能直接写对象，需要先转换为字符串再写入}
    //     fs.writeFile('./db.json', JSON.stringify({stus}), function (err) {
    //         if (err) res.send('server Error.')
    //         // 3.5判断跳转
    //         res.redirect('/stu')
    //     })
    // })
})


// 学生详情页    next：若要继续往下匹配则必须执行next()
router.use('/detail', function (req, res, next) {
    var id = req.query.id // 获取参数
    stuModel.findById(id, function (err, data) {
        if (err) res.status(500).send('server Error.')
        res.render('detail.html', {
            stu: data
        })
    })
})

// 删除当前学生信息
router.use('/delete', function (req, res, next) {
    var id = req.query.id // 获取参数
    stuModel.deleteById(id, function (err) {
        if (err) res.status(500).send('server Error.')
        res.redirect('/stu')
    })
})

module.exports = router






