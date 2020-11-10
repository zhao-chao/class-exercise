const express = require('express')

const app = express()

const mw1 = (req, res, next) => {
	console.log('调用了局部生效的中间件')
	next()
}
app.get('/', mw1, (req, res, next) => {
	res.send('home page')
	console.log('1')
})
app.get('/user', (req, res) => {
	res.send('home page')
})

app.listen(80, function () {
	console.log('http://127.0.0.1')
})
