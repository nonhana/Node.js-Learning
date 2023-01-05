const fs = require('fs');
const path = require('path');

// 先定义正则表达式
// \/表示转义字符，表示一个'/'字符
// 先匹配style节点
// [\s\S]*表示匹配任意多的任意字符：\s表示匹配空白部分，\S表示匹配非空白部分，*表示匹配任意多的字符
const regStyle = /<style>[\s\S]*<\/style>/
// 匹配script节点
const regScript = /<script>[\s\S]*<\/script>/

// 定义处理CSS的方法
function resolveCSS(str) {
  // 使用正则来提取所需要的内容(正则字符串.exec()方法用来专门提取字符串)
  const r1 = regStyle.exec(str);
  // 处理提取出来的字符串(用exec()提取出的内容是一个数组，[0]刚好是提取的内容)
  const CSSStr = r1[0].replace('<style>', '').replace('</style>', '');
  // 将提取出来的字符串写到文件夹里面
  // fs.writeFile只能创建文件，不能够创建目录(文件夹)！
  fs.writeFile(path.join(__dirname, './files/html_parts/index.css'), CSSStr, function (err) {
    if (err) {
      return console.log('写入CSS样式失败' + err.message)
    }
    console.log("写入样式成功")
  })
}

// 定义处理JS的方法
function resolveJS(str) {
  // 使用正则来提取所需要的内容(正则字符串.exec()方法用来专门提取字符串)
  const r1 = regScript.exec(str);
  // 处理提取出来的字符串(用exec()提取出的内容是一个数组，[0]刚好是提取的内容)
  const JSStr = r1[0].replace('<script>', '').replace('</script>', '');
  // 将提取出来的字符串写到文件夹里面
  fs.writeFile(path.join(__dirname, './files/html_parts/index.js'), JSStr, function (err) {
    if (err) {
      return console.log('写入JS脚本失败' + err.message)
    }
    console.log("写入JS脚本成功")
  })
}

// 定义处理HTML结构的方法
function resolveHTML(str) {
  // 将内嵌的style和js变为外联的标签
  const HTMLstr = str.replace(regStyle, '<link rel="stylesheet" href="./index.css">').replace(regScript, '<script src="./index.js"></script>')
  fs.writeFile(path.join(__dirname, './files/html_parts/index.html'), HTMLstr, function (err) {
    if (err) {
      return console.log("写入html失败" + err.message)
    }
    console.log("写入html成功")
  })
}


fs.readFile(path.join(__dirname, './files/index.html'), 'utf8', function (err, dataStr) {
  if (err) {
    return console.log('读取失败' + err.message);
  }
  // console.log('读取成功' + dataStr)
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHTML(dataStr)
})