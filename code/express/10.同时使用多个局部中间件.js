const express = require('express')
const app = express()

// 1.定义局部中间件函数
const mwl1 = (req, res, next) => {
  console.log("调用了局部生效的中间件1")
  next()
}
const mwl2 = (req, res, next) => {
  console.log("调用了局部生效的中间件2")
  next()
}

// 2.创建路由
// 在url与回调函数之间写入需要传入的中间件
app.get('/', [mwl1, mwl2], (req, res) => {
  res.send("Home Page")
})
app.get('/user', (req, res) => {
  res.send("User Page")
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})