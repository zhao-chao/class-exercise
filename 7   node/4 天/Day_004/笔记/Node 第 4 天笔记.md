## Node 第 4 天

### 1.  学习目标

◆  能够熟练 express 路由的使用

◆  掌握中间件的使用方式

◆  能够说出中间件分为哪几类

◆  了解如何自定义中间件

◆  能够基于 exprss 写接口

◆  能够说出解决跨域问题的方法 cors 

◆  掌握如何实现 JSONP 接口





### 2. Express 路由

#### 2.1 路由的概念

 1.    路由就是**映射关系**

 2.    根据不同的用户 URL 请求，返回不同的内容

 3.    本质：URL 请求地址与服务器资源之间的对应关系

      <img src="./images/Day_004/001 - 路由.png" style="zoom:67%;" />



#### 2.2 Express 中的路由

1.  在 `Express` 中，路由指的是**客户端的请求**与**服务器处理函数**之间的**映射关系**

2. Express 中的路由分 3 部分组成，分别是**请求的类型**、**请求的 URL 地址**、**处理函数**

   <img src="./images/Day_004/002 - express中的路由.png" style="zoom:67%;" />

   
   
3.  Express 中的路由的例子

   <img src="./images/Day_004/003 - Express 中的路由的例子.png" style="zoom:67%;" />



#### 2.3 路由的匹配过程

1.  每当一个请求到达服务器之后，**需要先经过路由的匹配**，只有匹配成功之后，才会调用对应的处理函数

2.  在匹配时，会按照路由的顺序进行匹配，如果**请求类型**和**请求的 URL **同时匹配成功，则 `Express` 会将这次请求，转交给对应的 function 函数进行处理

   <img src="./images/Day_004/004 - 路由的匹配过程.png" style="zoom:67%;" />

   
   
3.  路由匹配的注意点

   - 按照定义的**先后顺序**进行匹配
   - **请求类型**和**请求的URL**同时匹配成功，才会调用对应的处理函数



#### 2.4 Express 路由最简单的用法

1.  在 `Express` 中使用路由最简单的方式，就是把路由挂载到 `app` 上

   

2.  案例代码

   ```js
   const express = require('express')
   // 创建 web 服务器，命名为 app
   const app = express()
   
   // 挂载路由
   app.get('/', (req, res) => {
     res.send('Hello, World')
   })
   
   app.post('/', (req, res) => {
     res.send('Hello, Tom')
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 2.5 模块化路由

1.  为了方便对路由进行模块化的管理，`Express` 不建议将路由直接挂载到 `app` 上，而是推荐将路由抽离为单独的模块，将路由抽离为单独模块的步骤如下

   -  创建路由模块对应的 `.js` 文件

   - 调用 `express.Router()`函数创建路由对象

   - 向路由对象上挂载具体的路由

   - 使用 `module.exports` 向外共享路由对象

   - 使用 `app.use()` 函数注册路由模块

     

2.  案例代码

   ```js
   // 1. 导入 express
   const express = require('express')
   // 2. 创建路由对象
   const router = express.Router()
   
   // 3. 挂载获取用户列表的路由
   router.get('/user/list', (req, res) => {
     res.send('用户列表')
   })
   
   // 4. 挂载添加用户列表的路由
   router.post('/user/add', (req, res) => {
     res.send('添加用户')
   })
   
   // 5. 向外导出路由对象
   module.exports = router
   
   ```



#### 2.6 注册路由模块

1.  导入路由模块

2.  使用 `app.use()` 注册路由模块

3. 案例代码

   ```js
   const express = require('express')
   const app = express()
   
   // 导入路由模块
   const userRouter = require('./002-router')
   
   // 使用 app.use() 注册路由模块
   app.use(userRouter)
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 2.7 为路由模块添加前缀

1.  类似于托管静态资源写法，为静态资源统一挂载访问前缀一样

2.  注意，添加了路由前缀后，访问的路由的时候，也应该加上前缀

3. 案例代码

   ```js
   const express = require('express')
   const app = express()
   
   // 导入路由模块
   const userRouter = require('./002-router')
   
   // 使用 app.use() 注册路由模块
   // 给路由模块添加统一得到访问前缀 /api
   app.use('/api', userRouter)
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```

   



### 3. 中间件

#### 3.1 中间件的概念

