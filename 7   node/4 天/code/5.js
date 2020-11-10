const express = require('express')

const app = express()

app.use(express.json())

app.use(
	express.urlencoded({
		extended: false,
	})
)
app.post('/user', (req, res) => {
	console.log(req.body)
	res.send('ok')
})

app.post('/book', (req, res) => {
	console.log(req.body)
	res.send('ok')
})

app.listen(80, function () {
	console.log('http://127.0.0.1')
})
