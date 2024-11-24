const EventEmitter = require('events');  
class MyEmitter extends EventEmitter {}  
const myEmitter = new MyEmitter();  
myEmitter.on('eventName', () => {
  console.log('An event has occurred!');
});myEmitter.emit('eventName');