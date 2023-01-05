const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  // 获取请求的url地址
  const url = req.url
  // 设置默认的响应内容为404 Not Found
  let content = '<h1>404 Not Found</h1>'
  // 当访问index.html与about.html时，返回不同的内容
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>'
  } else if (url === '/about.html') {
    content = '<h1>关于页</h1>'
  }
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  res.end(content)
})
server.listen(80, () => {
  console.log("服务器已经启动：http://127.0.0.1")
})