var express = require('express')
const mongoose = require('mongoose')
// 定义mongoose地址
const DB_URL = 'mongodb://localhost:27017/nodeDemo'
// 链接数据库
mongoose.connect(DB_URL, {
  useNewUrlParser: true
})
// 链接成功后打印成功信息进行提示
mongoose.connection.on('connected',function(){
  console.log('mongo connect success');
})
// 建立表
const User = mongoose.model('user', new mongoose.Schema({
  name: {type: String,required: true},
  age: {type: Number,required: true}
}))
var app = express()
// 路由中间件
var index = require('./routes/index')
var user = require('./routes/user')
app.use('/index', index)
app.use('/user', user)
// 新建数据
// User.create({
//   name: 'wangwu',
//   age: 14
// })
// 删除数据
// User.remove({name:'zhangsan'},(req,res)=>{
//   console.log(res);
// })
// 改变数据
// User.update({name: 'lisi'},{name:'lisilisi',age: 28},(req,res)=>{
//   console.log(res);
// })
// 查找所有符合条件的数据
app.get('/',(req,res)=>{
  User.find({
    name: 'lisi'
  }, (err, dosc) => {
    res.send(dosc)
  })
})
// 查找单个符合条件的
app.get('/findone',(req,res)=>{
  User.findOne({name:'lisi'},(err,dosc)=>{
    if(!err){
      res.json(dosc)
    }else{
      res.send(err)
    }
  })
})
app.listen(3000)

console.log('listten port of 3000');
