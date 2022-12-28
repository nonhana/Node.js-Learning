const fs = require('fs')

// 代码在运行的时候，会以执行node命令时所处的目录，动态拼接出被操作文件的完整路径
// 只需要直接提供一个完整的文件存放路径即可
// fs.readFile('./files/1.txt', 'utf8', function (err, dataStr) {
//   if (err) {
//     return console.log("读取文件失败！" + err.message);
//   }
//   console.log("读取文件成功！" + dataStr)
// })

// 移植性非常差，不利于维护
// fs.readFile('C:\\Users\\ASUS\\Desktop\\编程练习\\Node.js学习\\code\\files\\1.txt', 'utf8', function (err, dataStr) {
//   if (err) {
//     return console.log("读取文件失败！" + err.message);
//   }
//   console.log("读取文件成功！" + dataStr)
// })

// __dirname表示当前文件所处的目录
// 不会动态变化，值是固定的
console.log(__dirname)
fs.readFile(__dirname + '/files/1.txt', 'utf8', function (err, dataStr) {
  if (err) {
    return console.log("读取文件失败！" + err.message);
  }
  console.log("读取文件成功！" + dataStr)
})