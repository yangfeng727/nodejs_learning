var dataBase = require('./collectMongoDB')
var {appLog} = require('../common/log');

let baseName = 'test' // 数据库名称
let tbName = 'student' // 集合（表）名称

// 根据用户名查询当前用户信息-用户不能重复
exports.findUser = function (userName,callback) {
    dataBase.collectMongoDB(function (err,client) {
        if (err) {
            return callback(err)
        }
        var dbo = client.db(baseName);
        dbo.collection(tbName). find({name:userName},{name:1,pwd:1}).toArray(function(err, result) { // 返回集合中所有数据
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
