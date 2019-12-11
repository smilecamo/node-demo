const Topic = require('../models/topic');
const User = require('../models/users')
class TopicCtl {
  // 直接返回所有话题列表
  async find(ctx) {
    /**
     * limit(10)返回10条
     * skip(10)跳过10条
     * Math.max(num,num) 返回最大值
     * find({key:value}) 模糊搜索
     * new RegExp(ctx.query.q) 正则表达式
     */
    const { per_page = 10, page = 1 } = ctx.query;
    // 第几页
    const pages = Math.max(page * 1, 1) - 1;
    // 每页几条数据
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await Topic.find({
      name: new RegExp(ctx.query.q)
    })
      .limit(perPage)
      .skip(pages * perPage);
  }
  // 根据id返回显示特定的
  async findById(ctx) {
    const { fields = '' } = ctx.query;
    const selectFields = await fields
      .split(';')
      .filter(f => f)
      .map(f => ' +' + f)
      .join('');
    const topic = await Topic.findById(ctx.params.id).select(selectFields);
    ctx.body = topic;
  }
  // 创建话题
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false }
    });
    // const {name} = ctx.request.body
    // const repeatedName = await Topic.find({name})
    // console.log(repeatedName,);
    // if(repeatedName){
    //   ctx.throw(409,'话题已存在')
    // }
    const topic = await new Topic(ctx.request.body).save();
    ctx.body = topic;
  }
  // 更新话题
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false }
    });
    const repeatedId = await Topic.findById(ctx.params.id);
    if (!repeatedId) {
      ctx.throw(404, '话题不存在');
    }
    const topic = await Topic.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = topic;
  }
  // 检测话题是否存在
  async checkTopicExist(ctx, next) {
    const topic = await Topic.findById(ctx.params.id);
    if (!topic) {
      ctx.throw(404, '话题不存在');
    }
    await next();
  }
  // 获取话题的粉丝
  async followerTopic(ctx) {
    const user = await User.find({ followingTopics: ctx.params.id });
    ctx.body = user;
  }
}

module.exports = new TopicCtl();
