## 路由

Express 中的路由：请求（请求方式和请求地址）和响应的对应关系

## 中间件

请求到达前的中间处理过程（本质上来说是一个函数）

## 中间件和全局中间件

``` js
const express = require('express');
const app = express();

// 只会输出一个hello，第二个函数只是普通的路由处理函数
/* app.get('/', (req, res) => {
    console.log('hello');
});
app.get('/', (req, res) => {
    console.log('world');
}); */

// 现在第二个参数就是一个中间件处理函数，当请求过来的时候，如果说调用了 next()，会继续向下匹配请求方式和请求路径
/* app.get('/', (req, res, next) => {
    console.log('hello');
    next();
});
app.get('/', (req, res) => {
    console.log('world');
}); */

// 全局生效的中间件处理函数，无论任何请求方式和请求地址都会走这里的处理过程
const md = (req, res, next) => {
    console.log('hello');
    next();
};
app.use(md);

app.get('/', (req, res) => {
    console.log('world');
});

app.listen(3000);
```

## 理解下面代码的输出结果

``` js
// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();

// 1. 定义中间件函数
const mw1 = (req, res, next) => {
    console.log('调用了第一个局部生效的中间件');
    next();
};

const mw2 = (req, res, next) => {
    console.log('调用了第二个局部生效的中间件');
    next();
};

// 2. 创建路由
app.get('/', [mw1, mw2], (req, res, next) => {
    console.log('hello');
    next();
});
app.get('/', (req, res) => {
    console.log('world');
    res.send('User page.');
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8080, function() {
    console.log('Express server running at http://127.0.0.1');
});
```

## 中间件的应用场景

* 挂载请求信息

``` js
app.use((req, res, next) => {
    // 获取到请求到达服务器的时间
    // 为 req 对象，挂载自定义属性，从而把时间共享给后面的所有路由
    req.startTime = Date.now();
    next();
});

app.get('/', (req, res) => {
    res.send('Home page.' + req.startTime);
});
```

* 网站的维护公告

``` js
// 注意这个代码要写在所有路由的最前面
app.use((req, res) => {
    res.send('此网站正在维护中...');
});
```

* 错误处理

``` js
app.get('/', (req, res) => {
    // 1.1 人为的制造错误
    throw new Error('服务器内部发生了错误！')
    // throw Error('服务器内部发生了错误！')
    // 如果说这样写，这时候错误处理中间件的第一个参数不再是一个错误对象了，而是字符串错误提示
    // throw '服务器内部发生了错误！';
    res.send('Home page.');
});
// 注意必须是 4 个参数，放到所有路由的最后
app.use((err, req, res, next) => {
    console.log('发生了错误！' + err.message);
    res.send('Error：' + err.message);
});
```

关于异步错误的处理

``` js
app.get('/', (req, res, next) => {
    fs.readFile('./aa.txt', 'utf8', (err, data) => {
        if (err) {
            // 可以把错误对象通过 next 函数传递给错误处理中间件的第一个参数
            return next(err);
        }
        res.send(data);
    });
});
// 注意必须是 4 个参数，放到所有路由的最后
app.use((err, req, res, next) => {
    console.log('发生了错误！' + err.message);
    res.send('Error：' + err.message);
});
```

- 404

```js
// 放到所有路由的最后面
app.use((req, res) => {
    res.send('404');
});
```

## 解析前端传递数据

```javascript
// application/json
app.use(express.json())
// application/x-www-form-urlencoded
// extended 是 false 的话，会使用内部的 querystring 模块进行解析，extended 是 true 的话，会使用第三方的 qs 模块进行解析
app.use(express.urlencoded({ extended: false }))
```

```javascript
// 旧版（4.16之前） Express 解析数据的写法
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

## 模拟第三方的 body-parser

```javascript
// body-parser2.js
const quertystring = require('querystring')
module.exports = {
    urlencoded: obj => (req, res, next) => {
        // 定义中间件具体的业务逻辑
        // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
        let str = ''
        // 2. 监听 req 的 data 事件
        req.on('data', (chunk) => {
            str += chunk
        })
        // 3. 监听 req 的 end 事件
        req.on('end', () => {
            if (!obj.extended) {
                // 如果说传递的 extended 是 false，就是用内部的 querystring 模块去解析数据
                // 在 str 中存放的是完整的请求体数据
                // name=ifer&age=18
                // { name: 'ifer', age: 18 }
                // 把解析好的数据挂载到 req.body 上面
                req.body = quertystring.parse(str)
                next()
            } else {
                // 如果说传递的 extended 是 true，用第三方的 qs 模块去解析数据
            }
        })
    }
};

// 外部使用就可以像使用 body-parser 一样去使用了
const bodyParser = require('./body-parser2')
app.use(bodyParser.urlencoded({ extended: false }));
```

## 模拟 req.query 的实现

```javascript
const url = require('url');
// 引入 express
const express = require('express');

// 创建服务器对象
const app = express();

// 自己也模拟一个 req.query

app.use((req, res, next) => {
    // 只需要在这一步，把解析后的数据挂载到 req.query2 上面
    // console.log(req.url); // /?name=ifer&age=18
    // 如果说第二个参数不传递，解析出来的 query 是 name=ifer&age=18
    // 如果说第二个参数传递的是 true，解析出来的 query 是 { name: 'ifer', age: 18 }
    const { query, pathname } = url.parse(req.url, true);
    req.query2 = query;
    next();
});

app.get('/', (req, res) => {
    res.send(req.query2);
});

// 监听端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

## 解决跨域

CORS：后端通过设置响应头的方式允许跨域（Access-Control-Allow-Origin）

JSONP：只支持GET方式的请求

- 前端代码

```js
<script>
function fn(data) {
    console.log(data);
}
</script>
<script src="http://localhost:3000/api/jsonp?callback=fn"></script>
```

- 后端代码：后端实际上返回的就是一个函数调用，只不过把数据当做实参传递过来了

```js
// 必须在配置 cors 中间件之前，配置 JSONP 的接口
app.get('/api/jsonp', (req, res) => {
    // 1. 得到函数的名称
    const funcName = req.query.callback
    // 2. 定义要发送到客户端的数据对象
    const data = { name: 'zs', age: 22 }
    // 3. 拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    // 4. 把拼接的字符串，响应给客户端
    res.send(scriptStr);
    // 下面一行相当于上面的 4 行
    // res.jsonp({ name: 'zs', age: 22 });
});
```