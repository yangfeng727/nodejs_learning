var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017/"
var {appLog} = require('../common/log');

// 这里后面使用的话需要改造下 - 每次连接关闭数据库是不可取的，应该使用数据库连接池
exports.collectMongoDB = function (callback) {
    MongoClient.connect(dburl, function(err, client) {
        if (err) {
            appLog(dburl+"数据库连接失败!")
            // console.log("数据库连接失败!");
            return callback(err)
        }
        // console.log("数据库已创建!");
        callback(null,client)
    });
}