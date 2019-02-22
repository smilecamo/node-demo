var mongoose = require('mongoose')
// 建立
let usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  avatar:{
    type: String,
  },
  identity:{
    type: String,
    required: true
  },
  data:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users', usersSchema)