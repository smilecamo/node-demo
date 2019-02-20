// 模块
let adder = function (a,b) {
  return `两数相加等于${a+b}`
}

let length = function(arr) {
  return '数组的长度为' + arr.length
}

module.exports={
  adder,
  length
}