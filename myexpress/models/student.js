var dataBase = require('./collectMongoDB')
var ObjectId = require('mongodb').ObjectID;//Work
var {appLog} = require('../common/log');


let baseName = 'test' // 数据库名称
let tbName = 'student' // 集合（表）名称

/** student 表
 *  查询学生列表
 * */
exports.findStudentList = function (callback) {
    dataBase.collectMongoDB(function (err,client) {
        if (err) {
            return callback(err)
        }
        var dbo = client.db(baseName);
        dbo.collection(tbName).find({}).toArray(function(err, result) { // 返回集合中所有数据
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


/** student 表
 *  删除学生
 *  @id:
 * */
exports.delStudentOne = function (id,callback) {
    dataBase.collectMongoDB(function (err,client) {
        if (err) {
            return callback(err)
        }
        var dbo = client.db(baseName);
        dbo.collection(tbName).findAndRemove({'_id':ObjectId(id)}, function(err, result) {
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