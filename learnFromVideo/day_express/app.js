var express = require('express')
// 创建web服务器
var app = express()
// 配置模板引擎（ps:使用render方法必须）
app.engine('html', require('express-art-template'))
// 在express中
// 作用：允许指定目录下的文件被外访问
// 语法：express.static('目录名')
// 返回：一个函数，可理解为读取URL需要读取的文件
app.use('/public',express.static('public'))
// 路由
app.get('/', function (req, res) {
    // end() 响应字符串  (乱码)
    // send() 响应字符串  (自动识别)
    // render() 响应字符串  (自动识别，只能打开指定文件字符串并响应，注意：必须配合模板引擎使用)

    // eg:
    // res.send("阿大撒大撒打开啥都看")

    // render 配合art模板引擎渲染视图
    res.render('test1.html', {
        username: '测试名',
        age: 5,
        orders: [
            {id: 1, title: '标题1', price: 30},
            {id: 2, title: '标题2', price: 20},
            {id: 3, title: '标题3', price: 10}
        ]
    })
})
app.listen(8080, function () {
    console.log('服务启动成功，访问：http://localhost:8080')
})
