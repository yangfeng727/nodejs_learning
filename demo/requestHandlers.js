// var exec = require("child_process").exec; // 实现一个既简单又实用的非阻塞操作：exec()。
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response){
    // console.log("Request handler 'start' was called.");
    //
    // exec("ls -lah",function(error, stdout, stderr){
    //     response.writeHead(200,{"Content-Type":"text/plain"});
    //     response.write(stdout);
    //     response.end();
    // });
    //
    console.log("Request handler 'start' was called.");

    // var body ='<html>'+
    //     '<head>'+
    //     '<meta http-equiv="Content-Type" '+
    //     'content="text/html; charset=UTF-8" />'+
    //     '</head>'+
    //     '<body>'+
    //     '<form action="/upload" enctype="multipart/form-data" '+
    //     'method="post">'+
    //     '<input type="file" name="upload">'+
    //     '<input type="submit" value="Upload file" />'+
    //     '</form>'+
    //     '</body>'+
    //     '</html>';
    fs.readFile("index.html",function(err,data){
        response.writeHead(200,{"Content-Type":"text/html"});
        // response.write(data);
        response.end(data);
    })
}

function upload(response, request){
    console.log("Request handler 'upload' was called.");
    var form =new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request,function(error, fields, files){
        console.log("parsing done", files);
        // fs.renameSync(files.upload.path,"/tmp/test.png");    // fs.renameSync(oldPath, newPath)
        fs.renameSync(files.upload.path, "c:/tmp/test.png");    // fs.renameSync(oldPath, newPath)
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end('<hr/>');
    });
}

function show(response){
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png","binary",function(error, file){
        if(error){
            response.writeHead(500,{"Content-Type":"text/plain"});
            response.write(error +"\n");
            response.end();
        }else{
            response.writeHead(200,{"Content-Type":"image/png"});
            response.write(file,"binary");
            response.end();
        }
    });
}


exports.start = start;
exports.upload = upload;
exports.show = show;
