var fs = require('fs')
// ------同步

// // 同步读取文件 fs.readFileSync('文件名','编码格式')
// var read = fs.readFileSync('readMe.txt','utf8')
// console.log(read);

// // 同步写入文件 fs.writeFileSync('文件名','文件内容')
// fs.writeFileSync('writeMe.txt','我是写入的文件内容')

// -------异步
// 读取文件
var readMe = fs.readFile('readMe.txt','utf8',function(err,data){
  console.log(data);
  // 写入文件
  fs.writeFile('writeMe.txt','我是异步写入的文件',function(err){
    if(err){
      throw err
    }else{
      console.log('写入文件');
    }
  })
})
// 删除文件
fs.unlink('writeMe.txt', function () {
  console.log('del writeMe.txt');
})
console.log('fins');