1.  什么是中间件

   所谓的中间件（`Middleware` ），特指业务流程的中间处理环节

   

2.  现实生活中的例子

   在处理污水的时候，一般都要经过三个处理环节，从而保证处理过后的废水，达到排放标准

   处理污水的这三个中间处理环节，就可以叫做中间件

   <img src="./images/Day_004/005 - 中间件.png" alt="中间件" style="zoom:67%;" />

   

#### 3.2 Express 中间件的调用流程

当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理

<img src="./images/Day_004/006 - 中间件的调用流程.png" style="zoom:67%;" alt="中间件的调用流程" />



#### 3.3 Express 中间件的格式

1.  Express 的中间件，**本质上就是一个 `function` 处理函数**，`Express` 中间件的格式如下

<img src="./images/Day_004/007 - Express 中间件的格式.png" style="zoom:67%;" />



2.  注意：中间件函数的形参列表中，**必须包含 next 参数**。而路由处理函数中只包含 `req` 和 `res`



#### 3.4 next 函数的作用

**next 函数**是实现**多个中间件连续调用**的关键，它表示把流转关系**转交**给下一个**中间件**或**路由**

<img src="./images/Day_004/008 - next 函数的作用.png" style="zoom:67%;" />





#### 3.5  定义中间件函数

- 定义一个最简单的中间件函数

  ```js
  const express = require('express')
  const app = express()
  
  // 定义一个最简单的中间件函数
  const kw = () => {
    console.log('这是最简单的中间件函数')
  
    // 把流转关系，转交给下一个中间件或者路由
    next()
  }
  
  app.listen(80, () => {
    console.log('running……')
  })
  
  ```





#### 3.6 全局生效的中间件

1.  客户端发起的**任何请求**，到达服务器之后，都会触发的中间件，叫做全局生效的中间件

2.  通过调用 `app.use(中间件函数)`，即可顶一个全局生效的中间件

   ```js
   const express = require('express')
   const app = express()
   
   // 定义一个最简单的中间件函数
   const kw = (req, res, next) => {
     console.log('这是最简单的中间件函数')
   
     // 把流转关系，转交给下一个中间件或者路由
     next()
   }
   
   // 全局生效的中间件
   app.use(kw)
   
   app.get('/', (req, res) => {
     console.log('调用了 / 这个路由')
     
     res.send('Home page')
   })
   
   app.get('/user', (req, res) => {
     console.log('调用了 /user 这个路由')
     res.send('User page')
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 3.7 定义全局中间件的简化形式

1.  定义全局中间件也可以将中间件函数直接挂载到 `app.use()` 上面

```js
const express = require('express')
const app = express()

// 定义全局中间件的简化形式
app.use((req, res, next) => {
  console.log('定义全局中间件的简化形式')

  next()
})

app.get('/', (req, res) => {
  console.log('调用了 / 这个路由')
  
  res.send('Home page')
})

app.get('/user', (req, res) => {
  console.log('调用了 /user 这个路由')
  res.send('User page')
})

app.listen(3000, () => {
  console.log('running……')
})

