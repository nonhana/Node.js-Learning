const express = require('express')
const app = express()

// 1.导入解析表单数据的中间件body-parser
const parser = require('body-parser')
// 2.使用app.use()注册中间件
app.use(parser.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
  // 如果没有配置任何解析表单数据的中间件，则req.body默认等于undefined
  console.log(req.body)
  res.send("OK")
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})