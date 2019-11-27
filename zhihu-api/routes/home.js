const Router = require('koa-router')
const router = new Router();
const {index} = require('../controllers/homes')
router.get('/', index);

module.exports = router