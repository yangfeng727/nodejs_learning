## nodejs学习
[Node.js快速入门教程](https://www.yiibai.com/nodejs/nodejs-quick-start.html)

### buffer
JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

new Buffer() 已经废弃,使用 Buffer.from() 代替。
``` 
// 读取 Node 缓冲区数据的语法如下所示：
buf.toString([encoding[, start[, end]]])

// eg:
buf = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
```
### EventEmitter事件触发器
EventEmitter.emit可以传参
```
//event.js 文件
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 

执行以上代码，运行的结果如下：

$ node event.js 
listener1 arg1 参数 arg2 参数
listener2 arg1 参数 arg2 参数

```
#### 管道流
管道是一种机制，一个流的输出连接到另一个流(作为另外一个流的输入)。
它通常用来 **从一个流中获取数据，并通过该流输出到另一个流。** 原文出自【易百教程】，商业转载请联系作者获得授权，非商业请保留原文链接：https://www.yiibai.com/nodejs/nodejs-quick-start.html
```
//使用readerStream 读取test.txt的内容，并使用 writerStream 写入 test1.txt。


var fs = require("fs");

//create a readable stream
var readerStream = fs.createReadStream('test.txt');

//create a writable stream
var writerStream = fs.createWriteStream('test2.txt');

//pipe the read and write operations
//read test.txt and write data to test2.txt
readerStream.pipe(writerStream);

```
