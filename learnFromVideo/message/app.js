var http = require('http')
var fs = require('fs')
var url = require('url') // 解析地址栏参数
var querystring = require('querystring')
// 创建web服务器
var server = http.createServer()

/**
 *  @path 请求文件路径
 *  @callback 回调
 * */
var comFn = function (res, path, callback) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            res.statusCode = 404
            res.end('404 Not Found')
        }
        callback && callback(data)
    })
}

var fn = function (val) {
    if (parseInt(val) < 10) {
        return '0' + val
    }
    return val
}

var dataBase = [
    {name: '小明', content: '你好啊', createAt: '2019/07/01 12:05:03'},
    {name: '小明', content: '你好啊', createAt: '2019/07/01 12:05:03'},
    {name: '小明', content: '你好啊', createAt: '2019/07/01 12:05:03'}
]
// 监听用户请求
server.on('request', function (req, res) {
    console.log('收到用户请求,请求地址： ', req.url)

    if (/^\/public\/.*/.test(req.url)) { // 静态资源 // 或者 req.url.indexOf('/public')==0
        comFn(res, './' + req.url, function (data) {
            res.write(data)
            res.end()
        })
    } else if (req.url === '/') { // 留言板页面
        comFn(res, './view/index.html', function (data) {

            // 数据渲染
            var html = ''
            dataBase.forEach((item) => {
                html += `<li><span>${item.name}说：${item.content}</span><span>创建时间：${item.createAt}</span></li>`
            })
            data = data.replace('^-^', html) // 替换字符串
            res.setHeader('Content-Type', 'text/html;charset=utf-8') // 防止乱码
            res.write(data)
            res.end()
        })
    } else if (req.url === '/add') { // 表单提交页
        comFn(res, './view/post.html', function (data) {
            res.setHeader('Content-Type', 'text/html;charset=utf-8') // 防止乱码
            res.write(data)
            res.end()
        })
    } else if (req.url.indexOf('/addMsg') > -1) { // 接口 新增留言

        /**
         *  post、get公共方法
         * */
        var dealFn=function (paramObj) {
            var myDate = new Date();
            var timeC = `${myDate.getFullYear()}/${fn(myDate.getMonth() + 1)}/${fn(myDate.getDate())} ${fn(myDate.getHours())}:${fn(myDate.getMinutes())}:${fn(myDate.getSeconds())}`
            dataBase.push({
                name: paramObj.name,
                content: paramObj.content,
                createAt: timeC
            })
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()
        }

        if (req.method === 'GET') {
            var paramObj = url.parse(req.url, true).query
            dealFn(paramObj)
        } else if (req.method === 'POST') { // post 请求为数据块传递
            var postData = ''
            req.on("data", function (postDataChunk) {
                postData += postDataChunk;
            });
            req.on("end", function () { // 数据接收完毕
                var paramObj = querystring.parse(postData)
                dealFn(paramObj)
            });
        }
    } else { // 404
        comFn(res, './view/404.html', function (data) {
            res.setHeader('Content-Type', 'text/html;charset=utf-8') // 防止乱码
            res.write(data)
            res.end()
        })
    }

})
// 启动服务器
server.listen(8080, function () {
    console.log('服务启动成功，访问：http://localhost:8080')
})
