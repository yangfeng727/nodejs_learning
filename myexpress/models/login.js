var dataBase = require('./collectMongoDB')
var {appLog} = require('../common/log');

let baseName = 'test' // 数据库名称
let tbName = 'student' // 集合（表）名称

/** student 表
 * 根据用户名查询当前用户信息-用户不能重复
 * @name 用户名
 * */
exports.findUser = function (name,callback) {
    dataBase.collectMongoDB(function (err,client) {
        if (err) {
            return callback(err)
        }
        var dbo = client.db(baseName);
        // //要查询数据的条件，<=10岁的用户
        // var  where={age:{"$lte":10}};
        // //要显示的字段
        // var set={name:1,age:1};
        dbo.collection(tbName).find({name:name},{name:1,pwd:1}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) {
                appLog(`表${baseName}/${tbName}操作出错`);
                return callback(err)
            }
            // console.log(result);
            callback(null,result)
            client.close();
        });
    })
}


/**
 * student 表
 * 新增数据
 * @{name,pwd] 用户名，密码
 * */
exports.insertUser = function ({name,pwd},callback) {
    dataBase.collectMongoDB(function (err,client) {
        if (err) {
            return callback(err)
        }
        var dbo = client.db(baseName);
        dbo.collection(tbName).insertMany([
            {name:name,pwd:pwd}
        ], function(err, result) {
            if (err) {
                appLog(`表${baseName}/${tbName}操作出错`);
                return callback(err)
            }
            // console.log(result);
            callback(null,result)
            client.close();
        });
    })
}