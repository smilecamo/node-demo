const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const answerSchema= new Schema({
  content:{type:String,required:true}, // 回答内容
  answerer:{type:Schema.Types.ObjectId,ref:'User',required:true}, // 回答者
  questionId:{type:String,required:true}, //问题的id
  voteCount:{type:Number,required:true,default:0}, //投票数
})


module.exports = model('Answer', answerSchema);