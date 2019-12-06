const Koa = require('koa');
const koaBody = require('koa-body');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const koaStatic = require('koa-static');

const app = new Koa(); // 实例化koa
const port = 3000; //设置端口号
// 引入自动化函数
const routing = require('./routes/index');
const { connectionStr } = require('./config');
// 上传文件生成链接
app.use(koaStatic(path.join(__dirname,'public')))
// 链接数据库
mongoose.connect(
  connectionStr,
  { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false  },
  () => {
    console.log('数据库链接成功');
  }
);
mongoose.connection.on('error', console.error);
// 异常处理
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  })
);
app.use(koaBody({
  multipart:true,
  formidable:{
    uploadDir: path.join(__dirname,'/public/uploads'),
    keepExtensions:true,
  }
}));
app.use(parameter(app));

// 使用函数
routing(app);

app.listen(port, () => {
  console.log(`app listen ${port}`);
});
