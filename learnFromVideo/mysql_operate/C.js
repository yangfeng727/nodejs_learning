var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123qwe',
    database: 'testBase'
});

connection.connect();

// 写sql语句 插入
connection.query(`INSERT INTO student VALUES (null,'xx','14','女','2019-07-29 10:21:42')`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end();
