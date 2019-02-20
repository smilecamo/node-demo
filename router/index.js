var server = require('./server')
var router = require('./router')
var handler = require('./handle')

var handle = {}
handle['/'] = handler.home
handle['/home'] = handler.home
handle['/user'] = handler.user

server.startServer(router.route,handle)