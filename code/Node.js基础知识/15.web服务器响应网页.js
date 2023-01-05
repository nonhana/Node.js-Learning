const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer()

server.on('request', (req, res) => {
  // 获取到客户端请求的url地址
  // /html_parts/index.html
  // /html_parts/index.css
  // /html_parts/index.js
  const url = req.url
  // 将请求的url映射到具体文件的存放路径
  // const fpath = path.join(__dirname, url)
  let fpath = ''
  if (req.url === '/') {
    fpath = path.join(__dirname, './html_parts/index.html')
  } else {
    fpath = path.join(__dirname, './html_parts', url)
  }
  // 根据映射过来的文件路径来读取文件的内容
  fs.readFile(fpath, 'utf8', (err, dataStr) => {
    if (err) return res.end('404 Not Found')
    res.end(dataStr)
  })
})

server.listen(80, () => {
  console.log("服务器运行在http://127.0.0.1")
})