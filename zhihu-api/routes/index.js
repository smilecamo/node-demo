// routes文件夹下 自动化注册路由

// 文件fs
const fs = require('fs')

module.exports = app=>{
  // readdirSync 读取文件夹
  fs.readdirSync(__dirname).forEach(file=>{
    // 遍历文件 过滤主文件
    if(file === 'index.js'){return}
    // 导入文件
    const route = require(`./${file}`);
    // 注册路由
    app.use(route.routes()).use(route.allowedMethods());
  })
}