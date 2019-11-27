const Router = require('koa-router')
const router = new Router({ prefix: '/user' });
const { find,findById,create,del,update} = require('../controllers/users')

// 获取用户
router.get('/', find);
// 获取特定用户
router.get('/:id', findById);
// 增加用户
router.post('/', create);
// 修改用户
router.put('/:id', update);
// 删除用户
router.delete('/:id', del);

module.exports = router