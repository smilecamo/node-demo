const Router = require('koa-router')
const jwt = require('koa-jwt');
const router = new Router({prefix:'/topic'})
const { secret } = require('../config');
const {find,findById,create,update} = require('../controllers/topic')
const auth = jwt({ secret });
router.get('/',find)
router.get('/:id',findById)
router.post('/', auth,create);
router.patch('/:id', auth,update);
module.exports =router