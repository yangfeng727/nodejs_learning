var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123qwe',
    database: 'testBase'
});

connection.connect();

// 写sql语句 查询
connection.query(`SELECT * FROM student`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end();
