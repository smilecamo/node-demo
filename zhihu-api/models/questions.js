const mongoose = require('mongoose')
const {Schema,model} = mongoose


const questionsSchema = new Schema({
  title:{type:String,required:true},
  description:{type:String},
  questioner:{type:Schema.Types.ObjectId,ref:'User',required:true,select:false},
  topics:{
    type:[{type:Schema.Types.ObjectId,ref:'Topic'}],
    select:false
  }
})

module.exports = model('Question', questionsSchema);