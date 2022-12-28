const fs = require('fs')

fs.readFile('./files/成绩.txt', 'utf8', function (err, dataStr) {
  if (err) {
    return console.log("读取成绩失败！" + err.message)
  }
  // console.log("读取文件成功！" + dataStr)
  const arrOld = dataStr.split(' ');
  const arrNew = [];
  arrOld.forEach((item) => {
    arrNew.push(item.replace('=', ':'));
  })
  const newStr = arrNew.join('\r\n')
  console.log("处理好的字符串", newStr)

  // 把处理完毕的字符串，写入到新文件当中
  fs.writeFile('./files/成绩-整理.txt', newStr, function (err) {
    if (err) {
      return console.log("写入成绩失败！" + err.message)
    }
    console.log("写入成绩成功！")
  })
})