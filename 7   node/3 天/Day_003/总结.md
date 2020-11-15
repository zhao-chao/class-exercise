## 流程

```bash
npm init -y / npm init --yes // 初始化包管理文件

npm i mime moment // 安装包

新建 .gitignore 里面配置忽略文件 node_modules

同事拉取到代码之后，只需要执行：npm i，会安装所有 package.json 里面记录的包
```

- 初始化包管理文件：`npm init -y`

- 卸载：`npm uninstall 包名`

- 安装到生产依赖（项目依赖、核心依赖）：`npm i mime / npm i mime -S / npm i mime --save`

- 安装到开发依赖：`npm i webpack -D / npm i webpack --save-dev`

- 安装 package.json 中的所有包：`npm i`

- 只安装 package.json 中核心依赖包：`npm i --production`

- 全局安装包：`npm i nodemon -g / npm i nodemon --global`

- 本地登录 npm：通过 nrm ls 命令查看是否处于 npm 地址，可以切换 nrm use npm，`npm login`

- 发布包：`npm publish`，确保命令行目录处于包的根目录

- 包的两种存在形式，作为`普通的文件`存在和作为`命令行`工具的形式存在

## 模块查找规则

### 不带路径

```js
// 1. 先找系统内置模块
// 2. 再找 node_modules 里面的模块
require('moment');
```

### 带路径

```javascript
// 1. 先找当前目录下 ifer-format 这个文件
// 2. 找当前目录下 ifer-format.js 这个文件
// 3. 找当前目录下 ifer-format.json 这个文件
// 4. 找当前目录下 ifer-format.node 这个文件
// 5. 先找 ifer-format 目录下 package.json 中 main 字段对应的文件
// 6. 如果找不到，会找 ifer-format 目录下的 index.js 文件
const format = require('./ifer-format');
```

## Express

```javascript
// 1. 引入 express
const express = require('express');
// 2. 创建服务器
const app = express();
// 3. 监听客户端请求
app.get('/news', (req, res) => {
    // req 经过 express 封装后的请求对象
    // res 经过 express 封装后的响应对象
    // req.query => 获取请求参数 => /news?name=ifer&age=18
});
// 4. 设置监听端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

```javascript
app.get('/news/:id', (req, res) => {
    // req.params => { id: 8888 } => 获取请求参数 => /news/8888
});
```

**托管静态资源**

```javascript
// 会把 public 目录的所有文件当做静态资源，可以通过这种方式（http://localhost）访问
app.use(express.static('public'));
app.use(express.static('source'));
// 指定虚拟路径，http://localhost/static/...
app.use('/static', express.static('source'));
```

## mime

获取文件的 Content-Type

```javascript
const mime = require('mime');
console.log(mime(文件地址)); // text/html
```

## nodemon

实时监听 JS 文件的变化，自动重启

```bash
npm i nodemon -g // 全局安装
nodemon -v // 查看版本号

nodemon server.js // 这样使用，一旦修改了 server.js 中的代码，就会自动重启
```