var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017/"
var {appLog} = require('../common/log');

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