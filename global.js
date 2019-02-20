// 当前目录
console.log(__dirname)
// 当前文件名
console.log(__filename)
// 全局对象
console.log('aaa')
// 执行一次的定时器
setTimeout(()=>{
  console.log('3000ms执行')
},3000)
// 循环执行
let time = 0
var timer = setInterval(function(){
  time += 2
  console.log(time + 's执行')
  if(time>8){
    clearInterval(timer)
  }
},1000)
