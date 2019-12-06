const Router = require('koa-router')
const jwt = require('koa-jwt')
const router = new Router({ prefix: '/user' });
const { find,findById,create,del,update,login} = require('../controllers/users')
const { secret } = require('../config');
// 原始验证
// const auth = async (ctx,next)=>{
//   const {authorization = ''} = ctx.request.header
//   const token = authorization.replace('Bearer ', '');
//   try {
//     const user = jsonwebtoken.verify(token, secret);
//     ctx.state.user = user
//   } catch (error) {
//     ctx.throw(401, error.message);
//   }
//   await next()
// }
const auth = jwt({secret})
// 获取用户
router.get('/', find);
// 获取特定用户
router.get('/:id', findById);
// 增加用户
router.post('/', create);
// 修改用户
router.patch('/:id',auth, update);
// 删除用户
router.delete('/:id', auth, del);
// 用户登录
router.post('/login', login);

module.exports = router