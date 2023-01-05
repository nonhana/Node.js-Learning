## 安装
```js
npm install itheima-tools
```

## 导入
```js
const itheima=require('itheima-tools')
```

## 格式化时间
```js
const dtStr = itheima.dateFormat(new Date())
console.log(dtStr)
```

## 转义HTML中的特殊字符
```js
const htmlStr = '<h1>这是h1标签<span>空格&nbsp;&nbsp;</span></h1>'
const str = itheima.htmlEscape(htmlStr)
console.log(str)
```

## 还原转义后的HTML特殊字符
```js
const htmlStr = '<h1>这是h1标签<span>空格&nbsp;&nbsp;</span></h1>'
const str = itheima.htmlEscape(htmlStr)
const str2 = itheima.htmlUnescape(str)
console.log(str2)
```

## 开源协议
ISC