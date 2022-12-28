const http = require('http')

const server = http.createServer()

// req是请求对象，包含了与客户端相关的数据与属性
server.on('request', (req, res) => {
  // req.url是客户端请求的url地址
  const url = req.url
  // req.method是客户端请求的method类型
  const method = req.method
  const str = `你的请求url是${url}，请求的方法是${method}`
  console.log(str)
  // 调用res.end()方法，向客户端响应一些内容
  res.end(str)
})

server.listen(80, () => {
  console.log("服务器已经启动")
})