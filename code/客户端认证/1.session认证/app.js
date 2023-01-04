const express = require('express')
const app = express()
// 导入express-session中间件
const session = require('express-session')

// 配置express-session中间件
app.use(
  session({
    secret: 'nonhana', // 这个名字可以随便取
    resave: false,
    saveUninitialized: true
  })
)
app.use(express.urlencoded({ extended: false }))

// 登录的接口
app.post('/api/login', (req, res) => {
  if (req.body.username != 'admin' || req.body.password != '123456') {
    return res.send({
      status: 1,
      msg: "登录失败"
    })
  }
  // 注意：只有成功配置了express-session这个中间件之后，才能够访问req.session
  // 在这里就是给session添加属性
  // session只是在127.0.0.1这一个服务器之下的对象
  req.session.user = req.body // 用户的信息
  req.session.isLogin = true // 用户的登录状态
  res.send({
    status: 0,
    msg: "登录成功"
  })
})
// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // 从session中获取用户的名称
  // 先判断用户是否登录
  if (!req.session.isLogin) {
    return res.send({
      status: 1,
      msg: "have not logined"
    })
  }
  // 若用户已经登录，则从session中取数据并返回
  res.send({
    status: 0,
    msg: "success",
    username: req.session.user.username
  })
})
// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // 退出登录后调用req.session.destroy()清空session的信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: "logout!"
  })
})
// 访问session的具体内容的接口
app.get('/api/session', (req, res) => {
  res.send(req.session)
})

app.listen(80, () => {
  console.log("http://127.0.0.1")
})