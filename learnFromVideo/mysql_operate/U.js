var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123qwe',
    database: 'testBase' // 数据库名称
});

connection.connect();

// 写sql语句 修改
connection.query(`update student set student_name = '哈哈哈' where student_id = 1`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end();
