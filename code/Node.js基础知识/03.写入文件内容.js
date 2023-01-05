// 导入fs文件系统模块
const fs = require('fs')
// 1.文件路径2.写入内容3.回调函数
fs.writeFile('./files/2.txt', 'Hello Node.js!', function (err) {
  // 如果文件写入成功，则err的值为null
  // 如果文件写入失败，则err的值为一个错误对象。
  console.log(err);
})