const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const Question = require('../models/questions');
const Answer = require('../models/answers.js');
const { secret } = require('../config');
class UserCtl {
  // 查询用户列表
  async find(ctx) {
    /**
     * Math.max(num.num)返回最大值
     * limit(10) 返回10条数据
     * skip(10)跳过10条数据
     * find({key:value}) 根据key来进行模糊搜索
     * new RegExp() 正则
     */
    const { pre_page = 10, page = 1 } = ctx.query;
    const prePage = Math.max(pre_page * 1, 1);
    const pages = Math.max(page * 1, 1) - 1;
    ctx.body = await User.find({ name: new RegExp(ctx.query.q) })
      .limit(prePage)
      .skip(prePage * pages);
  }
  // 根据用户id查询特定用户
  async findById(ctx) {
    /***
     * ctx.query 获取查询字符串
     * .select() 显示过滤的值
     */
    const { fields = '' } = ctx.query;
    const selectFields = fields
      .split(';')
      .filter(f => f)
      .map(f => ' +' + f)
      .join('');
    const populateStr = fields
      .split(';')
      .filter(f => f)
      .map(f => {
        if (f === 'employments') {
          return 'employments.company employments.job';
        }
        return f;
      })
      .join(' ');
    const user = await User.findById(ctx.params.id)
      .select(selectFields)
      .populate(populateStr);

    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }
  // 新增用户
  async create(ctx) {
    // 校验器
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) {
      ctx.throw(409, '用户名已存在');
    }
    // const
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }
  // 更新用户
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      headline: { type: 'string', required: false },
      locations: { type: 'array', itemType: 'string', required: false },
      business: { type: 'string', required: false },
      employments: { type: 'array', itemType: 'object', required: false },
      educations: { type: 'array', itemType: 'object', required: false }
    });
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }
  // 通过用户id删除用户
  async del(ctx) {
    // findByIdAndRemove 根据id查找并移除
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 204;
  }
  // 用户登录返回token
  async login(ctx) {
    // 校验参数
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    });
    // 根据传值查找用户
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, '用户名或密码错误');
    } else {
      const { _id, name } = user;
      // 生成token jsonwebtoken.sign(值,密钥,时间)
      const token = jsonwebtoken.sign({ _id, name }, secret);
      ctx.body = { token };
    }
  }
  // 获取关注者列表
  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id)
      .select('+following')
      .populate('following');
    if (!user) {
      ctx.throw(404, '不存在');
    } else {
      ctx.body = user;
    }
  }
  // 获取粉丝列表
  async followers(ctx) {
    const user = await User.find({ following: ctx.params.id });
    ctx.body = user;
  }
  // 监测用户是否存在
  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    await next();
  }
  // 关注某人
  async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following');
    if (!me.following.map(id => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204;
  }
  //取消关注
  async unfollow(ctx) {
    /**
     * findById 通过id查找
     * select 显示中添加某一个参数
     */
    const me = await User.findById(ctx.state.user._id).select('+following');
    // 查询索引
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id);
    if (index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }
  // 获取用户关注的话题
  async listFollowingTopic(ctx) {
    const user = await User.findById(ctx.params.id)
      .select('+followingTopics')
      .populate('followingTopics');
    if (!user) {
      ctx.throw(404, '用户不存在');
    } else {
      ctx.body = user;
    }
  }
  // 关注话题
  async followTopic(ctx) {
    const me = await User.findById(ctx.state.user._id).select(
      '+followingTopics'
    );
    // includes() 是否含有
    if (!me.followingTopics.map(id => id.toString()).includes(ctx.params.id)) {
      me.followingTopics.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204;
  }
  // 取消关注
  async unfollowTopic(ctx) {
    const me = await User.findById(ctx.state.user._id).select(
      '+followingTopics'
    );
    const index = me.followingTopics
      .map(id => id.toString())
      .indexOf(ctx.params.id);
    if (index > -1) {
      me.followingTopics.splice(index, 1);
      me.save();
    }
  }
  // 列出问题
  async listQuestions(ctx) {
    const questions = await Question.find({ questioner: ctx.params.id });
    ctx.body = questions;
  }
  // 根据用户id获取点赞列表
  async listLikingAnswers(ctx) {
    const user = await User.findById(ctx.params.id)
      .select('+likingAnswers')
      .populate('likingAnswers');
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user.likingAnswers;
  }
  // 点赞回答
  async likeAnswer(ctx,next) {
    const me = await User.findById(ctx.state.user._id).select('+likingAnswers');
    if (!me.likingAnswers.map(id => id.toString()).includes(ctx.params.id)) {
      me.likingAnswers.push(ctx.params.id);
      me.save();
      // 点赞加一
      await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: 1 } });
    }
    ctx.status = 204;
    await next()
  }
  // 取消点赞
  async unLikeAnswer(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+likingAnswers');
    const index = await me.likingAnswers
      .map(id => id.toString())
      .indexOf(ctx.params.id);
    if (index > -1) {
      me.likingAnswers.splice(index, 1);
      me.save();
      // 点赞减一
      await Answer.findByIdAndUpdate(ctx.params.id, {
        $inc: { voteCount: -1 }
      });
    }
    ctx.status = 204;
  }
  // 踩的列表
  async listDisLikingAnswer(ctx){
    const user = await User.findById(ctx.params.id)
      .select('+disLikingAnswers')
      .populate('disLikingAnswers');
    if(!user){
      ctx.throw(404,'用户不存在')
    }
    ctx.body = user.disLikingAnswers;
  }
  // 踩某个回答
  async disLikingAnswer(ctx,next){
    const me = await User.findById(ctx.state.user._id).select('+disLikingAnswers')
    if(!me.disLikingAnswers.map(f=>f.toString()).includes(ctx.params.id)){
      me.disLikingAnswers.push(ctx.params.id)
      me.save()
    }
    ctx.status = 204
    await next();
  }
  // 取消踩
  async unDisLikingAnswer(ctx){
    const me = await User.findById(ctx.state.user._id).select('+disLikingAnswers')
    const index = me.disLikingAnswers.map(f=>f.toString()).indexOf(ctx.params.id)
    if(index>-1){
      me.disLikingAnswers.splice(index,1)
      me.save()
    }
    ctx.status=204
  }
}

module.exports = new UserCtl();
