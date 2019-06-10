## nodejs学习
[Node.js快速入门教程](https://www.yiibai.com/nodejs/nodejs-quick-start.html)

### buffer
new Buffer() 已经废弃,使用 Buffer.from() 代替

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
