const Koa = require('koa')
const badyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const app = new Koa(); // 实例化koa
const port = 3000; //设置端口号
// 引入自动化函数
const routing = require('./routes/index')
const {connectionStr} = require('./config')
// 链接数据库
mongoose.connect(
  connectionStr,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('数据库链接成功');
  }
);
mongoose.connection.on('error',console.error);
// 异常处理
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  })
);
app.use(badyparser());
app.use(parameter(app));

// 使用函数
routing(app);

app.listen(port, () => {
  console.log(`app listen ${port}`);
});