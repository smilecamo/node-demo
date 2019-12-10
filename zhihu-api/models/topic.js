const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const topicSchema = new Schema({
  __v: {type:Number, select: false },
  name:{type:String,required:true},//话题名称
  avatar_url:{type:String,required:false},//话题图
  introduction:{type:String,select:false},//话题简介
});

module.exports = model('Topic', topicSchema);
