var http = require('http')
let startServer = function(route,handle) {
  var myRequst = function (req,res) {
    route(handle,req.url,res)
  }
  var server = http.createServer(myRequst)
  server.listen(3000)
}
module.exports = {
  startServer
}