const express = require('express')
const app = express()
// 导入路由模块
const router = require('./18.APIRouter')
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 必须在配置cors中间件之前配置JSONP的接口
app.get('/api/jsonp', (req, res) => {
  // TODO：定义JSONP接口的具体实现过程
  // 1.得到函数的名称
  const funcName = req.query.callback
  // 2.定义要发送客户端的数据对象
  const data = {
    name: "周想",
    age: 20
  }
  // 3.拼接出一个函数的调用
  const scriptStr = `${funcName}(${JSON.stringify(data)})`
  // 4.把拼接出的字符串，响应给客户端
  res.send(scriptStr)
})

// 一定要在路由之前配置cors中间件，从而解决接口跨域的问题
const cors = require('cors')
app.use(cors())

// 把路由模块注册到app上
app.use('/api', router)

app.listen(80, () => {
  console.log('http://127.0.0.1')
})