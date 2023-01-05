const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  const url = req.url
  const method = req.method
  // 此处的字符串包含中文字符，如果不设置请求头会乱码
  const str = `你的请求url是${url}，请求的方法是${method}`
  // 调用res.setHeader()方法，设置Content-Type响应头，解决中文乱码的问题
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  // 响应字符串给客户端
  res.end(str)
})
server.listen(80, () => {
  console.log("服务器已经启动")
})