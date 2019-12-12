const Answer = require('../models/answers')

class AnswerCtl{
  async find(ctx){
    const {per_page,page} = ctx.query;
    const {questionId} = ctx.params
    const pages = Math.max(page*1,1)-1;
    const perPage = Math.max(per_page*1);
    const q= new RegExp(ctx.query.q)
    ctx.body = await Answer.find({content:q,questionId}).limit(perPage).skip(pages*perPage)
  }
  // 检查回答是否存在
  async checkAnswerExist(ctx,next){
    const answer = await Answer.findById(ctx.params.id).select('+answer')
    if(!answer){
      ctx.throw(404,'答案不存在')
    }
    // 只有在删改查答案才检查逻辑 赞和踩不用
    if (ctx.params.questionId && ctx.params.questionId !== answer.questionId) {
      ctx.throw(404, '该问题下不存在此回答');
    }
    ctx.state.answer = answer;
    await next()
  }
  async findById(ctx){
    const {fields = ''} = ctx.query;
    const selectFields = fields.split(';').filter(f=>f).map(f=>' +'+f).join('')
    const answer = await Answer.findById(ctx.params.id).select(selectFields).populate('answer');
    ctx.body = answer; 
  }
  async create(ctx){
    ctx.verifyParams({
      content:{type:'string',required:true},
    })
    const {questionId} = ctx.params
    const answerer = ctx.state.user._id
    const answer = await Answer({ ...ctx.request.body,answerer, questionId }).save();
    ctx.body = answer;
  }
  // 检测是否属于该用户
  async checkAnswer(ctx,next){

    const {answer} = await ctx.state;
    if(answer.answerer.toString() !== ctx.state.user._id){
      ctx.throw(404,'没有权限')
    }
    await next()
  }
  async update(ctx){
    ctx.verifyParams({
      content:{type:'string',required:false},
    })
    await ctx.state.answer.updateOne(ctx.request.body);
    ctx.body = ctx.request.body;
  }
  async del(ctx){
    const answer = await ctx.state.answer.remove()
    ctx.status = 204
  }
}

module.exports = new AnswerCtl();