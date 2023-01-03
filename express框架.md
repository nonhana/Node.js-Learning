# express框架

## 学习目标

1. 能够使用express.static()托管静态资源
2. 能够使用express路由精简项目结构
3. 能够使用常见的express中间件
4. 能够使用express创建API接口
5. 能够在express中启用cors跨域资源共享

## 1. 初识express

### 1.1 express简介

1. 什么是express

   官方给出的概念：express是基于Node.js平台，快速、开放、极简的Web开发框架。

   通俗的理解：express的作用与Node.js内置的http模块类似，是专门用来创建Web服务器的。

   express的本质：就是一个npm上的第三方包，里面提供了快速创建Web服务器的便捷方法。

   express中文官网地址：[http://www.expressjs.com.cn](http://www.expressjs.com.cn)

2. 进一步理解express

   问：不使用express能否创建Web服务器？

   答：能，使用Node.js提供的原生http模块即可。但是http内置模块用起来很复杂，开发效率低；express是基于内置的http模块进一步进行封装出来的，能够极大的提高开发效率。

   问：http内置模块与express是什么关系？

   答：类似于浏览器中WebAPI与jQuery之间的关系。后者是基于前者进一步封装出来的。

3. express能做什么

   对于前端程序员来说，最常见的两种服务器，分别是：

   - Web网站服务器：专门对外提供Web网页资源的服务器
   - API接口服务器：专门对外提供API接口的服务器

   使用express，我们可以方便、快速的创建Web网站的服务器或API接口的服务器。

### 1.2 express的基本使用

1. 安装

   在项目所处的目录中，运行如下的终端命令，即可将express安装到项目中进行使用：

   ```js
   npm i express@4.17.1
   ```

2. 创建基本的Web服务器

   ```js
   // 1.导入express
   const express = require('express')
   // 2.创建Web服务器
   const app = express()
   // 3.启动Web服务器
   app.listen(80, () => {
     console.log("this server is running at http://127.0.0.1")
   })
   ```

3. 监听GET请求

   通过app.get()方法，可以监听客户端的get请求，具体的语法格式如下：

   ```js
   // 参数1：客户端请求的URL地址
   // 参数2：请求对应的处理函数
   // req：请求对象(包含了与请求相关的属性与方法)
   // res：响应对象(包含了与响应相关的属性与方法)
   app.get('请求URL',function(req,res){/*处理函数*/})
   ```

4. 监听POST请求

   通过app.post()方法，可以监听客户端的post请求，具体的语法格式如下：

   ```js
   // 参数1：客户端请求的URL地址
   // 参数2：请求对应的处理函数
   // req：请求对象(包含了与请求相关的属性与方法)
   // res：响应对象(包含了与响应相关的属性与方法)
   app.post('请求URL',function(req,res){/*处理函数*/})
   ```

5. 把内容响应给客户端

   ```js
   // 4.监听客户端的get与post请求，并向客户端响应具体的内容
   app.get('/user', (req, res) => {
     // 调用express提供的res.send()方法，向客户端响应内容
     res.send({
       name: "周想",
       age: 20,
       gender: "男"
     })
   })
   app.post('/user', (req, res) => {
     // 调用express提供的res.send()方法，向客户端响应内容
     res.send("请求成功")
   })
   ```

6. 获取URL中携带的查询参数

   通过req.query对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

   ```js
   app.get('/', (req, res) => {
     // 通过req.query可以获取到客户端发送过来的查询参数
     // 注意：默认情况下，req.query是一个空对象
     console.log(req.query)
     res.send(req.query)
   })
   ```

7. 获取URL中的动态参数

   通过req.params对象，可以访问到URL中，通过:匹配到的动态参数

   ```js
   // 注意:这里的:id是一个动态的参数
   app.get('/user/:id/:name', (req, res) => {
     // res.params是动态匹配到的url参数，默认值为空对象
     // :后的变量就是接收到的变量名称
     console.log(req.params);
     res.send(req.params)
   })
   ```

### 1.3 托管静态资源

1. express.static()

   express提供了一个非常好用的函数，叫做express.static()，通过它，我们可以非常方便的创建一个静态资源服务器，例如，通过如下代码我们可以将public目录下的图片、css文件、js文件对外开放访问了：

   ```js
   app.use(express.static('public'))
   ```

   注意：express在制定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态资源的文件的目录名不会出现在URL中。

2. 托管多个静态资源目录

   如果要托管多个静态资源目录，多次调用express.static()即可。

   访问静态资源文件时，express.static()函数会根据目录的添加顺序查找所需的文件。如果在第一个文件夹找到了文件，那就不找第二个了。

3. 挂载路径前缀

   如果希望在托管的静态资源访问路径之前挂载路径前缀，则可以使用如下方式：

   ```js
   app.use('/public',express.static('public'))
   ```

### 1.4 nodemon

1. 为什么要使用nodemon

   在编写调试Node.js中，如果修改了项目的代码，则需要频繁的手动close掉并重新启动，十分的繁琐。

   因此，使用nodemon这个工具，能够监听项目文件的变动，当代码被修改后，能够自动帮我们重启项目，极大的方便了我们的开发。

2. 安装nodemon

   在终端中，运行如下命令：

   ```js
   npm install -g nodemon
   ```

3. 使用nodemon

   装了nodemon之后，可以将node命令替换为nodemon命令，使用nodemon app.js来启动项目。这样启动了之后会被nodemon监听到，可以实现自动重启项目的效果。也就是说，你编辑了现在正在启动的服务器的js文件，保存之后就会自动的进行实时编译。

## 2. express路由

### 2.1 路由的概念

1. 广义上来讲，路由就是指**映射关系**，相当于函数之间的映射关系。

2. express中的路由

   在express中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

   express中的路由分三个部分组成，分别是请求的类型，请求的url地址，处理函数。格式如下：

   ```js
   app.METHOD(PATH,HANDLER)
   ```

3. express中的路由的例子

   ```js
   
   ```

4. 路由的匹配过程

   每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。

   在匹配时，会按照路由的顺序进行匹配。如果请求类型和请求url同时匹配成功，则express会将这次请求转交给对应的function函数进行处理。

   ![image-20230102172135849](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230102172135849.png)

   路由匹配的注意点：

   - 按照路由定义的先后顺序进行匹配
   - 请求类型和请求的url同时匹配成功，才会调用对应的处理函数

### 2.2 路由的使用

1. 最简单的用法

   在express中使用路由最简单的方式，就是把路由挂载到app上，示例代码如下：

   ```js
   const express = require('express')
   const app = express()
   
   // 挂载路由
   app.get('/', (req, res) => {
     res.send("hello world")
   })
   app.post('/', (req, res) => {
     res.send("Post Request.")
   })
   
   app.listen(80, () => {
     console.log("http://127.0.0.1")
   })
   ```

2. 模块化路由

   为了方便对路由进行模块化的管理，express不建议将路由直接挂载到app上面，而是推荐将路由抽离为单独的模块。

   将路由抽离为单独模块的步骤如下：

   - 创建路由模块对应的.js文件
   - 调用express.Router()函数**创建路由对象**
   - 向路由对象上挂载具体的路由
   - 使用module.exports()向外共享路由对象
   - 使用app.use()函数注册路由模块

3. 创建路由模块

   创建一个router.js文件，内容如下：

   ```js
   // 这是路由模块
   // 1.导入express
   const express = require('express')
   // 2.创建路由对象
   const router = express.Router()
   // 3.挂载具体的路由
   router.get('/user/list', (req, res) => {
     res.send("get user list")
   })
   router.post('/user/add', (req, res) => {
     res.send("add user")
   })
   // 4.向外导出路由对象
   module.exports = router
   ```

4. 注册路由模块

   ```js
   // 1.导入路由模块
   const router = require('./5.router')
   // 2.注册路由模块
   app.use(router)
   ```

5. 整体的使用自己定义的路由模块

   ```js
   const express = require('express')
   const app = express()
   
   // 1.导入路由模块
   const router = require('./5.router')
   // 2.注册路由模块
   app.use(router)
   
   // 注意：app.use()函数的作用，就是来注册全局中间件的
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

6. 为路由模块添加**前缀**

   只需要在注册路由模块之前加一个"'/XXX',"即可。

   ```js
   // 2.注册路由模块
   app.use('/api', router)
   ```

## 3. express中间件

### 3.1 中间件的概念

1. 什么是中间件

   中间件(Middleware)，特指业务流程中的**中间处理环节**。

2. 现实生活中的例子

   ![image-20230102180130549](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230102180130549.png)

   处理污水的这三个中间处理环节，就可以叫做中间件。

3. express中间件的调用流程

   当一个请求到达express的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

   ![image-20230102180250839](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230102180250839.png)

   中间件处理完毕之后，通过路由来进行相应。

4. express中间件的格式

   express的中间件，本质上就是一个function处理函数。express中间件的格式如下：

   ![image-20230102180417568](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230102180417568.png)

   注意：中间件函数的形参列表中，必须包含next参数。而路由处理函数中只包含req与res。

5. next函数的作用

   next函数是实现多个中间件连续调用的关键，他表示把流转关系**转交**给下一个中间件或路由。多次使用next()函数，能够串起来整个中间件流水线。

### 3.2 express中间件的初体验

1. 定义中间件函数

   可以通过如下的方式，定义一个最简单的中间件函数：

   ```js
   const express = require('express')
   const app = express()
   
   // 定义一个最简单的中间件函数
   const mw = function (req, res, next) {
     console.log("这是最简单的中间件函数")
     // 把流转关系转交给下一个中间件或路由
     next()
   }
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

2. 全局生效的中间件

   客户端发起的任何请求，到达服务器之后都会触发的中间件，叫做全局生效的中间件。

   通过调用app.use(中间件函数)，即可定义一个全局生效的中间件，实例代码如下：

   ```js
   const express = require('express')
   const app = express()
   
   // 定义一个最简单的中间件函数
   const mw = function (req, res, next) {
     console.log("这是最简单的中间件函数")
     // 把流转关系转交给下一个中间件或路由
     next()
   }
   
   // 将mw注册为全局生效的中间件
   app.use(mw)
   
   app.get('/', (req, res) => {
     console.log("调用了 / 这个路由")
     res.send('Home Page')
   })
   app.get('/user', (req, res) => {
     console.log("调用了 /user 这个路由")
     res.send('User Page')
   })
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

3. 定义全局中间件的简化形式

   直接在app内部定义中间件函数即可。

   ```js
   // 这是定义全局中间件的简化形式
   app.use((req, res, next) => {
     console.log("这是最简单的中间件函数")
     // 把流转关系转交给下一个中间件或路由
     next()
   })
   ```

4. 中间件的作用

   多个中间件之间，可以共享同一份req与res。**基于这样的特性，我们可以在上游的中间件中，统一为req或res对象添加自定义的属性或者方法，供下游的中间件或者路由进行使用**。

   ![image-20230102182057879](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230102182057879.png)

5. 定义多个全局中间件

   可以**用app.use()连续定义多个全局中间件**。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用，示例代码如下：

   ```js
   const express = require('express')
   const app = express()
   
   // 定义第一个全局中间件
   app.use((req, res, next) => {
     console.log("调用了第一个全局中间件")
     next()
   })
   // 定义第二个全局中间件
   app.use((req, res, next) => {
     console.log("调用了第二个全局中间件")
     next()
   })
   // 定义一个路由
   app.get('/user', (req, res) => {
     res.send("User Page")
   })
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

6. 局部生效的中间件

   不使用app.use()定义的中间件，就叫做局部生效的中间件。示例代码如下：

   ```js
   const express = require('express')
   const app = express()
   
   // 1.定义局部中间件函数
   const mwl = (req, res, next) => {
     console.log("调用了局部生效的中间件")
     next()
   }
   
   // 2.创建路由
   // 在url与回调函数之间写入需要传入的中间件
   app.get('/', mwl, (req, res) => {
     res.send("Home Page")
   })
   app.get('/user', (req, res) => {
     res.send("User Page")
   })
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

7. 定义多个局部中间件

   可以在路由中，通过如下两种等价的方式，使用多个局部中间件：

   ```js
   app.get('/', [mwl1, mwl2], (req, res) => {
     res.send("Home Page")
   })
   app.get('/', mwl1, mwl2, (req, res) => {
     res.send("Home Page")
   })
   ```

8. 了解中间件的5个使用注意事项
   1. 一定要在路由之前注册好中间件，路由只能在最后
   2. 客户端发送过来的请求可以连续调用多个中间件进行处理
   3. 执行完中间件的业务代码之后，不要忘记调用next()函数
   4. 为了防止代码逻辑的混乱，在next()之后不要再写额外的代码
   5. 连续调用多个中间件时，多个中间件之间共享req与res对象

### 3.3 中间件的分类

为了方便大家理解和记忆中间件的使用，express官方把常见的中间件用法分成了五大类

1. **应用级别**的中间件
2. **路由级别**的中间件
3. **错误级别**的中间件
4. **express内置**的中间件
5. **第三方**的中间件

1. 应用级别的中间件

   通过app.use()或app.get()或app.post()，**绑定到app对象实例上的中间件，叫做应用级别中间件。**

2. 路由级别的中间件

   绑定到express.Router()实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过应用级别中间件绑定到app实例上，路由级别中间件绑定到Router实例上。

3. 错误级别的中间件

   错误级别的中间件的作用：**专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。**

   格式：错误级别的中间件的function处理函数中，必须有4个形参，形参顺序从前到后依次是(err,req,res,next)。

   ```js
   const express = require('express')
   const app = express()
   
   app.get('/', (req, res) => {
     // 人为的制造错误
     throw new Error('服务器内部发生了错误！')
     res.send("Home Page")
   })
   
   // 定义错误级别中间件，捕获整个项目的异常错误，从而防止程序的崩溃
   app.use((err, req, res, next) => {
     console.log("发生了错误！" + err.message)
     res.send('Error' + err.message)
   })
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

   **注意：错误级别的中间件必须注册在所有的路由之后！**

4. express内置的中间件

   自express4.16.0版本开始，express内置了三个常用的中间件，极大地提高了express项目的开发效率和体验：

   1. express.static()：快速托管静态资源的内置中间件(无兼容性)
   2. express.json()：解析JSON格式的请求体数据(有兼容性，仅在4.16.0+版本中可用)
   3. express.urlencoded()：解析URL-encoded格式的请求体数据(有兼容性，仅在4.16.0+版本中可用)

   ```js
   app.use(express.json())
   app.use(express.urlencoded({extend:false}))
   ```

   示例代码：

   ```js
   const express = require('express')
   const app = express()
   
   // 注意：除了错误级别的中间件，其他的中间件必须在路由之前进行配置
   // 通过express.json()这个中间件，解析表单中的JSON格式的数据
   app.use(express.json())
   // 通过express.urlencoded()这个中间件，解析表单中的url-encoded格式的数据
   app.use(express.urlencoded({ extended: false }))
   
   app.post('/user', (req, res) => {
     // 在服务器，可以接收res.body接收客户端发送过来的请求体数据
     // 默认情况下，如果不配置解析表单数据的中间件，则req.bodu默认等于undefined
     console.log(req.body)
     res.send("ok")
   })
   app.post('/book', (req, res) => {
     // 在服务器，可以接收res.body接收客户端发送过来的json格式数据和url-encoded格式的数据
     console.log(req.body)
     res.send("ok")
   })
   
   app.listen(80, () => {
     console.log('http://127.0.0.1')
   })
   ```

5. 第三方中间件

   非express官方内置的，而是由第三方开发出来的中间件叫做第三方中间件。

   以body-parser这个用来解析请求体数据的第三方中间件为例，使用步骤如下：

   - 运行npm install body-parser安装中间件
   - 使用require()导入中间件
   - 调用app.use()注册并使用中间件

   注意：express内置的express.urlencoded中间件就是基于body-parser这个第三方中间件进一步封装出来的。

### 3.4 自定义中间件

1. 需求描述与实现步骤

   自己手动模拟一个类似于express.urlencoded这样的中间件，来解析POST提交到服务器的表单数据

   实现步骤：

   1. 定义中间件
   2. 监听req的data事件
   3. 监听req的end事件
   4. 使用querystring模块解析请求体数据
   5. 将解析出来的数据对象挂载为req.body
   6. 将自定义中间件封装为模块

2. 定义中间件

   使用app.use()来定义全局生效的中间件，代码如下：

   ```js
   // 解析表单数据的中间件
   app.use((req, res, next) => {
     // 定义中间件具体的业务逻辑
     // 1.定义一个str字符串，专门用来存储客户端发送过来的请求体数据
     let str = ''
     // 2.监听req的data事件，只要有数据发过来就会触发这个事件
     req.on('data', (chunk) => {
       str += chunk
     })
     // 3.监听req的end事件
     req.on('end', () => {
       // 在str中存放的是完整的请求体数据
       console.log(str)
       // TODO：把字符串格式的请求体数据，解析成对象格式
     })
   })
   ```

3. 监听req的data事件 

   在中间件中，需要监听req对象的data事件，来获取客户端发送到服务器的数据。

   如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以data事件可能会触发多次，每一次触发data事件时，获取到数据只能是完整数据的一部分，需要手动对接收到的数据进行拼接。

   ```js
   // 2.监听req的data事件，只要有数据发过来就会触发这个事件
   req.on('data', (chunk) => {
       str += chunk
   })
   ```

4. 监听req的end事件

   当请求体数据接收完毕之后，会自动触发req的end事件。

   因此，我们可以在req的end事件中，拿到并处理完整的请求体数据。示例代码如下：

   ```js
   // 3.监听req的end事件
   req.on('end', () => {
       // 在str中存放的是完整的请求体数据
       console.log(str)
       // TODO：把字符串格式的请求体数据，解析成对象格式
   })
   ```

5. 使用querystring模块解析请求体数据

   Node.js内置了一个querystring模块，专门用来处理查询字符串。通过这个模块提供的parse()函数，可以轻松把查询字符串解析成对象的格式。示例代码如下：

   ```js
   // 导入Node.js内置的querystring模块
   const qs = require('querystring')
   req.on('data', (chunk) => {
       str += chunk
   })
   // 3.监听req的end事件
   req.on('end', () => {
       // 在str中存放的是完整的请求体数据
       // console.log(str)
       // TODO：把字符串格式的请求体数据，解析成对象格式
       const body = qs.parse(str)
       console.log(body)
   })
   ```

6. 将解析出来的数据对象挂载为req.body

   **上游的中间件和下游的中间件及路由之间，共享同一份req与res。**因此，我们可以将解析出来的数据，挂载为req的自定义属性，命名为req.body供下游使用。示例代码如下：

   ```js
   req.on('end', () => {
       // TODO：把字符串格式的请求体数据，解析成对象格式
       const body = qs.parse(str)
       req.body = body
       next()
   })
   ```

7. 将自定义中间件**封装**为模块

   为了优化代码的结构，我们可以把自定义的中间件函数封装为独立的模块。示例代码如下：

   ```js
   // 导入Node.js内置的querystring模块
   const qs = require('querystring')
   // 定义中间件函数
   const BodyParser = (req, res, next) => {
     // 定义中间件具体的业务逻辑
     // 1.定义一个str字符串，专门用来存储客户端发送过来的请求体数据
     let str = ''
     // 2.监听req的data事件，只要有数据发过来就会触发这个事件
     req.on('data', (chunk) => {
       str += chunk
     })
     // 3.监听req的end事件
     req.on('end', () => {
       // TODO：把字符串格式的请求体数据，解析成对象格式
       const body = qs.parse(str)
       req.body = body
       next()
     })
   }
   // 用module.exports暴露出去
   module.exports = BodyParser
   ```

## 4. 使用express写接口

### 4.1 创建基本的服务器

```js
const express = require('express')
const app = express()

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

### 4.2 创建API路由模块

```js
const express = require('express')
const router = express.Router()

// 在这里挂载对应的路由

// 暴露router
module.exports = router
```

### 4.3 编写GET接口

```js
router.get('/get', (req, res) => {
  // 通过req.query获取客户端通过查询字符串发送到服务器端的数据
  const query = req.query
  // 调用res.send()方法，向客户端响应处理的结果
  res.send({
    status: 0,//0表示成功，1表示失败
    msg: 'GET请求成功！',//状态的描述
    data: query//需要响应给客户端的数据
  })
})
```

### 4.4 编写POST接口

```js
// 定义POST接口
router.post('/post', (req, res) => {
  // 通过req.body获取请求体中包含的url-encoded格式的数据
  const body = req.body
  res.send({
    status: 0,
    msg: "POST请求成功！",
    data: body
  })
})
```

注意：如果要获取URL-encoded格式的请求体数据，必须配置中间件app.use(express.urlencoded({extended:false}))

### 4.5 CORS跨域资源共享

1. 接口的跨域问题

   刚才编写的GET和POST接口，存在一个很严重的问题：不支持跨域请求。

   解决接口跨域的问题主要有两种：

   1. CORS(主流的解决方案，**推荐使用**)
   2. JSONP(有缺陷的解决方案，只支持GET请求)

2. 使用CORS中间件解决跨域问题

   cors是express的一个第三方中间件，通过安装和配置cors中间件，能够很方便的解决跨域问题。

   使用步骤分为三步：

   - 运行npm install cors安装中间件
   - 使用const cors=require('cors')导入中间件
   - 在路由之前调用app.use(cors())配置中间件

3. 什么是CORS

   CORS(Cross-Origin Resource Sharing，跨域资源共享)由一系列http响应头组成，**这些http响应头决定浏览器是否组织前端JS代码跨域获取资源。**

   浏览器的通源安全策略默认会阻止网页"跨域"获取资源。但如果接口服务器配置了CORS相关的HTTP响应头，就可以解除浏览器端的跨域访问限制。

   ![image-20230103191758354](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230103191758354.png)

4. CORS的注意事项

   1. CORS**主要在服务器端配置**。客户端浏览器无需做任何额外的配置即可请求开启了CORS的接口。
   2. CORS在浏览器中有兼容性。只有支持XMLHttpRequest Level2的浏览器才能正常访问开启了CORS的服务器端接口。(例如：IE10+，Chrome4+，FireFox3.5+)

5. CORS响应头部-Access-Control-Allow-Origin

   响应头部中可以携带一个Access-Control-Allow-Origin字段。其语法如下：

   ```js
   Access-Control-Allow-Origin:<origin> | *
   ```

   其中，origin参数的值指定了允许访问该资源的外域URL。

   例如，下面的字段值只允许来自http://itcast.cn的请求：

   ```js
   res.setHeader("Access-Control-Allow-Origin","http://itcast.cn")
   ```

   如果指定了Access-Control-Allow-Origin字段的值为通配符*，表示允许来自任何域的请求，示例代码如下：

   ```js
   res.setHeader("Access-Control-Allow-Origin","*")
   ```

6. CORS响应头部-Access-Control-Allow-Headers

   默认情况下，CORS仅支持客户端向服务器发送如下的9个请求头：

   ![image-20230103192542261](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230103192542261.png)

   如果客户端向服务器发送了额外的请求头信息，则需要在服务器端通过Access-Control-Allow-Headers对额外的请求头进行声明，否则这次请求会失败！

   ```js
   res.setHeader("Access-Control-Allow-Header","Content-Type","X-Custom-Header")
   ```

7. CORS响应头部-Access-Control-Allow-Methods

   默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求。

   如果客户端希望通过PUT、DELETE等方式请求服务器的资源，则需要在服务器端，通过Access-Control-Allow-Methods来指明实际请求所允许使用的HTTP方法。

   示例代码如下：

   ```js
   res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,HEAD")
   res.setHeader("Access-Control-Allow-Methods","*")
   ```

8. CORS请求的分类

   客户端在请求CORS接口时，根据请求方式和请求头的不同，可以将CORS的请求分为两大类：

   1. 简单请求
   2. 预检请求

9. 简单请求

   同时满足两大条件的请求，就属于简单请求：

   ![image-20230103193301751](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20230103193301751.png)

10. 预检请求

    只要符合以下任何一个条件的请求，都需要进行预检请求：

    1. 请求方式为**GET、POST、HEAD之外的请求Method类型**
    2. 请求头中**包含自定义头部字段**
    3. 向服务器**发送了application/json格式的数据**

    在浏览器与服务器正式通信之前，浏览器都会先发送OPTION请求进行预检，以获知服务器是否允许该实际请求。所以这一次的OPTION请求成为预检请求。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。

11. 简单请求与预检请求之间的区别

    简单请求的特点：客户端与服务器之间只会发生一次请求。

    预检请求的特点：客户端与服务器之间会发生两次请求，OPTION预检请求成功了之后，才会发起真正的请求。

### 4.6 JSONP接口

1. 回顾JSONP的概念与特点

   概念：**浏览器端通过<script>标签的src属性，请求服务器上的数据**，同时，服务器端返回一个函数的调用。这种请求数据的方式叫做JSONP。

   特点：

   1. JSONP不属于真正的Ajax请求。因为它没有使用XMLHttpRequest这个对象
   2. JSONP仅支持GET请求，不支持其他类型的请求

2. 创建JSONP接口的注意事项

   如果项目中已经配置了CORS跨域资源共享，为了防止冲突，必须**配置CORS中间件之前**声明JSONP的接口。否则JSONP接口会被处理成开启了CORS的接口。

3. 实现JSONP接口的步骤
   1. 获取客户端发送过来的回调函数的名字
   2. 得到要通过JSONP形式发送给客户端的数据
   3. 根据前两步的结果，拼接出一个函数调用的字符串
   4. 把上一步的字符串结果，响应给客户端的<script>标签进行解析执行

4. 实现JSONP接口的具体代码

   ```js
   // 必须在配置cors中间件之前配置JSONP的接口
   app.get('/api/jsonp', (req, res) => {
     // TODO：定义JSONP接口的具体实现过程
     // 1.得到函数的名称
     const funcName = req.query.callback
     // 2.定义要发送客户端的数据对象
     const data = {
       name: "周想",
       age: 20
     }
     // 3.拼接出一个函数的调用
     const scriptStr = `${funcName}(${JSON.stringify(data)})`
     // 4.把拼接出的字符串，响应给客户端
     res.send(scriptStr)
   })
   ```

5. 在网页中使用jQuery发起JSONP请求

   调用$.ajax()函数，提供JSONP的配置选项，从而发起JSONP请求，示例代码如下：

   ```js
   // 4.为JSONP绑定点击事件处理函数
   $('#btnJSONP').on('click', function () {
     $.ajax({
       type: 'GET',
       url: "http://127.0.0.1/api/JSONP",
       dataType: "jsonp",
       success: function (res) {
         console.log(res)
       }
     })
   })
   ```

   
