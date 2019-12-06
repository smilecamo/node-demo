const path = require('path');
class HomeCtl {
  index(ctx) {
    ctx.body = '这是主页';
  }
  upload(ctx) {
    const file = ctx.request.files.file;
    // path.basename() 返回最后一部分
    const basename = path.basename(file.path);
    // ctx.origin 返回localhost: 3000
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
  }
}

module.exports = new HomeCtl();
