var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123qwe',
    database: 'testBase' // 数据库名称
});

connection.connect();

// 写sql语句 删除
connection.query(`delete from student where student_id = 1`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end();
