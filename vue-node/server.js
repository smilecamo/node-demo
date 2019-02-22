const express = require('express')
// 操作数据库
const mongoose = require('mongoose')
// 使用POST请求
const bodyPerser = require('body-parser')
// 验证token
const passport = require('passport')
const app = express()
// 引入路由
const user = require('./routes/api/user')
const profile = require('./routes/api/profile')

// DB config
const db = require('./config/keys').mongoURI

// 使用post请求body-perser中间件
app.use(bodyPerser.urlencoded({extended:false}))
app.use(bodyPerser.json())

// 链接
mongoose.connect(db, {useNewUrlParser: true}).then(()=>{console.log('connect success')}).catch((err)=>console.log(err))

// 使用验证token插件
app.use(passport.initialize());
require('./config/passport')(passport);

// 使用路由
app.use('/api/users',user)
app.use('/api/profile', profile)

const port = process.env.PORT || 5000

app.listen(port,()=>{
  console.log(`server running on port ${port}`);
})