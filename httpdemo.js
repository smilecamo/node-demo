// web服务
var http = require('http')

var onRes = function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  }) 
  var myjson = {
    name:'yang',
    job:'web',
    age: '22'
  }
  res.write(JSON.stringify(myjson))
  res.end()
}

var server = http.createServer(onRes)

server.listen(3000)
console.log('server is port 3000');