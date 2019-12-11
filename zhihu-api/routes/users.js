const Router = require('koa-router');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
const router = new Router({ prefix: '/user' });
const {
  find,
  findById,
  create,
  del,
  update,
  login,
  listFollowing,
  checkUserExist,
  follow,
  unfollow,
  followers,
  followTopic,
  followerTopic,
  listFollowingTopic,
  unfollowTopic,
  listQuestions
} = require('../controllers/users');
const {checkTopicExist} = require('../controllers/topic')
const { secret } = require('../config');
// 原始验证
// const auth = async (ctx,next)=>{
//   const {authorization = ''} = ctx.request.header
//   const token = authorization.replace('Bearer ', '');
//   try {
//     const user = jsonwebtoken.verify(token, secret);
//     console.log(user);
//     ctx.state.user = user
//   } catch (error) {
//     ctx.throw(401, error.message);
//   }
//   await next()
// }
const auth = jwt({ secret });
// 获取用户
router.get('/', find);
// 获取特定用户
router.get('/:id', findById);
// 增加用户
router.post('/', create);
// 修改用户
router.patch('/:id', auth, update);
// 删除用户
router.delete('/:id', auth, del);
// 用户登录
router.post('/login', login);
// 查看某人的关注者
router.get('/:id/following', listFollowing);
// 获取粉丝接口
router.get('/:id/followers', followers);
// 关注某人
router.put('/follow/:id', auth, checkUserExist, follow);
// 取消关注某人
router.delete('/unfollow/:id', auth, checkUserExist, unfollow);
router.get('/followingtopic/:id', listFollowingTopic);
// router.get('/followertopic/:id', checkTopicExist,followerTopic);
router.put('/followingtopic/:id', auth, checkTopicExist, followTopic);
router.delete('/unfollowingtopic/:id', auth, checkTopicExist, unfollowTopic);
// 获取问题接口
router.get('/:id/questions', listQuestions);
module.exports = router;
