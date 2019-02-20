// 目录
var fs = require('fs')
// 新建目录 fs.mkdir
fs.mkdir('新建目录',function(){
  fs.readFile('readMe.txt','utf8',function(){
    fs.writeFile('./新建目录/write.txt','我是新建目录后新建的文件',function(err){
      if(err){
        throw err
      }else{
        console.log('写入文件成功');
      }
    })
  })
})