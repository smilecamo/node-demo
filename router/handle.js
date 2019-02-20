var fs = require('fs')

let home = function (res) {
  res.writeHead(200,{'Content-Type': 'text/html'});
  fs.createReadStream(__dirname+'/index.html','utf8').pipe(res)
}

let user = function (res) {
  res.writeHead(200,{'Content-Type': 'text/html'});
  fs.createReadStream(__dirname + '/user.html', 'utf8').pipe(res)
}

module.exports={
  home,
  user
}