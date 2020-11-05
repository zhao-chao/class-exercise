// 导入模块
const fs = require('fs')
const path = require('path')
// 定义正则表达式
const regcss = /<style>[\s\S]*<\/style>/
const regjs = /<script>[\s\S]*<\/script>/
// 读取文件内容
fs.readFile(path.join(__dirname, '素材', 'index.html'), 'utf8', function (
	err,
	data
) {
	if (err) {
		return console.log('获取失败')
	}
	resolveCSS(data)
	resolvejs(data)
	resolvehtml(data)
})

// css
function resolveCSS(htmlStr) {
	const r1 = regcss.exec(htmlStr)
	const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
	fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, function (
		err,
		data
	) {
		if (err) return console.log('写入失败' + err.message)

		console.log('写入成功')
	})
}
// js
function resolvejs(htmlStr) {
	const r2 = regjs.exec(htmlStr)
	const newjs = r2[0].replace('<script>', '').replace('</script>', '')
	fs.writeFile(path.join(__dirname, './clock/index.js'), newjs, function (
		err,
		data
	) {
		if (err) return console.log('写入失败' + err.message)

		console.log('写入成功')
	})
}

// 5.1 定义处理 HTML 结构的方法
function resolvehtml(htmlStr) {
	// 5.2 将字符串调用 replace 方法，把内嵌的 style 和 script 标签，替换为外联的 link 和 script 标签
	const newHTML = htmlStr
		.replace(regcss, '<link rel="stylesheet" href="./index.css" />')
		.replace(regjs, '<script src="./index.js"></script>')
	// 5.3 写入 index.html 这个文件
	fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function (
		err
	) {
		if (err) return console.log('写入 HTML 文件失败！' + err.message)
		console.log('写入 HTML 页面成功！')
	})
}
