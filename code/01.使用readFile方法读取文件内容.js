// 导入fs模块
const fs = require('fs');
// 调用fs.readFile()方法读取文件
fs.readFile('./files/1.txt', 'utf-8', function (err, dataStr) {
  // 如果读取成功，err的值为null
  // 如果读取失败，err的值为失败对象
  console.log(err);
  // 打印成功读取之后的结果
  console.log(dataStr);
})