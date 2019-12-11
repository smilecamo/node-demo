const Question = require('../models/questions');

class QuestionCtl {
  async find(ctx) {
    /**
     * $or两种条件查询
     */
    const { per_page, page, q } = await ctx.query;
    const perPage = Math.max(per_page * 1, 1) ;
    const pages = Math.max(page * 1, 1) - 1;
    const Q = new RegExp(q);
    const body = await Question.find({
      // $or: [{ title: Q, description: Q }]
      title: new RegExp(ctx.query.q)
    })
      .limit(perPage)
      .skip(perPage * pages);
    ctx.body = body;
  }
  // 检测问题是否存在
  async checkQuestionExist(ctx, next) {
    const question = await Question.findById(ctx.params.id).select(
      '+questioner'
    );
    if (!question) {
      ctx.throw(404, '问题不存在');
    }
    ctx.state.question = question;
    await next();
  }
  async findById(ctx) {
    const { fields = '' } = ctx.query;
    const selectFields =  fields
      .split(';')
      .filter(f => f)
      .map(f => ' +' + f)
      .join('')
    const question = await Question.findById(ctx.params.id)
      .select(selectFields)
      .populate('questioner topics');
    ctx.body = question;
  }
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      description: { type: 'string', required: false }
    });
    const question = await new Question({
      ...ctx.request.body,
      questioner: ctx.state.user._id
    }).save();
    ctx.body = question;
  }
  // 判断问题是不是用户的
  async checkQuestioner(ctx, next) {
    const { question, user } = ctx.state;
    if (question.questioner.toString() !== user._id) {
      ctx.throw(404, '没有权限');
    }
    await next();
  }
  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: false },
      description: { type: 'string', required: false }
    });
    await ctx.state.question.updateOne(ctx.request.body);
    ctx.body = ctx.state.question;
  }
  async del(ctx) {
    await Question.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}

module.exports = new QuestionCtl();
