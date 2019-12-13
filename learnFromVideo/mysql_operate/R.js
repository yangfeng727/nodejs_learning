var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123qwe',
    database: 'testBase'
});

connection.connect();

// // 写sql语句 查询
// connection.query(`SELECT * FROM student`, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
// });
//
// connection.end();


// 60秒后断开查询
connection.query({sql: 'SELECT * FROM student', timeout: 60000}, function (err, results) {
    if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
        throw new Error('表 count 操作超时！');
    }

    if (err) {
        throw err;
    }

    console.log('The solution is: ', results);
});
