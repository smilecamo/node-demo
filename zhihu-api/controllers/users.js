const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const {secret} = require('../config')
class UserCtl{
  // 查询用户列表
  async find(ctx){
    ctx.body = await User.find();
  }
  // 根据用户id查询特定用户
  async findById(ctx){
    /***
     * ctx.query 获取查询字符串
     * .select() 显示过滤的值
     */
    const {fields} = ctx.query
    const selectFields = fields.split(';').filter(f=>f).map(f=>' +'+f).join('')
    const user = await User.findById(ctx.params.id).select(selectFields);
    
    if(!user){
      ctx.throw(404,'用户不存在')
    }
    ctx.body = user
  }
  // 根据token新增用户
  async create(ctx){
    // 校验器
    ctx.verifyParams({
      name:{type:'string',required:true},
      password:{type:'string',required:true}
    })
    const {name} = ctx.request.body
    const repeatedUser = await User.findOne({name})
    if (repeatedUser){
      ctx.throw(409,'用户名已存在')
    }
    // const
    const user = await new User(ctx.request.body).save();
    ctx.body = user
  }
  // 更新用户
  async update(ctx){
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
    const user = await User.findByIdAndUpdate(ctx.params.id,ctx.request.body)
    if(!user){
      ctx.throw(404,'用户不存在')
    }
    ctx.body = user;
  }
  // 获取关注者列表
  async listFollowing (ctx){
    const user = await User.findById(ctx.params.id)
      .select('+following')
      .populate('following');
    if(!user){
      ctx.throw(404,'不存在')
    }else{
      ctx.body = user
    }
  }
  // 关注某人
  async follow(ctx){
    console.log(ctx);
    const me = await User.findById(ctx.state.user._id).select('+following');
    if (!me.following.map(id => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204
  }


  // 通过用户id删除用户
  async del(ctx){
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 204;
  }
  // 用户登录返回token
  async login(ctx){
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    });
    const user = User.findOne(ctx.request.body)
    if(!user){ctx.throw(401,'用户名或密码错误')}
    const { __id, name } = user;
    const token = jsonwebtoken.sign({ __id, name },secret);
    ctx.body = {token}
  }
}

module.exports = new UserCtl()