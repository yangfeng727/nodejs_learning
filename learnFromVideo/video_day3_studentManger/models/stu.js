var fs = require('fs')
var moment = require('moment') // 时间模块


var dbPath = './db.json'
// 读取json数据来源文件
exports.find = function (callback) {
    // 获取学生列表数据
    fs.readFile(dbPath, 'utf8', function (err, data) {
        // 判断
        if (err) callback(err)
        callback(null, JSON.parse(data).stus)
    })
}

// 添加学生
exports.add = function (stuOne, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        // 判断
        if (err) callback(err)
        // 3.1获取原有数据
        var stus = JSON.parse(data).stus

        // 3.2处理新数据
        stuOne.createAt = moment().format('YYYY/MM/D h:mm:ss')
        stuOne.id = stus[stus.length - 1].id + 1 // 难点
        // 3.3压入新数据
        stus.push(stuOne)
        // 3.4 写入数据 {注意：写入json文件时，不能直接写对象，需要先转换为字符串再写入}
        fs.writeFile('./db.json', JSON.stringify({stus}), function (err) {
            if (err) callback(err)
            // 3.5判断跳转
            callback(null)
        })
    })
}

/**
 *  根据id获取学生信息
 *  @id 学生id
 * */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) callback(err)
        var stus = JSON.parse(data).stus
        var stu = stus.find(item => item.id == id)
        callback(null, stu)
    })
}

/**
 *  根据id删除学生信息
 *  @id 学生id
 * */
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) callback(err)
        var stus = JSON.parse(data).stus
        var index = stus.findIndex(item => item.id == id)
        console.log(index, 66666)
        stus.splice(index, 1) // 删除当前id对应项
        // 3.4 写入数据 {注意：写入json文件时，不能直接写对象，需要先转换为字符串再写入}
        fs.writeFile(dbPath, JSON.stringify({stus}), function (err) {
            if (err) callback(err)
            // 3.5判断跳转
            callback(null)
        })
    })
}


