const itheima = require('./itheima-tools')

// const dtStr = itheima.dateFormat(new Date())
// console.log(dtStr)

const htmlStr = '<h1>这是h1标签<span>空格&nbsp;&nbsp;</span></h1>'
const str = itheima.htmlEscape(htmlStr)
console.log(str)
const str2 = itheima.htmlUnescape(str)
console.log(str2)