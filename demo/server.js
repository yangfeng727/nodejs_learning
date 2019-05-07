var http = require("http");
var url = require("url"); // 获取地址：url.parse(string).pathname  获取参数：url.parse(string).query
var formidable = require("formidable"); // 解析上传的文件数据做了很好的抽象。处理文件上传“就是”处理POST数据 —— 但是，麻烦的是在具体的处理细节,这里采用现成的方案

function start (route, handle) {
    function onRequest(request, response){
        var postData ="";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for "+ pathname +" received.");

        // // 设置接收数据的编码格式为UTF-8
        // request.setEncoding("utf8");
        //
        // // 表示新的小数据块到达了
        // request.addListener("data",function(postDataChunk){
        //     postData += postDataChunk;
        //     console.log("Received POST data chunk '"+ postDataChunk +"'.");
        // });
        //
        // // 所有的数据都已经接收完毕
        // request.addListener("end",function(){
        //     // 写在这里，当所有数据接收完毕后才触发，并且只触发一次
        //     route(handle, pathname, response, postData);
        // });
        route(handle, pathname, response, request);

        // response.end([data], [encoding])
    }

    http.createServer(onRequest).listen(8888);
    console.log('Server has started at http://127.0.0.1:8888/');
}

exports.start = start

