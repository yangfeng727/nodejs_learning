var http = require('http')
// 创建web服务器
var server = http.createServer()
// 监听用户请求
server.on('request', function (req, res) {
    console.log('收到用户请求,请求地址： ', req.url)
    // var $msg
    // if(req.url==='/'){
    //     $msg='this is index'
    // }else if(req.url==='/login'){
    //     $msg='this is login'
    // }else{
    //     $msg='404'
    // }

    // console.log(req.method) // 获取请求方法
    // console.log(req.url) // 获取请求地址

    // 改写状态
    // res.statusCode = 404
    // res.statusMessage = 'Not Found'
    // 改写状态简写
    res.writeHeader(404, 'Not Found', {
        'Content-Type': 'text/html;charset=utf-8'
    })

    // 跳转页面
    // res.statusCode = 301
    // res.setHeader('Location','/')

    // 留心：有请求必须有响应，没有响应网页无法打开
    // res.setHeader('Content-Type', 'text/html;charset=utf-8') // 防止乱码
    res.write('ddd')
    res.end()
})
// 启动服务器
server.listen(8080, function () {
    console.log('服务启动成功，访问：http://localhost:8080')
})
