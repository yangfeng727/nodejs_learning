var events = require('events');
var eventEmitter = new events.EventEmitter();

//listener #1
var listner1 = function listner1() {
    console.log('listner1 executed.');
}

//listener #2
var listner2 = function listner2() {
    console.log('listner2 executed.');
}

// bind the connection event with the listner1 function
eventEmitter.addListener('connection', listner1);

// bind the connection event with the listner2 function
eventEmitter.on('connection', listner2);


// 特别注意
// events.EventEmitter.listenerCount(emitter, eventName) //已废弃，不推荐
// events.emitter.listenerCount(eventName) //推荐

var eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " Listner(s) listening to connection event");

// fire the connection event
eventEmitter.emit('connection');

// remove the binding of listner1 function
eventEmitter.removeListener('connection', listner1);
console.log("Listner1 will not listen now.");

// fire the connection event
eventEmitter.emit('connection');

eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " Listner(s) listening to connection event");

console.log("Program Ended.");

