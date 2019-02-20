// 响应html
var http = require('http')
var fs = require('fs')

var myRes = function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'})
  var myHtml = fs.createReadStream(__dirname + '/html.html', 'utf8')
  myHtml.pipe(res)
}

var server = http.createServer(myRes)

server.listen(3000)

console.log('server port is 3000');
