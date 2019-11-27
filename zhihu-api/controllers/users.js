const db = [{ name: '韩梅梅' }];
class UserCtl{
  find(ctx){
    ctx.body = db
  }
  findById(ctx){
    if(ctx.params.id * 1 >= db.length){
      ctx.throw(412,'id不存在')
    }
    ctx.body = db[ctx.param.id * 1]
  }
  create(ctx){
    // 校验器
    ctx.verifyParams({
      name:{type:'string',required:true}
    })
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }
  update(ctx){
    db[ctx.params.id * 1] = ctx.request.body;
    ctx.body = ctx.request.body;
  }
  del(ctx){
    db.splice(ctx.params.id * 1,1);
    ctx.status = 405
  }
}

module.exports = new UserCtl()