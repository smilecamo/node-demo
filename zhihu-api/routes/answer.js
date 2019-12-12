const Router = require('koa-router')
const jwt = require('koa-jwt')
const router = new Router({prefix:'/question/:questionId'})
const {
  find,findById,
  create,update,del,
  checkAnswer,checkAnswerExist
} = require('../controllers/answers')
const { secret } = require('../config');
const auth = jwt({ secret });

router.get('/',find)
router.get('/:id',checkAnswerExist,findById)
router.post('/',auth,create)
router.patch('/:id',auth,checkAnswerExist,checkAnswer,update)
router.delete('/:id',auth,checkAnswerExist,checkAnswer,del)

module.exports = router
