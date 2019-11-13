var express = require('express')
// 创建web服务器
var app = express()
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123qwe',
    database: 'testBase'
});
connection.connect();
app.get('/searchStudent/list.do', function (req, res) {
    // 写sql语句 查询
    connection.query(`SELECT * FROM student`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.status(200).json({
            retCode: "00",
            retMsg: "成功",
            content: {
                list: results
            }
        })
    });
    // connection.end(); // 关闭连接

    // res.status(200).json({
    //     retCode: "00",
    //     retMsg: "成功",
    //     content: {
    //         list: [2011, 2012]
    //     }
    // })
})
app.listen(8080, function () {
    console.log('服务启动成功，访问：http://localhost:8080')
})