```



#### 3.8 中间件的作用

1.  多个中间件之间，共享同一份 `req` 和 `res`，基于这样的特性，我们可以在**上游** 的中间件中，统一为 `req` 或 `res` 对象添加自定义的属性和方法，供下游的中间件或路由进行使用

<img src="./images/Day_004/009 - 中间件的作用.png" style="zoom:67%;" />



2.  案例代码

   ```js
   const express = require('express')
   const app = express()
   
   // 定义全局中间件的简化形式
   app.use((req, res, next) => {
     // 获取到请求达到服务器的时间
     const time = Date.now()
   
     // 为 req 对象，挂载自定义属性，从而把时间共享给后面的所有路由
     req.startTime = time
     next()
   })
   
   app.get('/', (req, res) => {
     res.send('Home page' + req.startTime)
   })
   
   app.get('/user', (req, res) => {
     res.send('User page' + req.startTime)
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```

   



#### 3. 9 定义多个全局中间件

1.  可以使用 `app.use()` 连续定义多个全局中间件，客户端请求到达服务器之后，会按照中间件定义的先后顺序依次执行

   

2.  案例代码

   ```js
   const express = require('express')
   const app = express()
   
   // 第一个全局中间件
   app.use((req, res, next) => {
     console.log('调用了第一个全局的中间件')
     next()
   })
   
   // 第二个全局中间件
   app.use((req, res, next) => {
     console.log('调用了第二个全局的中间件')
     next()
   })
   
   // 定义路由
   // 请求这两个路由，会依次触发上述两个全局中间件
   app.get('/user', (req, res) => {
     res.send('User Page')
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 3.10 局部生效的中间件

1.  不使用 `app.use()` 定义的中间件，叫做局部生效的中间件

   

2.  案例代码

   ```js
   const express = require('express')
   const app = express()
   
   // 定义中间件函数 mv1
   const mv1 = (req, res, next) => {
     console.log('这是中间件函数')
   
     next()
   }
   
   // mv1 这个中间件只在 "当前路由中生效"，这种用法属于 "局部生效的中间件"
   app.get('/', mv1, (req, res) => {
     res.send('Home Page')
   })
   
   app.get('/user', (req, res) => {
     res.send('User Page')
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 3.11 定义多个局部中间件

1.  可以在路由中，通过如下两种等价的方式，使用多个局部中间件

   

2.  案例代码

   ```js
   const express = require('express')
   const app = express()
   
   // 定义中间件函数 mv1
   const mv1 = (req, res, next) => {
     console.log('这是第一个中间件函数')
   
     next()
   }
   
   // 定义中间件函数 mv2
   const mv2 = (req, res, next) => {
     console.log('这是第二个中间件函数')
   
     next()
   }
   
   // mv1、mv2 这个中间件只在 "当前路由中生效"，这种用法属于 "局部生效的中间件"
   app.get('/', mv1, mv2, (req, res) => {
     res.send('Home Page')
   })
   
   // 也可以使用数组的形式绑定两个中间件
   app.get('/user', [mv1, mv2], (req, res) => {
     res.send('Home Page')
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 3.12 中间件的5个使用注意事项

1.  一定要在路由之前注册中间件
2.  客户端发送过来的请求，可以连续调用多个中间件进行处理
3.  执行完中间件的业务代码之后，不要忘记调用 `next()` 函数
4.  为了防止代码逻辑混乱，调用 `next()` 函数后不要再写额外的代码
5.  连续调用多个中间件时，多个中间件之间，共享 `req` 和 `res` 对象



### 4. 中间件的分类

#### 4.1 中间件的分类

##### 4.1.1 中间件的分类

1.  为了方便大家理解和记忆中间件的使用，Express 官方把常见的中间件用法，分成了 5 大类，分别是

   - 应用级别的中间件
   - 路由级别的中间件
   - 错误级别的中间件
   - Express 内置的中间件
   - 第三方的中间件

   

##### 4.1.2 什么是应用级别的中间件

通过 `app.use()` 或 `app.get()` 或 `app.post()` ，**绑定到 `app` 实例上的中间件**，叫做应用级别的中间件

<img src="./images/Day_004/010 - 应用级别的中间件.png" style="zoom:67%;" />





##### 4.1.3 什么是路由级别的中间件

1.  绑定到 `express.Router()` 实例上的中间件，叫做路由级别的中间件

2.  用法上和应用级别中间件没有任何区别，只不过，应用级别中间件是绑定到 `app` 实例上，路由级别中间件绑定到 `router` 实例上

   <img src="./images/Day_004/011 - 路由级别的中间件.png" style="zoom: 85%;" />



#### 4.2 错误级别中间件

1.  错误级别中间件的作用： 专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题

2.  格式：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是`(err, req, res, next)`

3.  **注意： 错误级别的中间件，必须注册在所有路由之后**

4.  案例代码：

   ```js
   const express = require('express')
   const app = express()
   
   // 1. 路由
   app.get('/', (req, res) => {
     // 1.1 抛出一个自定义的错误
     throw new Error('服务器内部发生了错误')
   
     res.send('Home Page.')
   })
   
   // 2. 错误级别的中间件
   // 注意：错误级别的中间件，必须注册在所有路由之后
   app.use((err, req, res, next) => {
     // 2.1 在服务器打印错误消息
     console.log('发生了错误：' + err.message)
   
     // 2.2 向客户端响应错误相关的内容 
     res.send(err.message)
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 4.3 Express内置的中间件

自 `Express 4.16.0` 版本开始，`Express` 内置了 3 个常用的中间件，极大的提高了 `Express` 项目的开发效率和体验

1.  `express.static` 快速托管静态资源的内置中间件，例如： HTML 文件、图片、`CSS` 样式等（无兼容性）

2.  `express.json` 解析 `JSON` 格式的请求体数据（**有兼容性**，仅在 `4.16.0+` 版本中可用）

3.  `express.urlencoded` 解析 `URL-encoded` 格式的请求体数据（**有兼容性**，仅在 `4.16.0+` 版本中可用）

   <img src="./images/Day_004/012 - Express内置的中间件.png" style="zoom:67%;" />





#### 4.4 `express.json` 中间件的使用

1.   `express.json()`  中间件，解析表单中的 `JSON` 格式的数据

2.  案例代码

   ```js
   const express = require('express')
   const app = express()
   
   // 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
   // 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
   app.use(express.json())
   
   app.post('/user', (req, res) => {
     // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
     // 默认情况下，如果不配置解析表单数据中间件，则 req.body 默认等于 undefined
     console.log(req.body)
     res.send('ok')
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 4.5 `express.urlencoded` 中间件的使用

1.  `express.urlencoded` 解析 `URL-encoded` 格式的请求体数据

2.  案例代码

   ```js
   const express = require('express')
   const app = express()
   
   // 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据
   app.use(express.urlencoded({ extended: false }))
   
   app.post('/book', (req, res) => {
     console.log(req.body)
     res.send(req.body)
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```





#### 4.6 第三方的中间件

##### 4.6.1 什么是第三方中间件

1.  非 `Express` 官方内置，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率

2. 例如：在 `express@4.16.0` 之前的版本中，经常使用 `body-parser` 这个第三方中间件，来解析请求体数据。使用步骤如下

   - 运行 `npm install body-parser` 安装中间件
   - 使用 `require` 导入中间件
   - 调用 `app.use()` 注册并使用中间件

3.  **注意：`Express` 内置的 `express.urlencoded` 中间件，就是基于 `body-parser` 这个第三方中间件进一步封装出来的**

4.  案例代码

   ```js
   const express = require('express')
   const app = express()
   
   // 1. 导入解析表单数据的中间件 body-parser
   const bodyParser = require('body-parser')
   
   // 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据
   // app.use(express.urlencoded({ extended: false }))
   
   // 2. 使用 app.use() 注册中间件
   app.use(bodyParser.urlencoded({ extended: false }))
   
   app.post('/book', (req, res) => {
     console.log(req.body)
     res.send(req.body)
   })
   
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```

   

### 5. 自定义中间件

#### 5.1 需求描述与实现步骤

##### 5.1.1 需求以及实现步骤

1.  需求描述： 自己手动模拟一个类似于 `express.urlencoded` 这样的中间件，来解析 **`POST 提交到服务器的表单数据`**
2.  实现步骤：
   - 定义中间件
   - 监听 `req` 的 `data` 事件
   - 监听 `req` 的 `end` 事件
   - 使用 `querystring` 模块解析请求体数据
   - 将解析出来的数据对象挂载为 `req.body`
   - 将自定义中间件封装为模块

##### 5.1.2 定义中间件

1.  使用 `app.use()` 来定义全局生效的中间件

2.  代码如下：

   <img src="./images/Day_004/013 - 定义中间件.png" style="zoom:67%;" />

   

3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // 解析表单数据的中间件
   app.use((req, res, next) => {
     // 定义中间价具体的业务逻辑
   })
   
   // 调用 app.listen方法，指定端口号并启动 web 服务器
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```

   

#### 5.2  监听 `req` 的 `data` 事件

1.  在中间件中，需要监听 `req` 对象的 `data` 事件，来获取客户端发送到服务器的数据

2.  如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以 `data` 事件可能会触发多次，每一次触发 `data` 事件时，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接

3. 代码如下：

   <img src="./images/Day_004/014 - 监听 req 的 data 事件.png" style="zoom:80%;" />

   

4. 案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // 解析表单数据的中间件
   app.use((req, res, next) => {
     // 定义中间价具体的业务逻辑
     // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
     let str = ''
     // 2. 监听 req 的 data 事件
     req.on('data', (chunk) => {
       str += chunk
     })
   })
   
   // 调用 app.listen方法，指定端口号并启动 web 服务器
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 5.3 监听 `req` 的 `end` 事件

1.  当请求体数据接收完毕之后，会自动触发 `req` 的 `end` 事件

2.  我们可以在 `req` 的 `end` 事件中，拿到并处理完整的请求体数据

3.  代码如下

   <img src="./images/Day_004/015 - 监听 req 的 end 事件.png" style="zoom:67%;" />

   

4.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   
   // 解析表单数据的中间件
   app.use((req, res, next) => {
     // 定义中间价具体的业务逻辑
     // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
     let str = ''
     // 2. 监听 req 的 data 事件
     req.on('data', (chunk) => {
       str += chunk
     })
   
     // 3. 监听 req 的 end 事件
     req.on('end', () => {
       // 在 str 中存放的是完整的请求体数据
       console.log(str)
       // 将字符串格式的请求体数据，解析成对象
     })
   })
   
   app.post('/user', (req, res) => {
     res.send('ok')
   })
   
   // 调用 app.listen方法，指定端口号并启动 web 服务器
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 5.4 用 `querystring` 模块解析请求体数据

1.  `Node.js` 内置了一个 `querystring` 模块，专门用来处理查询字符串。通过这个模块提供的 `parse()` 函数，可以轻松把查询字符串，解析成对象的格式

2.  代码如下

   <img src="./images/Day_004/016 - 使用 querystring 模块解析请求体数据.png" style="zoom:67%;" />

   

3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   // 4. 导入 Node 内置模块 querystring
   const qs = require('querystring')
   
   // 解析表单数据的中间件
   app.use((req, res, next) => {
     // 定义中间价具体的业务逻辑
     // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
     let str = ''
     // 2. 监听 req 的 data 事件
     req.on('data', (chunk) => {
       str += chunk
     })
   
     // 3. 监听 req 的 end 事件
     req.on('end', () => {
       // 在 str 中存放的是完整的请求体数据
       console.log(str)
       // 将字符串格式的请求体数据，解析成对象
       // 5. 调用 qs.parse() 方法，将查询字符串解析成对象
       const body =  qs.parse(str)
       console.log(body)
     })
   })
   
   app.post('/user', (req, res) => {
     res.send('ok')
   })
   
   // 调用 app.listen方法，指定端口号并启动 web 服务器
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```





#### 5.5 将解析出来的数据对象挂载为 `req.body`

1.  **上游的中间件和下游的中间件及路由之间，共享同一份 `req` 和 `res`**，因此，我们可以将解析出来的数据，挂载为 `req` 的自定义属性，命名为 `req.body`，供下游使用

2.  代码如下

   <img src="./images/Day_004/017 - 将解析出来的数据对象挂载为 req.body.png" style="zoom:67%;" />

   

3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   // 创建 express 的服务器实例
   const app = express()
   // 4. 导入 Node 内置模块 querystring
   const qs = require('querystring')
   
   // 解析表单数据的中间件
   app.use((req, res, next) => {
     // 定义中间价具体的业务逻辑
     // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
     let str = ''
     // 2. 监听 req 的 data 事件
     req.on('data', (chunk) => {
       str += chunk
     })
   
     // 3. 监听 req 的 end 事件
     req.on('end', () => {
       // 在 str 中存放的是完整的请求体数据
       console.log(str)
       // 将字符串格式的请求体数据，解析成对象
       // 5. 调用 qs.parse() 方法，将查询字符串解析成对象
       const body =  qs.parse(str)
   
       // 6. 将解析出来的数据对象挂载为 req.body 属性
       req.body = body
       next()
     })
   })
   
   app.post('/user', (req, res) => {
     res.send(req.body)
   })
   
   // 调用 app.listen方法，指定端口号并启动 web 服务器
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```



#### 5.6  将自定义中间件封装为模块

1.  为了优化代码的结构，我们可以把自定义的中间件函数，封装为独立的模块

2.  代码如下：

   <img src="./images/Day_004/018 - 将自定义中间件封装为模块.png" style="zoom: 80%;" />

   

3.  案例代码

```js
// custom-body-parser.js

const qs = require('querystring')

const bodyParser = (req, res, next) => {
  // 定义中间价具体的业务逻辑
  // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
  let str = ''
  // 2. 监听 req 的 data 事件
  req.on('data', (chunk) => {
    str += chunk
  })

  // 3. 监听 req 的 end 事件
  req.on('end', () => {
    // 在 str 中存放的是完整的请求体数据
    console.log(str)
    // 将字符串格式的请求体数据，解析成对象
    // 5. 调用 qs.parse() 方法，将查询字符串解析成对象
    const body =  qs.parse(str)

    // 6. 将解析出来的数据对象挂载为 req.body 属性
    req.body = body
    next()
  })
}

module.exports = bodyParser

```

```js
// 对自定义的中间件进行模块化拆分

// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 导入自己封装的中间件模块
const customBodyParser = require('./017-custom-body-parser')
// 2. 将自定义的中间件函数，注册为全局可用的中间件
app.use(customBodyParser)

app.post('/user', (req, res) => {
  res.send(req.body)
})

// 调用 app.listen方法，指定端口号并启动 web 服务器
app.listen(3000, () => {
  console.log('running……')
})

```



### 6. 基于 Express 写接口

#### 6.1 创建基本的服务器

```js
// 导入 express 模块
const express = require('express')

// 创建 express 的服务器实例
const app = express()

// 调用 app.listen 方法，指定端口号并启动 web 服务器
app.listen(3000, () => {
  console.log('running……')
})

```





#### 6.2 创建 API 路由模块

```js
// router.js

const express = require('express')
const router = express.Router()

// 在这里挂载对应的路由


module.exports = router

```

```js
// index.js

// 导入 express 模块
const express = require('express')

// 创建 express 的服务器实例
const app = express()

// 导入路由模块
const router = require('./router.js')
// 把路由模块，注册到 app 上
app.use('/api', router)

// 调用 app.listen 方法，指定端口号并启动 web 服务器
app.listen(3000, () => {
  console.log('running……')
})

```





#### 6.3 编写 get 请求

```js
const express = require('express')
const router = express.Router()

// 在这里挂载对应的路由
router.get('/book', (req, res) => {
  // 通过 req.query 获取客户端通过查询字符串发送到服务器的数据
  const query = req.query

  // 调用 res.send() 方法，想客户端响应处理的结果
  res.send({
    status: 0,  // 0 表示处理成功，1 表示处理失败
    msg: 'GET 请求成功',  // 状态描述
    data: query // 需要响应给客户端的数据
  })
})

module.exports = router

```





#### 6.4 编写 post 请求

**注意：如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 `app.use(express.urlencoded({ extended: false }))`**

```js
const express = require('express')
const router = express.Router()

// 在这里挂载对应的路由

// 定义 POST 接口
router.post('/book', (req, res) => {
  // 通过 req.body 获取请求题中包含的 url-encoded 格式的数据
  const body = req.body

  // 调用 res.send() 方法，向客户端响应结果
  res.send({
    status: 0,
    msg: 'Post 请求成功',
    data: body
  })
})

module.exports = router

```

```js
// index.js
// 导入 express 模块
const express = require('express')

// 创建 express 的服务器实例
const app = express()

// 配置解析表单数据的中间件
//注意：如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))

// 导入路由模块
const router = require('./020-apiRouter')
// 把路由模块，注册到 app 上
app.use('/api', router)

// 调用 app.listen 方法，指定端口号并启动 web 服务器
app.listen(3000, () => {
  console.log('running……')
})

```



### 7. `cors`

#### 7.1  接口的跨域问题

1.  到目前为止，我们编写的 `GET` 和 `POST` 接口，存在一个很严重的问题：**不支持跨域请求**

2.   解决接口跨域问题的方案主要有两种

   - **CORS**  (主流的解决方案，推荐使用)
   - **JSONP**  (有缺陷的解决方案：只支持 GET 请求)

3.  代码演示

   ```html
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
     <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
   </head>
   
   <body>
     <button class="btn1">get</button>
     <button class="btn2">post</button>
   
     <script>
       $(function () {
         $('.btn1').click(function () {
           $.ajax({
             url: 'http://127.0.0.1:3000/api/book?name=tom&age=10',
             success: function (data) {
               console.log(data)
             }
           })
         })
   
         $('.btn2').click(function () {
           $.ajax({
             url: 'http://127.0.0.1:3000/api/book',
             method: 'post',
             data: {
               name: '雪中悍刀行',
               author: '烽火戏诸侯'
             },
             success: function (data) {
               console.log(data)
             }
           })
         })
       })
     </script>
   </body>
   
   </html>
   ```

   

4.  报错提示

   <img src="./images/Day_004/019 - 跨域.png" style="zoom: 200%;" />





#### 7.2 使用 cors 中间件解决跨域问题

1. cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题

2. 使用步骤

   - 安装中间件： `npm install cors`
   - 导入中间件： ` const cors = require('cors')`
   - 配置中间件： 在路由之前调用` app.use(cors())`

3.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   
   // 创建 express 的服务器实例
   const app = express()
   
   // 导入中间件
   const cors = require('cors')
   // 配置中间件
   app.use(cors())
   
   // 配置解析表单数据的中间件
   app.use(express.urlencoded({ extended: false }))
   
   // 导入路由模块
   const router = require('./020-apiRouter')
   // 把路由模块，注册到 app 上
   app.use('/api', router)
   
   // 调用 app.listen 方法，指定端口号并启动 web 服务器
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```

   

4.  配置 `cors ` 插件后

   <img src="./images/Day_004/020 - cors.png" style="zoom: 80%;" />



#### 7.3  什么是 CORS 以及注意事项

##### 7.3.1 什么是 CORS

1.  `CORS` (跨域资源共享) 由一系列 `HTTP` 响应头组成，这些 `HTTP` 响应头决定浏览器 **是否阻止前端 JS 代码跨域获取资源**

2.  浏览器的**同源安全策略**默认会阻止网页“跨域”获取资源。但如果接口服务器**配置了 CORS 相关的 HTTP 响应头**，就可以**解除浏览器端的跨域访问限制**

   <img src="./images/Day_004/021 - 什么是 CORS.png" style="zoom:80%;" />



##### 7.3.2  CORS 的注意事项

1.  `CORS` 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 `CORS` 的接口
2.  `CORS` 在浏览器中有兼容性。只有支持 `XMLHttpRequest Level2` 的浏览器，才能正常访问开启了 `CORS` 的服务端接口（例如：`IE10+`、`Chrome4+`、`FireFox3.5+`）



#### 7.4 了解 Access-Control-Allow-Origin

1.  响应头部中可以携带一个 `Access-Control-Allow-Origin` 字段

   <img src="./images/Day_004/022 - Access-Control-Allow-Origin.png" alt="Access-Control-Allow-Origin" style="zoom:67%;" />

2.  `origin` 参数的值指定了允许访问该资源的外域 `URL`

3.  例如，下面的字段值将只允许来自 http://itcast.cn 的请求

   <img src="./images/Day_004/023 -  Access-Control-Allow-Origin.png" style="zoom:67%;" />



 4.   如果指定了 `Access-Control-Allow-Origin` 字段的值为通配符 *，表示允许来自任何域的请求

      <img src="./images/Day_004/024 - Access-Control-Allow-Origin.png" style="zoom:67%;" />



#### 7.5 了解  Access-Control-Allow-Headers

1. 默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头

   - `Accept`
   - `Accept-Language`
   - `Content-Language`
   - `DPR`
   - `Downlink`
   - `Save-Data`
   - `Viewport-Width`
   - `Width`
   - `Content-Type` （值仅限于 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded` 三者之一）

   

2.  如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 `Access-Control-Allow-Headers` 对额外的请求头进行声明，否则这次请求会失败！

   <img src="./images/Day_004/025 - Access-Control-Allow-Headers.png" style="zoom:67%;" />



#### 7.6 了解  Access-Control-Allow-Methods

1.  默认情况下，`CORS` 仅支持客户端发起 `GET`、`POST`、`HEAD` 请求

2. 如果客户端希望通过 `PUT`、`DELETE` 等方式请求服务器的资源，则需要在服务器端，通过 `Access-Control-Alow-Methods` 来指明实际请求所允许使用的 `HTTP` 方法

   <img src="./images/Day_004/026 - Access-Control-Allow-Methods.png" style="zoom:67%;" />



#### 7.7 CORS 请求的分类

##### 7.7.1 CORS请求的分类

1.  客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类，分别是：

   -  简单请求
   -   预检请求

   

##### 7.2.2 简单请求

1.  同时满足以下两大条件的请求，就属于简单请求
   - **请求方式**：`GET`、`POST`、`HEAD` 三者之一
   - HTTP 头部信息不超过以下几种字段：
     - 无自定义头部字段
     - `Accept`
     - `Accept-Language`
     - `Content-Language`
     - `DPR`
     - `Downlink`
     - `Save-Data`
     - `Viewport-Width`
     - `Width `
     - `Content-Type`（只有三个值 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`）



##### 7.3.3 预检请求

1.  只要符合以下任何一个条件的请求，都需要进行预检请求

   - 请求方式为 `GET`、`POST`、`HEAD` 之外的请求 `Method` 类型
   - 请求头中包含自定义头部字段
   - 向服务器发送了 `application/json` 格式的数据

   

2.  在浏览器与服务器正式通信之前，浏览器会**先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求**，所以这一次的 OPTION 请求称为“预检请求”。**服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据**





#### 7.4 简单请求和预检请求的区别

1.  简单请求的特点：客户端与服务器之间**只会发生一次请求**
2.  预检请求的特点：客户端与服务器之间**会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求**



### 8. `jsonp`

#### 8.1 回顾 `JSONP` 的概念与特点

1.  概念：浏览器端通过 `<script>` 标签的 `src` 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 `JSONP`
2.  特点
   -  `JSONP` 不属于真正的 `Ajax` 请求，因为它没有使用 `XMLHttpRequest` 这个对象
   -  `JSONP` 仅支持 `GET` 请求，不支持 `POST`、`PUT`、`DELETE` 等请求



#### 8.2 创建 `JSONP` 接口的注意事项

1.  如果项目中已经配置了 `CORS` 跨域资源共享，为了防止冲突，必须在配置 `CORS` 中间件之前声明 `JSONP` 的接口

    否则 `JSONP` 接口会被处理成开启了 `CORS` 的接口

   

2.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   
   // 创建 express 的服务器实例
   const app = express()
   
   // 配置解析表单数据的中间件
   app.use(express.urlencoded({ extended: false }))
   
   // 必须在配置 cors 中间件之前，配置 JSONP 的接口
   app.get('/api/jsonp', (req, res) => {
     // 定义 JSONP 接口具体的实现过程
   })
   
   // 导入中间件
   const cors = require('cors')
   app.use(cors())
   
   // 导入路由模块
   const router = require('./020-apiRouter')
   // 把路由模块，注册到 app 上
   app.use('/api', router)
   
   // 调用 app.listen 方法，指定端口号并启动 web 服务器
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```

   

#### 8.3 实现 `JSONP` 接口的步骤

##### 8.3.1 实现步骤分析

1.  获取客户端发送过来的回调函数的名字
2.  得到要通过 `JSONP` 形式发送给客户端的数据
3.  根据前两步得到的数据，拼接出一个函数调用的字符串
4.  把上一步拼接得到的字符串，响应给客户端的 `<script>` 标签进行解析执行



##### 8.3.2  案例代码

1.  实现步骤

   <img src="./images/Day_004/027 - 实现 JSONP接口的步骤.png" style="zoom:67%;" />



2.  案例代码

   ```js
   // 导入 express 模块
   const express = require('express')
   
   // 创建 express 的服务器实例
   const app = express()
   
   // 配置解析表单数据的中间件
   app.use(express.urlencoded({ extended: false }))
   
   // 必须在配置 cors 中间件之前，配置 JSONP 的接口
   app.get('/api/jsonp', (req, res) => {
     // 定义 JSONP 接口具体的实现过程
     // 1. 得到函数的名称
     const funcName = req.query.callback
     // 2. 定义要发送到客户端的数据对象
     const data = { name: 'zs', age: 11 }
     // 3. 拼接处一个函数的调用
     const scriptStr = `${funcName}(${JSON.stringify(data)})`
     // 4. 把拼接的字符串，响应给客户端
     res.send(scriptStr)
   })
   
   // 导入中间件
   const cors = require('cors')
   app.use(cors())
   
   // 导入路由模块
   const router = require('./020-apiRouter')
   // 把路由模块，注册到 app 上
   app.use('/api', router)
   
   // 调用 app.listen 方法，指定端口号并启动 web 服务器
   app.listen(3000, () => {
     console.log('running……')
   })
   
   ```





#### 8.4  在网页中使用 jQuery 发起 JSONP 请求

1.  调用 $.ajax() 函数，提供 JSONP 的配置选项，从而发起 JSONP 请求

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
</head>

<body>
  <script>
    $(function () {
      $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:3000/api/jsonp',
        dataType: 'jsonp',
        success: function (res) {
          console.log(res)
        }
      })
    })
  </script>
</body>

</html>
```













































