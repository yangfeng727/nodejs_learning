# 留言板案例学习心得
### 1.请求都需要结束 res.end()
### 2.需要考虑静态资源获取，请求时利用fs模块读取，然后 res.write(data)，
注意：这里不用写入 res.setHeader('Content-Type', 'text/html;charset=utf-8')，因为静态如css这样的静态资源mime码不是用text/html解析
### 3.读取文件时也需要utf8,防止乱码，渲染html时也需要设置 res.setHeader('Content-Type', 'text/html;charset=utf-8') // 防止乱码
### 4.post和get提交
    （1）get提交，直接使用url模块解析 var paramObj = url.parse(req.url, true).query  
    （2）post提交，先接收完数据，然后使用querystring模块解析 var paramObj = querystring.parse(postData)
```        
            // post方法由于数据过大，需要使用分块接受
            var postData = ''
            req.on("data", function (postDataChunk) {
                postData += postDataChunk;
            });
            req.on("end", function () { // 数据接收完毕
                var paramObj = querystring.parse(postData)
                dealFn(paramObj)
            });
```
### 5.在server里面跳转 res.setHeader('Location', '/')
### 6.将提交的数据渲染到读取的html页面，当前使用的方法是replace方法替换的^-^字符达到的
