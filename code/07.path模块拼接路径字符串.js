const path = require('path');
const fs = require('fs');

// 一个../会抵消前面的一个路径，如此处只会抵消一个/c路径
// ./不会影响路径的拼接！
const pathStr1 = path.join('/a', '/b/c', '../', './d', 'e');
const pathStr2 = path.join('/a', '/b/c', '../../', './d', 'e');
console.log(pathStr1, pathStr2) //结果：\a\b\d\e

// 与前面的__dirname相结合，path.join方法实际上常常和__dirname结合使用，取代'+'号的使用
const pathStr3 = path.join(__dirname, './files/1.txt')
console.log(pathStr3)

fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function (err, dataStr) {
  if (err) {
    return console.log("读取失败",err.message);
  }
  console.log("读取成功",dataStr)
})