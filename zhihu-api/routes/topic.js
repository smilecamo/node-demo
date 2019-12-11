const Router = require('koa-router')
const jwt = require('koa-jwt');
const router = new Router({prefix:'/topic'})
const { secret } = require('../config');
const {
  find,
  findById,
  create,
  update,
  followerTopic,
  checkTopicExist
} = require('../controllers/topic');
const auth = jwt({ secret });
// 获取所有话题
router.get('/',find)
// 获取特定话题
router.get('/:id', checkTopicExist,findById);
// 新建话题
router.post('/', auth,create);
// 更新话题
router.patch('/:id', auth, checkTopicExist,update);
// 获取话题下的关注者
router.get('/followertopic/:id',checkTopicExist,  followerTopic);

module.exports =router