const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('sendError', (data) => {
    console.log('触发sendError事件',data);
});

myEmitter.on('myResponse', (data) => {
    console.log('触发myResponse事件',data);
});


module.exports.myEmitter = myEmitter;