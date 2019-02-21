const express = require('express')
const mongoose = require('mongoose')

const app = express()
// DB config
const db = require('./config/keys').mongoURI

// 链接
mongoose.connect(db, {useNewUrlParser: true}).then(()=>{console.log('connect success')}).catch((err)=>console.log(err))

app.get('/',(req,res)=>{
  res.send('hello')
})

// mongodb+srv://yang:<PASSWORD>@cluster0-jyki4.azure.mongodb.net/test?retryWrites=true
const port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log(`server running on port ${port}`);
})