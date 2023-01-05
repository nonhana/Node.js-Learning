// 导入Node.js内置的querystring模块
const qs = require('querystring')

const BodyParser = (req, res, next) => {
  // 定义中间件具体的业务逻辑
  // 1.定义一个str字符串，专门用来存储客户端发送过来的请求体数据
  let str = ''
  // 2.监听req的data事件，只要有数据发过来就会触发这个事件
  req.on('data', (chunk) => {
    str += chunk
  })
  // 3.监听req的end事件
  req.on('end', () => {
    // TODO：把字符串格式的请求体数据，解析成对象格式
    const body = qs.parse(str)
    req.body = body
    next()
  })
}

// 用module.exports暴露出去
module.exports = BodyParser