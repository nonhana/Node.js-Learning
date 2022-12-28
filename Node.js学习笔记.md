# Node.js学习笔记

## 1. 初识Node.js

### 1.2 Node.js简介

1. 什么是Node.js

   Node.js是一个基于Chrome V8引擎的JavaScript运行环境。(Chrome V8是解析JS最快的解析引擎)

   换言之，**放到Node.js里面跑的JS代码就是后端开发的JS代码**。

2. Node.js官网地址：[https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)
3. Node.js中的JavaScript运行环境

![image-20221223200830889](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20221223200830889.png)

4. 注意点：
   1. 浏览器是JavaScript的**前端运行环境**。
   2. Node.js是JavaScript的**后端运行环境**。
   3. Node.js中无法调用DOM、BOM等浏览器内置API。

5. Node.js可以做什么

   Node.js作为一个JavaScript运行环境，仅仅提供了基础的功能与API。然而，基于Node.js提供的这些基础功能，很多强大的工具与框架如雨后春笋一般层出不穷。因此，学会了Node.js能使前端人员有很强大的开发能力。

   1. 基于Express框架([http://www.expressjs.com.cn](http://www.expressjs.com.cn))，能够快速构建web应用。
   2. 基于Electron框架([https://electronjs.org/](https://electronjs.org/))，可以构建跨平台的桌面应用。
   3. 基于restify框架([http://restify.com/](http://restify.com/))，可以快速构建API接口项目。(**我急需的东西**)
   4. 读写操作数据库，创建实用的命令行工具辅助前端开发等等。

6. Node.js学习仅需掌握JavaScript的语法即可。

   **JavaScript基础语法 **+**Node.js内置API模块**(fs,path,http等)+**第三方API模块**(express,mysql等)

### 1.3 Node.js环境的安装

1. 什么是终端

   终端(Terminal)是专门为开发人员设计的，用于实现人机交互的一种方式。

   需要识记一些常用的终端命令。

### 1.4 在Node.js环境下执行JS代码

1. 终端执行：
   1. 打开终端；
   2. 切换到要执行的文件的目录；
   3. 输入：**node** **要执行的js文件的路径**；
   4. 敲下回车即可执行。

2. 终端中的快捷键：
   1. 使用**↑**键，能够快速定位上一次的执行命令。
   2. 使用**tab**键，能够快速补全文件的路径。
   3. 使用**esc**键，能够快速清空当前已输入的命令。
   4. 输入**cls**，能够清空终端的所有内容。

## 2. fs文件系统模块

### 2.1 什么是fs文件系统模块

fs模块是node.js官方提供的，用来操作文件的模块。它提供了一系列的方法与属性，用来满足用户对文件的操作与需求。

例如：

- fs.readFile();方法用来读取指定文件当中的内容；
- fs.writeFile();方法用来向指定的文件中写入内容。

如果要在JavaScript代码中使用fs模块来操作文件，需要用以下的方式来先导入它：

```javascript
const fs = require('fs');
```

### 2.2 读取指定文件中的内容

1. fs.readFile();的语法格式

   ```javascript
   fs.readFile(path[,options],callback)
   ```

   - 参数1：**必选参数**，字符串，表示文件的路径。
   - 参数2：可选参数，表示以什么编码格式来读取文件。
   - 参数3：**必选参数**，文件读取完成后，通过回调函数拿到读取的结果。

   示例代码：

   ```javascript
   const fs = require('fs');
   fs.readFile('./files/1.txt','utf8',function(err,dataStr){
       console.log(err);
       console.log(dataStr);
   })
   ```

2. 判断文件是否读取成功

   可以判断err是否为null，从而知晓文件读取的结果。

   ![image-20221223205356201](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20221223205356201.png)

### 2.3 向指定的文件中写入内容

1. fs.writeFile()的语法格式

   使用fs.writeFile()方法，能够向指定的文件中写入内容，语法格式如下：

   ```js
   fs.writeFile(file,data[,options],callback);
   ```

   参数解读：

   - 参数1：**必选**参数，需要指定一个文件路径的字符串，表示文件的存放路径(**注意：只能够创建文件，不能够创建文件目录！**)；
   - 参数2：**必选**参数，表示要写入什么内容；
   - 参数3：可选参数，表示以什么格式写入文件内容，默认值是utf8；
   - 参数4：**必选**参数，表示写入完成后的回调函数。

2. 示例代码

   向指定的文件路径中写入文件内容：

   ```js
   const fs=require('fs')
   fs.writeFile('./files/2.txt','Hello Node.js!',function(err){
       console.log(err);
   })
   ```

3. 判断文件是否写入成功

   ```js
   const fs = require('fs')
   fs.writeFile('./files/3.txt', '尝试写入文件!', function (err) {
     if (err) {
       return console.log("文件写入失败！" + err.message);
     }
     console.log("文件写入成功！")
   })
   ```

### 2.4 fs模块——路径动态拼接的问题

在使用fs模块操作文件时，如果提供的操作路径是以./或../开头的相对路径时，很容易出现路径动态拼接错误的问题。

**原因：**代码在运行的时候，**会以执行node命令时所处的目录，动态拼接出被操作文件的完整路径**。

**解决：**

1. 只需要直接提供一个完整的文件存放路径即可(<u>绝对路径</u>)

2. 在需要引用的路径前面加一个__dirname(表示文件当前的所处目录，且其值**不会动态变化，是固定的**)

   示例代码：

   ```js
   fs.readFile(__dirname + '/files/1.txt', 'utf8', function (err, dataStr) {
     if (err) {
       return console.log("读取文件失败！" + err.message);
     }
     console.log("读取文件成功！" + dataStr)
   })
   ```

## 3.path路径模块

### 3.1 什么是path路径模块？

path路径模块是Node.js官方提供的、**用来处理路径的模块**。它提供了一系列的方法与属性，用来满足用户对路径的处理需求。

例如：

- path.join()方法用来**将多个路径片段拼接成一个完整的路径字符串**
- path.basename()方法用来**从路径字符串中将文件名解析出来**

如果要在JS代码中使用path路径模块 ，需要使用如下的方式先将其进行导入：

```js
const path=require('path');
```

### 3.2 路径拼接

1. path.join()的语法格式

   使用path.join()方法，可以把多个路径片段拼接为完整的路径字符串，语法格式如下：

   ```js
   path.join([...paths]);
   ```

   参数解读：

   - ...paths<string>：路径片段的序列
   - 返回值：<string>

2. path.join()的代码实例

   ```js
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
   
   // 运用path.join()读取文件：
   fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function (err, dataStr) {
     if (err) {
       return console.log("读取失败",err.message);
     }
     console.log("读取成功",dataStr)
   })
   ```

### 3.3 获取路径中的文件名

1. path.basename()的语法格式

   使用path.basename()方法，可以获取路径中的最后一部分，经常通过这个方法获取文件中的路径名，语法格式如下：

   ```js
   path.basename(path[,ext]);
   ```

   参数解读：

   - path<string>**必选参数**，表示一个路径的字符串
   - ext<string>可选参数，表示文件扩展名
   - 返回：<string>表示路径中的最后一部分

2. 代码实例：

   ```js
   const path = require('path');
   
   // 定义文件的存放路径
   const fpath = '/a/b/c/d/index.html'
   
   const fullName = path.basename(fpath);
   console.log("文件完整名", fullName)
   // 加上第二个参数后，会去掉文件的扩展名
   const nameWithoutExt = path.basename(fpath, '.html');
   console.log("文件名", nameWithoutExt)
   ```

### 3.4 获取路径中的文件扩展名

1. path.extname()的语法格式

   使用该方法，可以获取路径中的扩展名部分。

   ```js
   path.extname(path);
   ```

   参数解读：

   - path<string>必选参数，表示一个路径的字符串
   - 返回：<string>返回得到的扩展名字符串

2. 代码实例

   ````js
   const path = require('path');
   
   // 定义文件的存放路径
   const fpath = '/a/b/c/d/index.html'
   
   console.log(path.extname(fpath))
   ````


## 4. http模块

### 4.1 什么是http模块？

- 问：什么是**客户端**？什么是**服务器**？

- 答：在网络节点中，**负责消费资源的电脑**叫做客户端；**负责对外提供网络资源的电脑**，叫做服务器。

http模块是Node.js官方提供的、用来创建web服务器的模块。通过http模块提供的**http.createServer()**方法，就能方便的把一台普通的电脑变成一台web服务器，从而实现对外提供web资源服务。

如果想要创建一台web服务器，我们首先需要对其进行导入：

```js
const http=require('http');
```

### 4.2 进一步理解http模块的作用

服务器与普通电脑的区别在于：服务器上面安装了**web服务器软件**。例如：IIS、Apache等。通过这些软件的安装，就可以把一台普通的电脑变成一台web服务器。

### 4.3 服务器相关的概念

1. IP地址

   IP地址是互联网上每台计算机的唯一地址，因此IP地址具有唯一性。如果把"个人电脑"比作"一台电话"，那么IP地址就相当于"电话号码"。只有在知道对方IP的情况下，才能与对应的电脑之间进行数据通信。

   IP地址的格式：通常用"点分十进制"表示成**(a.b.c.d)**的形式。其中，abcd均是0~255之间的十进制整数。例如：192.168.1.1

   注意：

   1. 互联网上每台web服务器全都有自己的IP地址。访问IP地址相当于访问网址！
   2. 本机的电脑如果被当成服务期进行使用，只用访问127.0.0.1就可访问本机的资源(仅限测试使用)

2. 域名与域名服务器

   由于IP地址为一长串数字，不直观而且不便于记忆，于是人们发明了另一套字符型的地址方案，也就是域名地址。

   IP与域名之间是一一对应的关系，这种对应关系被存放在一种叫做**域名服务器(DNS)**的电脑当中。使用者只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器来实现。因此，域名服务器就是能**提供IP地址和域名之间转换服务的服务器**。

   注意：

   1. 单纯使用IP地址，互联网中的电脑也能够正常工作，但是有了域名的加持，是的互联网的世界变得更加的方便。
   2. 在开发测试期间，127.0.0.1也有着自己的域名，为localhost。他们都代表着我们自己的电脑，效果上无任何区别。

3. 端口号

   计算机中的端口号，就好像现实生活中的门牌号一样。通过门牌号，外卖小哥能够准确的将外卖送到指定客户的手中。

   相同道理，在一台电脑中，可以运行成百上千个web服务。**每个web服务都对应着一个唯一的端口号**。客户端发送过来的网络请求，通过端口号，能够被准确的交给对应的web服务进行处理。

   此处的web服务可以被理解为网站的启动端口，如：localhost:8080等

   注意：

   1. 每个端口号不能同时被多个web服务占用
   2. 在实际应用中，URL中的80端口号可以被省略

### 4.4 创建最基本的web服务器

1. 创建web服务器的基本步骤
   1. 导入http模块
   2. 创建web服务器实例(http.createServer())
   3. 为服务器实例绑定request事件，监听客户端的请求(server.on())
   4. 启动服务器(server.listen())

2. 代码实例：

   ```js
   // 导入http模块
   const http = require('http')
   // 创建web服务器实例(http.createServer())
   const server = http.createServer()
   // 为服务器实例绑定request事件，监听客户端的请求(server.on())
   server.on('request', function (req, res) {
     console.log("有人访问了我们的服务器")
   })
   // 启动服务器(server.listen())
   server.listen(80, function () {
     console.log("服务已经启动！")
   })
   ```

3. req请求对象

   只要服务器接收到了客户端的请求，就会通过调用server.on()为服务器绑定的request事件处理函数。

   如果想要在事件处理函数中访问与客户端有关的数据或者属性，可以使用如下的方式：

   ```js
   const http = require('http')
   
   const server = http.createServer()
   // req是请求对象，包含了与客户端相关的数据与属性
   server.on('request', (req) => {
     // req.url是客户端请求的url地址
     const url = req.url
     // req.method是客户端请求的method类型(浏览器直接访问该url时，只能是get方法)
     const method = req.method
     const str = `你的请求url是${url}，请求的方法是${method}`
     console.log(str)
   })
   
   server.listen(80, () => {
     console.log("服务器已经启动")
   })
   ```

4. res响应对象

   在服务器的request事件处理函数中，如果想访问与服务器有关的数据或者属性，可以使用如下的方式：

   ```js
   const http = require('http')
   const server = http.createServer()
   server.on('request', (req, res) => {
     const url = req.url
     const method = req.method
     const str = `你的请求url是${url}，请求的方法是${method}`
     // 调用res.end()方法，向客户端响应一些内容
     res.end(str)
   })
   server.listen(80, () => {
     console.log("服务器已经启动")
   })
   ```

5. 解决中文乱码问题

   当调用res.end()方法向客户端中发送一些中文内容的时候，会出现乱码问题。此时需要手动设置内容的编码格式：

   ```js
   const http = require('http')
   const server = http.createServer()
   server.on('request', (req, res) => {
     const url = req.url
     const method = req.method
     // 此处的字符串包含中文字符，如果不设置请求头会乱码
     const str = `你的请求url是${url}，请求的方法是${method}`
     // 调用res.setHeader()方法，设置Content-Type响应头，解决中文乱码的问题
     res.setHeader('Content-Type', 'text/html;charset=utf-8')
     // 响应字符串给客户端
     res.end(str)
   })
   server.listen(80, () => {
     console.log("服务器已经启动")
   })
   ```

### 4.5 根据不同的url相应不同的html内容

1. 核心实现步骤
   1. 获取请求的url地址
   2. 设置默认的响应内容为404 Not Found
   3. 判断用户请求的是否为/或/index.html首页
   4. 判断用户请求的是否为/about.html关于页
   5. 设置Content-Type响应头防止中文乱码
   6. 使用res.end()把内容响应给客户端

2. 动态响应内容

   示例代码如下：

   ```js
   const http = require('http')
   const server = http.createServer()
   server.on('request', (req, res) => {
     // 获取请求的url地址
     const url = req.url
     // 设置默认的响应内容为404 Not Found
     let content = '<h1>404 Not Found</h1>'
     // 当访问index.html与about.html时，返回不同的内容
     if (url === '/' || url === '/index.html') {
       content = '<h1>首页</h1>'
     } else if (url === '/about.html') {
       content = '<h1>关于页</h1>'
     }
     res.setHeader('Content-Type', 'text/html;charset=utf-8')
     res.end(content)
   })
   server.listen(80, () => {
     console.log("服务器已经启动：http://127.0.0.1")
   })
   ```


## 5. 模块化

### 5.1 模块化的基本概念

模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对整个系统来说，模块式可组合，分解和更换的单元。

编程领域的模块化，就是遵守固定的规则，把一个大文件拆成独立并相互依赖的多个小模块。

把代码进行模块化拆分的好处：

1. 提高了代码的复用性
2. 提高了代码的可维护性
3. 可以实现按需加载

### 5.2 模块化规范

模块化规范就是对代码进行模块化的拆分与组合时，需要遵守的那些规则。

例如：

- 使用什么样的语法格式来引用模块
- 在模块中使用什么样的语法格式向外暴露成员

模块化规范的好处：大家都遵守同样的模块化规范写代码降低了沟通的成本，极大方便了各个模块之间的相互调用。

### 5.3 Node.js中的模块化

1. 模块的分类

​	Node.js中根据来源的不同，将模块分为了三大类：

- 内置模块(是由Node.js官方提供的，例如fs，http，path等)

- 自定义模块(用户创建的每个js文件)

- 第三方模块(由第三方开发出来的模块，需要进行提前下载)

2. 加载模块

   使用强大的require()方法，可以加在需要的各种模块进行使用

   注意：使用require()方法引入模块时，会加载一遍引入模块中的代码

3. Node.js中的函数作用域

   和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内部被访问，这种模块级别的访问限制就是模块作用域

4. 模块作用域的好处

   防止了全局变量的污染问题

5. 向外共享模块作用域中的成员

   1. module对象

      在每个.js自定义模块中都有一个module对象，里面存储了**和当前模块有关的信息**。打印如下：

      ```js
      Module {
        id: '.',
        path: 'C:\\Users\\ASUS\\Desktop\\编程练习\\Node.js学习\\code',
        exports: {},
        filename: 'C:\\Users\\ASUS\\Desktop\\编程练习\\Node.js学习\\code\\20.演示module对象.js',
        loaded: false,
        children: [],
        paths: [
          'C:\\Users\\ASUS\\Desktop\\编程练习\\Node.js学习\\code\\node_modules',
          'C:\\Users\\ASUS\\Desktop\\编程练习\\Node.js学习\\node_modules',
          'C:\\Users\\ASUS\\Desktop\\编程练习\\node_modules',
          'C:\\Users\\ASUS\\Desktop\\node_modules',
          'C:\\Users\\ASUS\\node_modules',
          'C:\\Users\\node_modules',
          'C:\\node_modules'
        ]
      }
      ```

   2. module.exports对象

      在自定义模块中，可以使用module.exports对象，将模块内的成员共享出去，以供使用。

      外界用require()方法导入自定义模块时，得到的就是module.exports所指向的对象。

   3. 共享成员时的注意点

      使用require()方法导入模块时，导入的结果永远以module.exports指向的对象为准。

   4. exports对象

      由于module.exports单词写起来复杂，为了简化向外共享成员的代码，Node提供了exports对象。默认情况下，exports和module.exports指向的是同一个对象。最终共享的结果，还是以module.exports指向的对象为准。

