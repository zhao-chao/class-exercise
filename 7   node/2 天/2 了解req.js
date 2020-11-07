// 1  导入HTTP 模块
const http = require('http')
// 2 根据HTTP 模块创建服务器对像
const server = http.createServer()
// 3 监听客户端的请求
server.on('request', (req, res) => {
	res.setHeader('Content-Type', 'text/html;charset=utf8')
	if (req.url === '/') {
		res.end('欢迎来到首页')
	} else if (req.url === '/news') {
		res.end('欢迎来到新闻')
	} else {
		res.end('找求不到，404')
	}
})
// 4
server.listen(3000, () => {
	console.log('Server running on http://127.0.0.1:3000')
})
