// 引入express
var express = require('express')
// post请求
var bodyParser = require('body-parser')

// 调用express
var app = express()
// 使用express
// app.get('/',(req,res)=>{
//   res.send('this is express')
// })
// ----路由
// 基本使用
app.get('/home',(req,res)=>{
  res.send('this is home')
})
// 带有参数params
app.get('/user/:name',(req,res)=>{
  res.send('this is user is '+req.params.name)
})
// 查询?后面的 query
app.get('/',(req,res)=>{
  res.send('this is query is ' + req.query.search)
})
// b可传可不传
app.get('/ab?cd',(req,res)=>{
  res.send('this is ab?cd')
})
// 使用bodyParser
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.post('/', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.name)
})
// 监
app.listen(3000)

console.log('listen open 3000');