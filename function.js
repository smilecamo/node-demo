// 回调函数
function sayHi(name){
  console.log(name + ' say hi')
}

function callFunction(fun,name){
  fun(name)
}

callFunction(sayHi, 'yang')