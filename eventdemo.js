// // 事件
// // 事件触发器
// var EventEmitter = require('events')
// var myEmitter = new EventEmitter()

// myEmitter.on('someEmit', function(message){
//   console.log(message);
// })

// myEmitter.emit('someEmit','自动触发事件')

// eventEmitter.on() 用于注册监听器
// eventEmitter.emit() 用于触发事件。
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发事件');
});
myEmitter.emit('event');