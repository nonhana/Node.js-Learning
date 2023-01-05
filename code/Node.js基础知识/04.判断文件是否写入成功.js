// 导入fs文件系统模块
const fs = require('fs')
// 1.文件路径2.写入内容3.回调函数
fs.writeFile('./files/3.txt', '尝试写入文件!', function (err) {
  if (err) {
    return console.log("文件写入失败！" + err.message);
  }
  console.log("文件写入成功！")
})