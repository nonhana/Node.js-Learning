// 1.导入express
const express = require('express')
// 2.创建Web服务器
const app = express()

// 4.监听客户端的get与post请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  // 调用express提供的res.send()方法，向客户端响应内容
  res.send({
    name: "周想",
    age: 20,
    gender: "男"
  })
})
app.post('/user', (req, res) => {
  // 调用express提供的res.send()方法，向客户端响应内容
  res.send("请求成功")
})
app.get('/', (req, res) => {
  // 通过req.query可以获取到客户端发送过来的查询参数
  // 注意：默认情况下，req.query是一个空对象
  console.log(req.query)
  res.send(req.query)
})
// 注意:这里的:id是一个动态的参数
app.get('/user/:id/:name', (req, res) => {
  // res.params是动态匹配到的url参数，默认值为空对象
  // :后的变量就是接收到的变量名称
  console.log(req.params);
  res.send(req.params)
})
// 3.启动Web服务器
app.listen(80, () => {
  console.log("this server is running at http://127.0.0.1")
})