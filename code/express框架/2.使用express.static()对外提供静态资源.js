const express = require("express")

const app = express()

// 在这里调用express.static()方法快速对外提供静态资源
app.use(express.static('./html_parts'))

app.listen(80, () => {
  console.log('express server is running at http://127.0.0.1')
})