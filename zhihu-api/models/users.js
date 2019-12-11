const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const userSchema = new Schema({
  /**
   * select: false 不显示
   * required: true 必须填写
   * type: 类型
   * enum:[] 枚举
   */
  __v: { select: false },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String }, //头像
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
    required: true
  }, //性别
  headline: { type: String }, //一句话介绍
  /**
   * 引用话题 type: Schema.Types.ObjectId,ref:'Topic'
   *
   */
  locations: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false
  }, //居住地 数据类型为数组 [{}]
  business: { type: Schema.Types.ObjectId, ref: 'Topic', select: false }, //职业
  employments: {
    //职业经历
    type: [
      {
        company: { type: Schema.Types.ObjectId, ref: 'Topic' }, //公司名
        job: { type: Schema.Types.ObjectId, ref: 'Topic' } //工作
      }
    ],
    select: false
  },
  educations: {
    //教育经历 数据类型为数组 [{}]
    type: [
      {
        school: { type: String }, //学校
        major: { type: String }, // 专业
        diploma: { type: Number, enum: [1, 2, 3, 4, 5] }, //毕业年份
        entrance_year: { type: String }, //入学年份
        graduation_year: { type: String } //毕业年份
      }
    ],
    select: false
  },
  following: {
    // 关注
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false
  },
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false
  }
});

module.exports = model('User', userSchema);
