// 1  导入HTTP 模块
const fs = require('fs')
const http = require('http')
const path = require('path')
// 2 根据HTTP 模块创建服务器对像
const server = http.createServer()
// 3 监听客户端的请求
server.on('request', (req, res) => {
	const url = req.url
	let fpath = ''
	if (url === '/') {
		fpath = path.join(__dirname, '/clock', 'index.html')
	} else {
		fpath = path.join(__dirname, '/clock', url)
	}

	fs.readFile(fpath, (err, con) => {
		if (err) res.end('失败')
		res.end(con)
	})
})
// 4
server.listen(80, () => {
	console.log('Server running on http://127.0.0.1')
})
