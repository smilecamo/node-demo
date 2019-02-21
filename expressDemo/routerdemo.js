var express = require('express')

var app = express()
// 路由中间件
var index = require('./routes/index')
var user = require('./routes/user')
app.use('/index', index)
app.use('/user', user)

app.listen(3000)

console.log('listten port of 3000');
