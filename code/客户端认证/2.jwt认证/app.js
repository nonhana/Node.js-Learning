const express = require('express')
const app = express()
// 导入JWT两个相关的包
const jwt = require('jsonwebtoken')
const { expressjwt: expressJWT } = require('express-jwt')

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())

// 解析post表单数据中的中间件
const bobyParser = require('body-parser')
app.use(bobyParser.urlencoded({ extended: false }))

// 定义secret秘钥
const secretKey = 'zhouxiang <?/:_-=+> non_hana'

// 注册将JWT还原成JSON字符串的中间件
// expressJWT配置对象的secret属性表示要解密的秘钥，其unless方法指明了不需要token鉴权的url
// 注意：只要配置成功了express-jwt这个中间件就可以把解析出来的用户信息挂载到req.user属性上
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 登录接口
app.post('/api/login', (req, res) => {
  const userinfo = req.body
  // 验证失败后返回失败的结果
  if (req.body.username !== "admin" || req.body.password !== "000000") {
    return res.send({
      status: 1,
      msg: "登录失败"
    })
  }
  // 验证成功后返回带有token的对象，调用jwt.sign()方法生成jwt字符串
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前token字符串
  // 注意：不能将密码加密到JWT字符串中，泄漏后果很危险。
  const token = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '120s' })
  res.send({
    status: 0,
    msg: "登录成功！",
    token: token
  })
})

// 需要带权限访问的接口
app.get('/admin/getinfo', (req, res) => {
  // 使用req.auth获取用户信息，使用data将用户信息发送给客户端
  console.log(req.auth)
  res.send({
    status: 200,
    message: '获取用户信息成功',
    data: req.auth
  })
})

// 定义全局的错误处理中间件
app.use((err, req, res, next) => {
  // token解析失败的错误
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 1,
      msg: "无效的token"
    })
  }
  res.send({
    status: 1,
    msg: "未知的错误"
  })
})

app.listen(80, () => {
  console.log("http://127.0.0.1")
})