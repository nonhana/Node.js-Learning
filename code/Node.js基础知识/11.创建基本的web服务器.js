const http = require('http')

const server = http.createServer()

server.on('request', function (req, res) {
  console.log("有人访问了我们的服务器")
})

server.listen(80, function () {
  console.log("服务已经启动！")
})