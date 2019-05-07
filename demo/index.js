var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers"); // 请求处理程序

var handle ={}
handle["/"]= requestHandlers.start;
handle["/start"]= requestHandlers.start;
handle["/upload"]= requestHandlers.upload;
handle["/show"]= requestHandlers.show;

server.start(router.route, handle);
