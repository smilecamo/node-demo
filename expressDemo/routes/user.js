var express = require('express')

var router = express.Router()

router.get('/',(req,res)=>{
  res.send('user')
})

router.get('/name',(req,res)=>{
  res.send('name')
})

module.exports = router